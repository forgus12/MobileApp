import * as Yup from 'yup';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { Text, View } from 'react-native';

import { CroppedModalWindow, CustomButton, SelectField } from '../../../components';
import { APIStatus } from '../../../lib/axiosAPI';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { SIZES } from '../../../constants';
import { useUpdateBreak } from '../hooks/useUpdateBreak';
import { RootState, useSelector } from '../../../store';
import { MiniCalendarModal, TimePickerModal } from '../../AppendBreak/modals';
import { TimePickerAllTime } from '../../AppendBreak/static/static';
import { getEndTime } from '../helpers/calc';
import { transformDate } from '../../WorkSchedule/helpers/dateFormat';
import AlertModal from '../../NewOrder/modals/AlertModal';

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
        end: Yup.string().required(),
        start: Yup.string().required(),
      }),
    }),
  }),
});

const EditBreakModal: React.FC<IProps> = ({ data, closeModal, breaks }) => {
  const { fetch: updateBreak, status } = useUpdateBreak();

  const formikRef = React.useRef<any>(null);
  const [isVisibleDateModal, setIsVisibleDateModal] = React.useState<boolean>(false);
  const [isVisibleTimeStartModal, setIsVisibleTimeStartModal] = React.useState<boolean>(false);
  const [isVisibleTimeEndModal, setIsVisibleTimeEndModal] = React.useState<boolean>(false);
  const { resetAllOrder } = calendarActionCreators();
  const endTime = getEndTime(data?.data?.interval[data?.data?.interval.length - 1], 15);
  const [isVisibleAlertModal, setIsVisibleAlertModal] = React.useState<boolean>(false);

  const thisBreaks = breaks?.filter(n => {
    if (n?.start == data?.data?.interval[0]) {
      return n;
    }
  });
  React.useEffect((): any => {
    if (status === APIStatus.Success) {
      const formik = formikRef.current;
      const { value } = formik.getFieldProps();
      closeModal();
      return () => resetAllOrder();
    } else if (status === APIStatus.Failure) {
      setIsVisibleAlertModal(true);
    }
  }, [status]);

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          day_id: data?.datas?.id,
          single_id: thisBreaks[0]?.single_id,
          break: {
            date: {
              label: transformDate('RU', data?.isSelectedDate),
              value: transformDate('RU', data?.isSelectedDate),
            },
            time: {
              start: thisBreaks[0] ? thisBreaks[0]?.start : data?.data?.interval[0],
              end: thisBreaks[0] ? thisBreaks[0]?.end : endTime,
            },
          },
        }}
        onSubmit={values => updateBreak(values)}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => (
          <>
            <View
              style={{
                flex: 1,
                paddingTop: SIZES.padding * 2.4,
                paddingBottom: SIZES.padding * 1.6,
                paddingHorizontal: SIZES.padding * 1.6,
              }}>
              <SelectField
                onPress={() => setIsVisibleDateModal(true)}
                type="default"
                label="Дата"
                name="break.date.label"
                sequentialError
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <SelectField
                  onPress={() => setIsVisibleTimeStartModal(true)}
                  type="default"
                  label="Время начала"
                  name="break.time.start"
                  sequentialError
                  customContainerStyle={{
                    width: '49%',
                  }}
                />
                <SelectField
                  onPress={() => setIsVisibleTimeEndModal(true)}
                  type="default"
                  label="Время окончания"
                  name="break.time.end"
                  sequentialError
                  customContainerStyle={{
                    width: '49%',
                  }}
                />
              </View>
              <CustomButton onPress={handleSubmit} type="primary" label={'Сохранить'} status={status} />
            </View>
            <CroppedModalWindow
              type="bottom"
              name="break.date"
              isVisible={isVisibleDateModal}
              component={MiniCalendarModal}
              onClose={() => setIsVisibleDateModal(false)}
            />
            <CroppedModalWindow
              data={TimePickerAllTime}
              type="bottom"
              name="break.time.start"
              isVisible={isVisibleTimeStartModal}
              component={TimePickerModal}
              onClose={() => setIsVisibleTimeStartModal(false)}
            />
            <CroppedModalWindow
              data={TimePickerAllTime}
              type="bottom"
              name="break.time.end"
              isVisible={isVisibleTimeEndModal}
              component={TimePickerModal}
              onClose={() => setIsVisibleTimeEndModal(false)}
            />
            <CroppedModalWindow
              type="center"
              name="save"
              isVisible={isVisibleAlertModal}
              component={AlertModal}
              onClose={() => setIsVisibleAlertModal(false)}
            />
          </>
        )}
      </Formik>
    </>
  );
};

export default EditBreakModal;
