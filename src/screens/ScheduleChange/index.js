import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { PaginationCircle, CustomButton } from '../../components';
import { MainLayouts } from '../../layouts';
import { Calendar } from 'react-native-calendars';
import { calendarActionCreators } from '../../slices/calendarSlice';
import Svg, { Circle, Path } from 'react-native-svg';
import { useFetchSvgByMonth } from './hooks/useFetchSvgByMonth';

const ScheduleChange = ({ navigation, navigation: { goBack } }) => {
  const [selectDays, setSelectDays] = useState({});
  const { setSchedule } = calendarActionCreators();
  const [currentDay, setСurrentDay] = useState([new Date().toJSON().substring(0, 10)]);
  const { fetch, status } = useFetchSvgByMonth();
  const { svgByMonth } = useSelector(s => s?.calendar);

  // React.useEffect(() => {
  //   fetch(currentDay);
  // }, [currentDay]);

  // const renderSvg = React.useCallback(
  //   currentDate =>
  //     svgByMonth?.data && (
  //       <Svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: [{ rotate: '144deg' }] }}>
  //         {svgByMonth?.data[currentDate.dateString]?.map((item, index) => {
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

  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 44,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => goBack()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              width: 46,
              height: '100%',
              left: 0,
            }}>
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <Path
                d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
                fill="#38B8E0"
              />
            </Svg>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.bold,
              fontSize: SIZES.h3,
              lineHeight: 18,
              color: COLORS.text,
            }}>
            Изменение графика
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.lightGray,
            paddingBottom: 12,
            marginTop: SIZES.padding * 1.6,
          }}>
          <PaginationCircle data={[1, 0]} />
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.padding * 1.1,
              color: COLORS.gray,
              textAlign: 'center',
              marginHorizontal: 32,
              marginTop: SIZES.padding * 1.6,
            }}>
            Выберите дни, в которых хотите изменить рабочее время
          </Text>
        </View>
      </>
    );
  };

  const selectDate = day => {
    let newDates = selectDays;
    if (selectDays[day]) {
      delete newDates[day];
    } else {
      newDates[day] = {
        selected: true,
      };
    }
    setSelectDays({ ...newDates });
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      {renderHeader()}
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <Calendar
          firstDay={1}
          markingType={'multi-period'}
          hideExtraDays={true}
          onDayPress={day => {
            selectDate(day.dateString);
          }}
          onMonthChange={month => {
            setСurrentDay([month.dateString]);
          }}
          markedDates={selectDays}
          dayComponent={({ date, state }) => {
            return (
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 36,
                  height: 36,
                }}>
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    selectDate(date.dateString);
                  }}
                  style={{
                    width: '80%',
                    height: '80%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: selectDays[date.dateString] ? '#38B8E026' : COLORS.white,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      color: selectDays[date.dateString] ? COLORS.primary : COLORS.black,
                    }}>
                    {date.day}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          theme={{
            'stylesheet.calendar.header': {
              dayTextAtIndex5: {
                color: 'red',
              },
              dayTextAtIndex6: {
                color: 'red',
              },
            },
            textMonthFontWeight: 'bold',
          }}
        />

        <View style={{ marginBottom: SIZES.margin * 1.6, paddingHorizontal: SIZES.padding * 1.6 }}>
          <CustomButton
            status={status}
            onPress={() => {
              setSchedule(Object.keys(selectDays));
              navigation.navigate('ScheduleTimeChange');
            }}
            type="primary"
            label="Продолжить"
            disabled={Object.keys(selectDays).length === 0}
          />
        </View>
      </View>
    </MainLayouts>
  );
};

export default ScheduleChange;
