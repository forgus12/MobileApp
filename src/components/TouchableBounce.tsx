import React from 'react';
import { TouchableOpacity, Animated, ViewStyle } from 'react-native';

interface IProps {
  children?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle | any;
  onPress?: () => void;
}

const TouchableBounce: React.FC<IProps> = ({
  children,
  disabled,
  style,
  onPress,
}) => {
  const [isPressIn, setIsPressIn] = React.useState<boolean>(false);
  const stateAnimated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(stateAnimated, {
      toValue: isPressIn ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isPressIn]);

  const scale = stateAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.98],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setIsPressIn(true)}
      onPressOut={() => setIsPressIn(false)}
      onPress={onPress}
      disabled={disabled}
      style={{
        transform: [{ scale: scale }],
        ...style,
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableBounce;
