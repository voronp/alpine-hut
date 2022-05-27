import React, {DependencyList, Profiler, useState, useMemo} from 'react';
import { PeripheralGroupForm } from './PeripheralGroupForm';
import { Profile, usePeripheralGroupByIdQuery } from '@home/data-access';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AuthorizationDict } from '@home/ui';

export function PeripheralGroupFormConnected(props: {ID:number, permissions: AuthorizationDict, setAlreadySaved:(v:boolean) => void, setHasChanges:(v:boolean) => void, setIsSaveLoading:(v:boolean) => void, saveNode: HTMLElement }) {
    const {ID, ...rest} = props;
    const {data, loading, error} = usePeripheralGroupByIdQuery({variables: {ID}});
    if (loading) return <ProgressSpinner/>
    if (error) return <div>{error.message}</div>
    return data && data.peripheralGroupByID && <PeripheralGroupForm 
        data={data.peripheralGroupByID} 
        {...rest}
    />
}