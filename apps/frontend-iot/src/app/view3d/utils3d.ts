import {Mesh, Scene, Vector3, VertexData} from "@babylonjs/core";

export class Corner extends Vector3 {
  constructor(x: number, y:number) {
    super(x, 0, y);
  }
}

export class Wall {
  corner:Corner
  constructor(corner:Corner) {
    this.corner = corner;
  }
}

export const buildFromPlan = function(walls:Wall[], ply:number, height:number, scene:Scene) {

  const outerData = [];
  let angle = 0;
  let direction = 0;
  let line = Vector3.Zero();
  walls[1].corner.subtractToRef(walls[0].corner, line);
  const nextLine = Vector3.Zero();
  walls[2].corner.subtractToRef(walls[1].corner, nextLine);
  const nbWalls = walls.length;
  for(let w = 0; w <= nbWalls; w++) {
    angle = Math.acos(Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));
    direction = Vector3.Cross(nextLine, line).normalize().y;
    const lineNormal = new Vector3(line.z, 0, -1 * line.x).normalize();
    line.normalize();
    outerData[(w + 1) % nbWalls] = walls[(w + 1) % nbWalls].corner.add(lineNormal.scale(ply)).add(line.scale(direction * ply/Math.tan(angle/2)));
    line = nextLine.clone();
    walls[(w + 3) % nbWalls].corner.subtractToRef(walls[(w + 2) % nbWalls].corner, nextLine);
  }

  const positions = [];
  const indices = [];

  for(let w = 0; w < nbWalls; w++) {
    positions.push(walls[w].corner.x, walls[w].corner.y, walls[w].corner.z); // inner corners base
  }

  for(let w = 0; w < nbWalls; w++) {
    positions.push(outerData[w].x, outerData[w].y, outerData[w].z); // outer corners base
  }

  for(let w = 0; w <nbWalls; w++) {
    indices.push(w, (w + 1) % nbWalls, nbWalls + (w + 1) % nbWalls, w, nbWalls + (w + 1) % nbWalls, w + nbWalls); // base indices
  }

  let currentLength = positions.length;  // inner and outer top corners
  for(let w = 0; w < currentLength/3; w++) {
    positions.push(positions[3*w]);
    positions.push(height);
    positions.push(positions[3*w + 2]);
  }

  currentLength = indices.length;
  for(let i = 0; i <currentLength/3; i++) {
    indices.push(indices[3*i + 2] + 2*nbWalls, indices[3*i + 1] + 2*nbWalls, indices[3*i] + 2*nbWalls ); // top indices
  }

  for(let w = 0; w <nbWalls; w++) {
    indices.push(w, w + 2 *nbWalls, (w + 1) % nbWalls + 2*nbWalls, w, (w + 1) % nbWalls + 2*nbWalls, (w + 1) % nbWalls); // inner wall indices
    indices.push((w + 1) % nbWalls + 3*nbWalls, w + 3 *nbWalls, w + nbWalls, (w + 1) % nbWalls + nbWalls, (w + 1) % nbWalls + 3*nbWalls, w + nbWalls); // outer wall indices
  }

  const normals = [];
  const uvs = [];

  VertexData.ComputeNormals(positions, indices, normals);
  VertexData._ComputeSides(Mesh.FRONTSIDE, positions, indices, normals, uvs);


  //Create a custom mesh
  const customMesh = new Mesh("custom", scene);

  //Create a vertexData object
  const vertexData = new VertexData();

  //Assign positions and indices to vertexData
  vertexData.positions = positions;
  vertexData.indices = indices;
  vertexData.normals = normals;
  vertexData.uvs = uvs;

  //Apply vertexData to custom mesh
  vertexData.applyToMesh(customMesh);

  return customMesh;

}
