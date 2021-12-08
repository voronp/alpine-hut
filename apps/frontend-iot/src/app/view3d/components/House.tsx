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
import { usePointer } from '../visualHooks';

import * as Earcut from 'earcut';
import {Corner, Wall, buildFromPlan} from "../utils3d";
import {selectHovered, selectSelected} from "../../pointer.slice";
import roof1Texture from '@assets/textures/TexturesCom_RooftilesTiles0005_1_seamless_S.jpg';
import floor1Diff from '@assets/textures/TexturesCom_Wood_SidingOutdoor6_2x2_512_albedo.jpg';
import floor1Normal from '@assets/textures/TexturesCom_Wood_SidingOutdoor6_2x2_512_normal.jpg';
import wall1Normal from '@assets/textures/TexturesCom_Wood_SidingOutdoor6_2x2_512_normal.jpg';
import wall1Diff from '@assets/textures/TexturesCom_WoodPlanksClean0087_1_seamless_S.jpg';
import floor2Diff from '@assets/textures/TexturesCom_Wood_ParquetStrip6_512_albedo.jpg';
import floor2Rough from '@assets/textures/TexturesCom_Wood_ParquetStrip6_512_roughness.jpg';
import scifiDiff from '@assets/textures/TexturesCom_Scifi_Panel_512_albedo.jpg';
import scifiNormal from '@assets/textures/TexturesCom_Scifi_Panel_512_normal.jpg';
import brickDiff from '@assets/textures/TexturesCom_Wall_BrickRed1_2.5x2.5_512_albedo.jpg';
import brickNormal from '@assets/textures/TexturesCom_Wall_BrickRed1_2.5x2.5_512_normal.jpg';
import EnvTexture from '@assets/textures/TexturesCom_HDRPanorama182_1K_hdri_sphere_tone.jpg';
import {SceneContext} from "react-babylonjs";
import {usePeripheralGroupsBy3DPartLazyQuery} from "@home/data-access";
import TreeNode from "primereact/components/treenode/TreeNode";
import {Object3DReference} from "./Object3DReference";
import { PeripheralGroupInfo } from './PeripheralGroupInfo';
// counter clock vice???
const floor1Outer = [
  new Vector3(6, 0, 0),
  new Vector3(6, 0, 8),
  new Vector3(0, 0, 8),
  new Vector3(0, 0, 0),
];

//Holes in XoZ plane
const floor1Inner = [
  [
    new Vector3(1.9, 0, 0.2),
    new Vector3(1.9, 0, 5.4),
    new Vector3(0.2, 0, 5.4),
    new Vector3(0.2, 0, 0.2),
  ], [
    new Vector3(1.9, 0, 5.6),
    new Vector3(1.9, 0, 7.8),
    new Vector3(0.2, 0, 7.8),
    new Vector3(0.2, 0, 5.6),
  ], [
    new Vector3(5.8, 0, 0.2),
    new Vector3(5.8, 0, 7.8),
    new Vector3(2.1, 0, 7.8),
    new Vector3(2.1, 0, 0.2),
  ]
];

const basementOuter = [
  new Vector3(0, 0, 0),
  new Vector3(0, 0, 8),
  new Vector3(6, 0, 8),
  new Vector3(6, 0, 0),
];

const basementVerandaOuter = [
  new Vector3(-3, 0, 0),
  new Vector3(-3, 0, 8),
  new Vector3(0, 0, 8),
  new Vector3(0, 0, 0),
];

const verandaOuter = [
  new Vector3(0, 0, 2.2),
  new Vector3(0, 0, 2),
  new Vector3(-3, 0, 2),
  new Vector3(-3, 0, 8),
  new Vector3(0, 0, 8),
  new Vector3(0, 0, 7.8),
  new Vector3(-2.8, 0, 7.8),
  new Vector3(-2.8, 0, 2.2),
];
const verandaStick = [
  new Vector3(-3, 0, 0),
  new Vector3(-3, 0, 0.2),
  new Vector3(-2.8, 0, 0.2),
  new Vector3(-2.8, 0, 0),

];
const verandaFrames = [
  new Vector3(-2.9, 0, 2.7),
  new Vector3(-2.9, 0, 4),
  new Vector3(-2.9, 0, 5.3),
  new Vector3(-2.9, 0, 6.6),
  new Vector3(-2.9, 0, 7.9),
  new Vector3(-1.5, 0, 7.9),
];


const floor2Outer = [
  new Vector3(6, 0, 0),
  new Vector3(6, 0, 8),
  new Vector3(0, 0, 8),
  new Vector3(0, 0, 0),
];

//Holes in XoZ plane
const floor2Inner = [
  [
    new Vector3(5.8, 0, 0.2),
    new Vector3(5.8, 0, 3.2),
    new Vector3(2.1, 0, 3.2),
    new Vector3(2.1, 0, 0.2),
  ], [
    new Vector3(5.8, 0, 3.4),
    new Vector3(5.8, 0, 7.8),
    new Vector3(3.1, 0, 7.8),
    new Vector3(3.1, 0, 3.4),
  ],
  [
    new Vector3(1.9, 0, 0.2),
    new Vector3(1.9, 0, 3.4),
    new Vector3(2.9, 0, 3.4),
    new Vector3(2.9, 0, 4.6),
    new Vector3(0.2, 0, 4.6),
    new Vector3(0.2, 0, 0.2),
  ],
  [
    new Vector3(0.2, 0, 4.8),
    new Vector3(0.9, 0, 4.8),
    new Vector3(0.9, 0, 5.8),
    new Vector3(0.2, 0, 5.8),
  ],
  [
    new Vector3(1, 0, 4.8),
    new Vector3(2.9, 0, 4.8),
    new Vector3(2.9, 0, 7.8),
    new Vector3(1, 0, 7.8),
  ],
  [
    new Vector3(0.2, 0, 5.9),
    new Vector3(0.9, 0, 5.9),
    new Vector3(0.9, 0, 7.8),
    new Vector3(0.2, 0, 7.8),
  ],
];

