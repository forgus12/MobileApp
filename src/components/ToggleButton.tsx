import React from 'react';
import { isUndefined } from 'lodash';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../constants';

interface IProps {
  isEnabled: boolean;
  names: Array<string>;
  customContainerStyle?: ViewStyle;
  customToggleStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  onChange: (value: boolean) => void;
}

const ToggleButton: React.FC<IProps> = ({
  isEnabled,
  names,
  customContainerStyle,
  customToggleStyle,
  customTextStyle,
  onChange,
}) => {
  const switchAnim = React.useRef(new Animated.Value(0)).current;
  const [switchToggle, setSwitchToggle] = React.useState(isEnabled);
  const [widthContainer, setWidthContainer] = React.useState(0);

  const handleSwitchToggle = React.useCallback(
    (value: boolean) => {
      setSwitchToggle(value);
    },
    [switchToggle],
  );

  React.useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: switchToggle ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(finish => {
      if (finish && !isUndefined(onChange)) onChange(switchToggle);
    });
  }, [switchToggle]);

  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, widthContainer / 2 - 4],
  });

  return (
    <View
      onLayout={event => setWidthContainer(event.nativeEvent.layout.width)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        height: 32,
        backgroundColor: '#38B8E0',
        borderRadius: SIZES.radius,
        ...customContainerStyle,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 2,
          left: 2,
          width: widthContainer / 2,
          height: '100%',
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius * 0.75,
          transform: [{ translateX }],
          ...customToggleStyle,
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleSwitchToggle(true)}
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text
          style={{
            fontFamily: switchToggle
              ? FONTFAMILY.title.bold
              : FONTFAMILY.title.regular,
            fontSize: 14,
            color: switchToggle ? COLORS.text : COLORS.white,
            ...customTextStyle,
          }}>
          {names[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleSwitchToggle(false)}
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text
          style={{
            fontFamily: !switchToggle
              ? FONTFAMILY.title.bold
              : FONTFAMILY.title.regular,
            fontSize: 14,
            color: !switchToggle ? COLORS.black : COLORS.white,
            ...customTextStyle,
          }}>
          {names[1]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButton;
