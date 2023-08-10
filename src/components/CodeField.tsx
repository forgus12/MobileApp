import React from 'react';
import { isUndefined } from 'lodash';
import { TouchableOpacity, TextInput, View, Platform, ViewStyle, Keyboard } from 'react-native';

interface IProps {
  cellCount?: number;
  value?: string;
  customContainerStyle?: ViewStyle;
  keyboardDisabled?: boolean;
  onChangeText?: (value: string) => void;
  renderCell?: (value: string, isFocused: boolean) => JSX.Element;
}

const CodeField: React.FC<IProps> = ({
  cellCount,
  value,
  customContainerStyle,
  keyboardDisabled,
  onChangeText,
  renderCell,
}) => {
  const textInput = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      textInput.current?.blur();
      textInput.current?.focus();
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect((): any => {
    Keyboard.addListener('keyboardDidHide', () => textInput.current?.blur());

    return () => Keyboard.addListener('keyboardDidHide', () => textInput.current?.blur());
  }, []);

  return React.useMemo(
    () => (
      <>
        <TextInput
          ref={textInput}
          value={value || ''}
          onChangeText={onChangeText}
          maxLength={cellCount || 4}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          showSoftInputOnFocus={keyboardDisabled ? false : true}
          keyboardType={'numeric'}
          returnKeyType="done"
          style={{
            width: 1,
            height: 1,
            backgroundColor: 'transparent',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            ...customContainerStyle,
          }}>
          {!isUndefined(renderCell) &&
            Array(cellCount || 4)
              .fill(0)
              .map((_, index) => (
                <TouchableOpacity activeOpacity={1} onPress={() => textInput.current?.focus()} key={index}>
                  {renderCell(value && value[index] ? value[index] : '', index === value?.length && isFocused)}
                </TouchableOpacity>
              ))}
        </View>
      </>
    ),
    [value, isFocused, renderCell],
  );
};

export default CodeField;
