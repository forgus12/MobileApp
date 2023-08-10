import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { FlatList, Animated, StatusBar, View } from 'react-native';

import { RootState } from '../../store';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { MainLayouts, WrapperAsyncRequest } from '../../layouts';
import { COLORS, SIZES } from '../../constants';

import { NavigationBlock, OnboardingBlock, PaginationBlock } from './blocks';
import { useFetchOnboardings } from './hooks/useFetchOnboardings';

interface IProps {
  navigation: NavigationType;
}

const Onboarding: React.FC<IProps> = ({ navigation }) => {
  const { fetch: fetchOnboardings, status } = useFetchOnboardings();
  const { onboardings } = useSelector((s: RootState) => s?.onboarding);
  const [curentIndexSlide, setCurrentSlideIndex] = React.useState<number>(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatList = React.useRef<FlatList>(null);
  const slideIndex = Animated.divide(scrollX, SIZES.width);

  const viewConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 5,
  });

  const viewableOnboardingChanged = React.useRef(({ viewableItems }: any) => {
    setCurrentSlideIndex(viewableItems[0].index);
  });

  const scrollTo = React.useCallback(() => {
    if (onboardings?.data && curentIndexSlide < onboardings?.data.length - 1) {
      flatList?.current?.scrollToIndex({ index: curentIndexSlide + 1 });
    } else {
      navigation.navigate('PhoneVerification');
    }
  }, [curentIndexSlide, onboardings]);

  React.useEffect(() => {
    !onboardings?.data && fetchOnboardings();
  }, []);

  return (
    <View style={{flex:1}}>
      <LinearGradient colors={['#45BAE1', '#0F98C2']} style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor={'rgba(0, 0, 0, 0.0)'}
          // hidden={false}
          translucent
          barStyle={'light-content'}
        />

        <WrapperAsyncRequest status={status} colorIndicator={COLORS.white} fetch={fetchOnboardings}>
          {/* <PaginationBlock slideIndex={slideIndex} /> */}
          <FlatList
            ref={flatList}
            data={onboardings?.data}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => <OnboardingBlock {...item} />}
            horizontal
            pagingEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={1}
            scrollEventThrottle={200}
            decelerationRate={0}
            onViewableItemsChanged={viewableOnboardingChanged.current}
            viewabilityConfig={viewConfig.current}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          />
          <NavigationBlock
            navigation={navigation}
            curentIndexSlide={curentIndexSlide}
            moveOnNextSlide={() => scrollTo()}
          />
        </WrapperAsyncRequest>
      </LinearGradient>
    </View>
  );
};

export default Onboarding;
