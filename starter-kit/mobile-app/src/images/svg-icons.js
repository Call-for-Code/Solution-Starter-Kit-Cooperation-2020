import * as React from 'react';
import { Svg, Path } from 'react-native-svg';

export const HomeIcon = (props) => {
  const height = props.height || 40;
  const width = props.width || 40;
  const fill = props.fill || 'none';
  const stroke = props.stroke || '#000';
  const strokeWidth = props.strokeWidth || 2.5;

  return (
    <Svg height={height} width={width} viewBox='0 0 48 48'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
            d='M9,24L24,9l0,0l15,15 M27,39V27h-6v12 M11,27v12 M37,27v12 M9,39h30 M37,22v-5 M21,24.003L27,24'>
      </Path>
    </Svg>
  );
};

export const MapIcon = (props) => {
  const height = props.height || 40;
  const width = props.width || 40;
  const fill = props.fill || 'none';
  const stroke = props.stroke || '#000';
  const strokeWidth = props.strokeWidth || 2.5;

  return (
    <Svg height={height} width={width} viewBox='0 0 48 48'>
      <Path fill={fill} stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth={strokeWidth}
            d='M35,20c0,8-11,19-11,19S13,29,13,20c0-6,4.925-11,11-11S35,14,35,20z M24,16c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4 S26.209,16,24,16z'>
      </Path>
    </Svg>
  );
};
