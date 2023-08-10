import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useFetchDateFreeHoursRecordScreen, useFetchRecordScreen } from './hooks/useFetchRecordScreen';
import { useFetchCheckForDuplicates } from './hooks/useFetchCheckForDuplicates';
import { recordScreenActionCreators } from '../../slices/recordScreenSlice';
import NavbarRecordScreen from '../../components/NavbarRecordScreen';
import RightIconButton from '../../assets/icons/svgIcons/rightIconButton';
import AddButtonCircle from '../../assets/icons/svgIcons/addButtonCircle';
import AddServiceCard from '../../components/AddServiceCard';
import DeleteIcon from '../../assets/icons/svgIcons/deleteIcon';
import ModalCalendar from './modals/ModalCalendar/ModalCalendar';
import ModalDuplicate from './modals/ModalDuplicate';
import ItemRecordScreenFreeTime from '../../components/ItemRecordScreenFreeTime';
import calendarLocaleConfig from '../../localization/calendarLocaleConfig';
import { COLORS, SIZES } from '../../constants';
import { useRoute } from './useRoute';
import { WrapperAsyncRequest } from '../../layouts';

const RecordScreen = ({ navigation, route }) => {
  const roles = useSelector(s => s.authentication.isAuthenticated.data);
  const image_url = route?.params?.avatar;
  const [isIcon, setIsIcon] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [existSelected, setExistSelected] = useState(false);
  const [isThisCountPrice, setIsThisCountPrice] = useState(false);
  const [isModalCalendar, setIsModalCalendar] = useState(false);
  const [isModalDuplicateVisible, setIsModalDuplicateVisible] = useState(false);
  const [priceCount, setPriceCount] = useState([]);
  const [thisCountPriceCount, setThisCountPriceCount] = useState([]);
  const [calendarValue, setCalendarValue] = useState('Дата и время');
  const [durationSumHours, setDurationSumHours] = useState([]);
  const [durationSumMinutes, setDurationSumMinutes] = useState([]);
  const [dateInFetch, setDateInFetch] = useState('');
  const [valueClickedTime, setValueClickedTime] = useState();
  const [indexClickedTime, setIndexClickedTime] = useState();
  const [indexTwoArrTime, setIndexTwoArrTime] = useState();
  const [dataFindCalendar, setDataFindCalendar] = useState();
  const [timeFindCalendar, setTimeFindCalendar] = useState();
  const [valueItem, setValueItem] = useState('');
  const [inFetchFreeHours, setInFetchFreeHours] = useState(0);
  const [inFetchFreeMinute, setInFetchFreeMinute] = useState(0);
  const [freeMinutesInFetch, setFreeMinutesInFetch] = useState(0);
  const [idService, setIdService] = useState([]);

  const { card, freeHours, duplicates: duplicateData } = useSelector(({ recordScreen }) => recordScreen);
  const { changeSelected, setArgsCreateHistoryCard, getRecordScreenService, setSelectedCard, getFreeHoursInDays } =
    recordScreenActionCreators();
  const { fetchRecordScreenService, status } = useFetchRecordScreen();
  const { fetchFreeHoursDateRecordScreen, status: statusFetchFreeHoursDateRecordScreen } =
    useFetchDateFreeHoursRecordScreen();
  const { fetchCheckForDuplicates } = useFetchCheckForDuplicates();
  const { idSpecialist, textColor, color, color2, history: cardHistory, idSelected } = useRoute(route);
  let today = new Date();
  today = moment(today, true).format('YYYY-MM-DD');
  let day = calendarValue?.slice(0, 10)?.split('.')?.reverse()?.join('-');
  function handleSelected(id) {
    changeSelected({ id });
  }

  const checkForDuplicates = () => {
    day != 'Дата и вре' && idService.length && fetchCheckForDuplicates(idSpecialist, day, dateInFetch, idService);
  };

  const requestCreateAppointmentHistory = () => {
    if (!!duplicateData.length && duplicateData[0]?.status !== 'cancelled') {
      setIsModalDuplicateVisible(true);
    } else {
      if (roles.role == 'specialist') {
        navigation.navigate('Визитница', route);
      } else {
        navigation.navigate('Vizitnica', route);
      }
      getRecordScreenService([]);
    }
  };

  const x = (item, ind, indexTime) => {
    return (
      valueClickedTime === item &&
      ind === indexClickedTime &&
      indexTime === indexTwoArrTime &&
      calendarValue !== 'Дата и время' &&
      calendarValue.length > 13
    );
  };

  const countHours = () => {
    setInFetchFreeHours(
      card
        .filter(item => item.selected)
        .reduce((acc, item) => +acc + +item?.time?.hours * 60 * item.countServices.length, 0),
    );
  };

  const countMinute = () => {
    setInFetchFreeMinute(
      card
        .filter(item => item.selected)
        .reduce((acc, item) => +acc + +item.time.minutes * item.countServices.length, 0),
    );
  };

  const countInFetchMinutes = () => {
    setFreeMinutesInFetch(inFetchFreeHours + inFetchFreeMinute);
  };

  useEffect(() => {
    getFreeHoursInDays([]);
    setCalendarValue('Дата и время');
  }, [existSelected, idService.length]);

  useEffect(() => {
    setExistSelected(card.some(item => item.selected));
    setIsThisCountPrice(card.some(item => item?.thisCountPrice?.value));

    setDurationSumHours(
      card.filter(item => item.selected).reduce((acc, item) => +acc + +item.time.hours * item.countServices.length, 0),
    );

    let minutes = card
      .filter(item => item.selected)
      .reduce((acc, item) => +acc + +item.time.minutes * item.countServices.length, 0);

    if (minutes < 60) {
      setDurationSumMinutes(minutes);
    } else {
      setDurationSumMinutes(minutes % 60);
      setDurationSumHours(durationSumHours => durationSumHours + Math.floor(minutes / 60));
    }
    setPriceCount(
      card
        .filter(item => item.selected)
        .reduce((acc, item2) => {
          return +acc + +item2.price * item2.countServices.length;
        }, 0),
    );
    setThisCountPriceCount(
      card
        .filter(item => item.selected)
        .reduce(
          (acc, item2) => +acc + +(item2.price - item2.price * item2.thisCountPrice.value) * item2.countServices.length,
          0,
        ),
    );
    countHours();
    countMinute();
    countInFetchMinutes();
  }, [existSelected, card, cardHistory]);

  useEffect(() => {
    image_url ? setIsIcon(true) : setIsIcon(false);
    card.length === 1 ? changeSelected({ id: 0 }) : null;

    fetchRecordScreenService(idSpecialist);
  }, []);

  useEffect(() => {
    if (card.length === 1) {
      setSelectedCard([card[0]?.id]);
    }
  }, [freeHours]);

  useEffect(() => {
    calendarValue.length < 13 ? setIsDisabled(true) : setIsDisabled(false);
    checkForDuplicates();
    setArgsCreateHistoryCard({ idSpecialist, day, dateInFetch, idService });
  }, [calendarValue]);
  useEffect(() => {
    setSelectedCard(idSelected);
  }, [idSelected.length]);

  useEffect(() => {
    freeMinutesInFetch && fetchFreeHoursDateRecordScreen(today, idSpecialist, freeMinutesInFetch);
  }, [freeMinutesInFetch]);

  useEffect(() => {
    const idService = [];
    card
      .filter(item => {
        if (item.selected) {
          return item.id;
        }
      })
      .map(item => item.countServices.map(() => idService.push(item.id)));
    setIdService(idService);
  }, [card]);
  function onPresss(id) {
    handleSelected(id);
  }
  return (
    <ScrollView style={styles.containerScroll}>
      <StatusBar animated={false} backgroundColor={color} barStyle={'light-content'} />

      {/*------ Услуга ---------*/}

      <View
        style={{
          backgroundColor: color,
          paddingTop: 32,
        }}>
        <NavbarRecordScreen
          navigation={navigation}
          header={'Запись'}
          url={image_url}
          icon={isIcon}
          stylesHeadersText={{ color: textColor }}
          colorButton={textColor}
          callback={() => {
            getRecordScreenService([]), getFreeHoursInDays([]);
          }}
          stylesHeader={{ paddingTop: 8 }}
        />
      </View>
      <WrapperAsyncRequest status={status}>
        {!existSelected ? (
          <TouchableOpacity
            style={[styles.containerTouchable, styles.notServiceButton]}
            onPress={() => navigation.navigate('AddService', route)}>
            <Text style={styles.title}>Услуга</Text>
            <RightIconButton color={color2} />
          </TouchableOpacity>
        ) : (
          <View style={{ marginTop: 12, marginRight: 10 }}>
            {card.map((item, index) => {
              return (
                item.selected &&
                item?.countServices?.map((items, indexs) => {
                  return (
                    <View key={indexs} style={styles.containerServices}>
                      <TouchableOpacity
                        style={[styles.containerTouchable, styles.allServices]}
                        onPress={() => navigation.navigate('AddService', { route, onPresss, index })}>
                        <View style={styles.containerTitleService}>
                          <Text style={[styles.title, styles.titleService]}>Услуга</Text>
                          <AddServiceCard item={item} isDash={!existSelected} isThisCountPrice={isThisCountPrice} />
                        </View>
                        <RightIconButton color={color2} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleSelected(index)}>
                        <DeleteIcon />
                      </TouchableOpacity>
                    </View>
                  );
                })
              );
            })}
          </View>
        )}

        {/*------ Добавить услугу ---------*/}

        <View style={styleAddService.container}>
          {card.length !== 1 ? (
            <View style={styleAddService.containerAddText}>
              <Text style={{ ...SIZES.h4, color: color2 }}>Добавить услугу</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddService', route)}>
                <AddButtonCircle color={color2} />
              </TouchableOpacity>
            </View>
          ) : null}
          {existSelected && (
            <View style={{ marginTop: 16 }}>
              <View style={styleAddService.containerAddText}>
                <Text style={{ color: '#787880' }}>Суммарная длительность:</Text>
                <Text style={{ color: '#1C1C1E' }}>
                  {`${durationSumHours ? durationSumHours + ' ч.' : ''}${
                    durationSumMinutes ? ' ' + durationSumMinutes + ' мин.' : ''
                  }`}
                </Text>
              </View>
              <View style={[styleAddService.containerAddText, { marginTop: 8 }]}>
                <Text style={{ color: '#787880' }}>Суммарная стоимость:</Text>
                {isThisCountPrice ? (
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        color: '#1C1C1E',
                      }}>
                      {priceCount} ₽
                    </Text>
                    <Text style={{ marginLeft: 4, color: '#BB3D39' }}>{thisCountPriceCount} ₽</Text>
                  </View>
                ) : (
                  <Text style={{ color: '#1C1C1E' }}>{priceCount} ₽</Text>
                )}
              </View>
            </View>
          )}
        </View>

        {/*------ вибор дата ---------*/}

        {/* {existSelected ? ( */}
        {/* <ScrollView style={{ flexDirection: 'row', flexWrap: 'nowrap' }} horizontal={true}>
        {freeHours?.map((obj, ind) => {
          return obj[Object.keys(obj)[0]].map((item, indexTime) =>
            x(item, ind, indexTime) ? (
              <ItemRecordScreenFreeTime
                valueDate={Object.keys(obj)[0]}
                disabled={!existSelected}
                durationSumHours={durationSumHours}
                durationSumMinutes={durationSumMinutes}
                time={item}
                setDateInFetch={setDateInFetch}
                data={`${Object.keys(obj)[0]?.split('-')?.reverse().join('.').slice(0, 5)}, `}
                key={item}
                index={ind}
                indexTime={indexTime}
                setCalendarValue={setCalendarValue}
                setValueClickedTime={setValueClickedTime}
                setIndexClickedTime={setIndexClickedTime}
                setIndexTwoArrTime={setIndexTwoArrTime}
                setTimeFindCalendar={setTimeFindCalendar}
                setDataFindCalendar={setDataFindCalendar}
                setValueItem={setValueItem}
                colorText={'white'}
                backgroundColorButton={color2}
              />
            ) : (
              <ItemRecordScreenFreeTime
                valueDate={Object.keys(obj)[0]}
                disabled={!existSelected}
                durationSumHours={durationSumHours}
                durationSumMinutes={durationSumMinutes}
                time={item}
                setDateInFetch={setDateInFetch}
                data={`${Object.keys(obj)[0]?.split('-')?.reverse().join('.').slice(0, 5)}, `}
                key={item}
                index={ind}
                indexTime={indexTime}
                setCalendarValue={setCalendarValue}
                setValueClickedTime={setValueClickedTime}
                setIndexClickedTime={setIndexClickedTime}
                setIndexTwoArrTime={setIndexTwoArrTime}
                setDataFindCalendar={setDataFindCalendar}
                setTimeFindCalendar={setTimeFindCalendar}
                setValueItem={setValueItem}
              />
            ),
          );
        })}
      </ScrollView> */}
        {/* ) : null} */}

        {/*------ Календарь ---------*/}

        <View style={styleCalendarButton.container}>
          <TouchableOpacity
            disabled={!existSelected}
            style={
              existSelected
                ? styleCalendarButton.blockTouchable
                : [styleCalendarButton.blockTouchable, { backgroundColor: COLORS.lightGray }]
            }
            onPress={() => setIsModalCalendar(!isModalCalendar)}>
            {calendarValue === 'Дата и время' ? (
              <View style={[styleCalendarButton.placeholder, { width: '100%' }]}>
                <Text style={styles.title}>{calendarValue}</Text>
                <RightIconButton color={existSelected ? color2 : COLORS.gray} />
              </View>
            ) : (
              <View style={[styleCalendarButton.placeholder, { paddingBottom: 12 }]}>
                <View>
                  <Text style={{ fontSize: 12, color: '#787880' }}>Дата и время</Text>
                  <Text style={styleCalendarButton.calendarValue}>{calendarValue}</Text>
                </View>
                <RightIconButton color={existSelected ? color2 : COLORS.gray} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isDisabled}
            onPress={() => {
              requestCreateAppointmentHistory();
            }}
            style={
              !isDisabled
                ? [styleCalendarButton.button, { backgroundColor: color2 }]
                : [styleCalendarButton.button, { backgroundColor: color2, opacity: 0.5 }]
            }>
            <Text
              style={{
                fontFamily: 'SFProDisplay-Bold',
                fontSize: SIZES.h3,
                lineHeight: 20.29,
                color: COLORS.white,
                paddingTop: 1,
              }}>
              Записаться
            </Text>
          </TouchableOpacity>
        </View>
      </WrapperAsyncRequest>
      <GestureRecognizer onSwipeUp={() => setIsModalCalendar(true)} onSwipeDown={() => setIsModalCalendar(false)}>
        <ModalCalendar
          colorLeftRightIcon={color2}
          localesCalendar={calendarLocaleConfig}
          visible={isModalCalendar}
          setModalVisible={setIsModalCalendar}
          setDateInFetch={setDateInFetch}
          updateData={setCalendarValue}
          calendarData={calendarValue}
          durationSumHours={durationSumHours}
          durationSumMinutes={durationSumMinutes}
          fetchFreeHoursDateRecordScreen={fetchFreeHoursDateRecordScreen}
          freeMinutesInFetch={freeMinutesInFetch}
          idSpecialist={idSpecialist}
          setIndexClickedTime={setIndexClickedTime}
          setIndexTwoArrTime={setIndexTwoArrTime}
          setValueClickedTime={setValueClickedTime}
          valueClickedTime={valueClickedTime}
          checkDataInPage={calendarValue.substring(0, 10).split('.').reverse().join('-')}
          dataFindCalendar={dataFindCalendar}
          setDataFindCalendar={setDataFindCalendar}
          setTimeFindCalendar={setTimeFindCalendar}
          timeFindCalendar={timeFindCalendar}
          setValueItem={setValueItem}
          valueItem={valueItem}
          statusFetchFreeHoursDateRecordScreen={statusFetchFreeHoursDateRecordScreen}
        />
      </GestureRecognizer>
      <ModalDuplicate
        visible={isModalDuplicateVisible}
        setModalVisible={setIsModalDuplicateVisible}
        navigation={navigation}
        route={route}
        calendarValue={calendarValue}
        duplicateData={duplicateData}
        getRecordScreenService={getRecordScreenService}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    backgroundColor: COLORS.white,
    height: '100%',
  },
  containerServices: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 6,
  },
  containerTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    margin: SIZES.margin,
  },
  OneServiceButton: {
    flex: 1,
    marginBottom: 0,
    marginTop: 4,
    paddingRight: 16,
  },
  notServiceButton: {
    height: 74,
    padding: SIZES.padding * 1.6,
  },
  allServices: {
    height: 90,
    marginBottom: 0,
    marginTop: 4,
    paddingRight: 16,
  },
  containerTitleService: {
    width: '90%',
  },
  title: {
    ...SIZES.body1,
    color: COLORS.gray,
  },
  titleService: {
    padding: SIZES.padding * 1.6,
    paddingBottom: 0,
    paddingTop: 32,
  },
});

const styleAddService = StyleSheet.create({
  container: {
    padding: SIZES.padding * 1.6,
    flexDirection: 'column',
  },
  containerAddText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const styleCalendarButton = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  blockTouchable: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    height: 56,
    borderRadius: SIZES.radius * 1.6,
    margin: SIZES.margin,
    marginTop: 0,
    padding: SIZES.padding * 1.6,
  },
  placeholder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarValue: {
    ...SIZES.body1,
    color: COLORS.black,
    paddingTop: 2,
  },
  button: {
    alignItems: 'center',
    height: 56,
    borderRadius: 100,
    margin: SIZES.margin,
    padding: SIZES.padding * 1.6,
  },
});

export default RecordScreen;
