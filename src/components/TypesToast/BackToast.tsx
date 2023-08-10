import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, TouchableOpacity } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../constants';

interface IProps {
  id: string;
  message: string;
  onPress: () => void;
  onHide: (id: string) => void;
}

const BackToast: React.FC<IProps> = ({ message, id, onPress, onHide }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        onHide(id);
      }}
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.margin * 0.8,
        paddingHorizontal: SIZES.padding,
        width: SIZES.width - 16,
        height: 40,
        backgroundColor: COLORS.backgroundToast,
        borderRadius: SIZES.radius,
      }}>
      <View style={{ paddingHorizontal: SIZES.padding * 0.6 }}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="white" />
        </Svg>
      </View>
      <Text
        style={{
          flex: 1,
          marginLeft: SIZES.margin * 1.8,
          fontFamily: FONTFAMILY.text.semibold,
          fontSize: 12,
          color: COLORS.white,
        }}>
        {message}
      </Text>
    </TouchableOpacity>
  );
};

export default BackToast;
