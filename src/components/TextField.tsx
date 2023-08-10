import React from 'react';
import MaskInput from 'react-native-mask-input';
import Svg, { Path } from 'react-native-svg';
import { isUndefined } from 'lodash';
import { useFormikContext, useField } from 'formik';
import {
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
  KeyboardType,
  Keyboard,
} from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../constants';

interface IProps {
  value?: string;
  name: string;
  label: string;
  hideIconReset?: boolean;
  placeholder?: string;
  height?: number;
  customFieldStyle?: TextStyle;
  customContainerStyle?: ViewStyle;
  multiline?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardType | 'numbers-and-punctuation';
  onChangeText?: (name: string, value: string | number) => void;
  autoFocus?: boolean;
  indent?: number;
  mask?: Array<string | RegExp>;
  onScrollTo?: (value: number) => void;
}

const HEIGHT_INPUT = 56;

const TextField: React.FC<IProps> = ({
  name,
  label,
  hideIconReset,
  placeholder,
  height,
  maxLength,
  indent,
  keyboardType,
  onChangeText,
  customFieldStyle,
  customContainerStyle,
  mask,
  onScrollTo,
  ...rest
}) => {
  const refField = React.useRef<TextInput | null>(null);
  const { setFieldValue, isSubmitting }: any = useFormikContext();
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [heightContainer, setHeightContainer] = React.useState<number>(HEIGHT_INPUT);
  const stateAnimated = React.useRef(new Animated.Value(0)).current;
  const [field, meta] = useField<string>(name);

  const onLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      setHeightContainer(event.nativeEvent.layout.height);
    },
    [heightContainer],
  );

  React.useEffect(() => {
    Animated.timing(stateAnimated, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    return () => stateAnimated.setValue(0);
  }, [isFocused]);

  React.useEffect(() => {
    if (meta.error && isSubmitting && !isUndefined(onScrollTo)) {
      refField?.current?.measure((ox, oy, width, height, px, py) => {
        onScrollTo(py);
      });
    }
  }, [meta]);

  const top = stateAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [heightContainer / 2 - 12, 8],
  });

  const fontSize = stateAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 12],
  });

  return (
    <View onLayout={onLayout} style={{ marginBottom: SIZES.margin * 0.8, ...customContainerStyle }}>
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: placeholder || meta.value ? 8 : top,
          left: 16,
          zIndex: 10,
        }}>
        <Animated.Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: placeholder || meta.value ? 12 : fontSize,
            color: isFocused ? COLORS.primary : COLORS.gray,
          }}>
          {label}
        </Animated.Text>
      </Animated.View>
      <MaskInput
        ref={refField}
        value={meta.value}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholderLight}
        maxLength={maxLength || 30}
        mask={mask}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        onChangeText={(value: string) => {
          isUndefined(onChangeText) ? setFieldValue(name, value) : onChangeText(name, value);
        }}
        onEndEditing={field.onBlur(name)}
        selection={
          indent
            ? {
                start: meta.value?.length - indent,
                end: meta.value?.length - indent,
              }
            : undefined
        }
        returnKeyType="done"
        // blurOnSubmit={true}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        style={{
          includeFontPadding: false,
          margin: 0,
          padding: 0,
          paddingTop: SIZES.padding * 2.6,
          paddingRight: SIZES.padding * 4.8,
          paddingHorizontal: SIZES.padding * 1.6,
          // paddingBottom: SIZES.padding * 0.14,
          minHeight: height || HEIGHT_INPUT,
          fontFamily: FONTFAMILY.text.regular,
          fontSize: 15,
          color: COLORS.text,
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: meta.touched && meta.error ? COLORS.error : isFocused ? COLORS.primary : COLORS.border,
          borderRadius: SIZES.radius,
          textAlignVertical: 'top',
          ...customFieldStyle,
        }}
        {...rest}
      />
      {isFocused && !hideIconReset && meta?.value?.length >= 1 && (
        <TouchableOpacity
          onPress={() => setFieldValue(name, '')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            width: 48,
            height: '100%',
            zIndex: 100,
          }}>
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

export default TextField;
