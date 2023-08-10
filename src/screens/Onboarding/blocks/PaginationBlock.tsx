import React from 'react';
import { useSelector } from 'react-redux';
import { View, Animated } from 'react-native';

import { RootState } from '../../../store';
import { COLORS, SIZES } from '../../../constants';

interface IProps {
  slideIndex: Animated.AnimatedInterpolation;
}

const PaginationBlock: React.FC<IProps> = ({ slideIndex }) => {
  const { onboardings } = useSelector((s: RootState) => s?.onboarding);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: SIZES.padding * 1.6,
        paddingHorizontal: SIZES.padding * 1.6,
      }}>
      {onboardings?.data &&
        onboardings?.data.map((_, index) => {
          const opacity = slideIndex.interpolate({
            inputRange: [index - 1, index, index],
            outputRange: [0.25, 1, 0.25],
            extrapolate: 'clamp',
          });
          const marginRight =
            onboardings?.data && index !== onboardings?.data.length - 1
              ? SIZES.margin * 0.8
              : 0;

          return (
            <Animated.View
              key={String(index)}
              style={{
                flex: 1,
                marginRight,
                height: 4,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius * 12.5,
                opacity,
              }}
            />
          );
        })}
    </View>
  );
};

export default PaginationBlock;
