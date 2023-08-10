import React from 'react';
import { View, ViewStyle } from 'react-native';

import { COLORS, SIZES } from '../constants';

interface IProps {
  style?: ViewStyle;
}

const Hr: React.FC<IProps> = ({ style }) => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: COLORS.border,
        ...style,
      }}
    />
  );
};

export default Hr;
