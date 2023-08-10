import * as Yup from 'yup';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Formik, FieldArray } from 'formik';
import { View, ScrollView, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';

import { ServicesRequest } from '../../api/myServicesAPI';
import { APIStatus } from '../../lib/axiosAPI';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { CustomButton, PaginationCircle, ScreenHeader } from '../../components';
import { MainLayouts } from '../../layouts';
import { SIZES } from '../../constants';

import { SwitchBlock, ServiceCardBlock, PlusBlock } from './blocks';
import { useCreateServices } from './hooks/useCreateServices';

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

const MyServices: React.FC<IProps> = ({ navigation }) => {
  const { fetch: createServices, status } = useCreateServices();
  const formikRef = React.useRef<any>(null);
  const maintenance = {
    title: '',
    price: { label: '', value: 0 },
    duration: { label: '', value: 15 },
  };
  const [prevValues, setPrevValues] = React.useState<any>(maintenance);
  const [isFewServices, setIsFewServices] = React.useState<boolean>();

  React.useEffect(() => {
    const formik = formikRef.current;
    const { value } = formik.getFieldProps();

    if (!isFewServices) {
      setPrevValues(value.maintenances);
      formik.setValues({ ...value, maintenances: [value.maintenances[0]] });
    }

    if (isFewServices && prevValues?.length > 1) {
      formik.setValues({ ...value, maintenances: prevValues });
    }
  }, [isFewServices]);

  React.useEffect(() => {
    if (status === APIStatus.Success) navigation.navigate('WorkSchedule');
  }, [status]);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <Formik
          innerRef={formikRef}
          initialValues={{
            finance_analytics: true,
            many_maintenances: true,
            maintenances: [maintenance],
          }}
          onSubmit={(values: ServicesRequest) => {
            createServices(values);
          }}
          validationSchema={validationSchema}>
          {({ handleSubmit, values }) => (
            <View
              style={{
                flex: 1,
              }}>
              <ScreenHeader
                title="Мои услуги"
                onPressLeftButton={() => navigation.navigate('MyBusinessCard')}
                renderLeftButton={() => (
                  <Svg width="20" height="14" fill="none" viewBox="0 0 20 14">
                    <Path fill="#38B8E0" d="M7 14l1.41-1.41L3.83 8H20V6H3.83l4.59-4.59L7 0 0 7l7 7z"></Path>
                  </Svg>
                )}
              />
              <ScrollView keyboardShouldPersistTaps="handled">
                <PaginationCircle data={[0, 0, 1, 0]} />
                <View
                  style={{
                    paddingTop: SIZES.padding * 2.4,
                    paddingBottom: SIZES.padding * 1.6,
                    paddingHorizontal: SIZES.padding * 1.6,
                  }}>
                  <SwitchBlock setIsFewServices={bool => setIsFewServices(bool)} />
                </View>
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
                  paddingVertical: 16,
                }}>
                <CustomButton onPress={handleSubmit} label="Продолжить" type="primary" status={status} />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </MainLayouts>
  );
};

export default MyServices;
