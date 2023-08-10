import React from 'react';
import { useFormikContext, useField } from 'formik';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { Picker } from '../../../components';
import { AccordionModal } from '../../../layouts';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { IWorkSheduleObject } from '../../../slices/workShedule';

import { TimePickerAllTime } from '../static/static';

interface IProps {
  name: string;
  closeModal: () => void;
}

const WorkingHoursModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue, values }: { setFieldValue: any; values: any } = useFormikContext();
  const [field, meta] = useField<any>(name);
  const [TimeBefore, setTimeBefore] = React.useState<string>('');
  const [TimeAfter, setTimeAfter] = React.useState<string>('');
  const [warning, setWarning] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (warning === 'time difference') {
      Alert.alert('', 'Время начала должно быть меньше времени окончания', [{ text: 'OK' }]);
    }
    if (warning === 'working day limits') {
      Alert.alert('', 'Перерыв должен быть в пределах рабочего времени', [{ text: 'OK' }]);
    }
    if (warning === 'already have a break') {
      Alert.alert('', 'Уже есть перерыв в это время', [{ text: 'OK' }]);
    }
    return () => {
      setWarning(null);
    };
  }, [warning]);

  const handleOnPress = React.useCallback(() => {
    const index: string | null = name.includes('flexibleSchedule')
      ? name.slice(22, 23)
      : name.includes('slidingSchedule')
      ? name.slice(21, 22)
      : null;

    const schedule = name.includes('flexibleSchedule')
      ? values.flexibleSchedule
      : name.includes('slidingSchedule')
      ? values.slidingSchedule
      : values.standardSchedule;

    if (TimeBefore >= TimeAfter) {
      setWarning('time difference');
    } else if (TimeBefore === TimeAfter) {
      setWarning('same time');
    }
    //если гибкий и скользящий график
    else if (name.includes('breaks', 1) && (values.type.value === 'sliding' || values.type.value === 'flexible')) {
      setFieldValue(name, { start: TimeBefore, end: TimeAfter });
      closeModal();
      // if (schedule.breakType.value === 'individual') {
      //   //перерыв не пересекающийся с уже имеющимся
      //   if (schedule.data[index!].breaks.find(el => el.start === TimeBefore && el.end === TimeAfter)) {
      //     setWarning('already have a break');
      //   }
      //   //перерыв в пределах рабочего времени
      //   else if (schedule.data[index!].workTime.start > TimeBefore || schedule.data[index!].workTime.end < TimeAfter) {
      //     setWarning('working day limits');
      //   } else {
      //     setFieldValue(name, { start: TimeBefore, end: TimeAfter });
      //     closeModal();
      //   }
      // } else {
      //   schedule.data.map(item => {
      //     if (item.workTime.end && item.workTime.start) {
      //       if (schedule.breaks.find(el => el.start === TimeBefore && el.end === TimeAfter)) {
      //         setWarning('already have a break');
      //       } else if (item.workTime.start > TimeBefore || item.workTime.end < TimeAfter) {
      //         setWarning('working day limits');
      //       } else {
      //         setFieldValue(name, { start: TimeBefore, end: TimeAfter });
      //         closeModal();
      //       }
      //     }
      //   });
      // }
    } else if (name.includes('breaks', 1) && values.type.value === 'standard') {
      //если стандартный
      if (schedule.workTime.end && schedule.workTime.start) {
        schedule.breaks.map(breakTime => {
          setFieldValue(name, { start: TimeBefore, end: TimeAfter });
          closeModal();
          // if (
          //   (breakTime.start === TimeBefore && breakTime.end === TimeAfter) ||
          //   schedule.workTime.start > TimeBefore ||
          //   schedule.workTime.end < TimeAfter
          // ) {
          //   //setWarning('already have a break');
          //   setWarning('working day limits');
          // } else if (schedule.workTime.start > TimeBefore || schedule.workTime.end < TimeAfter) {
          //   setWarning('working day limits');
          // } else {
          //   setFieldValue(name, { start: TimeBefore, end: TimeAfter });
          //   closeModal();
          // }
        });
      }
    } else {
      setFieldValue(name, { start: TimeBefore, end: TimeAfter });
      closeModal();
    }
  }, [TimeBefore, TimeAfter, values]);

  return (
    <AccordionModal onPress={closeModal}>
      <View
        style={{
          width: '100%',
          backgroundColor: COLORS.backgroundPicker,
          borderRadius: SIZES.radius * 1.6,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLORS.grayBlue,
          }}>
          <Picker
            initialValue={meta.value.start ? meta.value.start : '10:00'}
            items={TimePickerAllTime}
            onChangeValue={value => setTimeBefore(value)}
            customContainerStyle={{ flex: 1 }}
          />
          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h3,
              color: COLORS.gray,
            }}>
            До
          </Text>
          <Picker
            initialValue={meta.value.end ? meta.value.end : '19:00'}
            items={TimePickerAllTime}
            onChangeValue={value => setTimeAfter(value)}
            customContainerStyle={{ flex: 1 }}
          />
        </View>
        <TouchableOpacity
          onPress={handleOnPress}
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.h2,
              color: COLORS.blue,
            }}>
            Установить
          </Text>
        </TouchableOpacity>
      </View>
    </AccordionModal>
  );
};

export default WorkingHoursModal;
