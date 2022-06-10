import {Inject, Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PeripheralGroup, PeripheralGroupType} from "./peripheral-group.entity";
import {Repository, FindConditions} from "typeorm";
import { SchedulerRegistry } from '@nestjs/schedule';
import { ServerState } from "../common/state";
import {Peripheral, PeripheralType} from "../peripherals/peripherals.entity";
import {AbstractHardware} from "../hardware/abstract-hardware";
import { callUntilDone } from '../common/utils';
import {HistoryService} from "../history/history.service";
import {HistoryActions, HistoryReasons} from "../history/history.entity";
import {PubSub} from "graphql-subscriptions";

@Injectable()
export class PeripheralGroupsService implements OnApplicationBootstrap {
  private intervalName = 'pgInterval';

  constructor(
    @Inject('STATE')
    private serverState: ServerState,
    @Inject('PUB_SUB')
    private pubSub: PubSub,
    @InjectRepository(PeripheralGroup)
    private peripheralGroupRepository: Repository<PeripheralGroup>,
    @InjectRepository(Peripheral)
    private peripheralRepository: Repository<Peripheral>,
    private schedulerRegistry: SchedulerRegistry,
    @Inject(AbstractHardware)
    private hardwareProvider,
    @Inject(HistoryService)
    private historyService: HistoryService,
  ) {}

  findAll(): Promise<PeripheralGroup[]> {
    return this.peripheralGroupRepository.find();
  }

  async findBy3DPart(view3DPart: string): Promise<PeripheralGroup[]> {
    /*
    return this.peripheralGroupRepository.find({
      where: {
        Object3DReference: {
          ActiveIn: view3DPart,
        },
      },
      relations: ["Object3DReference"],
    });
    */
    /*
    return this.peripheralGroupRepository
      .createQueryBuilder()
      .leftJoinAndSelect("PeripheralGroup.Object3DReference", "Object3DReference")
      .where('Object3DReference.ActiveIn=:view3DPart', {view3DPart})
      .getMany()
      */
    const ids = await this.peripheralGroupRepository
      .createQueryBuilder()
      .select('PeripheralGroup.ID')
      .leftJoinAndSelect("PeripheralGroup.Object3DReference", "Object3DReference")
      .where('Object3DReference.ActiveIn=:view3DPart', {view3DPart})
      .getMany();
    return this.peripheralGroupRepository.findByIds(ids.map(v => v.ID));
  }

  findOne(id: number): Promise<PeripheralGroup> {
    return this.peripheralGroupRepository.findOne(id);
  }

  async add(pgData:{Name:string, Data: Record<string, unknown>, Description: string, Type: string}):Promise<PeripheralGroup> {
    const pg:PeripheralGroup = this.peripheralGroupRepository.create(pgData);
    return this.peripheralGroupRepository.save(pg);
  }

  async update(id: number, pgData:{Name?:string, Data?: Record<string, unknown>, Description?: string}):Promise<PeripheralGroup> {
    const pg:PeripheralGroup = await this.peripheralGroupRepository.findOne(id);
    Object.entries(pgData).forEach(([k, v]) => {
      if (k === 'Data') {
        Object.entries(pgData.Data).forEach(([kd, vd]) => {
          pg.Data[kd] = vd;
        });
      } else pg[k] = v;
    })
    if (this.serverState.activePeripheralGroups[pg.ID]) this.serverState.setPeripheralGroupActive(pg);
    return this.peripheralGroupRepository.save(pg);
  }

  async remove(id: string): Promise<void> {
    await this.peripheralGroupRepository.delete(id);
  }

