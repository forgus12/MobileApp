import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

interface IProps {
  onPress: () => void;
}

const PlusBlock: React.FC<IProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius * 6.25,
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        zIndex: 10,
      }}>
      <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <Path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
      </Svg>
    </TouchableOpacity>
  );
};

export default PlusBlock;
