import * as Yup from 'yup';
import React, { useRef, useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Formik, FieldArray } from 'formik';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ServicesRequest } from '../../api/myServicesAPI';
import { APIStatus } from '../../lib/axiosAPI';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { CustomButton, ScreenHeader } from '../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { WrapperSlideHandler } from '../Settings/layouts';

import { SwitchBlock, ServiceCardBlock, PlusBlock } from '../MyServices/blocks';
import { useUpdateSettingsServices } from './hooks/useUpdateSettingsServices';
import { useUpdateServices } from './hooks/useUpdateServices';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const validationSchema = Yup.object().shape({
  maintenances: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().min(1).required(),
    }),
  ),
});

interface IProps {
  navigation: NavigationType;
}

const EditMyServices: React.FC<IProps> = ({ navigation }) => {
  const { fetch: updateSettingsServices, status: statusUpdateSettingsServices } = useUpdateSettingsServices();
  const { fetch: updateServices, status: statusUpdateServices } = useUpdateServices();

  const { specialistServiceSettings } = useSelector((s: RootState) => s?.myServices);
  const formikRef = useRef<any>(null);
  const maintenance = {
    title: '',
    price: { label: '', value: 0 },
    duration: { label: '', value: 15 },
  };
  const [prevValues, setPrevValues] = useState<any>(specialistServiceSettings.maintenances);
  const [isFewServices, setIsFewServices] = useState<boolean>();

  useEffect(() => {
    const formik = formikRef.current;
    const { value } = formik.getFieldProps();

    if (isFewServices === false) {
      setPrevValues(value.maintenances);
      formik.setValues({ ...value, maintenances: [value.maintenances[0]] });
    } else if (isFewServices === true) {
      formik.setValues({
        ...value,
        maintenances: specialistServiceSettings.maintenances,
      });
    }

    if (isFewServices && prevValues?.length > 1) {
      formik.setValues({ ...value, maintenances: prevValues });
    }
  }, [isFewServices]);

  useEffect(() => {
    if (statusUpdateSettingsServices === APIStatus.Success && statusUpdateServices === APIStatus.Success)
      navigation.goBack();
  }, [statusUpdateSettingsServices, statusUpdateServices]);

  return (
    <WrapperSlideHandler navigation={navigation}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <Formik
          innerRef={formikRef}
          initialValues={{
            finance_analytics: specialistServiceSettings.finance_analytics,
            many_maintenances: specialistServiceSettings.many_maintenances,
            maintenances: specialistServiceSettings.maintenances,
          }}
          onSubmit={(values: ServicesRequest) => {
            updateServices(values);
            updateSettingsServices({
              finance_analytics: values.finance_analytics,
              many_maintenances: values.many_maintenances,
            });
          }}
          validationSchema={validationSchema}>
          {({ handleSubmit, values }) => (
            <View style={{ marginBottom: 16, flex: 1 }}>
              <ScreenHeader
                title="Мои услуги"
                customTextStyle={{
                  fontSize: SIZES.h4,
                  fontFamily: FONTFAMILY.title.semibold,
                  lineHeight: 17.9,
                }}
                customContainerStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.border,
                }}
                renderLeftButton={() => (
                  <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                    <Path
                      d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
                      fill="#38B8E0"
                    />
                  </Svg>
                )}
                onPressLeftButton={() => navigation.goBack()}
              />

              <View
                style={{
                  paddingTop: SIZES.padding * 1.6,
                  paddingBottom: SIZES.padding * 1.6,
                  paddingHorizontal: SIZES.padding * 1.6,
                }}>
                <SwitchBlock setIsFewServices={bool => setIsFewServices(bool)} />
              </View>
              <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1 }}>
                  <FieldArray name="maintenances">
                    {({ insert, remove, push }) => (
                      <>
                        {values.maintenances.length > 0 &&
                          values.maintenances.map((_, index) => (
                            <ServiceCardBlock
                              key={String(index)}
                              index={index}
                              removeSeriveCard={remove}
                              isDelete={values.many_maintenances && values.maintenances.length > 1}
                              isFinancialAnalytics={values.finance_analytics}
                              autoFocus={false}
                            />
                          ))}
                      </>
                    )}
                  </FieldArray>
                </View>
              </ScrollView>
              <View>
                <FieldArray name="maintenances">
                  {({ push }) => <>{values.many_maintenances && <PlusBlock onPress={() => push(maintenance)} />}</>}
                </FieldArray>
              </View>
              <View
                style={{
                  paddingHorizontal: SIZES.padding * 1.6,
                  paddingVertical: SIZES.padding * 1.6,
                }}>
                <CustomButton
                  onPress={handleSubmit}
                  label="Сохранить"
                  type="primary"
                  status={statusUpdateSettingsServices && statusUpdateServices}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </WrapperSlideHandler>
  );
};

export default EditMyServices;
