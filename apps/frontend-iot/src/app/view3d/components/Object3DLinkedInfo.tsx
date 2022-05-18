import React, {
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import {
  Vector3,
} from "@babylonjs/core";
import { Control } from '@babylonjs/gui';

export interface Object3DLinkedInfoProps {
  children?: ReactNode
  position: Vector3
  offset: Vector3
  index: number
}

export function Object3DLinkedInfo(props: Object3DLinkedInfoProps) {
  const pointRef = useCallback(ref => {
    if (!lineRef.current || !objRef.current) return;
    lineRef.current.linkWithMesh(ref);
    lineRef.current.connectedControl = objRef.current;
    // bing the ui item to the 3d element
    // objRef.current.linkWithMesh(ref);
  }, []);
  const objRef = useRef(null);
  const lineRef = useRef(null);
  return (<>
    <rectangle
      isPointerBlocker={true}
      name={`linked-container`}
      alpha={1}
      adaptWidthToChildren={true}
      adaptHeightToChildren={true}
      background='white'
      cornerRadius={7}
      thickness={1}
      linkOffsetY={30}
      ref={objRef}
      verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
      top={10 + props.index * 150}
    >
      {props.children}
    </rectangle>
    <babylon-line name="linked-line" alpha={0.5} lineWidth={5} dash={[5, 10]} ref={lineRef} />
    <box
      ref={pointRef}
      name="pointConnector"
      width={0.01}
      height={0.01}
      depth={0.01}
      position-x={props.position.x + props.offset.x}
      position-y={props.position.y + props.offset.y}
      position-z={props.position.z + props.offset.z}
    />
  </>)
}
