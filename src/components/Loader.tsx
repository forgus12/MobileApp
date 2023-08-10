import React from 'react';
import { ActivityIndicator } from 'react-native';

import { COLORS } from '../constants';

interface IProps {
  size?: 'large' | 'small' | number;
  colorIndicator?: string;
}

const Loader: React.FC<IProps> = ({ size, colorIndicator }) => {
  return (
    <ActivityIndicator
      size={size || 'large'}
      color={colorIndicator || COLORS.primary}
    />
  );
};

export default Loader;
