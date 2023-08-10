import React from 'react';
import * as Yup from 'yup';
import { APIStatus } from '../../../lib/axiosAPI';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { getFromStoreData } from '../../../lib/asyncStorageManager';
import { View, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

import { NavigationType } from '../../../navigation/MainStackNavigator';
import { RootState } from '../../../store';
import { useFetchResetPinCode } from '../../Authentication/hooks/useFetchResetPinCode';
import { CustomButton, ModalWindow } from '../../../components';
import { MainLayouts } from '../../../layouts';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { setFromStoreData } from '../../../lib/asyncStorageManager';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';

import { FieldPhoneNumber } from '../blocks';
import { PhoneConfirmationModal } from './index';

const validationSchema = Yup.object({
  numberPhone: Yup.string().min(10).required(),
});

interface IProps {
  navigation: NavigationType;
}

const PhoneNumber: React.FC<IProps> = ({ navigation }) => {
  const { fetch, status } = useFetchResetPinCode();
  const [error, setError] = React.useState(false);
  const { selectedCountry } = useSelector((s: RootState) => s?.phoneVerification);
  const { isAuthenticated, phoneNumber } = useSelector((s: RootState) => s?.authentication);
  const [currentNumberPhone, setCurrentNumberPhone] = React.useState<string>('');
  const [numberPhone, setNumberPhone] = React.useState<string>('');
  const [isVisibleModalPhoneConfirmation, setIsVisibleModalPhoneConfirmation] = React.useState<boolean>(false);
  const { setPhoneNumber } = authenticationActionCreators();

  React.useEffect(() => {
    if (status === APIStatus.Failure) {
      setError(true);
    }
    if (currentNumberPhone !== numberPhone) {
      setError(false);
    }
  }, [status, currentNumberPhone, numberPhone]);

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      setPhoneNumber(numberPhone);
      setIsVisibleModalPhoneConfirmation(true);
    }
  }, [status]);

  //   React.useEffect(() => {
  //     if (status === 'Success')
  //       isAuthenticated?.data?.user
  //         ? navigation.navigate('Authentication')
  //         : setIsVisibleModalPhoneConfirmation(true);
  //   }, [status]);

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ numberPhone: '' }}
        onSubmit={values => {
          Keyboard.dismiss();
          setNumberPhone(selectedCountry?.code + values.numberPhone);
          fetch(selectedCountry?.code + values.numberPhone);
        }}
        validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <KeyboardAvoidingView
            keyboardVerticalOffset={16}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding * 1.6,
            }}>
            <View style={{ paddingTop: SIZES.padding * 2.4 }}>
              <Text
                style={{
                  fontFamily: FONTFAMILY.title.bold,
                  fontSize: SIZES.h1,
                  lineHeight: 30,
                  color: COLORS.text,
                }}>
                Ваш телефон
              </Text>
              <Text
                style={{
                  paddingTop: SIZES.padding * 0.8,
                  paddingBottom: SIZES.padding * 2.4,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.body4,
                  color: COLORS.text,
                }}>
                На указанный номер будет выслан проверочный код
              </Text>
              <FieldPhoneNumber
                value={values.numberPhone}
                onChangeText={handleChange('numberPhone')}
                onBlur={handleBlur('numberPhone')}
                error={touched.numberPhone && errors.numberPhone}
                currentValue={value => setCurrentNumberPhone(selectedCountry?.code + value)}
              />
            </View>
            <View style={{ paddingBottom: SIZES.padding * 1.6 }}>
              {error ? (
                <View
                  style={{
                    backgroundColor: COLORS.red,
                    marginBottom: SIZES.padding * 1.6,
                    borderRadius: SIZES.radius,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    opacity: 1,
                    height: 54,
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      //...FONTS.body11,
                      marginHorizontal: 13,
                    }}>
                    Указанный телефон не зарегистрирован. Проверьте правильность номера
                  </Text>
                </View>
              ) : (
                <CustomButton onPress={handleSubmit} type="primary" label="Продолжить" status={status} />
              )}
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
      <ModalWindow
        title="Подтверждение телефона"
        component={PhoneConfirmationModal}
        navigation={navigation}
        numberPhone={numberPhone}
        isVisible={isVisibleModalPhoneConfirmation}
        onClose={() => setIsVisibleModalPhoneConfirmation(false)}
      />
    </View>
  );
};

export default PhoneNumber;
