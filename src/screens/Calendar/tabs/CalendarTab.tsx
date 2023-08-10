import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { Text, TouchableOpacity, View } from 'react-native';

import calendarLocaleConfig from '../../../localization/calendarLocaleConfig';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { RootState, useSelector } from '../../../store';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useFetchSvgByMonth } from '../hooks/useFetchSvgByMonth';
import { getCurrentDate } from '../helpers/dateFormat';
import { WrapperAsyncRequest } from '../../../layouts';
import { useToast } from 'react-native-toast-notifications';
import { isEmpty } from 'lodash';

LocaleConfig.locales['ru'] = calendarLocaleConfig;
LocaleConfig.defaultLocale = 'ru';

const currentDate = getCurrentDate();

interface IProps {
  navigation?: NavigationType;
}

const CalendarTab: React.FC<IProps> = ({ navigation }) => {
  const { fetch: fetchSvgByMonth, status } = useFetchSvgByMonth();
  const { svgByMonth } = useSelector((s: RootState) => s?.calendar);
  const [markedDates, setMarkedDates] = React.useState({});
  const moment = require('moment');
  const toast = useToast();

  React.useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      if (!isEmpty(toast)) {
        toast.hideAll();
      }
    });
    return unsubscribe;
  }, []);

  //  <!--- INDICATORS ---!>
  // const renderSvg = React.useCallback(
  //   (currentDate: any) =>
  //     svgByMonth?.data && (
  //       <Svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: [{ rotate: '144deg' }] }}>
  //         {svgByMonth?.data[currentDate.dateString]?.map((item: any, index: number) => {
  //           return (
  //             <Circle
  //               r="15.9"
  //               cx="50%"
  //               cy="50%"
  //               fill="none"
  //               strokeWidth={svgByMonth?.data[currentDate.dateString].length - 1 === index ? '5' : '4'}
  //               stroke={item.stroke}
  //               strokeDasharray={`${item.strokeDasharray} 100`}
  //               strokeDashoffset={item.strokeDashoffset}
  //               key={index}
  //             />
  //           );
  //         })}
  //       </Svg>
  //     ),
  //   [svgByMonth?.data],
  // );

  const getDisabledDays = React.useCallback((year: number, daysIndexes: Array<number>) => {
    let pivot = moment()
      .month(0)
      .year(year - 5)
      .startOf('month');
    const end = moment()
      .month(11)
      .year(year + 5)
      .endOf('month');
    let dates: any = {};
    const disabled = { disabled: true, disableTouchEvent: true };
    while (pivot.isBefore(end)) {
      daysIndexes.forEach(day => {
        const copy = moment(pivot);
        dates[copy.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }
    setMarkedDates(dates);
    return dates;
  }, []);

  let initDate = new Date();
  let disabledDaysIndexes = [6, 7];

  React.useEffect(() => {
    getDisabledDays(initDate.getFullYear(), disabledDaysIndexes);
  }, []);

  return (
    <CalendarList
      dayComponent={({ date, state }: any) => {
        return (
          // <WrapperAsyncRequest status={status}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('AgendaTab', {
                currentDate: date.dateString,
              });
            }}
            activeOpacity={0.8}
            style={{
              position: 'relative',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: 36,
              height: 36,
              opacity: date.dateString < currentDate ? 0.5 : 1,
            }}>
            {/*  <!--- INDICATORS ---!>   */}
            {/* <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}>
                {renderSvg(date)}
              </View> */}
            <Text
              style={{
                fontFamily: FONTFAMILY.text.semibold,
                fontSize: SIZES.body4,
                textAlign: 'center',
                color: Object.keys(markedDates).find(item => item === date.dateString) ? COLORS.red : COLORS.text,
              }}>
              {date.day}
            </Text>
          </TouchableOpacity>
          // </WrapperAsyncRequest>
        );
      }}
      pastScrollRange={50}
      futureScrollRange={50}
      scrollEnabled={true}
      showScrollIndicator={true}
      hideDayNames={true}
      firstDay={1}
      theme={{
        'stylesheet.calendar.header': {
          // @ts-ignore
          header: {
            alignItems: 'flex-start',
            marginTop: SIZES.padding * 3,
            marginBottom: SIZES.padding * 1.2,
          },
        },
        'stylesheet.calendar-list.main': {
          calendar: {
            paddingHorizontal: SIZES.padding * 1.6,
          },
        },
      }}
    />
  );
};

export default CalendarTab;
