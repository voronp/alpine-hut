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
  new Vector3(5, 0, 0),
  new Vector3(5, 0, 8),
  new Vector3(1, 0, 8),
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
      door2.rotate(new Vector3(0,1,0), Math.PI/2);
      const door3 = BoxBuilder.CreateBox('door3', {
        width: 0.9,
        height: 2,
        depth: 1,
      }, scene);
      door3.position = new Vector3(0, -1.51, 3.5);
      door3.rotate(new Vector3(0,1,0), Math.PI/2);
      let res = csg.subtract(CSG.FromMesh(window));
      res = res.subtract(CSG.FromMesh(door1));
      res = res.subtract(CSG.FromMesh(door2));
      res = res.subtract(CSG.FromMesh(door3));
      const csgMeshMaterial = new StandardMaterial('material01', scene);
      csgMeshMaterial.diffuseColor = Color3.White();
      csgMeshMaterial.specularColor = Color3.Black();
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
  return <mesh ref={ref} name="floor1group" />
};

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
};

export const Veranda = ({scene}) => {
  const ref = useCallback(node => {
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
      const csgMeshMaterial = new StandardMaterial('material01', scene);
      csgMeshMaterial.diffuseColor = Color3.White();
      csgMeshMaterial.specularColor = Color3.Black();
      const mesh = res.toMesh('base', csgMeshMaterial, scene, false);
      mesh.position.y += 3;
      window1.dispose();
      window2.dispose();
      door1.dispose();
      ep.dispose();
      mesh.parent = node
      verandaFrames.forEach((point, i) => {
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
        stick.position.y += 2.6;
        stick.parent = node
      })
    }
  }, []);
  return <mesh ref={ref} name="veranda-group" >
    <extrudePolygon
      name='verandastick'
      shape={verandaStick}
      depth={2.5}
      sideOrientation= {Mesh.DOUBLESIDE}
      earcutInjection={Earcut}
      position={new Vector3(0, 3.0, 0)}
    >
    <standardMaterial name='verandastickMaterial' diffuseColor={Color3.White()} specularColor={Color3.Black()} />
    </extrudePolygon></mesh>
};

export const Base2 = ({scene}) => {

  return <extrudePolygon
    name='base2'
    earcutInjection={Earcut}
    shape={floor2Outer}
    holes={base2Holes}
    depth={0.2}
    sideOrientation= {Mesh.DOUBLESIDE}
    position={new Vector3(0, 3.2, 0)}
  >
    <standardMaterial name='basementMaterial' diffuseColor={Color3.White()} specularColor={Color3.Black()} />
  </extrudePolygon>
};

export const Floor2 = ({scene}) => {

  const ref = useCallback(node => {
    if (node) {
      const ep = MeshBuilder.ExtrudePolygon("polygon", {
        shape:floor2Outer,
        holes:floor2Inner,
        depth: 2.5,
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
      door1.position = new Vector3(2.4, -1.51, 4.7);
      substract.push(door1);
      const door2 = BoxBuilder.CreateBox('door2', {
        width: 0.8,
        height: 2,
        depth: 1,
      }, scene);
      door2.position = new Vector3(2.8, -1.51, 4.2);
      door2.rotate(new Vector3(0,1,0), Math.PI/2);
      substract.push(door2);
      const door3 = BoxBuilder.CreateBox('door3', {
        width: 0.8,
        height: 2,
        depth: 1,
      }, scene);
      door3.position = new Vector3(1.8, -1.51, 2.75);
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
      roof1.position = new Vector3(3, 2 + Math.sqrt(2), 4.5);
      roof1.rotate(new Vector3(0,0,1), Math.PI/4);
      substract.push(roof1);
      const roof2 = BoxBuilder.CreateBox('roof2', {
        width: 12,
        height: 2,
        depth: 10,
      }, scene);
      roof2.position = new Vector3(3, 2 + Math.sqrt(2), 4.5);
      roof2.rotate(new Vector3(0,0,1), -Math.PI/4);
      substract.push(roof2);
      let res;
      substract.forEach((s) => {
        res = (res || csg).subtract(CSG.FromMesh(s));
      })
      const csgMeshMaterial = new StandardMaterial('material01', scene);
      csgMeshMaterial.diffuseColor = Color3.White();
      csgMeshMaterial.specularColor = Color3.Black();
      const mesh = res.toMesh('base', csgMeshMaterial, scene, false);
      mesh.position.y += 5.7;
      substract.forEach((s) => {
        s.dispose();
      })
      ep.dispose();
      mesh.parent = node
    }
  }, []);
  return <mesh ref={ref} name="floor2group" />
};

export const Base3 = ({scene}) => {

  const ref = useCallback(node => {
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
      const csgMeshMaterial = new StandardMaterial('material01', scene);
      csgMeshMaterial.diffuseColor = Color3.White();
      csgMeshMaterial.specularColor = Color3.Black();
      const mesh = res.toMesh('base', csgMeshMaterial, scene, false);
      mesh.position.y += 5.9;
      substract.forEach((s) => {
        s.dispose();
      })
      ep.dispose();
      mesh.parent = node
    }
  }, []);
  return <mesh ref={ref} name="base3group" />
};

export const Floor3 = ({scene}) => {

  const ref = useCallback(node => {
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
      })
      const csgMeshMaterial = new StandardMaterial('material01', scene);
      csgMeshMaterial.diffuseColor = Color3.White();
      csgMeshMaterial.specularColor = Color3.Black();
      const mesh = res.toMesh('base', csgMeshMaterial, scene, false);
      mesh.position.y += 7.9;
      substract.forEach((s) => {
        s.dispose();
      })
      ep.dispose();
      mesh.parent = node
    }
  }, []);
  return <mesh ref={ref} name="floor3group" />
};

