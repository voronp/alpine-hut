import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
  forwardRef,
  MutableRefObject,
  useContext,
  ComponentPropsWithRef,
  RefObject,
  ReactNode,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Color3,
  Vector3,
  Vector4,
  CSG,
  MeshBuilder,
  StandardMaterial,
  Scene,
  Mesh,
  SubMesh,
  FadeInOutBehavior,
  BoxBuilder,
  HighlightLayer,
  Texture,
  PBRMetallicRoughnessMaterial,
  ReflectionProbe,
  MultiMaterial,
  FresnelParameters,
  PBRMaterial,
  RenderTargetTexture, ShadowGenerator,
} from "@babylonjs/core";
import { Control } from '@babylonjs/gui';
import {Box, Sphere, useClick, useHover} from 'react-babylonjs'
import { useSubPointer} from "../visualHooks";

import {SensorThumb} from './peripherals/SensorThumb';
import {HeaterThumb} from './peripherals/HeaterThumb';
import {managerPopupActions} from "../../manager-popup.slice";

const componentDict = {
  Sensor: SensorThumb,
  Heater: HeaterThumb,
};

export interface PeripheralGroupInfoProps {
  ID: number
  Type: string
  Data: any
  Description: string
  Name: string
  Peripherals: any[]
  children?: ReactNode
}

export function PeripheralGroupInfo(props: PeripheralGroupInfoProps) {
  const showActiveStatus = 'IsActive' in props.Data;
  const dispatch = useDispatch();
  const onClick = () => dispatch(managerPopupActions.openPopup(props));
  return (<stackPanel
    name={`stack-pg-${props.ID}`}
    verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
    horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
    width={'310px'}
    paddingBottom={'5px'}
    paddingTop={'5px'}
    paddingLeft={'5px'}
    paddingRight={'5px'}
    fontSize={'24px'}
    hoverCursor={'pointer'}
    onPointerDownObservable={onClick}
  >
    <textBlock
      name={`label-pg-name-${props.ID}`}
      text={props.Name}
      height={'30px'}
      fontWeight={'bold'}
      fontSize={'24px'}
    />
    {
      showActiveStatus ?
        <rectangle
          key={`status-${props.ID}`}
          height={'30px'}
          background={props.Data.IsActive ? 'green' : '#999999'}
          width={'100%'}
        >
          <textBlock
            name={`label-status-${props.ID}`}
            text={props.Data.IsActive ? 'Enabled' : 'Disabled'}
            color={'#FFFFFF'}
          />
        </rectangle> : ''
    }
    {
      props.Peripherals.map(p => {
        const Component = componentDict[p.Type];
        return <Component key={p.ID} {...p} />
      })
    }
  </stackPanel>)
}
