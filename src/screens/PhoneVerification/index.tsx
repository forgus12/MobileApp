import React from 'react';
import * as Yup from 'yup';
import RNRestart from 'react-native-restart';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { setFromStoreData } from '../../lib/asyncStorageManager';
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, Linking, StatusBar } from 'react-native';

import { NavigationType } from '../../navigation/MainStackNavigator';
import { RootState } from '../../store';
import { useFetchUser } from '../Authentication/hooks/useFetchUser';
import { CustomButton, ModalWindow } from '../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

import { FieldPhoneBlock } from './blocks';
import { LicenseModal, PersonDataModal, PhoneConfirmationModal } from './modals';
import { MainLayouts } from '../../layouts';

const validationSchema = Yup.object({
  numberPhone: Yup.string().min(10).required(),
});

interface IProps {
  navigation: NavigationType;
}

const PhoneVerification: React.FC<IProps> = ({ navigation }) => {
  const { fetch: fetchUser, status } = useFetchUser();
  const { selectedCountry } = useSelector((s: RootState) => s?.phoneVerification);
  const { isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const [numberPhone, setNumberPhone] = React.useState<string>('');
  const [isVisibleModalLicense, setIsVisibleModalLicense] = React.useState<boolean>(false);
  const [isVisibleModalPersonalData, setIsVisibleModalPersonalData] = React.useState<boolean>(false);
  const [isVisibleModalPhoneConfirmation, setIsVisibleModalPhoneConfirmation] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (status === 'Success') {
      setFromStoreData('phoneNumber', numberPhone.replace(/ /g, ''));
      isAuthenticated?.data?.user && isAuthenticated?.data?.device
        ? RNRestart.Restart()
        : setIsVisibleModalPhoneConfirmation(true);
    }
  }, [status]);

  return (
    <MainLayouts>
      {/* <View style={{  backgroundColor:'#0F98C2', height:50}} ></View> */}
      <Formik
        initialValues={{ numberPhone: '' }}
        onSubmit={values => {
          Keyboard.dismiss();
          setNumberPhone(selectedCountry?.code + values.numberPhone);
          fetchUser(selectedCountry?.code + values.numberPhone);
        }}
        validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
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
                Номер будет привязан к вашему аккаунту
              </Text>
              <FieldPhoneBlock
                value={values.numberPhone}
                onChangeText={handleChange('numberPhone')}
                onBlur={handleBlur('numberPhone')}
                error={touched.numberPhone && errors.numberPhone}
              />
            </View>
            <View style={{ paddingBottom: SIZES.padding * 1.6 }}>
              <CustomButton onPress={handleSubmit} type="primary" label="Продолжить" status={status} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: SIZES.padding * 1.6,
                }}>
                {/* <BouncyCheckbox
                  onPress={() => setFieldValue('checkbox', !values.checkbox)}
                  isChecked={values.checkbox}
                  fillColor={errors.checkbox ? COLORS.error : values.checkbox ? COLORS.primary : COLORS.gray}
                  unfillColor={COLORS.white}
                  bounceFriction={5}
                  bounceEffect={0.97}
                  size={18}
                  iconStyle={{
                    borderWidth: 2.5,
                    borderRadius: 4,
                  }}
                  style={{
                    width: 31,
                    height: '100%',
                  }}
                /> */}
                <Text
                  style={{
                    flex: 1,
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.body6,
                    lineHeight: 16,
                    color: COLORS.gray,
                  }}>
                  Продолжая, вы соглашаетесь со{' '}
                  <Text
                    onPress={() => Linking.openURL('https://vizitka.bz/app_privacy_policy')}
                    style={{ textDecorationLine: 'underline' }}>
                    сбором, обработкой персональных данных
                  </Text>{' '}
                  и{' '}
                  <Text
                    onPress={() => Linking.openURL('https://vizitka.bz/app_user_agreement')}
                    style={{ textDecorationLine: 'underline' }}>
                    Пользовательским соглашением
                  </Text>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>

      <ModalWindow
        title="Пользовательское соглашение"
        component={LicenseModal}
        isVisible={isVisibleModalLicense}
        onClose={() => setIsVisibleModalLicense(false)}
      />
      <ModalWindow
        title="Персональные данные"
        component={PersonDataModal}
        isVisible={isVisibleModalPersonalData}
        onClose={() => setIsVisibleModalPersonalData(false)}
      />
      <ModalWindow
        title="Подтверждение телефона"
        component={PhoneConfirmationModal}
        navigation={navigation}
        numberPhone={numberPhone}
        isVisible={isVisibleModalPhoneConfirmation}
        onClose={() => setIsVisibleModalPhoneConfirmation(false)}
      />
    </MainLayouts>
  );
};

export default PhoneVerification;
