import React, { ReactNode, useCallback } from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { BlockUI } from 'primereact/blockui';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { PeripheralGroup } from '@home/data-access';
import { PeripheralGroupHeating } from '@home/ui';
import { useAuthorizationDict } from '../hooks/common';
import styles from './PeripheralListAccordion.module.scss';
import PeripheralListAccordionItem from './PeripheralListAccordionItem';

export interface PeripheralListAccProps {
  loading:boolean
  items:PeripheralGroup[]
  selectedID?:number
  onSelect:(id:number) => void
}

function AccHeader(props:PeripheralGroup) {
  let icon = "pi pi-bolt";
  if (props.Type === 'heating_system') icon = "pi pi-sun";
  return (<div className={styles.header}>
    <i className={icon}></i>
    <span className={styles['header-name']}>{props.Name}</span>
    { !props.Data.IsActive && <Tag className="mr-2" icon="pi pi-times" severity="info" value="Disabled"></Tag> }
    { props.Data.IsActive && <Tag className="mr-2" icon="pi pi-check" severity="success" value="Enabled"></Tag> }
  </div>)
}

export function PeripheralListAccordion(props: PeripheralListAccProps) {
  const { items, loading, selectedID, onSelect } = props;
  const selectedIndex:number = selectedID === undefined ? undefined : items.findIndex(v => v.ID === selectedID) + 1;
  const onSelectTab = useCallback((e) => {
    e.originalEvent.preventDefault();
    onSelect(e.index ? items[e.index-1]?.ID : undefined); // index in accordion starts from 1
  }, [onSelect, items]);
  const {data: permissions, loading: permissionsLoading, error: permissionsError} = useAuthorizationDict(selectedID);
  return (<Accordion activeIndex={selectedIndex} onTabChange={onSelectTab}>
    { loading && <BlockUI blocked template={<ProgressSpinner/>} /> }
    { !loading && items.map(v => (
      <AccordionTab key={v.ID} header={<AccHeader {...v}/>}>
        { permissionsLoading && <ProgressSpinner/>}
        { permissionsError && <Message severity="error" text="Permissions error" /> }
        { permissions && permissions.Read && <PeripheralListAccordionItem PeripheralGroupID={v.ID}/> }
      </AccordionTab>
    )) }
  </Accordion>);
}

export default PeripheralListAccordion;