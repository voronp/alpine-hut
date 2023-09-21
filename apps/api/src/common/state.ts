import { PeripheralGroup } from "../peripheral-groups/peripheral-group.entity";
import { Peripheral } from "../peripherals/peripherals.entity";

export class ServerState {
  subscribed = {};
  allPeripheralGroups:PeripheralGroup[] = [];
  inactivePeripheralTicks:Record<string, number>  = {};
  activePeripheralGroups:Record<string, PeripheralGroup> = {};
  activePeripheralGroupTicks = {};
  processingPeripheralGroups = {};

  setAllPeripheralGroups(pgList: PeripheralGroup[]) {
    this.allPeripheralGroups = pgList;
  }

  setPeripheralGroupActive(pg: PeripheralGroup) {
    this.activePeripheralGroups[pg.ID] = pg;
    this.activePeripheralGroupTicks[pg.ID] = 0;
  }

  unsetPeripheralGroupActive(pg: PeripheralGroup) {
    delete this.activePeripheralGroups[pg.ID];
    delete this.activePeripheralGroupTicks[pg.ID];
  }

  setPeripheralGroupProcessisng(pg: PeripheralGroup) {
    this.processingPeripheralGroups[pg.ID] = true;
  }

  unsetPeripheralGroupProcessisng(pg: PeripheralGroup) {
    this.processingPeripheralGroups[pg.ID] = false;
  }

  isPeripheralGroupProcessing(pg: PeripheralGroup) {
    return this.processingPeripheralGroups[pg.ID];
  }

  getActivePeripheralGroupsOnTick() {
    const res = [];
    Object.entries(this.activePeripheralGroupTicks).forEach(([k, v]) => {
      this.activePeripheralGroupTicks[k] += 1;
      if (this.activePeripheralGroupTicks[k] === (this.activePeripheralGroups[k].Data.Period || 10)) {
        this.activePeripheralGroupTicks[k] = 0;
        res.push(this.activePeripheralGroups[k]);
      }
    });
    return res;
  }

  getInactivePeripheralsOnTick() {
    const activePeripheralIds:Record<string, boolean> = {};
    Object.values(this.activePeripheralGroups).forEach(pg => pg.Peripherals.forEach(p => {
      activePeripheralIds[p.ID] = true;
    }));
    const inactivePeripherals:Peripheral[] = [];
    this.allPeripheralGroups.forEach(pg => pg.Peripherals.forEach(p => {
      if (activePeripheralIds[p.ID]) return;
      if (!(p.ID in this.inactivePeripheralTicks)) this.inactivePeripheralTicks[p.ID] = 0;
      this.inactivePeripheralTicks[p.ID] += 1;
      if (this.inactivePeripheralTicks[p.ID] === (p.Data.PeriodInactiveCheck || 60)) {
        this.inactivePeripheralTicks[p.ID] = 0;
        inactivePeripherals.push(p);
      }
    }));
    return inactivePeripherals;
  }
}
