import { PeripheralGroup, PeripheralGroupByIdQueryResult, Profile, ProfileAuthorization } from '@home/data-access';
import React, {DependencyList, Profiler, useState, useMemo, useEffect} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { AuthorizationDict, PeripheralGroupHeating } from '@home/ui';
import { useUpdatePeripheralGroupMutation, useActivatePeripheralGroupMutation, useDeactivatePeripheralGroupMutation } from '@home/data-access';

const getPeripheralGroupComponent = (componentName:string) => {
  if (componentName === 'heating_system') return PeripheralGroupHeating;
  return 'div'
}

export function PeripheralGroupForm (props: {
    profile: Profile, 
    data:PeripheralGroup, 
    setAlreadySaved:(v:boolean) => void, 
    setHasChanges:(v:boolean) => void, 
    setIsSaveLoading:(v:boolean) => void,
    saveNode:HTMLElement,
  }) {
  const GroupComponent = getPeripheralGroupComponent(props.data.Type);
  const [valueDescription, setValueDescription] = useState(props.data.Description);
  const [pgToUpdate, setpgToUpdate] = useState({});
  const [updatePeripheralGroup, {data: updatedPG, loading: isLoadingUpdatedPG}] = useUpdatePeripheralGroupMutation();
  const [activatePeripheralGroup, {loading: isLoadingActivationPG}] = useActivatePeripheralGroupMutation();
  const [deactivatePeripheralGroup, {loading: isLoadingDeactivationPG}] = useDeactivatePeripheralGroupMutation();
  const { setHasChanges, setAlreadySaved, setIsSaveLoading, saveNode } = props;
  useEffect(() => {
    const f = async () => {
      // mutate peripheral group thru graphql
      setIsSaveLoading(true);
      await updatePeripheralGroup({variables: {PeripheralGroup: {ID: props.data.ID, ...pgToUpdate}}});
      setHasChanges(false);
      setAlreadySaved(true);
      setIsSaveLoading(false);
    }
    if (saveNode) {
      saveNode.addEventListener('click', f);
      return () => saveNode.removeEventListener('click', f);
    }
  }, [saveNode, setIsSaveLoading, updatePeripheralGroup, setHasChanges, setAlreadySaved, props.data.ID, pgToUpdate])
  const access = useMemo(():AuthorizationDict => props.profile.Authorizations
      .filter(v => v.PeripheralGroupID === props.data.ID)
      .reduce((acc, v) => ({...acc, [v.Access]: true}), {
          Read: props.profile.IsAdmin,
          Setup: props.profile.IsAdmin,
          Activate: props.profile.IsAdmin,
      }), [props.data.ID, props.profile.Authorizations, props.profile.IsAdmin]);
  const onEnable =  async (v:boolean) => {
    // mutate pg state to enable hardware
    v ? await activatePeripheralGroup({variables: {ID: props.data.ID}}) : await deactivatePeripheralGroup({variables: {ID: props.data.ID}});
  }
  const onUpdate = (v:{[k:string]: string|number}) => {
    const setOptToObj = (obj, parts, val) => {
      const part = parts.shift();
      if (!parts.length) {
        obj[part] = val;
        return;
      }
      obj[part] = {};
      setOptToObj(obj[part], parts, val);
    }
    const mergedPG = Object.entries(v).reduce((acc, [key, val]) => {
      const parts = key.split('.');
      setOptToObj(acc, parts, val);
      return acc;
    }, {...pgToUpdate});
    setpgToUpdate(mergedPG);
    setHasChanges(true);
  }
  const updateDescription = (v:string) => {
    onUpdate({Description: v});
    setValueDescription(v);
  }

  return access.Read ? <div className="peripheral-group-form">
      {
          access.Setup ? <InputTextarea
          autoResize
          style={{width: '100%'}}
          value={valueDescription}
          onChange={(e) => updateDescription(e.target.value)}
        /> : <Panel header="Description" toggleable style={{width: '100%'}}>
              <p>{props.data.Description}</p>
          </Panel>
      }
      <GroupComponent
          access={access}
          data={props.data}
          onEnable={onEnable}
          onUpdateData={onUpdate}
      />
  </div> : <div>You don't have access to this area</div>
}