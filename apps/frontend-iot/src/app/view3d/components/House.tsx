import React, { useCallback, useState, useMemo } from 'react'
import {Color3, Vector3, CSG, MeshBuilder, StandardMaterial, Scene, Mesh} from "@babylonjs/core";


import * as Earcut from 'earcut';
import {Corner, Wall, buildFromPlan} from "../utils3d";

const floor1Outer = [
  new Vector3(0, 0, 0),
  new Vector3(0, 0, 8),
  new Vector3(6, 0, 8),
  new Vector3(6, 0, 0),
];

//Holes in XoZ plane
const floor1Inner = [
  [
    new Vector3(0.2, 0, 0.2),
    new Vector3(0.2, 0, 5.4),
    new Vector3(1.9, 0, 5.4),
    new Vector3(1.9, 0, 0.2),
  ], [
    new Vector3(0.2, 0, 5.6),
    new Vector3(0.2, 0, 7.8),
    new Vector3(1.9, 0, 7.8),
    new Vector3(1.9, 0, 5.6),
  ], [
    new Vector3(2.1, 0, 0.2),
    new Vector3(2.1, 0, 7.8),
    new Vector3(5.8, 0, 7.8),
    new Vector3(5.8, 0, 0.2),
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
    <Basement scene={scene} />
    <Floor1 scene={scene}/>
    <Veranda scene={scene}/>
    </>)
}
