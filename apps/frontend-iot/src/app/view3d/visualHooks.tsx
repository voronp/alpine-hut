import React, {DependencyList, useCallback} from "react";
import {GrassProceduralTexture} from "@babylonjs/procedural-textures";
import {Space, Vector3} from "@babylonjs/core";
import { useClick, useHover } from 'react-babylonjs';
import { useDispatch, useSelector } from 'react-redux'
import {pointerActions, selectHovered, selectSelected, selectSubHovered, selectSubSelected} from '../pointer.slice';

export function use3DParts(scene) {
  const grassMaterial = useCallback(material => {
    const texture = new GrassProceduralTexture("grass", 512, scene);
    material.diffuseTexture = texture;
    material.opacityTexture = texture;
    material.diffuseTexture.rotate = [new Vector3(1.0, 1.0, 0.5), Math.PI / 3.0, Space.LOCAL]
  }, [] as DependencyList);


  return {grassMaterial}
}

export function usePointer(key, valueRef) {
  const dispatch = useDispatch();
  const isSelected = useSelector(selectSelected) === key;
  const isHovered = useSelector(selectHovered) === key;
  useClick(
    (event) => {
      dispatch(pointerActions.setSelected({key}));
    },
    valueRef,
  );
  useHover(
    (event) => {
      dispatch(pointerActions.setHovered({key}));
    },
    (event) => {
      dispatch(pointerActions.setHovered(null));
    },
    valueRef,
  );
  return {
    isSelected,
    isHovered,
  }
}

export function useSubPointer(key, valueRef) {
  const dispatch = useDispatch();
  const isSubSelected = useSelector(selectSubSelected) === key;
  const isSubHovered = useSelector(selectSubHovered) === key;
  useClick(
    (event) => {
      dispatch(pointerActions.setSubSelected({key}));
    },
    valueRef,
  );
  useHover(
    (event) => {
      dispatch(pointerActions.setSubHovered({key}));
    },
    (event) => {
      dispatch(pointerActions.setSubHovered(null));
    },
    valueRef,
  );
  return {
    isSubSelected,
    isSubHovered,
  }
}

export default {
  use3DParts,
  usePointer,
  useSubPointer,
}
