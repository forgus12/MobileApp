import React from 'react';
import { Text, View } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../constants';

const ListEmptyComponent: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: FONTFAMILY.text.regular,
          fontSize: SIZES.body2,
          color: COLORS.gray,
        }}>
        Ничего не найдено!
      </Text>
    </View>
  );
};

export default ListEmptyComponent;
