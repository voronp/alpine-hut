import React, {useCallback, useState, useMemo, useRef, useEffect, forwardRef, MutableRefObject, useContext} from 'react';
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
import { Box, Sphere } from 'react-babylonjs'

export interface Object3DReferenceProps {
  Type: string
  Config: PropsConfig
}

export interface PropsConfig {
  Position:Vector3
  Radius?: number,
  Dimensions?: Vector3,
  Rotation?: Vector3,
}

const getComponentByType = (type) => {
  if (type === 'point') return Sphere;
  if (type === 'box') return Box;
  if (type === 'custom') return Box; // for now just basic element
  return Box;
};

const convertConf = (conf: PropsConfig):Record<string, any> => {
  const res: Record<string, any> = {
    position: new Vector3(conf.Position.x, conf.Position.y, conf.Position.z),
  };
  if ('Radius' in conf) {
    res.diameter = conf.Radius * 2;
  }
  if ('Dimensions' in conf) {
    res.width = conf.Dimensions.x;
    res.height = conf.Dimensions.y;
    res.depth = conf.Dimensions.z;
  }
  if ('Rotation' in conf) {
    res.rotation = new Vector3(conf.Rotation.x, conf.Rotation.y, conf.Rotation.z);
  }
  return res;
};

export function Object3DReference(props: Object3DReferenceProps) {
  const Component = getComponentByType(props.Type);
  return (<Component {...convertConf(props.Config)}/>)
}
