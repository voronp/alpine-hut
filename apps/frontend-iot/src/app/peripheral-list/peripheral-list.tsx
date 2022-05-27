import React, { useCallback, useState } from 'react';

import { SelectButton } from 'primereact/selectbutton';
import styles from './peripheral-list.module.scss';
import { useAllPeripheralGroupsQuery } from "@home/data-access";
import { Message } from "primereact/message";
import PeripheralListAccordion from '../components/PeripheralListAccordion';
import PeripheralListTreeTable from '../components/PeripheralListTreeTable';

const options = [
  {name: 'Accordion', value: 1},
  {name: 'Tree Table', value: 2},
];

export function PeripheralList() {
  const {data, error: listError, loading, refetch: refetchPeripheralGroups} = useAllPeripheralGroupsQuery()
  const [selectedUI, setSelectedUI] = useState(options[0].value);
  const [selectedPG, setSelectedPG] = useState(undefined);
  const onSelect = useCallback((ID) => setSelectedPG(ID), [setSelectedPG]);
  return (
    <div className={styles.list}>
      <div className={styles.header}><SelectButton value={selectedUI} options={options} onChange={(e) => setSelectedUI(e.value)} optionLabel="name" /></div>
      <div className={styles.content}>
        { listError && <Message severity="error" text={listError.message} /> }
        { data && data.peripheralGroupList && selectedUI === 1 && <PeripheralListAccordion loading={loading} items={data.peripheralGroupList} onSelect={onSelect} selectedID={selectedPG} /> }
        { data && data.peripheralGroupList && selectedUI === 2 && <PeripheralListTreeTable loading={loading} items={data.peripheralGroupList} /> }
      </div>
    </div>
  );
}

export default PeripheralList;
