import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { useField, useFormikContext } from 'formik';
import { Text, View, ScrollView, TouchableOpacity, Animated, Image, Easing } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { CustomButton } from '../../../components';

interface IProps {
  name: string;
  closeModal: () => void;
}

const SmartGraphModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField<any>(name);
  const [widthContainer, setWidthContainer] = React.useState<number>(0);
  const [chooseStatus, setChooseStatus] = React.useState<boolean>(meta.value);

  const stateAnimated = React.useRef(new Animated.Value(0)).current;
  const stateAnimated2 = React.useRef(new Animated.Value(0)).current;

  const translateCard1state = React.useRef(new Animated.Value(0)).current;
  const translateCard2state = React.useRef(new Animated.Value(0)).current;
  const translateCard3state = React.useRef(new Animated.Value(0)).current;
  const borderColorAgenda1state = React.useRef(new Animated.Value(0)).current;
  const borderColorAgenda2state = React.useRef(new Animated.Value(0)).current;
  const backgroundColorTimeBlock1state = React.useRef(new Animated.Value(0)).current;
  const colorTextTimeBlock1state = React.useRef(new Animated.Value(0)).current;
  const backgroundColorTimeBlock2state = React.useRef(new Animated.Value(0)).current;
  const colorTextTimeBlock2state = React.useRef(new Animated.Value(0)).current;
  const opacityFingerstate = React.useRef(new Animated.Value(0)).current;
  const opacityAlertstate = React.useRef(new Animated.Value(0)).current;

  const handleOnPress = () => {
    setFieldValue(name, chooseStatus);
    closeModal();
  };

  const runAnimation = () => {
    stateAnimated.setValue(0);
    stateAnimated2.setValue(0);

    translateCard1state.setValue(0);
    translateCard2state.setValue(0);
    translateCard3state.setValue(0);
    borderColorAgenda1state.setValue(0);
    borderColorAgenda2state.setValue(0);
    backgroundColorTimeBlock1state.setValue(0);
    colorTextTimeBlock1state.setValue(0);
    backgroundColorTimeBlock2state.setValue(0);
    colorTextTimeBlock2state.setValue(0);
    opacityFingerstate.setValue(0);
    opacityAlertstate.setValue(0);

    Animated.parallel([
      Animated.timing(translateCard1state, {
        toValue: 1,
        duration: 1100,
        delay: 1000,
        useNativeDriver: true,
        easing: Easing.bezier(0.01, 0.06, 0.02, 0.96),
      }),

      Animated.timing(translateCard2state, {
        toValue: 1,
        duration: 1100,
        delay: 1700,
        useNativeDriver: true,
        easing: Easing.bezier(0.01, 0.06, 0.02, 0.96),
      }),

      Animated.timing(translateCard3state, {
        toValue: 1,
        duration: 1100,
        delay: 3800,
        useNativeDriver: true,
        easing: Easing.bezier(0.01, 0.06, 0.02, 0.96),
      }),

      Animated.timing(borderColorAgenda1state, {
        toValue: 1,
        duration: 500,
        delay: 500,
        useNativeDriver: false,
      }),

      Animated.timing(borderColorAgenda2state, {
        toValue: 1,
        duration: 500,
        delay: 3500,
        useNativeDriver: false,
      }),

      Animated.timing(backgroundColorTimeBlock1state, {
        toValue: 1,
        duration: 500,
        delay: 3500,
        useNativeDriver: false,
      }),

      Animated.timing(colorTextTimeBlock1state, {
        toValue: 1,
        duration: 500,
        delay: 3500,
        useNativeDriver: false,
      }),

      Animated.timing(backgroundColorTimeBlock2state, {
        toValue: 1,
        duration: 1500,
        delay: 5000,
        useNativeDriver: false,
      }),

      Animated.timing(colorTextTimeBlock2state, {
        toValue: 1,
        duration: 1500,
        delay: 5000,
        useNativeDriver: false,
      }),

      Animated.timing(opacityFingerstate, {
        toValue: 1,
        duration: 2000,
        delay: 5000,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAlertstate, {
        toValue: 1,
        duration: 3000,
        delay: 6500,
        useNativeDriver: true,
        easing: Easing.linear(),
      }),

      Animated.timing(stateAnimated, {
        toValue: 100,
        duration: 8000,
        useNativeDriver: true,
      }),
      Animated.timing(stateAnimated2, {
        toValue: 100,
        duration: 8000,
        useNativeDriver: false,
      }),
    ]).start(() => runAnimation());
  };

  React.useEffect(() => {
    runAnimation();
  }, []);

  const translateCard1 = translateCard1state.interpolate({
    inputRange: [0, 1],
    outputRange: [(widthContainer / 100) * 80 + 32, 0],
  });
  const translateCard2 = translateCard2state.interpolate({
    inputRange: [0, 1],
    outputRange: [(widthContainer / 100) * 80 + 32, 0],
  });
  const translateCard3 = translateCard3state.interpolate({
    inputRange: [0, 1],
    outputRange: [(widthContainer / 100) * 80 + 32, 0],
  });
  const borderColorAgenda1 = borderColorAgenda1state.interpolate({
    //!
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.white],
  });
  const borderColorAgenda2 = borderColorAgenda2state.interpolate({
    //!
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.white],
  });
  const backgroundColorTimeBlock1 = backgroundColorTimeBlock1state.interpolate({
    //!
    inputRange: [0, 1],
    outputRange: [COLORS.primary, COLORS.backgroundCodeField],
  });
  const colorTextTimeBlock1 = colorTextTimeBlock1state.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.white, COLORS.gray],
  });
  const backgroundColorTimeBlock2 = backgroundColorTimeBlock2state.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.primary, COLORS.backgroundCodeField],
  });
  const colorTextTimeBlock2 = colorTextTimeBlock2state.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.white, COLORS.gray],
  });
  const opacityFinger = opacityFingerstate.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });
  const opacityAlert = opacityAlertstate.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [0, 1, 1, 0],
  });

  const AgendaBlock = React.useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <View
        onLayout={event => setWidthContainer(event.nativeEvent.layout.width)}
        style={{
          marginBottom: SIZES.margin * 1.2,
          width: '100%',
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: SIZES.radius,
          overflow: 'hidden',
        }}>
        {children}
      </View>
    ),
    [meta.value],
  );

  const AgendaItem = React.useCallback(
    ({
      time,
      lastItem,
      activeItem,
      customContainerStyle,
      customTimeBLockStyle,
      customTextStyle,
    }: {
      time: string;
      lastItem?: boolean;
      activeItem?: boolean;
      customContainerStyle?: Animated.Animated;
      customTimeBLockStyle?: Animated.Animated;
      customTextStyle?: Animated.Animated;
    }) => (
      <>
        <Animated.View
          style={{
            paddingVertical: SIZES.padding * 0.6,
            paddingHorizontal: SIZES.padding * 0.8,
            borderBottomWidth: lastItem ? 0 : 1,
            borderColor: COLORS.border,
            ...customContainerStyle,
          }}>
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 20,
              backgroundColor: activeItem ? COLORS.primary : COLORS.backgroundCodeField,
              borderRadius: SIZES.radius * 0.5,
              ...customTimeBLockStyle,
            }}>
            <Animated.Text
              style={{
                fontFamily: FONTFAMILY.text.medium,
                fontSize: SIZES.body5,
                color: activeItem ? COLORS.white : COLORS.gray,
                ...customTextStyle,
              }}>
              {time}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </>
    ),
    [meta.value],
  );

  const CardPerson = React.useCallback(
    ({
      title,
      imagePath,
      customContainerStyle,
    }: {
      title?: string;
      imagePath?: string;
      customContainerStyle?: Animated.Animated;
    }) => (
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: SIZES.padding,
          position: 'absolute',
          top: 6,
          left: 56,
          width: widthContainer - 64,
          height: 54,
          backgroundColor: COLORS.backgroundConfirmed,
          borderRadius: SIZES.radius,
          ...customContainerStyle,
        }}>
        <View style={{ marginRight: SIZES.margin * 1.2 }}>
          <Image
            source={{
              uri: imagePath || 'https://dev.vzt.bz/storage/images/default/default_2.png',
            }}
            style={{ width: 38, height: 38 }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: -5,
              right: -5,
              width: 20,
              height: 20,
              backgroundColor: COLORS.backgroundConfirmed,
              borderRadius: SIZES.radius * 6.25,
              zIndex: 10,
            }}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M5.99994 10.8001L3.19994 8.00006L2.2666 8.9334L5.99994 12.6667L13.9999 4.66673L13.0666 3.7334L5.99994 10.8001Z"
                fill="#52AA63"
              />
            </Svg>
          </View>
        </View>
        <Text
          style={{
            flex: 1,
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: SIZES.body5,
            color: COLORS.text,
          }}>
          {title || 'Александра Лингинова'}
        </Text>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
            fill="#787880"
          />
        </Svg>
      </Animated.View>
    ),
    [meta.value, widthContainer],
  );

  const Finger = React.useCallback(
    ({ customContainerStyle }: { customContainerStyle: Animated.Animated }) => (
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 10,
          bottom: 20,
          width: 40,
          height: 40,
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: SIZES.radius * 99,
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 2,
          elevation: 3,
          ...customContainerStyle,
        }}>
        <Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <Path
            d="M25 27.24V23.5C25 22.12 26.12 21 27.5 21C28.88 21 30 22.12 30 23.5V27.24C31.21 26.43 32 25.06 32 23.5C32 21.01 29.99 19 27.5 19C25.01 19 23 21.01 23 23.5C23 25.06 23.79 26.43 25 27.24ZM34.84 31.87L30.3 29.61C30.13 29.54 29.95 29.5 29.76 29.5H29V23.5C29 22.67 28.33 22 27.5 22C26.67 22 26 22.67 26 23.5V34.24C22.4 33.48 22.46 33.49 22.33 33.49C22.02 33.49 21.74 33.62 21.54 33.82L20.75 34.62L25.69 39.56C25.96 39.83 26.34 40 26.75 40H33.54C34.29 40 34.87 39.45 34.98 38.72L35.73 33.45C35.74 33.38 35.75 33.31 35.75 33.25C35.75 32.63 35.37 32.09 34.84 31.87Z"
            fill="#1C1C1E"
          />
        </Svg>
      </Animated.View>
    ),
    [meta.value],
  );

  const Alert = React.useCallback(
    ({ customContainerStyle }: { customContainerStyle: Animated.Animated }) => (
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 8,
          left: 8,
          right: 8,
          height: 40,
          backgroundColor: COLORS.backgroundAlert,
          borderRadius: SIZES.radius,
          ...customContainerStyle,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.white,
          }}>
          Запись клиентов на 11:00 недоступна
        </Text>
      </Animated.View>
    ),
    [meta.value],
  );

  const SmartGraphButton = React.useCallback(
    ({ status, title, description }: { status: boolean; title: string; description: string }) => (
      <TouchableOpacity
        onPress={() => setChooseStatus(!chooseStatus)}
        activeOpacity={0.5}
        style={{ marginBottom: SIZES.margin * 2.4 }}>
        <View style={{ flexDirection: 'row', marginBottom: SIZES.margin }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SIZES.margin,
              height: 20,
              width: 20,
              borderColor: COLORS.primary,
              borderRadius: SIZES.radius * 1.5,
              borderWidth: 2,
            }}>
            {status && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius * 0.6,
                }}
              />
            )}
          </View>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              color: COLORS.text,
            }}>
            {title}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.gray,
          }}>
          {description}
        </Text>
      </TouchableOpacity>
    ),
    [meta.value, chooseStatus],
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding * 1.6,
        paddingVertical: SIZES.padding * 1.6,
      }}>
      <ScrollView>
        {/* Включен */}
        <AgendaBlock>
          <AgendaItem
            time={'10:30'}
            customContainerStyle={{
              borderColor: borderColorAgenda1,
            }}
          />
          <AgendaItem time={'10:45'} />
          <AgendaItem
            time={'11:00'}
            customContainerStyle={{
              borderColor: borderColorAgenda1,
            }}
          />
          <AgendaItem time={'11:30'} lastItem />
          <CardPerson
            customContainerStyle={{
              transform: [{ translateX: translateCard1 }],
            }}
          />
          <CardPerson
            title="Дарья Литвинова"
            imagePath="https://dev.vzt.bz/storage/images/default/default_1.png"
            customContainerStyle={{
              top: 72,
              transform: [{ translateX: translateCard2 }],
            }}
          />
        </AgendaBlock>
        <SmartGraphButton
          status={chooseStatus === true}
          title="Включен"
          description="Рабочий график заполняется без перерывов"
        />

        {/* Выключен */}
        <AgendaBlock>
          <AgendaItem
            time={'10:30'}
            activeItem
            customContainerStyle={{
              borderColor: borderColorAgenda2,
            }}
            customTimeBLockStyle={{
              backgroundColor: backgroundColorTimeBlock1,
            }}
            customTextStyle={{
              color: colorTextTimeBlock1,
            }}
          />
          <AgendaItem time={'10:45'} />
          <AgendaItem
            time={'11:00'}
            activeItem
            customTimeBLockStyle={{
              backgroundColor: backgroundColorTimeBlock2,
            }}
            customTextStyle={{
              color: colorTextTimeBlock2,
            }}
          />
          <AgendaItem time={'11:30'} lastItem />
          <CardPerson
            customContainerStyle={{
              transform: [{ translateX: translateCard3 }],
            }}
          />
          <Finger
            customContainerStyle={{
              opacity: opacityFinger,
            }}
          />
          <Alert
            customContainerStyle={{
              opacity: opacityAlert,
            }}
          />
        </AgendaBlock>
        <SmartGraphButton
          status={chooseStatus === false}
          title="Выключен"
          description="Временные промежутки на экране календаря становятся интерактивными"
        />
      </ScrollView>
      <CustomButton onPress={handleOnPress} type="primary" label="Подтвердить" />
    </View>
  );
};

export default SmartGraphModal;
