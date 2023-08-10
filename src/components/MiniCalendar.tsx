import React from 'react';
import { LocaleConfig, Calendar } from 'react-native-calendars';

import calendarLocaleConfig from '../localization/calendarLocaleConfig';
import { COLORS, FONTFAMILY, SIZES } from '../constants';

LocaleConfig.locales['ru'] = calendarLocaleConfig;
LocaleConfig.defaultLocale = 'ru';

interface DataI {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface IProps {
  minDate?: string;
  onDayPress?: (data: DataI) => void;
  dayComponent?: any;
}

const MiniCalendar: React.FC<IProps> = ({ minDate, onDayPress, dayComponent }) => {
  return (
    <Calendar
      firstDay={1}
      hideExtraDays={true}
      markingType={'multi-period'}
      minDate={minDate}
      dayComponent={dayComponent}
      onDayPress={onDayPress}
      theme={{
        'stylesheet.calendar.header': {
          week: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: SIZES.margin * 0.6,
            paddingVertical: SIZES.padding * 0.8,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: COLORS.border,
          },
          // @ts-ignore
          monthText: {
            fontFamily: FONTFAMILY.title.semibold,
            fontSize: SIZES.h4,
            color: COLORS.text,
          },
          dayHeader: {
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body5,
            color: COLORS.text,
          },
          dayTextAtIndex5: {
            color: COLORS.red,
          },
          dayTextAtIndex6: {
            color: COLORS.red,
          },
        },
        'stylesheet.day.basic': {
          text: {
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: SIZES.body4,
            color: COLORS.text,
          },
        },
        'stylesheet.calendar.main': {
          container: {
            paddingLeft: 0,
            paddingRight: 0,
          },
          monthView: {
            marginTop: SIZES.margin * 2.4,
          },
        },
      }}
    />
  );
};

export default MiniCalendar;
