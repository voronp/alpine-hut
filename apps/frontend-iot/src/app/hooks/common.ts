import { useMemo, useState } from 'react';
import { AuthorizationDict } from '@home/ui';
import { useGetProfileAuthorizationQuery } from '@home/data-access';

export function useManagerPopupSaveBtn():{
  saveBtnLabel:string,
  saveBtnIcon:string, 
  saveBtnClass:string,
  saveBtnDisabled:boolean,
  isSaveLoading: boolean,
  setAlreadySaved: (v:boolean) => void,
  setHasChanges: (v:boolean) => void,
  setIsSaveLoading: (v:boolean) => void,
 } {
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const memoed = useMemo(() => {
      const res = {
        saveBtnLabel: 'Save', 
        saveBtnIcon: 'pi', 
        saveBtnClass: 'button-raised',
        saveBtnDisabled: true,
      }
      if (hasChanges) {
        res.saveBtnDisabled = false;
        res.saveBtnClass += ' button-danger';
        res.saveBtnIcon += ' pi-save';
      } else if (alreadySaved && !hasChanges) {
        res.saveBtnLabel = 'Done';
        res.saveBtnDisabled = true;
        res.saveBtnClass += ' button-success';
        res.saveBtnIcon += ' pi-check';
      } else {
        res.saveBtnIcon = '';
        res.saveBtnClass += 'button-secondary'
      }
      return res;
    }, [alreadySaved, hasChanges]);
    return {
      ...memoed,
      isSaveLoading,
      setAlreadySaved,
      setHasChanges,
      setIsSaveLoading,
    };
}

export function useAuthorizationDict(PeripheralGroupID:number) {
  const { data, loading, error } = useGetProfileAuthorizationQuery();
  const { getProfile: profileData } = data || { getProfile: {Authorizations: [], IsAdmin: false}};
  const res = useMemo(():AuthorizationDict => profileData.Authorizations
      .filter(v => v.PeripheralGroupID === PeripheralGroupID)
      .reduce((acc, v) => ({...acc, [v.Access]: true}), {
          Read: profileData.IsAdmin,
          Setup: profileData.IsAdmin,
          Activate: profileData.IsAdmin,
      }), [PeripheralGroupID, profileData.Authorizations, profileData.IsAdmin]);
  return { data: res, loading, error };
}