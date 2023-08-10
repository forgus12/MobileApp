import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { isUndefined } from 'lodash';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../constants';

interface IProps {
  getValue?: (value: string) => void;
  placeholder?: string;
  customContainerStyle?: ViewStyle;
  autoFocus?: boolean;
}

const SearchField: React.FC<IProps> = ({ autoFocus, getValue, placeholder, customContainerStyle }) => {
  const [value, setValue] = React.useState<string>('');
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const onChangeText = React.useCallback(
    (value: string) => {
      setValue(value);
      !isUndefined(getValue) && getValue(value);
    },
    [value],
  );

  return (
    <View
      style={{
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: isFocused ? COLORS.primary : COLORS.border,
        borderRadius: SIZES.radius,
        ...customContainerStyle,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: SIZES.margin * 1.5,
          width: 18,
          height: '100%',
        }}>
        <Svg width="18" height="18" fill="none" viewBox="0 0 18 18">
          <Path
            fill="#D4D4D4"
            d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0013 6.5 6.5 6.5 0 106.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"></Path>
        </Svg>
      </View>
      <TextInput
        placeholder={placeholder || 'Поиск'}
        placeholderTextColor={COLORS.placeholderLight}
        multiline={false}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          paddingRight: SIZES.padding * 4.8,
          fontFamily: FONTFAMILY.text.regular,
          fontSize: SIZES.body2,
          color: COLORS.text,
        }}
      />
      {value.length >= 1 && (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            width: 48,
            height: '100%',
            zIndex: 100,
          }}
          onPress={() => onChangeText('')}>
          <Svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <Path
              fill="#38B8E0"
              d="M8 0C3.576 0 0 3.576 0 8c0 4.424 3.576 8 8 8 4.424 0 8-3.576 8-8 0-4.424-3.576-8-8-8zm4 10.872L10.872 12 8 9.128 5.128 12 4 10.872 6.872 8 4 5.128 5.128 4 8 6.872 10.872 4 12 5.128 9.128 8 12 10.872z"></Path>
          </Svg>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchField;