export const VerandaRoof = ({scene}) => {

  const triangle = [
    new Vector3(0,0,0),
    new Vector3(0,1,0),
    new Vector3(-3,0,0),
  ];
  triangle.push(triangle[0]);
  const ref = useCallback(node => {
    if(node) {
      const extruded = MeshBuilder.ExtrudeShape("ext", {
        shape: triangle,
        path: [
          new Vector3(0,0,0),
          new Vector3(0,0,8),
        ],
        cap: Mesh.CAP_ALL,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene);
      const csgMeshMaterial = new StandardMaterial('material02', scene);
      csgMeshMaterial.diffuseColor = Color3.White();
      csgMeshMaterial.specularColor = Color3.Black();
      extruded.material = csgMeshMaterial;
      extruded.position.y += 3;
      extruded.parent = node;

      const rshape = [
        new Vector3(-3.8,-0.8/3, 0),
        new Vector3(0,1,0),
        new Vector3(0,1.2,0),
        new Vector3(-3.8,-0.8/3+0.2,0),
      ];
      rshape.push(rshape[0]);
      const roof = MeshBuilder.ExtrudeShape("roof-ver", {
        shape: rshape,
        path: [
          new Vector3(0,0,-0.8),
          new Vector3(0,0,8.8),
        ],
        cap: Mesh.CAP_ALL,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene);
      const roofMaterial = new StandardMaterial('material03', scene);
      roofMaterial.diffuseColor = Color3.White();
      roofMaterial.specularColor = Color3.Black();
      roof.material = roofMaterial;
      roof.position.y += 3;
      roof.parent = node
    }
  }, []);

  return <mesh ref={ref} name="veranda-roof-group" />
};

export const MainRoof = ({scene}) => {

  const triangle = [
    new Vector3(0,0,0),
    new Vector3(0,1,0),
    new Vector3(-3,0,0),
  ];
  triangle.push(triangle[0]);
  const ref = useCallback(node => {
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
      const roof = MeshBuilder.ExtrudePolygon("main-roof", {
        shape:rshape,
        depth: 9.6,
        sideOrientation: Mesh.DOUBLESIDE,
      }, scene, Earcut);
      const roofMaterial = new StandardMaterial('material03', scene);
      roofMaterial.diffuseColor = Color3.White();
      roofMaterial.specularColor = Color3.Black();
      roof.material = roofMaterial;
      roof.rotate(new Vector3(1,0,0), -Math.PI/2);
      roof.position.y += 4.7;
      roof.position.z -= 0.8;
      roof.parent = node
    }
  }, []);

  return <mesh ref={ref} name="veranda-roof-group" />
};

export function House({scene}) {
  return (<>
    <standardMaterial name="homemat" diffuseColor={Color3.FromInts(0,0,0)} alpha={0}/>
    <Basement scene={scene} />
    <Floor1 scene={scene}/>
    <Base2 scene={scene} />
    <Floor2 scene={scene} />
    <Base3 scene={scene} />
    <Floor3 scene={scene} />
    <Veranda scene={scene}/>
    <VerandaRoof scene={scene}/>
    <MainRoof scene={scene}/>
    </>)
}
