import React from 'react';
import RNRestart from 'react-native-restart';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

import { RootState, useSelector } from '../../../store';
import { APIStatus } from '../../../lib/axiosAPI';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { CodeField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useSignUp } from '../hooks/useSignUp';
import { useCheckVerification } from '../hooks/useCheckVerification';
import { useIsFocused } from '@react-navigation/native';
import { useCheckPin } from '../hooks/useCheckPin';

interface IProps {
  navigation: NavigationType;
  numberPhone: string;
  onVisibleLoader: any;
  closeModal: () => void;
}

const PhoneConfirmationModal: React.FC<IProps> = ({ navigation, numberPhone, onVisibleLoader, closeModal }) => {
  const { fetch: signUp } = useSignUp();
  const { fetch: checkVerification, status } = useCheckVerification();
  const { fetch: checkPin, status: checkStatus } = useCheckPin();
  const { isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const { SMSCode } = useSelector((s: RootState) => s?.phoneVerification);
  const [value, setValue] = React.useState<string>('');
  const [timer, setTimer] = React.useState<number>(60);
  const [isAgain, setIsAgain] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const [pop, setPop] = React.useState<number>(0);

  const onSubmitForm = React.useCallback(
    (value: string) => {
      setValue(value.replace(/\D+/g, ''));
      if (value.length === 4) {
        checkPin(numberPhone, value);
      }
    },
    [value],
  );

  React.useEffect(() => {
    if (checkStatus === APIStatus.Success) {
      checkVerification(numberPhone, value);
    } else if (checkStatus === APIStatus.Failure) {
      setPop(pop + 1);
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
      setTimer(60);
      signUp(numberPhone);
      setIsAgain(false);
    }
  }, [isAgain]);

  const decrementClock = React.useCallback(() => {
    if (timer === 1) {
      setIsAgain(true);
      setPop(0);
    } else {
      setTimer(timer - 1);
    }
  }, [timer]);

  React.useEffect(() => {
    signUp(numberPhone);
  }, []);

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      onVisibleLoader(false);
      closeModal();
      if (
        isAuthenticated?.data?.user &&
        isAuthenticated?.data?.role == 'specialist' &&
        isAuthenticated?.data?.specialist
      ) {
        navigation.navigate('Calendar');
      } else if (isAuthenticated?.data?.user && isAuthenticated?.data?.role == 'client') {
        navigation.navigate('Vizitnica');
      } else {
        // navigation.navigate('PersonalData');
        navigation.navigate('PreOnboarding');
      }
    }
    if (status === APIStatus.Loading) {
      onVisibleLoader(true);
      Keyboard.dismiss();
    }
  }, [status]);

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
      keyboardVerticalOffset={24}
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
          color: COLORS.text,
          textAlign: 'center',
        }}>
        На номер {numberPhone} отправлено СМС с кодом подтверждения
      </Text>
      <CodeField
        value={pop < 3 ? value : '    '}
        onChangeText={value => onSubmitForm(value)}
        renderCell={renderCell}
        customContainerStyle={{
          width: 248,
          marginVertical: SIZES.margin * 6.8,
        }}
      />
      {pop >= 3 || isAgain ? (
        <Text
          style={{
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: SIZES.body4,
            lineHeight: 16,
            color: COLORS.error,
            textAlign: 'center',
            marginBottom: SIZES.margin,
          }}>
          {`Вы ввели неверный код, запросите новый`}
        </Text>
      ) : null}
      {!isAgain && !isError ? (
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            lineHeight: 16,
            color: COLORS.gray,
            textAlign: 'center',
          }}>
          {`Повторное СМС возможно через ${timer} сек.`}
        </Text>
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
    </KeyboardAvoidingView>
  );
};

export default PhoneConfirmationModal;
