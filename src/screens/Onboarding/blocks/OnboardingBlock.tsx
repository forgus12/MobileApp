import React from 'react';
import { SvgUri } from 'react-native-svg';
import { View, Text } from 'react-native';

import { OnboardingsArrayI } from '../../../slices/onboardingSlice';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

const OnboardingBlock: React.FC<OnboardingsArrayI> = ({ title, description, textButton, imageSrc }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.width,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SvgUri width="240" height="100%" uri={imageSrc} />
      </View>
      <Text
        style={{
          marginBottom: 10,
          fontFamily: FONTFAMILY.title.black,
          fontSize: SIZES.h2,
          lineHeight: 22,
          color: COLORS.white,
        }}>
        {'Ваш личный помощник'}
      </Text>
      <Text
        style={{
          marginBottom: 40,
          fontFamily: FONTFAMILY.text.regular,
          fontSize: SIZES.body4,
          lineHeight: 16,
          color: COLORS.white,
          textAlign: 'center',
          opacity: 0.7,
        }}>
        {`Визитка запишет онлайн\n и напомнит о визите`}
      </Text>
    </View>
  );
};

export default OnboardingBlock;
