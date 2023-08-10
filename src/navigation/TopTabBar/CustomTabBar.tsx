import React from 'react';
import { isUndefined } from 'lodash';
import { Animated, TouchableOpacity, View } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../constants';

const CustomTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
  position,
  renderBottomContent,
  renderRightContent,
}) => {
  const [widthContainer, setWidthContainer] = React.useState<number>(0);

  const translateX = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, widthContainer / 2 - 4],
  });

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: SIZES.padding * 1.6,
          marginHorizontal: SIZES.padding * 1.6,
        }}>
        <View
          onLayout={event => setWidthContainer(event.nativeEvent.layout.width)}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 2,
            height: 32,
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
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
            }}
          />
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                activeOpacity={1}
                onLongPress={onLongPress}
                key={index}
                testID={options.tabBarTestID}
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                onPress={onPress}>
                <Animated.Text
                  style={{
                    fontFamily: isFocused ? FONTFAMILY.title.bold : FONTFAMILY.title.regular,
                    fontSize: 14,
                    color: isFocused ? COLORS.text : COLORS.white,
                  }}>
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!isUndefined(renderRightContent) && renderRightContent(state.index)}
      </View>
      {!isUndefined(renderBottomContent) && renderBottomContent()}
    </>
  );
};

export default React.memo(CustomTabBar);
