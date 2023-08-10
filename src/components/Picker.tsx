import React from 'react';
import { isUndefined } from 'lodash';
import { View, Animated, ViewStyle, FlatList } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../constants';

const ITEM_SIZE = 40;
const ITEM_SPACING = (176 - ITEM_SIZE) / 2;
const POSITION = (216 - ITEM_SIZE) / 2;

interface ItemsI {
  label?: string;
  value: number;
}

interface IProps {
  initialValue?: ItemsI | any;
  items: Array<ItemsI> | Array<any>;
  customContainerStyle?: ViewStyle;
  onChangeValue?: (value: ItemsI | any) => void;
}

const Picker: React.FC<IProps> = ({ initialValue, items, customContainerStyle, onChangeValue }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const refFlatList = React.useRef<FlatList>(null);

  const getItemLayout = React.useCallback(
    (data: any, index: number) => {
      return { length: ITEM_SIZE, offset: ITEM_SIZE * index, index };
    },
    [items],
  );

  const getIndexPrevEl = React.useCallback(() => {
    let index;
    if (items[0].label) {
      index = items.findIndex(el => el.label === initialValue?.label);
    } else {
      index = items.findIndex(el => el === initialValue);
    }

    return index === -1 ? 0 : Number(index);
  }, [initialValue]);

  const renderItem = React.useCallback(
    ({ item, index }: { item: ItemsI | any; index: number }) => {
      const inputRange = [
        (index - 1.5) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
        (index + 1.5) * ITEM_SIZE,
      ];

      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0.65, 0.8, 1, 0.8, 0.65],
      });

      const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.45, 0.5, 1, 0.5, 0.45],
      });

      const translateY = scrollY.interpolate({
        inputRange,
        outputRange: [-7, 0, 0, 0, 7],
      });

      return (
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: ITEM_SIZE,
            transform: [{ scale }, { translateY }],
            opacity,
          }}>
          <Animated.Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: 23,
              color: COLORS.text,
            }}>
            {item?.label || item}
          </Animated.Text>
        </Animated.View>
      );
    },
    [items],
  );

  React.useEffect(() => {
    const indexPrevEl = getIndexPrevEl();

    refFlatList.current?.scrollToIndex({ animated: true, index: indexPrevEl });
    !isUndefined(onChangeValue) && onChangeValue(items[indexPrevEl]);
  }, []);

  return React.useMemo(
    () => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          height: 216,
          backgroundColor: COLORS.backgroundPicker,
          ...customContainerStyle,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.backgroundPicker,
            zIndex: 999,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.backgroundPicker,
            zIndex: 999,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            height: ITEM_SIZE,
            width: SIZES.width,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: COLORS.grayBlue,
            top: POSITION + 2,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 20,
          }}>
          <Animated.FlatList
            ref={refFlatList}
            data={items}
            keyExtractor={(item, index) => index.toString()}
            snapToInterval={ITEM_SIZE}
            decelerationRate="normal"
            initialNumToRender={100}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            pagingEnabled={true}
            bounces={false}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } },
                },
              ],
              { useNativeDriver: true },
            )}
            onMomentumScrollEnd={e => {
              const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_SIZE);
              !isUndefined(onChangeValue) && onChangeValue(items[index]);
            }}
            contentContainerStyle={{
              paddingVertical: ITEM_SPACING,
            }}
            style={{ flexGrow: 0, width: '100%' }}
          />
        </View>
      </View>
    ),
    [items],
  );
};

export default Picker;
