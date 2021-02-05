import React, { useRef, useState } from 'react'
import { Engine, Scene, useBeforeRender, useClick, useHover, useCanvas } from 'react-babylonjs'
import { Vector3, Color3 } from '@babylonjs/core'

import styles from  './view3d.module.scss';

/* eslint-disable-next-line */
export interface View3dProps {
  isActive: boolean,
}

export function View3d(props: View3dProps) {

  return (
    <div className={styles.wrapper} style={{display: props.isActive ? 'initial' : 'none'}}>
      <Engine antialias canvasId='babylonJS' adaptToDeviceRatio={true} canvasStyle={{width: '100%', height: '100%'}} >
        <Scene enableInteractions={true}>
          <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
          <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
          <box name='left' position={new Vector3(-2, 0, 0)}>
            <standardMaterial name={`square-mat`} diffuseColor={Color3.FromHexString('#EEB5EB')} specularColor={Color3.Black()} />
          </box>
        </Scene>
      </Engine>
    </div>
  );
}

export default View3d;