const base2Holes = [
  [
    new Vector3(0.2, 0, 0.2),
    new Vector3(1.9, 0, 0.2),
    new Vector3(1.9, 0, 1.8),
    new Vector3(0.2, 0, 1.8),
  ],
];

const floor3Outer = [
  new Vector3(4.98, 0, 0),
  new Vector3(4.98, 0, 7.98),
  new Vector3(1, 0, 7.98),
  new Vector3(1, 0, 0),
];

const floor3Inner = [
  [
    new Vector3(4.9, 0, 0.2),
    new Vector3(4.9, 0, 7.8),
    new Vector3(1.1, 0, 7.8),
    new Vector3(1.1, 0, 0.2),
  ],
];

const meshIds = {
  floor1: 'floor1group',
  basement: 'basementwall',
  basementVeranda: 'basementVeranda',
  veranda: 'veranda-group',
  basement2: 'base2',
  floor2: 'floor2group',
  basement3: 'base3group',
  floor3: 'floor3group',
  verandaRoof: 'veranda-roof-group',
  mainRoof: 'main-roof-group',
  fireplace: 'fireplace',
};

const viewParts = {
  floor1: 'floor1Part',
  floor2: 'floor2Part',
  floor3: 'floor3Part',
  veranda: 'verandaPart',
  fireplace: 'fireplacePart',
};

const selectPartMap = {
  [meshIds.floor1]: viewParts.floor1,
  [meshIds.floor2]: viewParts.floor2,
  [meshIds.floor3]: viewParts.floor3,
  [meshIds.basement]: viewParts.floor1,
  [meshIds.basement2]: viewParts.floor2,
  [meshIds.basement3]: viewParts.floor3,
  [meshIds.veranda]: viewParts.veranda,
  [meshIds.basementVeranda]: viewParts.veranda,
  [meshIds.verandaRoof]: viewParts.veranda,
  [meshIds.mainRoof]: viewParts.floor3,
  [meshIds.fireplace]: viewParts.fireplace,
};

const selectPartConfig = {
  [viewParts.floor1]: {
    hide: [meshIds.floor3, meshIds.floor2, meshIds.mainRoof, meshIds.basement2, meshIds.basement3],
    highlight: [meshIds.basement],
  },
  [viewParts.floor2]: {
    hide: [meshIds.floor3, meshIds.mainRoof, meshIds.basement3],
    highlight: [meshIds.basement2],
  },
  [viewParts.floor3]: {
    hide: [meshIds.mainRoof],
    highlight: [meshIds.basement3],
  },
  [viewParts.veranda]: {
    hide: [meshIds.verandaRoof],
    highlight: [meshIds.basementVeranda],
  },
  [viewParts.fireplace]: {
    hide: [meshIds.floor3, meshIds.floor2, meshIds.mainRoof, meshIds.basement2, meshIds.basement3],
    highlight: [meshIds.fireplace],
  },
};

export const woodSidingMaterial = ({scene, wAng=null, uScale=null, vScale=null}) => {
  const csgMeshMaterial = new StandardMaterial('material'+(Math.random()*1000).toFixed(0), scene);
  csgMeshMaterial.bumpTexture = new Texture(wall1Normal, scene);
  csgMeshMaterial.diffuseTexture = new Texture(wall1Diff, scene);
  csgMeshMaterial.invertNormalMapY = true;
  const vRatio = 1.6;
  if (wAng !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).wAng = wAng;
    (csgMeshMaterial.bumpTexture as Texture).wAng = wAng;
  }
  if (uScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).uScale = uScale;
    (csgMeshMaterial.bumpTexture as Texture).uScale = uScale;
  }
  if (vScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).vScale = vScale * vRatio;
    (csgMeshMaterial.bumpTexture as Texture).vScale = vScale;
  } else {
    (csgMeshMaterial.diffuseTexture as Texture).vScale = vRatio;
  }
  csgMeshMaterial.specularColor = Color3.FromInts(55, 55, 0);
  return csgMeshMaterial
};

export const woodFloorMaterial = ({scene, wAng=null, uScale=null, vScale=null}) => {
  const csgMeshMaterial = new StandardMaterial('material'+(Math.random()*1000).toFixed(0), scene);
  csgMeshMaterial.bumpTexture = new Texture(floor1Normal, scene);
  csgMeshMaterial.diffuseTexture = new Texture(floor1Diff, scene);
  csgMeshMaterial.invertNormalMapY = true;
  if (wAng !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).wAng = wAng;
    (csgMeshMaterial.bumpTexture as Texture).wAng = wAng;
  }
  if (uScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).uScale = uScale;
    (csgMeshMaterial.bumpTexture as Texture).uScale = uScale;
  }
  if (vScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).vScale = vScale;
    (csgMeshMaterial.bumpTexture as Texture).vScale = vScale;
  }
  csgMeshMaterial.specularColor = Color3.FromInts(55, 55, 0);
  return csgMeshMaterial
};

