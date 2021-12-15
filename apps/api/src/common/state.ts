import { PeripheralGroup } from "../peripheral-groups/peripheral-group.entity";

export class ServerState {
  subscribed = {};
  activePeripheralGroups = {};
  activePeripheralGroupTicks = {};
  processingPeripheralGroups = {};

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
}
