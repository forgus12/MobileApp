import * as Yup from 'yup';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { isUndefined } from 'lodash';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Text, View, Alert } from 'react-native';

import { CroppedModalWindow, CustomButton, Hr, ScreenHeader, ToggleButton } from '../../components';
import { transformDate } from '../WorkSchedule/helpers/dateFormat';
import { APIStatus } from '../../lib/axiosAPI';
import { MainLayouts } from '../../layouts';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { calendarActionCreators } from '../../slices/calendarSlice';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

import { BreakBlock, WeekendBlock } from './blocks';
import { useAppendBreak } from './hooks/useAppendBreak';
import { RootState, useSelector } from '../../store';
import { ScheduledКecordingsModal } from './modals';
import falseAlertModal from '../../components/FalseAlertModal';
import { getEndTime } from '../Calendar/helpers/calc';
// import { getEndTime } from '../NewOrder/helpers/calc';

interface IProps {
  navigation: NavigationType;
  route: RouteProp<{ params: { isSelectedDate: string; isSelectedTime: string } }, 'params'>;
}

const validationSchema = Yup.object().shape({
  is_break: Yup.boolean(),
  break: Yup.object().when('is_break', {
    is: true,
    then: Yup.object().shape({
      date: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
      time: Yup.object().shape({
        start: Yup.string().required(),
        end: Yup.string().required(),
      }),
    }),
  }),
  weekend: Yup.object().when('is_break', {
    is: false,
    then: Yup.object().shape({
      start: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
      end: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    }),
  }),
});

const AppendBreak: React.FC<IProps> = ({ navigation, route }) => {
  const { fetch: appendBreak, status, error } = useAppendBreak();
  const { resetAllOrder, setNotification } = calendarActionCreators();
  const { data } = useSelector((s: RootState) => s?.appendBreak);
  const [isVisibleScheduledКecordingsModal, setIsVisibleScheduledКecordingsModal] = React.useState<boolean>(false);
  const [isVisibleFalseAlertBreak, setIsVisibleFalseAlertBreak] = React.useState<boolean>(false);
  const formikRef = React.useRef<any>(null);

  React.useEffect((): any => {
    const formik = formikRef.current;
    const { value } = formik.getFieldProps();

    if (status === APIStatus.Success) {
      navigation.navigate('Calendar', { notification: true });
      if (value.save === false) setNotification(true);
      return () => resetAllOrder();
    } else if (status === APIStatus.Failure) {
      if (error === 'Already was intersection break') {
        setIsVisibleFalseAlertBreak(true);
      } else if (error === 'Already was intersection weekend') {
        setIsVisibleScheduledКecordingsModal(true);
      }
    }
  }, [status]);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <ScreenHeader
        title="Создание перерыва"
        customTextStyle={{
          fontFamily: FONTFAMILY.title.semibold,
          fontSize: SIZES.h4,
        }}
        onPressLeftButton={() => navigation.goBack()}
        renderLeftButton={() => (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M11.67 3.8701L9.9 2.1001L0 12.0001L9.9 21.9001L11.67 20.1301L3.54 12.0001L11.67 3.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
      />
      <Formik
        innerRef={formikRef}
        initialValues={{
          is_break: true,
          save: null,
          break: {
            date: {
              label: !isUndefined(route.params) ? transformDate('RU', route.params.isSelectedDate) : '',
              value: !isUndefined(route.params) ? transformDate('RU', route.params.isSelectedDate) : '',
            },
            time: {
              start: route.params.isSelectedTime !== '' ? route.params.isSelectedTime : '10:00',
              end: route.params.isSelectedTime !== '' ? getEndTime(route.params.isSelectedTime, 15) : '10:15',
            },
          },
          weekend: {
            start: {
              label: '',
              value: '',
            },
            end: {
              label: '',
              value: '',
            },
          },
        }}
        onSubmit={values => {
          if (values?.break?.time?.end <= values?.break?.time?.start && values?.break?.time?.end) {
            Alert.alert('', 'Время начала должно быть меньше времени окончания', [{ text: 'OK' }]);
          } else {
            appendBreak(values);
          }
        }}
        validationSchema={validationSchema}>
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <View
              style={{
                paddingHorizontal: SIZES.padding * 1.6,
                paddingVertical: SIZES.padding * 1.6,
              }}>
              <ToggleButton
                names={['Перерыв', 'Выходной']}
                isEnabled={values.is_break}
                onChange={value => setFieldValue('is_break', value)}
              />
              <Text
                style={{
                  marginTop: SIZES.margin * 1.6,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.body4,
                  lineHeight: 16,
                  color: COLORS.gray,
                  textAlign: 'center',
                }}>
                {values.is_break
                  ? ' Освободите временной промежуток внутри одного рабочего дня'
                  : 'Освободите один или несколько полных рабочих дней'}
              </Text>
            </View>
            <Hr />

            <View
              style={{
                flex: 1,
                paddingTop: SIZES.padding * 2.4,
                paddingBottom: SIZES.padding * 1.6,
                paddingHorizontal: SIZES.padding * 1.6,
              }}>
              <View style={{ flex: 1 }}>{values.is_break ? <BreakBlock /> : <WeekendBlock />}</View>

              <CustomButton
                onPress={handleSubmit}
                type="primary"
                label={values.is_break ? 'Взять перерыв' : 'Взять выходной'}
                status={status}
              />
              <Text
                style={{
                  marginTop: SIZES.margin * 1.6,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.body6,
                  lineHeight: 14,
                  color: COLORS.gray,
                  textAlign: 'center',
                }}>
                Перерыв носит единичный характер и не вносит изменений в постоянный график работы
              </Text>
            </View>

            <CroppedModalWindow
              type="center"
              name="save"
              isVisible={isVisibleFalseAlertBreak}
              contentText="Указанный перерыв пересекается с существующей записью / перерывом. Пожалуйста, измените время."
              component={falseAlertModal}
              onClose={() => setIsVisibleFalseAlertBreak(false)}
            />
            <CroppedModalWindow
              type="center"
              name="save"
              isVisible={isVisibleScheduledКecordingsModal}
              component={ScheduledКecordingsModal}
              onClose={() => setIsVisibleScheduledКecordingsModal(false)}
            />
          </>
        )}
      </Formik>
    </MainLayouts>
  );
};

export default AppendBreak;
