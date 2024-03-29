import React, {useRef, useState, useEffect, useCallback, useContext} from 'react'
import { ApolloProvider, ApolloContextValue, getApolloContext } from '@apollo/client';
import { Provider } from 'react-redux';
import {Engine, Scene, GlowLayer, SceneContext} from 'react-babylonjs';
import { Vector3, Color3, Scene as BScene, CubeTexture } from '@babylonjs/core';
import { Nullable } from '@babylonjs/core/types.js';
import {use3DParts, usePointer} from './visualHooks';
import {House, housePosition} from './components/House';
import {store} from '../../store';
import styles from  './view3d.module.scss';

/*
import skynegx from '@assets/textures/Meadow/negx.jpg';
import skynegy from '@assets/textures/Meadow/negy.jpg';
import skynegz from '@assets/textures/Meadow/negz.jpg';
import skyposx from '@assets/textures/Meadow/posx.jpg';
import skyposy from '@assets/textures/Meadow/posy.jpg';
import skyposz from '@assets/textures/Meadow/posz.jpg';
 */
/* eslint-disable-next-line */
export interface View3dProps {
  isActive: boolean, // doesn't work yet, will be available in next babylonjs build (supposed to stor render if true)
  isHidden: boolean,
}

let scene = null;
const onSceneMounted = (sceneEventArgs) => {
  scene = sceneEventArgs.scene;
  /*
  const sky = new CubeTexture('', scene, null,true, [
    skynegx,
    skyposy,
    skynegz,
    skyposx,
    skynegy,
    skyposz,
  ]);
  scene.createDefaultSkybox(sky, true, 100);
   */
};

export function View3d(props: View3dProps) {
  const {client} = useContext<ApolloContextValue>(getApolloContext());
  const {grassMaterial} = use3DParts(scene);
  const highlightLayerEL = useRef(null);
  const cameraRef = useCallback((camera) => {
    if(camera)
      camera.target = new Vector3(10, 2, 10);
  }, []);
  useEffect(() => {
    if(props.isActive) {
      // hack due to not working recalc aspect ratio
      window.dispatchEvent(new Event('resize'));
    }
  }, [props.isActive])
  const engineRef = useCallback((eng) => {
    console.log('eng', eng);
  }, []);
  const style:{[k:string] : string} = {
    display: props.isHidden ? 'none' : 'block',
  };
  if (!props.isActive) style.filter = 'blur(5px)';
  return (
    <div className={styles.wrapper} style={style}>
      <Engine ref={engineRef} antialias canvasId='babylonJS' adaptToDeviceRatio={true} canvasStyle={{width: '100%', height: '100%'}} >
        <Scene onSceneMount={onSceneMounted}>
          <highlightLayer ref={highlightLayerEL} name="highlight"/>
          <freeCamera ref={cameraRef}  name="camera1" rotation={new Vector3(10,-10,10)} position={new Vector3(0, 10, 0)}/>
          <hemisphericLight name='light1' intensity={0.7} direction={Vector3.Up()} />
          <directionalLight
            name="shadow-light"
            setDirectionToTarget={[Vector3.Zero()]}
            direction={Vector3.Zero()}
            position = {new Vector3(-40, 30, -40)}
            intensity={0.8}
            shadowMaxZ={80}
            shadowMinZ={30}
          >
            <shadowGenerator
              mapSize={2048}
              darkness={0.1}
              shadowCastersExcluding={[]}
              usePoissonSampling={true}
              useExponentialShadowMap={true}
              bias={0.0002}
              normalBias={0.01}
            />
          </directionalLight>
          <ground name='ground' width={40} height={40} subdivisions={1} receiveShadows={true}>
            <standardMaterial name='groundMat' specularColor={Color3.Black()}  ref={grassMaterial} />
          </ground>
          <box name="home_group" position={housePosition} width={0.01} height={0.01} depth={0.01}>
            <Provider store={store}>
              <ApolloProvider client={client}>
                <House highlightLayer={highlightLayerEL}/>
              </ApolloProvider>
            </Provider>
          </box>
        </Scene>
      </Engine>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default View3d;
