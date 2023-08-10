import React from 'react';
import { useSelector } from 'react-redux';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import { Text, View, Animated, TouchableOpacity, LayoutChangeEvent } from 'react-native';

import { NavigationType } from '../../../../navigation/MainStackNavigator';
import { BusinessCardsI } from '../../../../slices/myBusinessCardSlice';
import { useFetchBusinessCards } from '../../hooks/useFetchBusinessCards';
import { useCreateSpecialist } from '../../hooks/useCreateSpecialist';
import { RootState } from '../../../../store';
import { WrapperAsyncRequest } from '../../../../layouts';
import { CustomButton } from '../../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../../constants';

import BusinessCardBlock from './BusinessCardBlock';
import { APIStatus } from '../../../../lib/axiosAPI';

interface IProps {
  navigation: NavigationType;
}

const SelectBusinessCardBlock: React.FC<IProps> = ({ navigation }) => {
  const { fetch: fetchBusinessCards, status } = useFetchBusinessCards();
  const { fetch: createSpecialist, status: statusSpecialist } = useCreateSpecialist();
  const { businessCards } = useSelector((s: RootState) => s?.myBusinessCard);
  const { userData } = useSelector((s: RootState) => s?.personalData);
  const scrollYIndex = React.useRef(new Animated.Value(0)).current;
  const scrollYIAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState<number>(0);
  const [cards, setCards] = React.useState<BusinessCardsI[] | undefined>([]);
  const [widthContainer, setWidthContainer] = React.useState<number>(0);
  const [heightContainer, setHeightContainer] = React.useState<number>(0);

  const RATIO = 288 / 182;
  const CARD_HEIGHT = widthContainer / RATIO + widthContainer / 182;

  React.useEffect(() => {
    if (statusSpecialist === APIStatus.Success) navigation.navigate('MyServices');
  }, [statusSpecialist]);

  const handleOnPress = () => {
    if (cards) {
      // setBackgroundImage();
      createSpecialist(cards[index]);
    }
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;

    setWidthContainer(width);
    setHeightContainer(height);
  };

  const setActiveIndex = React.useCallback((activeIndex: number) => {
    setIndex(activeIndex);
    scrollYIndex.setValue(activeIndex);
  }, []);

  React.useEffect(() => {
    fetchBusinessCards();
  }, []);

  React.useEffect(() => {
    businessCards?.data && setCards(businessCards?.data);
  }, [businessCards?.data]);

  React.useEffect(() => {
    if (businessCards?.data && cards && index > cards.length - 5) {
      const newCards = [...cards, ...businessCards?.data];
      setCards(newCards);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollYIAnimated, {
      toValue: scrollYIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding * 1.6,
        paddingHorizontal: SIZES.padding * 1.6,
      }}>
      <View
        style={{
          marginTop: SIZES.margin * 0.8,
          marginBottom: SIZES.margin * 6,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.gray,
          }}>
          Выберите шаблон визитки
        </Text>
      </View>
      <WrapperAsyncRequest status={status}>
        <View
          style={{
            flex: 1,
            marginBottom: SIZES.margin * 1.6,
            width: '100%',
            height: '100%',
          }}
          onLayout={onLayout}>
          <FlingGestureHandler
            key="up"
            direction={Directions.UP}
            onHandlerStateChange={ev => {
              if (ev.nativeEvent.state === State.END) {
                if (index === 0) {
                  return;
                }
                setActiveIndex(index - 1);
              }
            }}>
            <FlingGestureHandler
              key="down"
              direction={Directions.DOWN}
              onHandlerStateChange={ev => {
                if (ev.nativeEvent.state === State.END) {
                  if (cards && index === cards.length - 1) {
                    return;
                  }
                  setActiveIndex(index + 1);
                }
              }}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}>
                {cards &&
                  cards.map((item, i) => {
                    const inputRange = [i - 1, i, i + 1];
                    const translateY = scrollYIAnimated.interpolate({
                      inputRange,
                      outputRange: [-(heightContainer - CARD_HEIGHT) / 4, 0, -(heightContainer - CARD_HEIGHT) / 4],
                    });
                    const opacity = scrollYIAnimated.interpolate({
                      inputRange,
                      outputRange: [1, 1, 0],
                    });
                    return (
                      <Animated.View
                        pointerEvents={i >= index && i <= index + 4 ? 'box-none' : 'none'}
                        key={String(i)}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          height: CARD_HEIGHT,
                          backgroundColor: COLORS.white,
                          borderTopWidth: 2,
                          borderTopColor: COLORS.white,
                          transform: [{ translateY }],
                          opacity: opacity,
                          zIndex: cards.length - i,
                        }}>
                        <TouchableOpacity
                          activeOpacity={index == i ? 1 : 0.8}
                          onPress={() => {
                            setActiveIndex(i);
                          }}>
                          <BusinessCardBlock {...item} />
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  })}
              </View>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </View>
        <CustomButton onPress={handleOnPress} label={'Нравится эта'} type="primary" status={statusSpecialist} />
      </WrapperAsyncRequest>
    </View>
  );
};

export default SelectBusinessCardBlock;
