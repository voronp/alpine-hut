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

import { SensorProps } from './PeripheralProps'
import {Control} from "@babylonjs/gui";
import { guiStyle } from '@home/ui';

export function SensorThumb(props: SensorProps) {
  return <stackPanel
    name={`stack-pg-${props.ID}`}
    isVertical={false}
    verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
    horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
    height={'30px'}
  >
    <textBlock
      name={`label-p-s-name-${props.ID}`}
      text={props.Name}
      width={'200px'}
      textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
    />
    <textBlock
      name={`label-p-s-value-${props.ID}`}
      text={String(props.Data.Temperature.toFixed(1))+'°C'}
      width={'100px'}
      textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}
    />
  </stackPanel>

}
