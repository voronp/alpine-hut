import { useMemo, useState } from 'react';

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
        saveBtnClass: 'p-button-raised',
        saveBtnDisabled: true,
      }
      if (hasChanges) {
        res.saveBtnDisabled = false;
        res.saveBtnClass += ' p-button-danger';
        res.saveBtnIcon += ' pi-save';
      } else if (alreadySaved && !hasChanges) {
        res.saveBtnLabel = 'Done';
        res.saveBtnDisabled = true;
        res.saveBtnClass += ' p-button-success';
        res.saveBtnIcon += ' pi-check';
      } else {
        res.saveBtnIcon = '';
        res.saveBtnClass += 'p-button-secondary'
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