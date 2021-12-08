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
import { Box, Sphere } from 'react-babylonjs'
import { useSubPointer} from "../visualHooks";
import {selectHovered, selectSelected, selectSubSelected} from "../../pointer.slice";

export interface PeripheralGroupInfoProps {
  ID: number
  Type: string
  Data: any
  Description: string
  Name: string
  Peripherals: any
  children?: ReactNode
}

export function PeripheralGroupInfo(props: PeripheralGroupInfoProps) {
  console.log(props);
  const objRef = useRef(null);
  const lineRef = useRef(null);
  return (<stackPanel
    name={`stack-pg-${props.ID}`}
    verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
    horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
    width={'300px'}
  >
    <textBlock
      name={`label-pg-name-${props.ID}`}
      text={props.Name}
      height={'20px'}
    />
  </stackPanel>)
}