export const woodParquetMaterial = ({scene, wAng=null, uScale=null, vScale=null}) => {
  const csgMeshMaterial = new PBRMetallicRoughnessMaterial('material'+(Math.random()*1000).toFixed(0), scene);
  csgMeshMaterial.metallic = 1;
  csgMeshMaterial.roughness = 1;
  csgMeshMaterial.baseTexture = new Texture(floor2Diff, scene);
  csgMeshMaterial.metallicRoughnessTexture = new Texture(floor2Rough, scene);
  if (wAng !== null) {
    (csgMeshMaterial.baseTexture as Texture).wAng = wAng;
    (csgMeshMaterial.metallicRoughnessTexture as Texture).wAng = wAng;
  }
  if (uScale !== null) {
    (csgMeshMaterial.baseTexture as Texture).uScale = uScale;
    (csgMeshMaterial.metallicRoughnessTexture as Texture).uScale = uScale;
  }
  if (vScale !== null) {
    (csgMeshMaterial.baseTexture as Texture).vScale = vScale;
    (csgMeshMaterial.metallicRoughnessTexture as Texture).vScale = vScale;
  }
  return csgMeshMaterial;
};

export const scifiMaterial = ({scene, wAng=null, uScale=null, vScale=null}) => {
  const csgMeshMaterial = new StandardMaterial('material'+(Math.random()*1000).toFixed(0), scene);
  csgMeshMaterial.bumpTexture = new Texture(scifiNormal, scene);
  csgMeshMaterial.diffuseTexture = new Texture(scifiDiff, scene);
  csgMeshMaterial.invertNormalMapY = true;
  if (wAng !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).wAng = wAng;
    (csgMeshMaterial.bumpTexture as Texture).wAng = wAng;
  }
  if (uScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).uScale = uScale;
    (csgMeshMaterial.bumpTexture as Texture).uScale = uScale;
  }
  if (vScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).vScale = vScale;
    (csgMeshMaterial.bumpTexture as Texture).vScale = vScale;
  }
  csgMeshMaterial.specularColor = Color3.FromInts(55, 55, 0);
  return csgMeshMaterial
};

export const brickMaterial = ({scene, wAng=null, uScale=null, vScale=null}) => {
  const csgMeshMaterial = new StandardMaterial('material'+(Math.random()*1000).toFixed(0), scene);
  csgMeshMaterial.bumpTexture = new Texture(brickNormal, scene);
  csgMeshMaterial.diffuseTexture = new Texture(brickDiff, scene);
  csgMeshMaterial.invertNormalMapY = true;
  if (wAng !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).wAng = wAng;
    (csgMeshMaterial.bumpTexture as Texture).wAng = wAng;
  }
  if (uScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).uScale = uScale;
    (csgMeshMaterial.bumpTexture as Texture).uScale = uScale;
  }
  if (vScale !== null) {
    (csgMeshMaterial.diffuseTexture as Texture).vScale = vScale;
    (csgMeshMaterial.bumpTexture as Texture).vScale = vScale;
  }
  csgMeshMaterial.specularColor = Color3.FromInts(55, 55, 0);
  return csgMeshMaterial
};

