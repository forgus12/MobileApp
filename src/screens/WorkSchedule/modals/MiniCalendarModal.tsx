import React from 'react';
import { useFormikContext } from 'formik';
import { View } from 'react-native';

import { MiniCalendar } from '../../../components';
import { COLORS, SIZES } from '../../../constants';

import {
  decrementDays,
  getCurrentDate,
  transformDate,
} from '../helpers/dateFormat';

interface IProps {
  name: string;
  closeModal: () => void;
}

const MiniCalendarModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.padding * 0.5,
        paddingHorizontal: SIZES.padding * 0.5,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        height: 380,
        width: '100%',
      }}>
      <MiniCalendar
        minDate={decrementDays(getCurrentDate(), 7)}
        onDayPress={day => {
          setFieldValue(name, {
            label: transformDate('RU', day.dateString),
            value: day.dateString,
          });
          closeModal();
        }}
      />
    </View>
  );
};

export default MiniCalendarModal;
