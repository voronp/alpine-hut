import React, {useCallback} from "react";
import {GrassProceduralTexture} from "@babylonjs/procedural-textures";
import {Space, Vector3} from "@babylonjs/core";
import { useClick, useHover } from 'react-babylonjs';
import { useDispatch, useSelector } from 'react-redux'
import { pointerActions, selectHovered, selectSelected } from '../pointer.slice';

export function use3DParts(scene) {
  const grassMaterial = useCallback(material => {
    const texture = new GrassProceduralTexture("grass", 512, scene);
    material.diffuseTexture = texture;
    material.opacityTexture = texture;
    material.diffuseTexture.rotate = [new Vector3(1.0, 1.0, 0.5), Math.PI / 3.0, Space.LOCAL]
  }, []);


  return {grassMaterial}
}

export function usePointer(key, valueRef) {
  const dispatch = useDispatch();
  const isSelected = useSelector(selectSelected) === key;
  const isHovered = useSelector(selectHovered) === key;
  useClick(
    (event) => {
      console.log('useClick', event);
      dispatch(pointerActions.setSelected({key}));
    },
    valueRef,
  );
  useHover(
    (event) => {
      console.log('1', event);
      dispatch(pointerActions.setHovered({key}));
    },
    (event) => {
      console.log('0', event);
      dispatch(pointerActions.setHovered(null));
    },
    valueRef,
  );
  return {
    isSelected,
    isHovered,
  }
}
