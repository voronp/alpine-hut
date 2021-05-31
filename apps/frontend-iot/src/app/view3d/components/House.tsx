import React, { useCallback, useState, useMemo } from 'react'
import {Color3, Vector3, CSG, MeshBuilder, StandardMaterial, Scene, Mesh, Color4, BoxBuilder} from "@babylonjs/core";


import * as Earcut from 'earcut';
import {Corner, Wall, buildFromPlan} from "../utils3d";

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
  new Vector3(-3, 0, 0),
  new Vector3(-3, 0, 8),
  new Vector3(6, 0, 8),
  new Vector3(6, 0, 0),
];

const verandaOuter = [
  new Vector3(-3, 0, 2),
  new Vector3(-3, 0, 8),
  new Vector3(0, 0, 8),
  new Vector3(0, 0, 2),
];
const verandaStick = [
  new Vector3(-3, 0, 0),
  new Vector3(-3, 0, 0.2),
  new Vector3(-2.8, 0, 0.2),
  new Vector3(-2.8, 0, 0),

]
const verandaInner = [
  [
    new Vector3(-2.8, 0, 2.2),
    new Vector3(-2.8, 0, 7.8),
    new Vector3(0, 0, 7.8),
    new Vector3(0, 0, 2.2),
  ],
];

export const Floor1 = ({scene}) => {

  const ref = useCallback(node => {
    if (node) {
      const ep = MeshBuilder.ExtrudePolygon("polygon", {
        shape:floor1Outer,
        holes:floor1Inner,
        depth: 2.5,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const csg = CSG.FromMesh(ep);
      const window = BoxBuilder.CreateBox('window1', {
        width: 2,
        height: 1.2,
        depth: 1,
      }, scene);
      window.position = new Vector3(4, -1, -0.2);

      const door1 = BoxBuilder.CreateBox('door1', {
        width: 0.8,
        height: 2,
        depth: 1,
      }, scene);
      door1.position = new Vector3(1, -1.51, 5.5);
      const door2 = BoxBuilder.CreateBox('door2', {
        width: 1.2,
        height: 2,
        depth: 1,
      }, scene);
      door2.position = new Vector3(2, -1.51, 4.5);
      door2.rotate(new Vector3(0,1,0), 90)
      const door3 = BoxBuilder.CreateBox('door3', {
        width: 0.9,
        height: 2,
        depth: 1,
      }, scene);
      door3.position = new Vector3(0, -1.51, 3.5);
      door3.rotate(new Vector3(0,1,0), 90)
      let res = csg.subtract(CSG.FromMesh(window))
      res = res.subtract(CSG.FromMesh(door1))
      res = res.subtract(CSG.FromMesh(door2))
      res = res.subtract(CSG.FromMesh(door3))
      const csgMeshMaterial = new StandardMaterial('material01', scene);
      csgMeshMaterial.diffuseColor = Color3.Yellow()
      csgMeshMaterial.specularColor = Color3.Black()
      const mesh = res.toMesh('base', csgMeshMaterial, scene, false);
      mesh.position.y += 3;
      window.dispose();
      door1.dispose();
      door2.dispose();
      door3.dispose();
      ep.dispose();
      mesh.parent = node
    }
  }, []);

  //const ep = MeshBuilder.ExtrudePolygon("polygon", {shape:shape, holes:holes, depth: 2, sideOrientation: Mesh.DOUBLESIDE });

  return <mesh ref={ref} name="eff" />
  /*
  return <extrudePolygon
    name='floor1wall'
    holes={floor1Inner}
    shape={floor1Outer}
    depth={2.5}
    sideOrientation= {Mesh.DOUBLESIDE}
    earcutInjection={Earcut}
    position={new Vector3(0, 3.0, 0)}
  >
    <standardMaterial name='floor1Material' diffuseColor={Color3.White()} specularColor={Color3.Black()} />
  </extrudePolygon>
   */
}

export const Basement = ({scene}) => {

  return <extrudePolygon
    name='basementwall'
    earcutInjection={Earcut}
    shape={basementOuter}
    depth={0.5}
    sideOrientation= {Mesh.DOUBLESIDE}
    position={new Vector3(0, 0.5, 0)}
  >
    <standardMaterial name='basementMaterial' diffuseColor={Color3.Gray()} specularColor={Color3.Yellow()} />
  </extrudePolygon>
}

export const Veranda = ({scene}) => {

  return <><extrudePolygon
    name='verandawall'
    holes={verandaInner}
    shape={verandaOuter}
    depth={2.5}
    sideOrientation= {Mesh.DOUBLESIDE}
    earcutInjection={Earcut}
    position={new Vector3(0, 3.0, 0)}
  >
    <standardMaterial name='verandaMaterial' diffuseColor={Color3.White()} specularColor={Color3.Black()} />
  </extrudePolygon>
    <extrudePolygon
      name='verandastick'
      shape={verandaStick}
      depth={2.5}
      sideOrientation= {Mesh.DOUBLESIDE}
      earcutInjection={Earcut}
      position={new Vector3(0, 3.0, 0)}
    >
    <standardMaterial name='verandastickMaterial' diffuseColor={Color3.White()} specularColor={Color3.Black()} />
</extrudePolygon></>
}


export function House({scene}) {
  return (<>
    <standardMaterial name="homemat" diffuseColor={Color3.FromInts(0,0,0)} alpha={0}/>
    <Basement scene={scene} />
    <Floor1 scene={scene}/>
    <Veranda scene={scene}/>
    </>)
}
