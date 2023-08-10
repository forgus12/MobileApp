import React from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

import { NavigationType } from '../../../navigation/MainStackNavigator';
import { CodeField, ModalWindow } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { useFetchResetPinCode } from '../../Authentication/hooks/useFetchResetPinCode';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ResetPinCode } from './index';
import { useCheckPin } from '../../PhoneVerification/hooks/useCheckPin';
import { APIStatus } from '../../../lib/axiosAPI';
import { useCheckVerification } from '../../PhoneVerification/hooks/useCheckVerification';

interface IProps {
  navigation: NavigationType;
  numberPhone: string;
  onVisibleLoader: any;
}

const PhoneConfirmationModal: React.FC<IProps> = ({ navigation, numberPhone, onVisibleLoader }) => {
  const smsCode = '1234';

  const { fetch: checkPin, status: checkStatus } = useCheckPin();
  const [value, setValue] = React.useState<string>('');
  const [timer, setTimer] = React.useState<number>(60);
  const [isAgain, setIsAgain] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const { isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const { fetch, status } = useFetchResetPinCode();
  const [isVisibleModalResetPinCoden, setIsVisibleModalResetPinCode] = React.useState<boolean>(false);
  const { fetch: checkVerification, status: verifyStatus } = useCheckVerification();
  const onSubmitForm = React.useCallback(
    (value: string) => {
      setValue(value.replace(/\D+/g, ''));
      setValue(value.replace(/\D+/g, ''));
      if (value.length === 4) {
        checkPin(numberPhone, value);
      }
    },
    [value],
  );
  //     if (value.length === 4) {
  //       if (value !== isAuthenticated!.data!.code) {
  // setIsError(true);
  // const timeout = setTimeout(() => {
  //   onVisibleLoader(false);
  //   setIsError(false);
  //   setValue('');
  // }, 800);
  // return () => clearInterval(timeout);
  //       } else {
  //         Keyboard.dismiss();
  //         onVisibleLoader(true);
  //         const timeout = setTimeout(() => {
  //           onVisibleLoader(false);
  //           setValue('');
  //           clearInterval(timeout);
  //           //closeModal();
  //           setIsVisibleModalResetPinCode(true)
  //         }, 800);
  //         return () => clearInterval(timeout);
  //       }
  //     }
  //   },
  //   [value],
  // );

  React.useEffect(() => {
    if (checkStatus === APIStatus.Success) {
      {
        checkVerification(numberPhone, value);
        Keyboard.dismiss();
        onVisibleLoader(true);
        const timeout = setTimeout(() => {
          onVisibleLoader(false);
          setValue('');
          clearInterval(timeout);
          //closeModal();
          navigation.navigate('EnterPinCode');
        }, 800);
        return () => clearInterval(timeout);
      }
    } else if (checkStatus === APIStatus.Failure) {
      setIsError(true);
      const timeout = setTimeout(() => {
        onVisibleLoader(false);
        setIsError(false);
        setValue('');
      }, 800);
      return () => clearInterval(timeout);
    }
  }, [checkStatus]);

  const resetClock = React.useCallback(() => {
    if (isAgain) {
      fetch(numberPhone);
      setTimer(10);
      setIsAgain(false);
    }
  }, [isAgain]);

  const decrementClock = React.useCallback(() => {
    if (timer === 1) {
      setIsAgain(true);
    } else {
      setTimer(timer - 1);
    }
  }, [timer]);

  React.useEffect(() => {
    const clockCall = setInterval(() => decrementClock(), 1000);
    return () => clearInterval(clockCall);
  }, [timer]);

  const renderCell = React.useCallback(
    (value: string, isFocused: boolean) => {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 56,
            height: 56,
            backgroundColor: isError ? COLORS.backgroundCodeFieldError : COLORS.backgroundCodeField,
            borderWidth: isFocused ? 1.5 : 0,
            borderColor: COLORS.primary,
            borderRadius: SIZES.radius,
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.bold,
              fontSize: SIZES.h1,
              lineHeight: 30,
              color: isError ? COLORS.error : COLORS.text,
            }}>
            {value}
          </Text>
        </View>
      );
    },
    [value, isError],
  );

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: SIZES.padding * 2.4,
        paddingHorizontal: SIZES.padding * 2.4,
      }}>
      <Text
        style={{
          fontFamily: FONTFAMILY.text.regular,
          fontSize: SIZES.body4,
          lineHeight: 16,
          color: isError ? COLORS.error : COLORS.primary,
          textAlign: 'center',
        }}>
        На номер {numberPhone} отправлено СМС с кодом подтверждения
      </Text>
      <CodeField
        value={value}
        onChangeText={value => onSubmitForm(value)}
        renderCell={renderCell}
        customContainerStyle={{
          width: 248,
          marginVertical: SIZES.margin * 6.8,
        }}
      />
      {!isAgain && !isError ? (
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            lineHeight: 16,
            color: COLORS.gray,
            textAlign: 'center',
          }}>{`Повторное СМС возможно через ${timer} сек.`}</Text>
      ) : (
        <TouchableOpacity activeOpacity={0.8} onPress={resetClock}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.semibold,
              fontSize: SIZES.body4,
              lineHeight: 16,
              color: isError ? COLORS.error : COLORS.primary,
              textAlign: 'center',
            }}>
            {isError ? 'Неверный код' : 'Запросить СМС повторно'}
          </Text>
        </TouchableOpacity>
      )}
      <ModalWindow
        title=""
        component={ResetPinCode}
        navigation={navigation}
        isVisible={isVisibleModalResetPinCoden}
        onClose={() => setIsVisibleModalResetPinCode(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default PhoneConfirmationModal;
