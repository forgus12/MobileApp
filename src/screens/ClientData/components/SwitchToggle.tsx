import React from 'react';
import { Text, View, TouchableOpacity, Animated, ViewStyle, TextStyle } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

interface IProps {
  names: any;
  customContainerStyle?: ViewStyle;
  customToggleStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  getCurrentIndex?: (index: number) => void;
  setIndex: number;
}

const SwitchToggle: React.FC<IProps> = ({
  names = ['switch1', ['switch2']],
  customContainerStyle,
  customToggleStyle,
  customTextStyle,
  getCurrentIndex,
  setIndex,
}) => {
  const switchAnim = React.useRef(new Animated.Value(0)).current;
  const [switchToggle, setSwitchToggle] = React.useState<number>(0);
  const [widthContainer, setWidthContainer] = React.useState<number>(0);

  const animatedToggle = (index: number) => {
    Animated.timing(switchAnim, {
      toValue: index === 0 ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(finish => {
      if (finish) getCurrentIndex!(index);
    });
  }

  React.useEffect(() => {
    setSwitchToggle(setIndex)
    animatedToggle(setIndex)
  }, [setIndex])


  const handleSwitchToggle = (index: number) => {
    setSwitchToggle(index);
    animatedToggle(index)
  };

  const positionToggle = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, widthContainer / 2 - 2],
  });

  return (
    <View
      onLayout={event => setWidthContainer(event.nativeEvent.layout.width)}
      style={{
        flex: 1,
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
          left: positionToggle,
          width: widthContainer / 2,
          height: '100%',
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius * 0.75,
          ...customToggleStyle,
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleSwitchToggle(0)}
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: switchToggle === 0 ? '700' : '400',
            color: switchToggle === 0 ? COLORS.black : COLORS.white,
            ...customTextStyle,
          }}>
          {names[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleSwitchToggle(1)}
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: switchToggle === 1 ? '700' : '400',
            color: switchToggle === 1 ? COLORS.black : COLORS.white,
            ...customTextStyle,
          }}>
          {names[1]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchToggle;
