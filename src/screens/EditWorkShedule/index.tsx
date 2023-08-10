import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Formik } from 'formik';
import { View, ScrollView, Alert } from 'react-native';
import * as Yup from 'yup';

import { APIStatus } from '../../lib/axiosAPI';
import { CustomButton, ScreenHeader, CroppedModalWindow, ModalAlert } from '../../components';
import falseAlertModal from '../../components/FalseAlertModal';
import UpdateModal from './modals/UpdateModal';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { WrapperSlideHandler } from '../Settings/layouts';

import {
  StaticContentBlock,
  StandardScheduleBlock,
  FlexibleScheduleBlock,
  SlidingScheduleBlock,
} from '../WorkSchedule/blocks';
import { flexibleSchedule, slidingSchedule, standardSchedule } from '../WorkSchedule/static/static';
import { useFetchUpdateWorkShedule } from './hooks/useFetchUpdateWorkShedule';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const validationSchema = Yup.object().shape({
  type: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }),
  standardSchedule: Yup.object().shape({
    workTime: Yup.object().shape({
      start: Yup.string().required(),
      end: Yup.string().required(),
    }),
    breaks: Yup.array().test('standardSchedule', 'errorMessage', function (breaksVal) {
      const { workTime } = this.parent;
      let validity = true;
      if (this.from[1].value.type.value === 'standard') {
        breaksVal?.map(item => {
          item.start >= workTime.start && item.end <= workTime.end ? (validity = true) : (validity = false);
        });
      }
      return !validity ? Alert.alert('', 'Перерыв должен быть в пределах рабочего времени', [{ text: 'OK' }]) : true;
    }),
  }),
  slidingSchedule: Yup.object().shape({
    data: Yup.array().of(
      Yup.object().shape({
        workTime: Yup.object().shape({
          start: Yup.string().nullable(),
          end: Yup.string().nullable(),
        }),
        breaks: Yup.array().test('slidingSchedule', 'errorMessage', function (breaksVal) {
          const { workTime } = this.parent;
          let validity = true;
          if (this.from[2].value.type.value === 'sliding') {
            if (workTime.start && workTime.end) {
              breaksVal?.map(item => {
                item.start >= workTime.start && item.end <= workTime.end ? (validity = true) : (validity = false);
              });
            }
          }
          return !validity
            ? Alert.alert('', 'Перерыв должен быть в пределах рабочего времени', [{ text: 'OK' }])
            : true;
        }),
      }),
    ),
  }),
  flexibleSchedule: Yup.object().shape({
    data: Yup.array().of(
      Yup.object().shape({
        workTime: Yup.object().shape({
          start: Yup.string().nullable(),
          end: Yup.string().nullable(),
        }),
        breaks: Yup.array().test('flexibleSchedule', 'errorMessage', function (breaksVal) {
          const { workTime } = this.parent;
          let validity = true;
          if (this.from[2].value.type.value === 'flexible') {
            if (workTime.start && workTime.end) {
              breaksVal?.map(item => {
                item.start >= workTime.start && item.end <= workTime.end ? (validity = true) : (validity = false);
              });
            }
          }
          return !validity
            ? Alert.alert('', 'Перерыв должен быть в пределах рабочего времени', [{ text: 'OK' }])
            : true;
        }),
      }),
    ),
  }),
});

interface IProps {
  navigation: NavigationType;
}

