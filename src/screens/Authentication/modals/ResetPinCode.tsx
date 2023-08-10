import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, KeyboardAvoidingView, Platform, View } from 'react-native';

import { NavigationType } from '../../../navigation/MainStackNavigator';
import { MainLayouts } from '../../../layouts';
import { CodeField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { useResetPin } from '../hooks/useResetPin';

interface IProps {
  navigation: NavigationType;
  closeModal: () => void;
}

const ResetEnterCode: React.FC<IProps> = ({ navigation, closeModal }) => {
  const [value, setValue] = React.useState<string>('');
  const [repeatValue, setRepeatValue] = React.useState<string>('');
  const [isError, setIsError] = React.useState<boolean>(false);
  const { fetch: fetchPinReset } = useResetPin();

  React.useEffect(() => {
    if (repeatValue.length === 4) {
      if (value !== repeatValue) {
        setIsError(true);
        const timeout = setTimeout(() => {
          setIsError(false);
          setRepeatValue('');
        }, 1000);
        return () => clearInterval(timeout);
      } else {
        fetchPinReset(value);
        navigation.navigate('Calendar');
      }
    }
  }, [value, repeatValue]);

  const renderCell = React.useCallback(
    (value: string) => {
      return (
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: SIZES.radius,
            backgroundColor: isError ? COLORS.error : value ? COLORS.primary : COLORS.backgroundCodeField,
          }}
        />
      );
    },
    [isError],
  );

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={24}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: SIZES.padding * 4,
          paddingBottom: SIZES.padding * 2.4,
          paddingHorizontal: SIZES.padding * 2.4,
        }}>
        <Svg width="64" height="64" fill="none" viewBox="0 0 64 64">
          <Path
            fill="#F1FAFD"
            d="M32.015 19.75c-11.875 0-21.5 9.626-21.5 21.5s9.625 21.5 21.5 21.5c11.874 0 21.5-9.626 21.5-21.5s-9.626-21.5-21.5-21.5z"></Path>
          <Path
            fill="#fff"
            d="M28.876 41.66a4.99 4.99 0 01-1.856-4.13c.121-2.597 2.254-4.687 4.853-4.759a5 5 0 013.281 8.89.983.983 0 00-.362.765v4.527a2.778 2.778 0 11-5.555 0v-4.527c0-.296-.13-.58-.361-.765zM23.015 21.26v-5.01a9 9 0 0118 0v5.01l6 4.25v-9.26c0-8.284-6.716-15-15-15-8.285 0-15 6.716-15 15v9.26l6-4.25z"></Path>
          <Path
            fill="#38B8E0"
            d="M25.772 37.472a6.282 6.282 0 002.215 5.076v4.405a4.032 4.032 0 004.028 4.028 4.032 4.032 0 004.027-4.028v-4.405a6.224 6.224 0 002.223-4.779 6.2 6.2 0 00-1.893-4.48 6.202 6.202 0 00-4.534-1.768c-3.25.09-5.915 2.704-6.066 5.951zm2.497.116a3.76 3.76 0 013.746-3.569c.983 0 1.908.375 2.614 1.062a3.721 3.721 0 011.136 2.688 3.737 3.737 0 01-1.396 2.919 2.223 2.223 0 00-.827 1.738v4.527a1.53 1.53 0 01-1.527 1.528 1.53 1.53 0 01-1.528-1.528v-4.527c0-.68-.301-1.314-.826-1.738a3.722 3.722 0 01-1.392-3.1z"></Path>
          <Path
            fill="#38B8E0"
            d="M48.264 25.346V16.25c0-8.96-7.29-16.25-16.25-16.25s-16.25 7.29-16.25 16.25v9.08a22.792 22.792 0 00-6.037 11.333 1.25 1.25 0 002.45.502C14.095 27.798 22.437 21 32.014 21c11.166 0 20.25 9.084 20.25 20.25S43.18 61.5 32.014 61.5c-9.578 0-17.921-6.8-19.838-16.168a1.25 1.25 0 10-2.45.502 22.812 22.812 0 007.817 12.97C21.603 62.155 26.742 64 32.014 64c12.545 0 22.75-10.206 22.75-22.75 0-6.184-2.481-11.8-6.5-15.904zM32.014 2.5c7.582 0 13.75 6.168 13.75 13.75v6.888a22.79 22.79 0 00-3.5-2.194V16.25c0-5.652-4.598-10.25-10.25-10.25-5.651 0-10.25 4.598-10.25 10.25v4.692a22.678 22.678 0 00-3.5 2.183V16.25c0-7.582 6.169-13.75 13.75-13.75zm-7.75 17.363V16.25c0-4.273 3.477-7.75 7.75-7.75 4.274 0 7.75 3.477 7.75 7.75v3.61c-2.42-.88-5.03-1.36-7.75-1.36-2.657 0-5.28.47-7.75 1.363z"></Path>
          <Path
            fill="#38B8E0"
            d="M47.13 40.366a1.26 1.26 0 00-.365.884c0 .329.133.651.366.884.232.232.555.366.884.366.328 0 .65-.134.883-.366.233-.233.367-.555.367-.884a1.26 1.26 0 00-.367-.884 1.26 1.26 0 00-.883-.366c-.33 0-.652.134-.884.366zM42.796 27.783A17.297 17.297 0 0032.015 24a1.25 1.25 0 000 2.5c6.876 0 12.779 4.666 14.356 11.348a1.25 1.25 0 002.433-.574 17.326 17.326 0 00-6.008-9.49zM10.544 42.5a1.25 1.25 0 000-2.5h-.059a1.25 1.25 0 000 2.5h.059z"></Path>
        </Svg>
        <Text
          style={{
            marginTop: SIZES.margin * 2.4,
            fontFamily: FONTFAMILY.title.black,
            fontSize: SIZES.h2,
            color: COLORS.text,
            textAlign: 'center',
          }}>
          {isError ? 'PIN-код не совпадает' : value.length < 4 ? 'Придумайте PIN-код' : ' Повторите PIN-код'}
        </Text>
        <Text
          style={{
            marginTop: SIZES.margin * 1.2,
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.gray,
            textAlign: 'center',
          }}>
          В дальнейшем будет использоваться для входа в приложение
        </Text>
        <CodeField
          value={value.length < 4 ? value : repeatValue}
          onChangeText={value.length < 4 ? setValue : setRepeatValue}
          renderCell={renderCell}
          customContainerStyle={{
            marginVertical: SIZES.margin * 4,
            width: 122,
          }}
        />
      </KeyboardAvoidingView>
    </MainLayouts>
  );
};

export default ResetEnterCode;
