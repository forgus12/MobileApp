import React from 'react';
import { View } from 'react-native';

import { SIZES, COLORS } from '../constants';

interface IProps {
  data: Array<number>;
}

const PaginationCircle: React.FC<IProps> = ({ data }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      {data.map((item, i) => (
        <View
          key={i}
          style={{
            width: 8,
            height: 8,
            backgroundColor: item ? COLORS.primary : COLORS.lightGray,
            borderRadius: 50,
            marginRight: i !== data.length - 1 ? SIZES.padding * 0.8 : 0,
          }}
        />
      ))}
    </View>
  );
};

export default PaginationCircle;