const EditWorkShedule: React.FC<IProps> = ({ navigation }) => {
  const { fetch: updateWorkShedule, status, error } = useFetchUpdateWorkShedule();
  const { myWorkShedule } = useSelector((s: RootState) => s?.workShedule);
  const [isVisibleFalseAlert, setIsVisibleFalseAlert] = React.useState<boolean>(false);
  const [isVisibleUpdateAlert, setIsVisibleUpdateAlert] = React.useState<boolean>(false);
  // const { fetch: fetchUpdateAlert, status: fetchStatusUpdateAlert } = useFetchUpdateWorkShedule();
  console.log(status, 'error');

  const [isVisibleFalseAlertBreak, setIsVisibleFalseAlertBreak] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsVisibleFalseAlertBreak(false);
    if (status === APIStatus.Success) {
      navigation.goBack();
    } else if (
      status === APIStatus.Failure &&
      error === 'users.work_schedule.exceptions.specialist.work_schedule_dublicate'
    ) {
      setIsVisibleFalseAlertBreak(true);
    }
    // if (status === APIStatus.Failure) {
    //   setIsVisibleFalseAlert(true);
    // }
  }, [status]);

  return (
    <WrapperSlideHandler navigation={navigation}>
      <ScrollView>
        <ScreenHeader
          title="Редактирование"
          customTextStyle={{
            fontSize: SIZES.h4,
            fontFamily: FONTFAMILY.title.semibold,
            lineHeight: 17.9,
          }}
          customContainerStyle={{
            borderBottomWidth: 1,
            // marginTop: 32,
            borderBottomColor: COLORS.border,
            marginBottom: SIZES.margin * 0.8,
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
        <Formik
          initialValues={{
            type: {
              label: myWorkShedule?.type?.label,
              value: myWorkShedule?.type?.value,
            },
            break_type: myWorkShedule?.break_type,
            smart_schedule: myWorkShedule?.smart_schedule,
            confirmation: myWorkShedule?.confirmation,
            cancel_appointment: {
              label: myWorkShedule?.cancel_appointment?.label,
              value: myWorkShedule?.cancel_appointment?.value,
            },
            limit_before: {
              label: myWorkShedule?.limit_before?.label,
              value: myWorkShedule?.limit_before?.value,
            },
            limit_after: {
              label: myWorkShedule?.limit_after?.label,
              value: myWorkShedule?.limit_after?.value,
            },

            // Стандартный график
            standardSchedule: myWorkShedule?.standardSchedule?.workTime?.start
              ? myWorkShedule?.standardSchedule
              : standardSchedule,
            // Гибкий график
            flexibleSchedule: myWorkShedule?.flexibleSchedule?.data
              ? myWorkShedule?.flexibleSchedule
              : flexibleSchedule,
            // Скользящий график
            slidingSchedule: myWorkShedule?.slidingSchedule?.data ? myWorkShedule?.slidingSchedule : slidingSchedule,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            updateWorkShedule(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}>
          {({ handleSubmit, values, errors }) => (
            <>
              <View
                style={{
                  paddingTop: SIZES.padding * 1.4,
                  paddingBottom: SIZES.padding * 1.6,
                }}>
                <StaticContentBlock />
                {values.type.value === 'standard' && <StandardScheduleBlock />}
                {values.type.value === 'flexible' && <FlexibleScheduleBlock />}
                {values.type.value === 'sliding' && <SlidingScheduleBlock />}
                <View
                  style={{
                    paddingTop: SIZES.padding * 2.4,
                    paddingHorizontal: SIZES.padding * 1.6,
                  }}>
                  <>
                    <CustomButton onPress={handleSubmit} type="primary" label="Подтвердить" status={status} />
                  </>
                </View>
              </View>
              <CroppedModalWindow
                type="center"
                name="save"
                isVisible={isVisibleFalseAlertBreak}
                contentText="Указанные перерывы пересекаются или дублируются"
                component={falseAlertModal}
                onClose={() => setIsVisibleFalseAlertBreak(false)}
              />
              <ModalAlert
                name="updateAlert"
                component={UpdateModal}
                isVisible={isVisibleUpdateAlert}
                onClose={() => setIsVisibleUpdateAlert(false)}
                onPress={() => {
                  handleSubmit(), setIsVisibleUpdateAlert(false);
                }}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </WrapperSlideHandler>
  );
};

export default React.memo(EditWorkShedule);
