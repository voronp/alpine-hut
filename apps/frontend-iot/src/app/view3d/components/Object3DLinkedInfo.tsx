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

export interface Object3DLinkedInfoProps {
  LinkedTo: Mesh
  children?: ReactNode
}

export function Object3DLinkedInfo(props: Object3DLinkedInfoProps) {
  const onFullScreenRef = useCallback(ref => {
    lineRef.current.linkWithMesh(props.LinkedTo);
    lineRef.current.connectedControl = objRef.current;
  }, []);
  const objRef = useRef(null);
  const lineRef = useRef(null);
  return (<adtFullscreenUi name='ui1' ref={onFullScreenRef}>
    <rectangle
      isPointerBlocker={true}
      name={`linked-container`}
      alpha={1}
      adaptWidthToChildren={true}
      adaptHeightToChildren={true}
      background='white'
      cornerRadius={7}
      thickness={1}
      linkOffsetY={30}
      ref={objRef}
      verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
      top={'10%'}
    >
      {props.children}
    </rectangle>
    <babylon-line name="linked-line" alpha={0.5} lineWidth={5} dash={[5, 10]} ref={lineRef} />
  </adtFullscreenUi>)
}