  async onApplicationBootstrap() {
    console.log('Initialize PeripheralGroups');
    const peripheralGroups = await this.findAll();
    await peripheralGroups.forEach(async (pg) => {
      pg.Peripherals.forEach(p => {
        // find all peripherals that should be set to initial level (like relay)
        if (p.Type === PeripheralType.HEATER) {
          // open heater pin for write on initial level
          const initialLevel:string = p.Data.Active === AbstractHardware.HIGH ? AbstractHardware.LOW : AbstractHardware.HIGH;
          this.hardwareProvider.openPIO(p.Data.Pin as number, AbstractHardware.OUTPUT, initialLevel);
        }
      });
      if (pg.Data && pg.Data.IsActive) {
        this.resetPeripheralGroup(pg);
        try {
          await this.activatePeripheralGroup(pg);
          await this.historyService.addForPeripheralGroup(pg.ID, {
            Action: HistoryActions.Reactivate,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
    const interval = setInterval(() => this.ticker(), 1000);
    this.schedulerRegistry.addInterval(this.intervalName, interval);
  }

  async ticker() {
    this.serverState.getActivePeripheralGroupsOnTick().forEach(async pg => {
      await this.processActivePeripheralGroup(pg);
    })
  }

  resetPeripheralGroup(pg:PeripheralGroup) {
    pg.Data.IsActive = false;
    pg.Peripherals.forEach(p => {p.IsActive = false})
  }

  async processActivePeripheralGroup(pg:PeripheralGroup) {
    if(this.serverState.isPeripheralGroupProcessing(pg)) {
      return
    }
    this.serverState.setPeripheralGroupProcessisng(pg);
    if (pg.Type === PeripheralGroupType.HEATING) {
      const sensorPeripheral = pg.Peripherals.find((p) => p.Type === PeripheralType.SENSOR);
      const heaterPeripheral = pg.Peripherals.find((p) => p.Type === PeripheralType.HEATER);
      if (!sensorPeripheral || !heaterPeripheral) {
        // log invalid configuration
        console.log('error', sensorPeripheral, heaterPeripheral);
        throw new Error('Configuration is invalid, please update');
      }
      const activateHeaterMethod:string = heaterPeripheral.Data.Active === 'HIGH' ? 'setHighPIO' : 'setLowPIO';
      const deactivateHeaterMethod:string = activateHeaterMethod === 'setHighPIO' ? 'setLowPIO' : 'setHighPIO';
      const getTemperature = (id:string, tries:number) => this.hardwareProvider
        .getTemperature(id)
        .catch((e) => {
          tries--;
          if(tries) return getTemperature(id, tries);
          throw e;
        });
      try {
        const temperature = await getTemperature(sensorPeripheral.Data.DeviceID as string, 3);
        await this.historyService.addForPeripheral(sensorPeripheral.ID, {
          Action: HistoryActions.Measure,
          Value: temperature,
        });
        sensorPeripheral.Data.Temperature = temperature;
        const temperatureLimit:number = pg.Data.TemperatureLimit as number;
        if (temperature >= temperatureLimit && heaterPeripheral.IsActive) {
          this.hardwareProvider[deactivateHeaterMethod](heaterPeripheral.Data.Pin);
          heaterPeripheral.IsActive = false;
          await this.historyService.addForPeripheral(heaterPeripheral.ID, {
            Action: HistoryActions.Deactivate,
          });
        } else if (temperature < temperatureLimit && !heaterPeripheral.IsActive) {
          this.hardwareProvider[activateHeaterMethod](heaterPeripheral.Data.Pin);
          heaterPeripheral.IsActive = true;
          await this.historyService.addForPeripheral(heaterPeripheral.ID, {
            Action: HistoryActions.Activate,
          });
        }
      } catch(e) {
        // log sensor fail, shutdown heater
        console.error(e);
        await this.deactivatePeripheralGroup(pg);
        await this.historyService.addForPeripheralGroup(pg.ID, {
          Action: HistoryActions.Deactivate,
          Reason: HistoryReasons.Malfunction,
        });
        throw new Error('Sensor malfunction');
      }
      try {
        await this.savePeripheral(sensorPeripheral);
        await this.savePeripheral(heaterPeripheral);
      } catch (e) {
        // log database fail
        throw new Error(`Database error: ${e}`);
      }
    }
    this.serverState.unsetPeripheralGroupProcessisng(pg);
  }

  async activatePeripheralGroup(pg:PeripheralGroup) {
    this.serverState.setPeripheralGroupActive(pg);
    pg.Data.IsActive = true;
    await this.processActivePeripheralGroup(pg);
    await this.peripheralGroupRepository.save(pg);
  }

  async deactivatePeripheralGroup(pg:PeripheralGroup) {
    if (pg.Type === PeripheralGroupType.HEATING) {
      const heaterPeripheral = pg.Peripherals.find((p) => p.Type === PeripheralType.HEATER);
      if (!heaterPeripheral) {
        // log invalid configuration
        throw new Error('Configuration is invalid, please update');
      }
      const deactivateHeaterMethod:string = heaterPeripheral.Data.Active === AbstractHardware.HIGH ? 'setLowPIO' : 'setHighPIO';
      this.hardwareProvider[deactivateHeaterMethod](heaterPeripheral.Data.Pin);
      heaterPeripheral.IsActive = false;
      await this.savePeripheral(heaterPeripheral);
    }
    this.serverState.unsetPeripheralGroupActive(pg);
    pg.Data.IsActive = false;
    await this.peripheralGroupRepository.save(pg);
  }

  async activatePeripheralGroupByID(ID:number):Promise<PeripheralGroup> {
    const pg = await this.findOne(ID);
    const activator = async () => {
      if (this.serverState.isPeripheralGroupProcessing(pg)) throw new Error('Peripheral group is busy');
      return this.activatePeripheralGroup(pg);
    };
    try {
      await callUntilDone(activator, 1000, 10);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return this.findOne(ID);
  }

  async deactivatePeripheralGroupByID(ID:number):Promise<PeripheralGroup> {
    const pg = await this.findOne(ID);
    const activator = async () => {
      if (this.serverState.isPeripheralGroupProcessing(pg)) throw new Error('Peripheral group is busy');
      return this.deactivatePeripheralGroup(pg);
    };
    try {
      await callUntilDone(activator, 1000, 10);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return this.findOne(ID);
  }

  async savePeripheral(peripheral: Peripheral) {
    await this.peripheralRepository.save(peripheral);
    // console.warn(peripheral);
    return this.pubSub.publish('peripheralUpdated', { peripheralUpdated: peripheral });
  }
}
