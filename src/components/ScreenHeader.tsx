import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { isUndefined } from 'lodash';
import { View, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../constants';

interface IProps {
  title: string;
  customTextStyle?: TextStyle;
  customContainerStyle?: ViewStyle;
  renderLeftButton?: () => JSX.Element;
  onPressLeftButton?: () => void;
  renderRightButton?: () => JSX.Element;
  onPressRightButton?: () => void;
}

const ScreenHeader: React.FC<IProps> = ({
  title,
  customTextStyle,
  customContainerStyle,
  renderLeftButton,
  onPressLeftButton,
  renderRightButton,
  onPressRightButton,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        ...customContainerStyle,
      }}>
      {!isUndefined(renderLeftButton) && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressLeftButton}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 46,
            height: '100%',
            left: 0,
          }}>
          {renderLeftButton()}
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontFamily: FONTFAMILY.title.black,
          fontSize: SIZES.h3,
          color: COLORS.text,
          ...customTextStyle,
        }}>
        {title}
      </Text>
      {!isUndefined(renderRightButton) && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressRightButton}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 46,
            height: '100%',
            right: 0,
          }}>
          {renderRightButton()}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScreenHeader;
