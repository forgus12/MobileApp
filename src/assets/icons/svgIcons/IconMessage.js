import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

const IconMessage = ({ color = '#68213D', style }) => {
  return (
    <View style={style}>
      <Svg width="20" height="20" viewBox="0 0 20 20">
        <Path
          d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM7 9H5V7H7V9ZM11 9H9V7H11V9ZM15 9H13V7H15V9Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default IconMessage;
