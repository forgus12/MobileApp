import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/ru';
import { CustomDayComponent } from './CustomDayComponent';
import CustomWeekComponent from './CustomWeekComponent';
import RightIconButton from '../../../../assets/icons/svgIcons/rightIconButton';
import { COLORS, SIZES } from '../../../../constants';

const ModalCalendar = ({
  visible,
  setModalVisible,
  updateData,
  locales,
  localesCalendar,
  colorLeftRightIcon,
  durationSumHours,
  durationSumMinutes,
  calendarData,
  setDateInFetch,
  idSpecialist,
  fetchFreeHoursDateRecordScreen,
  setIndexClickedTime,
  setIndexTwoArrTime,
  setValueClickedTime,
  checkDataInPage,
  dataFindCalendar,
  setDataFindCalendar,
  setTimeFindCalendar,
  timeFindCalendar,
  setValueItem,
  valueItem,
  freeMinutesInFetch,
}) => {
  LocaleConfig.locales[locales] = localesCalendar;
  LocaleConfig.defaultLocale = locales;

  const [dateFetchHeader, setDateFetchHeader] = useState();
  const [dayInCalendar, setDayInCalendar] = useState();
  const [changeData, setChangeData] = useState();

  const freeHours = useSelector(({ recordScreen }) => recordScreen.freeHours);
  const initialDate = freeHours.length && moment(Object.keys(freeHours[0])[0], true).format('YYYY-MM-DD');

  let hours;
  let minutes;
  let addedMinute = 0;
  let hoursSum;
  let minutesSum;
  let dateCalendar = calendarData;
  dateCalendar = dateCalendar?.substring(0, 10).split('.').reverse().join('-');

  const handleFetch = month => {
    setDayInCalendar('Invalid date');
    let date = moment(Object.keys(freeHours[0])[0], true)
      .add(month === 'up' ? 1 : -1, 'month')
      .format('DD.MM.YYYY');
    fetchFreeHoursDateRecordScreen(date, idSpecialist, freeMinutesInFetch);
  };

  const changeState = () => {
    setTimeFindCalendar(0);
    setDataFindCalendar(0);
  };

  const checkTime = item => {
    hours = +item.split(':')[0];
    minutes = +item.split(':')[1];
    addedMinute = Math.floor((durationSumMinutes + minutes) / 60);
    hoursSum = durationSumHours + hours + addedMinute;
    minutesSum = durationSumMinutes + minutes;

    return { hours, minutes, addedMinute, hoursSum, minutesSum };
  };

  const addCalendar = useCallback(
    (date, marking) => {
      setDateFetchHeader(moment(date.dateString, true).add(1, 'month').format('DD.MM.YYYY'));
      return (
        <CustomDayComponent
          setModalVisible={setModalVisible}
          visible={visible}
          updateData={updateData}
          {...date}
          colorSelected={colorLeftRightIcon}
          freeHours={freeHours}
          calendarData={calendarData}
          selected={marking?.selected}
          fetchFreeHoursDateRecordScreen={fetchFreeHoursDateRecordScreen}
          freeMinutesInFetch={freeMinutesInFetch}
          idSpecialist={idSpecialist}
          setDateFetchHeader={setDateFetchHeader}
          setDataFindCalendar={setDataFindCalendar}
          dataFindCalendar={dataFindCalendar}
        />
      );
    },
    [visible, dataFindCalendar, freeHours, valueItem, changeData],
  );

  const renderDay = () => {
    return freeHours?.map((obj, index) => {
      if (Object.keys(obj)[0] === dateCalendar) {
        return (
          <View key={obj.id} style={styleRenderDay.container}>
            {obj[dateCalendar]?.map((item, ind) => {
              if (item) {
                const { hoursSum, minutesSum } = checkTime(item);
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setModalVisible(false);
                      updateData(
                        prev =>
                          `${prev.substring(0, 10)}  ${item} - ${
                            hoursSum.toString().length === 1 ? '0' + hoursSum : hoursSum
                          }:${
                            minutesSum < 60
                              ? minutesSum.toString().length === 1
                                ? minutesSum + '0'
                                : minutesSum
                              : (minutesSum % 60).toString().length === 1
                              ? (minutesSum % 60) + '0'
                              : minutesSum % 60
                          }`,
                      );
                      setValueItem(item);
                      setDateInFetch(item);
                      setIndexClickedTime(index);
                      setIndexTwoArrTime(ind);
                      setValueClickedTime(item);
                      setTimeFindCalendar(0);
                    }}
                    style={[
                      styleRenderDay.containerDayItem,
                      {
                        backgroundColor: valueItem === item || timeFindCalendar === item ? colorLeftRightIcon : 'white',
                      },
                    ]}>
                    <Text
                      style={{
                        color: valueItem === item || timeFindCalendar === item ? '#FFF' : '#000',
                      }}>
                      {' '}
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setValueItem(item)}
                    style={[styleRenderDay.containerDayItem, { backgroundColor: '#FFF' }]}>
                    <Text style={{ color: '#000' }}> {item}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        );
      }
    });
  };

  useEffect(() => {
    setDayInCalendar(
      dataFindCalendar
        ? moment(checkDataInPage).locale('ru').format('DD MMMM, dddd')
        : moment(dateCalendar, true).locale('ru').format('DD MMMM, dddd'),
    );
  }, [dateCalendar, checkDataInPage]);

  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      onBackdropPress={() => {
        setModalVisible(!visible);
      }}
      style={[
        styleModal.containerModal,
        {
          // flex:1,
          marginTop: calendarData === 'Дата и время' || (calendarData.length > 12 && !checkDataInPage) ? '100%' : '40%',
        },
        
      ]}>

        <View style={styleModal.container}>
        <ScrollView bounces={false}>
          <View style={styleModal.grayInSwipe}></View>
          <Calendar
            initialDate={initialDate}
            hideExtraDays={true}
            hideDayNames={true}
            firstDay={1}
            markedDates={{ [dateCalendar]: { selected: true } }}
            dayComponent={({ date, marking }) => addCalendar(date, marking)}
            renderArrow={e => {
              return e === 'right' ? (
                <View
                  onTouchStart={() => {
                    handleFetch('up');
                    changeState();
                    setValueItem(0);
                  }}
                  style={[styleModal.headerArrow, { left: -48, top: -54, padding: 20, marginTop: 20 }]}>
                  <RightIconButton color={colorLeftRightIcon} />
                </View>
              ) : (
                <View
                  onTouchStart={() => {
                    handleFetch('down');
                    changeState();
                    setValueItem(1);
                  }}
                  hitSlop={{ top: 100, bottom: 120, left: 80, right: 80 }}
                  style={[
                    styleModal.headerArrow,
                    {
                      rotation: 180,
                      transform: [{ rotate: '180deg' }],
                      right: -4,
                      top: -40,
                      padding: 20,
                      marginTop: 20,
                    },
                  ]}>
                  <RightIconButton color={colorLeftRightIcon} />
                </View>
              );
            }}
            renderHeader={date => {
              setChangeData(moment(date[0], true).format('MMM'));
              return <CustomWeekComponent localesCalendar={localesCalendar} date={date} />;
            }}
          />
                </ScrollView>
        </View>
        {dayInCalendar !== 'Invalid date' && (
          <View style={styleModal.selectedDayName}>
            <Text style={styleModal.selectedDayNameText}>{dayInCalendar !== 'Invalid date' ? dayInCalendar : ''}</Text>
          </View>
        )}
        {dayInCalendar !== 'Invalid date' && (
          <ScrollView style={{ backgroundColor: 'white' }}>
            {dayInCalendar !== 'Invalid date' && renderDay()}
          </ScrollView>
        )}

    </Modal>
  );
};

const styleRenderDay = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDayItem: {
    margin: 10,
    paddingTop: 6,
    paddingRight: 8,
    paddingBottom: 6,
    paddingLeft: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EAECEE',
  },
});

const styleModal = StyleSheet.create({
  containerModal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding * 0.5,
    paddingHorizontal: SIZES.padding * 0.5,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    height: 360,
  },
  grayInSwipe: {
    width: 40,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#E4E4E4',
    marginLeft: '45.5%',
  },
  headerArrow: {
    position: 'absolute',
    bottom: 20,
  },
  selectedDayName: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingBottom: 20,
  },
  selectedDayNameText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    color: '#000',
  },
});

export default ModalCalendar;
