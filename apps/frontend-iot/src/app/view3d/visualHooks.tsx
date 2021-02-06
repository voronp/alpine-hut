import React, {useCallback} from "react";
import {GrassProceduralTexture} from "@babylonjs/procedural-textures";
import {Space, Vector3} from "@babylonjs/core";

export function use3DParts(scene) {
  const grassMaterial = useCallback(material => {
    const texture = new GrassProceduralTexture("grass", 512, scene);
    material.diffuseTexture = texture;
    material.opacityTexture = texture;
    material.diffuseTexture.rotate = [new Vector3(1.0, 1.0, 0.5), Math.PI / 3.0, Space.LOCAL]
  }, []);


  return {grassMaterial}
}
