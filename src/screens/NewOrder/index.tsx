import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Formik } from 'formik';
import { ScrollView, View } from 'react-native';
import * as Yup from 'yup';

import { NavigationType } from '../../navigation/MainStackNavigator';
import { calendarActionCreators } from '../../slices/calendarSlice';
import { APIStatus } from '../../lib/axiosAPI';
import { CustomButton, Hr, ScreenHeader, CroppedModalWindow } from '../../components';
import { MainLayouts } from '../../layouts';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

import { ClientBlock, DateAndTimeBlock, ServicesBlock } from './blocks';
import { initialValuesNewOrder } from './static/static';
import { useCreateOrder } from './hooks/useCreateOrder';
import { RootState, useSelector } from '../../store';

import { maintenanceNewOrder } from './static/static';
import AlertModal from './modals/AlertModal';
import { transformDate } from '../WorkSchedule/helpers/dateFormat';

interface IProps {
  navigation: NavigationType;
  route: any;
}

const validationSchema = Yup.object().shape({
  client: Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string().required(),
  }),

  services: Yup.array().of(
    Yup.object().shape({
      duration: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
      id: Yup.number().required(),
      price: Yup.object().shape({
        value: Yup.mixed().required(),
      }),
      title: Yup.string().required(),
    }),
  ),

  date: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }),
  time: Yup.object().shape({
    start: Yup.string().required(),
    end: Yup.string().required(),
  }),
});

const NewOrder: React.FC<IProps> = ({ route, navigation }) => {
  const { fetch: fecthCreateOrder, status } = useCreateOrder();
  const { resetAllOrder } = calendarActionCreators();
  const { client, isSelectedDate, isSelectedTime, dayId } = route.params;
  const [isVisibleAlertModal, setIsVisibleAlertModal] = React.useState<boolean>(false);

  React.useEffect((): any => {
    if (status === APIStatus.Success) {
      navigation.navigate('Calendar');
      return () => resetAllOrder();
    } else if (status === APIStatus.Failure) {
      setIsVisibleAlertModal(true);
    }
  }, [status]);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <ScreenHeader
        title="Новая запись"
        onPressLeftButton={() => navigation.goBack()}
        renderLeftButton={() => (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M11.67 3.8701L9.9 2.1001L0 12.0001L9.9 21.9001L11.67 20.1301L3.54 12.0001L11.67 3.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        customTextStyle={{
          fontFamily: FONTFAMILY.title.semibold,
          fontSize: SIZES.h4,
        }}
      />
      <Hr />
      <Formik
        initialValues={{
          day_id: dayId?.id,
          client: client ? client : {},
          services: [maintenanceNewOrder],
          date: {
            label: isSelectedDate ? transformDate('RU', isSelectedDate) : '',
            value: isSelectedDate ? transformDate('RU', isSelectedDate) : '',
          },
          time: {
            start: isSelectedTime ? isSelectedTime : '',
            end: '',
          },
        }}
        onSubmit={values => {
          fecthCreateOrder(values);
        }}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => (
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {/* Клиент */}
              <ClientBlock />
              {/* Услуги */}
              <ServicesBlock />
              {/* Дата и время */}
              <DateAndTimeBlock />
            </ScrollView>
            <View
              style={{
                paddingHorizontal: SIZES.padding * 1.6,
                paddingVertical: SIZES.padding * 1.6,
              }}>
              <CustomButton onPress={handleSubmit} type="primary" label="Добавить запись" status={status} />
            </View>
            <CroppedModalWindow
              type="center"
              name="save"
              isVisible={isVisibleAlertModal}
              component={AlertModal}
              onClose={() => setIsVisibleAlertModal(false)}
            />
          </View>
        )}
      </Formik>
    </MainLayouts>
  );
};

export default NewOrder;
