import React from 'react';
import { useFormikContext, useField } from 'formik';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { Picker } from '../../../components';
import { AccordionModal } from '../../../layouts';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { TimePickerAllTime } from '../static/static';

interface IProps {
  name: string;
  closeModal: () => void;
}

const WorkingHoursModal: React.FC<IProps> = ({ name, closeModal }) => {
  const [field, meta] = useField<any>(name);
  const { setFieldValue } = useFormikContext();
  const [TimeBefore, setTimeBefore] = React.useState<string>('');
  const [TimeAfter, setTimeAfter] = React.useState<string>('');

  const handleOnPress = React.useCallback(() => {
    if (TimeBefore >= TimeAfter) {
      Alert.alert('', 'Время начала должно быть меньше времени окончания', [{ text: 'OK' }]);
    } else {
      setFieldValue(name, { start: TimeBefore, end: TimeAfter });
      closeModal();
    }
  }, [TimeBefore, TimeAfter]);
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
            initialValue={meta.value.start}
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
            initialValue={meta.value.end}
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
