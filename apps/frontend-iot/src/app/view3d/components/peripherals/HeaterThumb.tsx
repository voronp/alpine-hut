import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
  forwardRef,
  MutableRefObject,
  useContext,
  ComponentPropsWithRef,
  RefObject,
  ReactNode,
} from 'react';

import { HeaterProps } from './PeripheralProps'
import {Control} from "@babylonjs/gui";
import {Rectangle} from 'react-babylonjs';

export function HeaterThumb(props: HeaterProps) {
  return <stackPanel
    name={`stack-p-h-${props.ID}`}
    isVertical={false}
    verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
    horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
    height={'30px'}
  >
    <textBlock
      name={`label-p-h-name-${props.ID}`}
      text={props.Name}
      textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
      width={'200px'}
    />
    {
      props.IsActive ?
        <rectangle
          key={`warming-${props.ID}`}
          background={'#FF0000'}
          cornerRadius={6}
          alpha={0.5}
          width={'100px'}
        >
          <textBlock
            name={`label-p-h-warming-${props.ID}`}
            text="Warming"
            color={'#0000FF'}
          />
        </rectangle> :
        <rectangle
          key={`off-${props.ID}`}
          background={'#999999'}
          cornerRadius={6}
          alpha={0.5}
          width={'100px'}
        >
          <textBlock
            name={`label-p-h-off-${props.ID}`}
            text="Off"
            color={'#0000FF'}
          />
        </rectangle>
    }

  </stackPanel>

}
