import React from 'react';
import { useFormikContext } from 'formik';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { View } from 'react-native';

import calendarLocaleConfig from '../../../localization/calendarLocaleConfig';
import { COLORS, SIZES } from '../../../constants';
import { transformDate } from '../../WorkSchedule/helpers/dateFormat';

LocaleConfig.locales['ru'] = calendarLocaleConfig;
LocaleConfig.defaultLocale = 'ru';

interface IProps {
  name: string;
  closeModal: () => void;
}

const currentDay = new Date().toJSON().substring(0, 10);

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
      <Calendar
        firstDay={1}
        hideExtraDays={true}
        markingType={'multi-period'}
        minDate={currentDay}
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
