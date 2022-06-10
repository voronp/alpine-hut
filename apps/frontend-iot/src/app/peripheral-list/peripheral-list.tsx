import React, { useCallback, useState, useEffect } from 'react';

import { SelectButton } from 'primereact/selectbutton';
import styles from './peripheral-list.module.scss';
import { useAllPeripheralGroupsQuery, OnPeripheralUpdatedDocument } from "@home/data-access";
import { Message } from "primereact/message";
import PeripheralListAccordion from '../components/PeripheralListAccordion';
import PeripheralListTreeTable from '../components/PeripheralListTreeTable';

const options = [
  {name: 'Accordion', value: 1},
  {name: 'Tree Table', value: 2},
];

export function PeripheralList() {
  const {data, error: listError, loading, subscribeToMore} = useAllPeripheralGroupsQuery()
  const [selectedUI, setSelectedUI] = useState(options[0].value);
  const [selectedPG, setSelectedPG] = useState(undefined);
  const onSelect = useCallback((ID) => setSelectedPG(ID), [setSelectedPG]);
  const pgListIds = ((data && data.peripheralGroupList) || []).map(v => v.ID).join('-');
  useEffect(() => {
    if(!data || !data.peripheralGroupList || !data.peripheralGroupList.length) return;
    const unsubscribers = [];
    data.peripheralGroupList.forEach(pg => {
      pg.Peripherals.forEach(p => {
        unsubscribers.push(subscribeToMore({
          document: OnPeripheralUpdatedDocument,
          variables: { PeripheralID: p.ID },
          updateQuery: <T, OnPeripheralUpdatedSubscription>(prev, { subscriptionData: { data } }) => {
            const pgIndex = prev.peripheralGroupList.findIndex(prevpg => prevpg.ID === pg.ID);
            if (pgIndex >= 0) {
              const pIndex = prev.peripheralGroupList[pgIndex].Peripherals.findIndex(prevp => prevp.ID === data.peripheralUpdated.ID);
              const newPeripheral = {
                ...prev.peripheralGroupList[pgIndex].Peripherals[pIndex],
                ...data.peripheralUpdated,
              };
              const updatedResult = {
                ...prev,
                peripheralGroupList: prev.peripheralGroupList.map(v => ({
                  ...v,
                  Peripherals: v.Peripherals.map(v => (v.ID === newPeripheral.ID ? newPeripheral : v)),
                })),
              };
              return updatedResult;
            }
            return prev;
          },
        }));
      });
    });
    // unsubscribe to updates
    return () => {
      unsubscribers.forEach(f => f());
    }
  }, [
    pgListIds,
  ]);
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
