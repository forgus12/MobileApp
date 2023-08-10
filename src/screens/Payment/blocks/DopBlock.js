import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

const DopBlock = ({ onPress, text, textTouchable }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding * 1.4,
        position: 'relative',
        backgroundColor: COLORS.backgroundAlert,
        borderRadius: SIZES.radius,
      }}>
      <Text
        style={{
          padding: SIZES.padding * 1.6,
          color: COLORS.white,
          fontSize: SIZES.body3,
        }}>
        {text}
      </Text>
      <View
        style={{
          paddingHorizontal: SIZES.padding * 1.6,
          paddingTop: SIZES.padding * 1.2,
          paddingBottom: SIZES.padding * 1.8,
        }}>
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.h4,
              fontWeight: '600',
            }}>
            {textTouchable}
          </Text>
          <View
            style={{
              marginLeft: 10,
            }}>
            <Svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M10.25 0.75L9.1925 1.8075L12.6275 5.25H0.5V6.75H12.6275L9.185 10.1925L10.25 11.25L15.5 6L10.25 0.75Z"
                fill={COLORS.white}
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DopBlock;
