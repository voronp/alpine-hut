import React, { useRef, useState, useEffect, useCallback } from 'react'
import {Engine, Scene} from 'react-babylonjs'
import { Vector3, Color3 } from '@babylonjs/core'
import {use3DParts} from './visualHooks'
import {House} from './components/House'

import styles from  './view3d.module.scss';

/* eslint-disable-next-line */
export interface View3dProps {
  isActive: boolean,
}

let scene = null;
const onSceneMounted = (sceneEventArgs) => {
  scene = sceneEventArgs.scene;
}

export function View3d(props: View3dProps) {

  const {grassMaterial} = use3DParts(scene)

  useEffect(() => {
    if(props.isActive) {
      // hack due to not working recalc aspect ratio
      window.dispatchEvent(new Event('resize'));
    }
  }, [props.isActive])

  return (
    <div className={styles.wrapper} style={{display: props.isActive ? 'initial' : 'none'}}>
      <Engine antialias canvasId='babylonJS' adaptToDeviceRatio={true} canvasStyle={{width: '100%', height: '100%'}} >
        <Scene enableInteractions={true} onSceneMount={onSceneMounted}>
          <freeCamera  name="camera1" target={new Vector3(-10, 0, -10)} position={new Vector3(10, 10, -20)}/>
          <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
          <directionalLight name="shadow-light" setDirectionToTarget={[Vector3.Zero()]} direction={Vector3.Zero()} position = {new Vector3(-40, 30, -40)}
                            intensity={0.4} shadowMinZ={1} shadowMaxZ={2500}>
            <shadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32}
                             shadowCastersExcluding={[]} forceBackFacesOnly={true} depthScale={100}
            />
          </directionalLight>
          <ground name='ground' width={40} height={40} subdivisions={1} receiveShadows={true}>
            <standardMaterial name='groundMat' specularColor={Color3.Black()}  ref={grassMaterial} />
          </ground>
          <House scene={scene}/>
        </Scene>
      </Engine>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default View3d;
