import React, {
  useRef,
  ComponentPropsWithRef, ReactNode
} from 'react';
import {
  Color3,
  Vector3,
} from "@babylonjs/core";
import { Box, Sphere } from 'react-babylonjs'
import { useSubPointer} from "../visualHooks";
export interface Object3DReferenceProps {
  ID: number
  Type: string
  Config: PropsConfig
  children?: ReactNode
}

export interface PropsConfig {
  Position:Vector3
  Radius?: number,
  Dimensions?: Vector3,
  Rotation?: Vector3,
  Material?: any,
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
  const Component = getComponentByType(props.Type) as ComponentPropsWithRef<any>;
  const objRef = useRef(null);
  const {
    isSubHovered,
    isSubSelected,
  } = useSubPointer(`ObjRef${props.ID}`, objRef);
  return (<>
    <Component ref={objRef} name={`ObjRefName${props.ID}`} {...convertConf(props.Config)}>
      <standardMaterial
        name={`ObjRefName${props.ID}-mat`}
        diffuseColor={Color3.Yellow()}
        specularColor={Color3.Black()}
        alpha={0.5}
      />
    </Component>
  </>)
}
