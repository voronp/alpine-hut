import React from 'react';
import { PeripheralGroup } from '@home/data-access';
import { TreeTable } from 'primereact/treetable';
import TreeNode from "primereact/treenode";
import { Column } from 'primereact/column';

export interface PeripheralListTTProps {
    loading:boolean
    items:PeripheralGroup[]
}

export function PeripheralListTreeTable(props: PeripheralListTTProps) {
  const { items, loading } = props;
  const nodes = items.map<TreeNode>(v => ({
      key: `G_${v.ID}`,
      data: {
        Name: v.Name,
        Type: v.Type,
        Data: JSON.stringify(v.Data),
        Actions: '-',
      },
      children: v.Peripherals.map<TreeNode>(p => ({
        key: `P_${p.ID}`,
        data: {
          Name: p.Name,
          Type: p.Type,
          Data: JSON.stringify(p.Data),
          Actions: '-',
        },
        children: []
      })),
  }));
  return (
    <TreeTable value={nodes} loading={loading}>
      <Column field="Name" header="Name" expander />
      <Column field="Type" header="Type"  />
      <Column field="Data" header="Data"  />
      <Column field="Actions" header="Actions"  />
    </TreeTable>
  );
}

export default PeripheralListTreeTable;