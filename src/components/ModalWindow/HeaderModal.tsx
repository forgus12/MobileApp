import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../constants';

interface IProps {
  title?: string;
  onClose?: () => void;
  renderRightButton?: any;
  renderLeftButton?: any;
  onPressLeftButton?: () => void;
  onPressRightButton?: any;
}

const HeaderModal: React.FC<IProps> = ({
  title,
  onClose,
  renderRightButton,
  renderLeftButton,
  onPressLeftButton,
  onPressRightButton,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
      }}>
      {!renderLeftButton ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 46,
            height: '100%',
            left: 0,
          }}>
          <Svg width="14" height="14" fill="none" viewBox="0 0 14 14">
            <Path
              fill="#38B8E0"
              d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41z"></Path>
          </Svg>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPressLeftButton}
          activeOpacity={0.8}
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
          fontFamily: FONTFAMILY.title.semibold,
          fontSize: SIZES.h4,
          lineHeight: 18,
          color: COLORS.text,
        }}>
        {title}
      </Text>
      {!renderRightButton ? (
        null
      ) : (
        <TouchableOpacity
          onPress={onPressRightButton}
          activeOpacity={0.8}
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

export default HeaderModal;
