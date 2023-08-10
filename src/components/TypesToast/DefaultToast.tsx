import React from 'react';
import { Text, View } from 'react-native';

import { COLORS, SIZES } from '../../constants';

interface IProps {
  message: string;
}

const DefaultToast: React.FC<IProps> = ({ message }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.margin * 0.8,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding * 1.3,
        width: SIZES.width - 16,
        // minHeight: 40,
        backgroundColor: COLORS.backgroundToast,
        borderRadius: SIZES.radius,
      }}>
      <Text
        style={{
          color: COLORS.white,
        }}>
        {message}
      </Text>
    </View>
  );
};

export default DefaultToast;