export const Floor1 = forwardRef<Mesh, {scene}>(({scene}, ref) => {

  const cb = useCallback(node => {
    if (node) {
      const ep = MeshBuilder.ExtrudePolygon("polygon", {
        shape:floor1Outer,
        holes:floor1Inner,
        depth: 2.7,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const csg = CSG.FromMesh(ep);
      const window = BoxBuilder.CreateBox('window1', {
        width: 2,
        height: 1.2,
        depth: 1,
      }, scene);
      window.position = new Vector3(4, -1.2, -0.2);

      const door1 = BoxBuilder.CreateBox('door1', {
        width: 0.8,
        height: 2,
        depth: 1,
      }, scene);
      door1.position = new Vector3(1, -1.71, 5.5);
      const door2 = BoxBuilder.CreateBox('door2', {
        width: 1.2,
        height: 2,
        depth: 1,
      }, scene);
      door2.position = new Vector3(2, -1.71, 4.5);
      door2.rotate(new Vector3(0,1,0), Math.PI/2);
      const door3 = BoxBuilder.CreateBox('door3', {
        width: 0.9,
        height: 2,
        depth: 1,
      }, scene);
      door3.position = new Vector3(0, -1.71, 3.5);
      door3.rotate(new Vector3(0,1,0), Math.PI/2);
      let res = csg.subtract(CSG.FromMesh(window));
      res = res.subtract(CSG.FromMesh(door1));
      res = res.subtract(CSG.FromMesh(door2));
      res = res.subtract(CSG.FromMesh(door3));
      const csgMeshMaterial = woodSidingMaterial({scene});
      const mesh = res.toMesh(meshIds.floor1, csgMeshMaterial, scene, false);
      mesh.position.y += 3.2;
      window.dispose();
      door1.dispose();
      door2.dispose();
      door3.dispose();
      ep.dispose();
      mesh.parent = node;
      (ref as MutableRefObject<Mesh>).current = mesh;
    }
  }, []);
  usePointer(meshIds.floor1, ref);
  return <mesh ref={cb} name={`${meshIds.floor1}-container`} />
});

export const Basement = forwardRef<Mesh, {scene}>(({scene}, ref) => {
  usePointer(meshIds.basement, ref);
  useEffect(() => {
    if((ref as MutableRefObject<Mesh>).current) {
      const bmesh:Mesh = (ref as MutableRefObject<Mesh>).current;
      // console.log(bmesh.getTotalIndices());
      const mat1 = brickMaterial({scene});
      const mat2 = woodParquetMaterial({scene, wAng: Math.PI/2});
      bmesh.material = new MultiMaterial('basementMultiMat', scene);
      (bmesh.material as MultiMaterial).subMaterials.push(mat2);
      (bmesh.material as MultiMaterial).subMaterials.push(mat1);
      const vcount = bmesh.getTotalVertices();

      new SubMesh(0, 0, vcount, 0, 12, bmesh);
      new SubMesh(1, 0, vcount, 12, 60, bmesh);
    }
  }, []);
  return <extrudePolygon
    ref={ref}
    name={meshIds.basement}
    earcutInjection={Earcut}
    shape={basementOuter}
    depth={0.5}
    sideOrientation= {Mesh.DOUBLESIDE}
    position={new Vector3(0, 0.5, 0)}
    faceUV={[
      new Vector4(0, 0, 6 / 2.5, 8 / 2.5),
      new Vector4(0, 0, 28 / 2.5, 0.5 / 2.5),
      new Vector4(0, 0, 0, 0),
    ]}
    wrap={true}
  />
});

export const BasementVeranda = forwardRef<Mesh, {scene}>(({scene}, ref) => {
  usePointer(meshIds.basementVeranda, ref);
  useEffect(() => {
    if((ref as MutableRefObject<Mesh>).current) {
      const bmesh:Mesh = (ref as MutableRefObject<Mesh>).current;
      const mat1 = brickMaterial({scene});
      const mat2 = woodFloorMaterial({scene, wAng: Math.PI/2});
      bmesh.material = new MultiMaterial('basementMultiMat', scene);
      (bmesh.material as MultiMaterial).subMaterials.push(mat2);
      (bmesh.material as MultiMaterial).subMaterials.push(mat1);
      const vcount = bmesh.getTotalVertices();

      new SubMesh(0, 0, vcount, 0, 12, bmesh);
      new SubMesh(1, 0, vcount, 12, 60, bmesh);
    }
  }, []);
  return <extrudePolygon
    ref={ref}
    name={meshIds.basementVeranda}
    earcutInjection={Earcut}
    shape={basementVerandaOuter}
    depth={0.5}
    sideOrientation= {Mesh.DOUBLESIDE}
    position={new Vector3(0, 0.5, 0)}
    faceUV={[
      new Vector4(0, 0, 3 / 2.5, 8 / 2.5),
      new Vector4(0, 0, 22 / 2.5, 0.5 / 2.5),
      new Vector4(0, 0, 0, 0),
    ]}
    wrap={true}
  />
});

export const Veranda = forwardRef<Mesh, {scene}>(({scene}, ref) => {
  const cb = useCallback(node => {
    if (node) {
      const ep = MeshBuilder.ExtrudePolygon("polygon", {
        shape: verandaOuter.reverse(),
        depth: 2.5,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const csg = CSG.FromMesh(ep);
      const window1 = BoxBuilder.CreateBox('window1', {
        width: 3,
        height: 1.2,
        depth: 6,
      }, scene);
      window1.position = new Vector3(-1.8, -1, 5.2);
      const window2 = BoxBuilder.CreateBox('window2', {
        width: 0.6,
        height: 1.2,
        depth: 0.5,
      }, scene);
      window2.position = new Vector3(-2.5, -1, 2.2);
      const door1 = BoxBuilder.CreateBox('door1', {
        width: 0.9,
        height: 2,
        depth: 1,
      }, scene);
      door1.position = new Vector3(-1.55, -1.51, 2);
      let res = csg.subtract(CSG.FromMesh(window1));
      res = res.subtract(CSG.FromMesh(window2));
      res = res.subtract(CSG.FromMesh(door1));
      const csgMeshMaterial = woodSidingMaterial({scene});
      const mesh = res.toMesh(meshIds.veranda, csgMeshMaterial, scene, false);
      mesh.position.y += 3;
      window1.dispose();
      window2.dispose();
      door1.dispose();
      ep.dispose();
      const sticks = verandaFrames.map((point, i) => {
        const stick = MeshBuilder.ExtrudePolygon(`veranda-stick${i}`, {
          shape: [
            new Vector3(point.x-0.1, 0, point.z-0.1),
            new Vector3(point.x-0.1, 0, point.z+0.1),
            new Vector3(point.x+0.1, 0, point.z+0.1),
            new Vector3(point.x+0.1, 0, point.z-0.1),
          ],
          depth: 1.2,
          sideOrientation: Mesh.DOUBLESIDE,
        }, scene, Earcut);
        stick.material = woodSidingMaterial({scene, wAng: Math.PI/2});
        stick.position.y += 2.6;
        return stick;
      });
      const bigStick = MeshBuilder.ExtrudePolygon(`verandastick`, {
        shape: verandaStick,
        depth: 2.5,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      bigStick.material = woodSidingMaterial({scene, wAng: Math.PI/2});
      bigStick.position = new Vector3(0, 3.0, 0);
      const mergedVeranda = Mesh.MergeMeshes([mesh, bigStick, ...sticks], true, true, undefined, false, true);
      mergedVeranda.parent = node;
      (ref as MutableRefObject<Mesh>).current = mergedVeranda;
    }
  }, []);
  usePointer(meshIds.veranda, ref);
  return <mesh ref={cb} name={`${meshIds.veranda}-container`} />;
});

export const Base2 = forwardRef<Mesh, {scene}>(({scene}, ref) => {
  usePointer(meshIds.basement2, ref);
  useEffect(() => {
    if((ref as MutableRefObject<Mesh>).current) {
      (ref as MutableRefObject<Mesh>).current.material = woodParquetMaterial({scene, wAng: Math.PI/2});
    }
  }, []);
  return <extrudePolygon
    ref={ref}
    name={meshIds.basement2}
    earcutInjection={Earcut}
    shape={floor2Outer}
    holes={base2Holes}
    depth={0.2}
    sideOrientation= {Mesh.DOUBLESIDE}
    position={new Vector3(0.01, 3.21, 0.01)}
    scaling-z={0.98}
    scaling-x={0.98}
  />
});

export const Floor2 = forwardRef<Mesh, {scene}>(({scene}, ref) => {
  const cb = useCallback(node => {
    if (node) {
      const ep = MeshBuilder.ExtrudePolygon("polygon", {
        shape:floor2Outer,
        holes:floor2Inner,
        depth: 2.7,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const csg = CSG.FromMesh(ep);
      const substract = [];
      [
        new Vector3(4.3, -1, -0.2),
        new Vector3(4.3, -1, 7.7),
        new Vector3(1.7, -1, 7.7),
      ].forEach((v, i) => {
        const window = BoxBuilder.CreateBox(`f2-window${i}`, {
          width: 1.2,
          height: 1.2,
          depth: 1,
        }, scene);
        window.position = v;
        substract.push(window);
      });
      const door1 = BoxBuilder.CreateBox('door1', {
        width: 0.8,
        height: 2,
        depth: 1,
      }, scene);
      door1.position = new Vector3(2.4, -1.71, 4.7);
      substract.push(door1);
      const door2 = BoxBuilder.CreateBox('door2', {
        width: 0.8,
        height: 2,
        depth: 1,
      }, scene);
      door2.position = new Vector3(2.8, -1.71, 4.2);
      door2.rotate(new Vector3(0,1,0), Math.PI/2);
      substract.push(door2);
      const door3 = BoxBuilder.CreateBox('door3', {
        width: 0.8,
        height: 2,
        depth: 1,
      }, scene);
      door3.position = new Vector3(1.8, -1.71, 2.75);
      door3.rotate(new Vector3(0,1,0), Math.PI/2);
      substract.push(door3);
      const door4 = BoxBuilder.CreateBox('door4', {
        width: 0.6,
        height: 1.8,
        depth: 1,
      }, scene);
      door4.position = new Vector3(0.55, -1.61, 4.7);
      substract.push(door4);
      const door5 = BoxBuilder.CreateBox('door5', {
        width: 1.6,
        height: 1.8,
        depth: 1,
      }, scene);
      door5.position = new Vector3(0.8, -1.61, 6.85);
      door5.rotate(new Vector3(0,1,0), Math.PI/2);
      substract.push(door5);
      const roof1 = BoxBuilder.CreateBox('roof1', {
        width: 12,
        height: 2,
        depth: 10,
      }, scene);
      roof1.position = new Vector3(3, 1.8 + Math.sqrt(2), 4.5);
      roof1.rotate(new Vector3(0,0,1), Math.PI/4);
      substract.push(roof1);
      const roof2 = BoxBuilder.CreateBox('roof2', {
        width: 12,
        height: 2,
        depth: 10,
      }, scene);
      roof2.position = new Vector3(3, 1.8 + Math.sqrt(2), 4.5);
      roof2.rotate(new Vector3(0,0,1), -Math.PI/4);
      substract.push(roof2);
      let res;
      substract.forEach((s) => {
        res = (res || csg).subtract(CSG.FromMesh(s));
      })
      const csgMeshMaterial = woodSidingMaterial({scene})
      const mesh = res.toMesh(meshIds.floor2, csgMeshMaterial, scene, false);
      mesh.position.y += 5.9;
      substract.forEach((s) => {
        s.dispose();
      })
      ep.dispose();
      mesh.parent = node;
      (ref as MutableRefObject<Mesh>).current = mesh;
    }
  }, []);
  usePointer(meshIds.floor2, ref);
  return <mesh ref={cb} name={`${meshIds.floor2}-container`} />
});

export const Base3 = forwardRef<Mesh, {scene}>(({scene}, ref) => {
  const cb = useCallback(node => {
    if (node) {
      const ep = MeshBuilder.ExtrudePolygon("base3", {
        shape:floor3Outer,
        depth: 0.2,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const csg = CSG.FromMesh(ep);
      const substract = [];
      const roof1 = BoxBuilder.CreateBox('roof1', {
        width: 12,
        height: 2,
        depth: 10,
      }, scene);
      roof1.position = new Vector3(3, 1.8 + Math.sqrt(2), 4.5);
      roof1.rotate(new Vector3(0,0,1), Math.PI/4);
      substract.push(roof1);
      const roof2 = BoxBuilder.CreateBox('roof2', {
        width: 12,
        height: 2,
        depth: 10,
      }, scene);
      roof2.position = new Vector3(3, 1.8 + Math.sqrt(2), 4.5);
      roof2.rotate(new Vector3(0,0,1), -Math.PI/4);
      substract.push(roof2);
      let res;
      substract.forEach((s) => {
        res = (res || csg).subtract(CSG.FromMesh(s));
      })
      const csgMeshMaterial = scifiMaterial({scene, wAng: Math.PI/2});
      const mesh = res.toMesh(meshIds.basement3, csgMeshMaterial, scene, false);
      mesh.position.y += 5.91;
      mesh.position.x += 0.01;
      mesh.position.z += 0.01;
      substract.forEach((s) => {
        s.dispose();
      })
      ep.dispose();
      mesh.parent = node;
      (ref as MutableRefObject<Mesh>).current = mesh;
    }
  }, []);
  usePointer(meshIds.basement3, ref);
  return <mesh ref={cb} name={`${meshIds.basement3}-container`} />
});

export const Floor3 = forwardRef<Mesh, {scene}>(({scene}, ref) => {
  const cb = useCallback(node => {
    if (node) {
      const ep = MeshBuilder.ExtrudePolygon("polygon", {
        shape:floor3Outer,
        holes: floor3Inner,
        depth: 2,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const csg = CSG.FromMesh(ep);
      const substract = [];

      const roof1 = BoxBuilder.CreateBox('roof1', {
        width: 12,
        height: 2,
        depth: 10,
      }, scene);
      roof1.position = new Vector3(3, -0.2+Math.sqrt(2), 4.5);
      roof1.rotate(new Vector3(0,0,1), Math.PI/4);
      substract.push(roof1);
      const roof2 = BoxBuilder.CreateBox('roof2', {
        width: 12,
        height: 2,
        depth: 10,
      }, scene);
      roof2.position = new Vector3(3, -0.2+Math.sqrt(2), 4.5);
      roof2.rotate(new Vector3(0,0,1), -Math.PI/4);
      substract.push(roof2);
      let res;
      substract.forEach((s) => {
        res = (res || csg).subtract(CSG.FromMesh(s));
      });
      const csgMeshMaterial = woodSidingMaterial({scene})
      const mesh = res.toMesh(meshIds.floor3, csgMeshMaterial, scene, false);
      mesh.position.y += 7.9;
      substract.forEach((s) => {
        s.dispose();
      })
      ep.dispose();
      mesh.parent = node;
      (ref as MutableRefObject<Mesh>).current = mesh;
    }
  }, []);
  usePointer(meshIds.floor3, ref);
  return <mesh ref={cb} name={`${meshIds.floor3}-container`} />
});

export const VerandaRoof = forwardRef<Mesh, {scene}>(({scene}, ref) => {

  const triangle = [
    new Vector3(0,0,0),
    new Vector3(3,0,0),
    new Vector3(3,0,1),
  ];
  triangle.push(triangle[0]);
  const cb = useCallback(node => {
    if(node) {
      const UVRatio = 2.5;
      const extruded = MeshBuilder.ExtrudePolygon("ext", {
        shape: triangle,
        depth: 8,
        sideOrientation: Mesh.DOUBLESIDE,
        faceUV: [
          new Vector4(0, 0, 3 / UVRatio, 1 / UVRatio),
          new Vector4(0, 0, 7.2 / UVRatio, 8 / UVRatio),
          new Vector4(0, 0, 3 / UVRatio, 1 / UVRatio),
        ],
        wrap: true,
      }, scene, Earcut);
      const csgMeshMaterial = woodSidingMaterial({scene});
      extruded.material = csgMeshMaterial;
      extruded.rotate(new Vector3(1, 0, 0), -Math.PI/2);
      extruded.position.y += 3;
      extruded.position.x -= 3;
      const rshape = [
        new Vector3(-3.8,-0.8/3, 0),
        new Vector3(0,1,0),
        new Vector3(0,1.2,0),
        new Vector3(-3.8,-0.8/3+0.2,0),
      ];
      rshape.push(rshape[0]);
      const roof = MeshBuilder.ExtrudeShape(meshIds.verandaRoof, {
        shape: rshape,
        path: [
          new Vector3(0,0,-0.8),
          new Vector3(0,0,8.8),
        ],
        cap: Mesh.CAP_ALL,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene);
      const roofMaterial = new StandardMaterial('materialvr03', scene);
      roofMaterial.diffuseTexture = new Texture(roof1Texture, scene);
      (roofMaterial.diffuseTexture as Texture).vScale = 14;
      (roofMaterial.diffuseTexture as Texture).uScale = 7;
      (roofMaterial.diffuseTexture as Texture).wAng = Math.PI/2;
      roofMaterial.specularColor = Color3.Black();
      roof.material = roofMaterial;
      roof.position.y += 3;
      const mergedRoof = Mesh.MergeMeshes([extruded, roof], true, true, undefined, false, true);
      mergedRoof.parent = node;
      (ref as MutableRefObject<Mesh>).current = mergedRoof;
    }
  }, []);
  usePointer(meshIds.verandaRoof, ref);
  return <mesh ref={cb} name={`${meshIds.verandaRoof}-container`} />
});

export const MainRoof = forwardRef<Mesh, {scene}>(({scene}, ref) => {

  const triangle = [
    new Vector3(0,0,0),
    new Vector3(0,1,0),
    new Vector3(-3,0,0),
  ];
  triangle.push(triangle[0]);
  const fader = useRef(new FadeInOutBehavior());
  const cb = useCallback(node => {
    if(node) {
      const rshape = [
        new Vector3(-0.6,0,-0.6),
        new Vector3(3,0,3),
        new Vector3(6.6,0,-0.6),
        new Vector3(6.6,0,-0.4),
        new Vector3(3,0,3.2),
        new Vector3(-0.6, 0,-0.4),
      ];
      rshape.push(rshape[0]);
      const roof = MeshBuilder.ExtrudePolygon(meshIds.mainRoof, {
        shape:rshape,
        depth: 9.6,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const roofMaterial = new StandardMaterial('materialmr03', scene);
      roofMaterial.diffuseTexture = new Texture(roof1Texture, scene);
      (roofMaterial.diffuseTexture as Texture).vScale = 10;
      (roofMaterial.diffuseTexture as Texture).uScale = 6;
      (roofMaterial.diffuseTexture as Texture).wAng = Math.PI/2;
      roofMaterial.specularColor = Color3.Black();
      roof.material = roofMaterial;
      roof.rotate(new Vector3(1,0,0), -Math.PI/2);
      roof.position.y += 4.7;
      roof.position.z -= 0.8;
      roof.parent = node;
      (ref as MutableRefObject<Mesh>).current = roof;
      fader.current.attach(roof);
      fader.current.fadeIn(true);
    }
  }, []);
  usePointer(meshIds.mainRoof, ref);
  return <mesh ref={cb} name={`${meshIds.mainRoof}-container`} />
});

export const Fireplace = forwardRef<Mesh, {scene, reflectOthers}>(({scene, reflectOthers}, ref) => {

  const cb = useCallback(node => {
    if(node) {
      const b1:Mesh = MeshBuilder.CreateBox('lbase', {
        width: 0.6,
        height: 0.3,
        depth: 0.3,
        faceUV: [
          new Vector4(0, 0, 0.6, 0.3),
          new Vector4(0, 0, 0.6, 0.3),
          new Vector4(0, 0, 0.3, 0.3),
          new Vector4(0, 0, 0.3, 0.3),
        ],
        wrap: true,
      }, scene);
      b1.material = brickMaterial({scene});
      const b2:Mesh = MeshBuilder.CreateBox('rbase', {
        width: 0.6,
        height: 0.3,
        depth: 0.3,
        faceUV: [
          new Vector4(0, 0, 0.6, 0.3),
          new Vector4(0, 0, 0.6, 0.3),
          new Vector4(0, 0, 0.3, 0.3),
          new Vector4(0, 0, 0.3, 0.3),
        ],
        wrap: true,
      }, scene);
      b2.position.z += 0.7;
      b2.material = brickMaterial({scene});
      const hor1:Mesh = MeshBuilder.CreateBox('hor1', {
        width: 0.7,
        height: 0.1,
        depth: 1.2,
        faceUV: [
          new Vector4(0, 0, 0.7, 0.1),
          new Vector4(0, 0, 0.7, 0.1),
          new Vector4(0, 0, 1.2 * 2, 0.1),
          new Vector4(0, 0, 1.2 * 2, 0.1),
          new Vector4(0, 0, 0.7, 1.2 * (20/32)),
        ],
        wrap: true,
      }, scene);
      hor1.position.y += 0.2;
      hor1.position.z += 0.35;
      hor1.position.x += 0.05;
      hor1.material = brickMaterial({scene});
      const fboxshape = [
        new Vector3(-0.3,0,-0.1),
        new Vector3(0.3,0,-0.1),
        new Vector3(0.3,0,0.1),
        new Vector3(-0.2,0,0.1),
        new Vector3(-0.2,0,0.6),
        new Vector3(0.3, 0,0.6),
        new Vector3(0.3, 0,0.8),
        new Vector3(-0.3, 0,0.8),
      ];
      fboxshape.push(fboxshape[0]);
      const shapeLength = fboxshape.map((v, i) => (i ? Vector3.Distance(v, fboxshape[i-1]) : 0));
      const fbox = MeshBuilder.ExtrudePolygon('firebox', {
        shape:fboxshape,
        depth: 0.6,
        sideOrientation: Mesh.DOUBLESIDE,
        faceUV: [
          new Vector4(0, 0, 0, 0),
          new Vector4(0, 0, shapeLength.reduce((acc, l) => (acc + l)), 0.6),
          new Vector4(0, 0, 0, 0),
        ],
        wrap: true,
      }, scene, Earcut);
      fbox.position.y += 0.85;
      fbox.material = brickMaterial({scene});
      const hor2:Mesh = MeshBuilder.CreateBox('hor2', {
        width: 0.7,
        height: 0.1,
        depth: 1.2,
        faceUV: [
          new Vector4(0, 0, 0.7, 0.1),
          new Vector4(0, 0, 0.7, 0.1),
          new Vector4(0, 0, 1.2 * 2, 0.1),
          new Vector4(0, 0, 1.2 * 2, 0.1),
          new Vector4(0, 0, 0.7, 1.2 * (20/32)),
        ],
        wrap: true,
      }, scene);
      hor2.position.y += 0.9;
      hor2.position.z += 0.35;
      hor2.position.x += 0.05;
      hor2.material = brickMaterial({scene});
      const airbox:Mesh = MeshBuilder.CreateBox('airbox', {
        width: 0.6,
        height: 1.4,
        depth: 0.9,
      }, scene);
      const pbr = new PBRMetallicRoughnessMaterial("airboxMat", scene);
      pbr.baseColor = new Color3(1.0, 1, 1);
      pbr.metallic = 0;
      pbr.roughness = 1.0;
      airbox.material = pbr;
      airbox.position.y += 1.65;
      airbox.position.z += 0.35;
      const tube:Mesh = MeshBuilder.CreateCylinder('tube', {
        height: 5.8,
        diameter: 0.4,
      });
      tube.position.y += 5.25;
      tube.position.z += 0.35;
      const pbr2 = new PBRMaterial("tubeMat", scene);
      pbr2.albedoColor = new Color3(1, 1, 1);
      pbr2.metallic = 0.9;
      pbr2.roughness = 0.1;
      const probe = new ReflectionProbe("satelliteProbe", 512, scene);
      probe.renderList.push(airbox);
      for (let index = 0; index < reflectOthers.length; index++) {
        if (reflectOthers[index].current)
          probe.renderList.push(reflectOthers[index].current);
      }
      pbr2.reflectionTexture = probe.cubeTexture;
      pbr2.realTimeFiltering = true;
      tube.material = pbr2;
      probe.refreshRate = 60;
      probe.attachToMesh(tube);
      tube.receiveShadows = true;
      const tube2:Mesh = MeshBuilder.CreateCylinder('tube', {
        height: 0.2,
        diameter: 0.5,
      });
      tube2.position.y += 8.05;
      tube2.position.z += 0.35;
      tube2.material = pbr2;
      tube2.receiveShadows = true;
      probe.attachToMesh(tube2);
      const mergedFireplace = Mesh.MergeMeshes([b1, b2, hor1, hor2, fbox, airbox, tube, tube2], true, true, undefined, false, true);
      mergedFireplace.receiveShadows = true;
      mergedFireplace.position.y += 0.15;
      (ref as MutableRefObject<Mesh>).current = mergedFireplace;
      mergedFireplace.parent = node;
      mergedFireplace.position.y += 0.5;
      mergedFireplace.position.z += 1.5;
      mergedFireplace.position.x += 2.35;
    }
  }, []);
  usePointer(meshIds.fireplace, ref);
  return <mesh ref={cb} name={`${meshIds.fireplace}-container`} />
});

export function House({highlightLayer}) {
  const {scene} = useContext(SceneContext);
  const partRefs = Object.values(meshIds).reduce((acc, v) => ({...acc, [v]: useRef(null)}), {});
  const selected = useSelector(selectSelected);
  const hovered = useSelector(selectHovered);
  const [selectedPart, setSelectedPart] = useState(null);
  const [getPeripheralGroupsBy3DPart, {
    called,
    loading,
    data: peripheralGroupsBy3DPart,
  }] = usePeripheralGroupsBy3DPartLazyQuery();
  const highlightMesh = (id) => {
    if(id && partRefs[id].current && highlightLayer.current && !(highlightLayer.current as HighlightLayer).hasMesh(partRefs[id].current)) {
      highlightLayer.current.addMesh(partRefs[id].current, Color3.Green());
    }
    if (!id) {
      (highlightLayer.current as HighlightLayer).removeAllMeshes();
    }
  };
  useEffect(() => {
    scene.lights.forEach((light) => {
      const sg = light.getShadowGenerator();
      if (sg) {
        sg.getShadowMap().refreshRate = 100;
        Object.values(partRefs).forEach((ref) => {
          if ((ref as MutableRefObject<Mesh>).current) {
            (ref as MutableRefObject<Mesh>).current.receiveShadows = true;
            // (sg as ShadowGenerator).addShadowCaster((ref as MutableRefObject<Mesh>).current);
          }
        })
      }
    });
  }, []);
  useEffect(() => {
    let highlighted = null;
    if (hovered && selected !== hovered) {
      highlighted = selectPartConfig[selectPartMap[hovered]].highlight;
    }
    highlightMesh(highlighted);
    if (selectedPart !== selectPartMap[selected]) {
      setSelectedPart(selectPartMap[selected]);
    }
    Object.values(meshIds).forEach((meshId) => {
      if (!partRefs[meshId].current)
        return;
      const mesh = partRefs[meshId].current as Mesh;
      if (selected && selectPartConfig[selectPartMap[selected]].hide.includes(meshId)) {
        mesh.isVisible = false;
        return;
      }
      if (hovered && selectPartConfig[selectPartMap[hovered]].hide.includes(meshId)) {
        if (mesh.subMeshes && mesh.subMeshes.length) {
          mesh.subMeshes.forEach((m) => {(m as SubMesh).getMaterial().alpha = 0.5})
        }
        mesh.material.alpha = 0.5;
        return;
      }
      if (mesh.subMeshes && mesh.subMeshes.length) {
        mesh.subMeshes.forEach((m) => {(m as SubMesh).getMaterial().alpha = 1})
      }
      mesh.isVisible = true;
      mesh.material.alpha = 1;
    })
  }, [selected, hovered]);

  useEffect(() => {
    if (selectedPart) {
      getPeripheralGroupsBy3DPart({
        variables: {
          View3DPart: selectedPart,
        }
      })
    }
  }, [selectedPart]);
  //console.log(selected, hovered);
  //const {isHovered} = usePointer('test', 'test2');
  //console.log(isHovered);
  return (<>
    <Basement ref={partRefs[meshIds.basement]} scene={scene} />
    <Floor1 ref={partRefs[meshIds.floor1]} scene={scene}/>
    <Base2 ref={partRefs[meshIds.basement2]} scene={scene} />
    <Floor2 ref={partRefs[meshIds.floor2]} scene={scene} />
    <Base3 ref={partRefs[meshIds.basement3]} scene={scene} />
    <Floor3 ref={partRefs[meshIds.floor3]} scene={scene} />
    <BasementVeranda ref={partRefs[meshIds.basementVeranda]} scene={scene} />
    <Veranda ref={partRefs[meshIds.veranda]} scene={scene}/>
    <VerandaRoof ref={partRefs[meshIds.verandaRoof]} scene={scene}/>
    <MainRoof ref={partRefs[meshIds.mainRoof]} scene={scene}/>
    <Fireplace ref={partRefs[meshIds.fireplace]} scene={scene} reflectOthers={Object.values(partRefs)} />
    {
      peripheralGroupsBy3DPart && peripheralGroupsBy3DPart.getPeripheralGroupsBy3DPart.map((v) => (
        <Object3DReference
          key={v.ID}
          ID={v.ID}
          Type={v.Object3DReference.Type}
          Config={v.Object3DReference.Config}
        >
          <PeripheralGroupInfo
            ID={v.ID}
            Type={v.Type}
            Data={v.Data}
            Description={v.Description}
            Name={v.Name}
            Peripherals={v.Peripherals}
          />
        </Object3DReference>
      ))
    }
    </>)
}
