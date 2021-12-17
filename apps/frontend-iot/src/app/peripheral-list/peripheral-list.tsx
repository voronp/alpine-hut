import React from 'react';

import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import styles from './peripheral-list.module.scss';
import { useAllPeripheralGroupsQuery } from "@home/data-access";
import TreeNode from "primereact/treenode";

/* eslint-disable-next-line */
export interface PeripheralListProps {}

const getActions = (peripheral) => ({
  'on': () => {console.log('on')},
  'off': () => {console.log('off')},
})

export function PeripheralList(props: PeripheralListProps) {
  const {data, error: listError, loading, refetch: refetchPeripheralGroups} = useAllPeripheralGroupsQuery()
  const nodes = data ? data.peripheralGroupList.map<TreeNode>(v => ({
      key: `G_${v.ID}`,
      data: {
        Name: v.Name,
        Type: v.Type,
        Data: JSON.stringify(v.Data),
        Actions: JSON.stringify(getActions(v)),
      },
      children: v.Peripherals.map<TreeNode>(p => ({
        key: `P_${p.ID}`,
        data: {
          Name: p.Name,
          Type: p.Type,
          Data: JSON.stringify(p.Data),
          Actions: JSON.stringify(getActions(p)),
        },
        children: []
      })),
  })) : []
  return (
    <div>
      <TreeTable value={nodes} >
        <Column field="Name" header="Name" expander />
        <Column field="Type" header="Type"  />
        <Column field="Data" header="Data"  />
        <Column field="Actions" header="Actions"  />
      </TreeTable>
    </div>
  );
}

export default PeripheralList;
