import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from 'tamagui';

interface CircleProgressProps {
  percent: number;
}

export function CircleProgress({ percent }: CircleProgressProps) {
  const theme = useTheme();

  const calculatePartialCirclePath = (
    cx: number,
    cy: number,
    r: number,
    fillPercentage: number
  ): string => {
    const startAngle = -0.5 * Math.PI;
    const endAngle = startAngle + 2 * Math.PI * fillPercentage;
    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

    const start = [cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle)];
    const end = [cx + r * Math.cos(endAngle), cy + r * Math.sin(endAngle)];

    return `M ${start[0]} ${start[1]} A ${r} ${r} 0 ${largeArcFlag} 1 ${end[0]} ${end[1]} L ${cx} ${cy} Z`;
  };

  return (
    <View>
      <Svg height="24" width="24">
        <Circle cx="12" cy="12" r="12" fill={theme.blue6.val} />
        <Path d={calculatePartialCirclePath(12, 12, 12, percent)} fill={theme.blue9.val} />
        <Circle cx="12" cy="12" r="8" fill={theme.backgroundFocus.val} />
      </Svg>
    </View>
  );
}
