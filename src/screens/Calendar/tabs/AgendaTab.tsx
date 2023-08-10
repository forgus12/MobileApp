import React from 'react';
import { isEmpty, isUndefined } from 'lodash';
import { useToast } from 'react-native-toast-notifications';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import RNRestart from 'react-native-restart';

import { RootState, useSelector } from '../../../store';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { MainLayouts, WrapperAsyncRequest } from '../../../layouts';
import { CroppedModalWindow } from '../../../components';
import { COLORS } from '../../../constants';
import { calendarActionCreators } from '../../../slices/calendarSlice';

import { OrderItemBlock, PlusBlock, WeekDaysBlock } from '../blocks';
import { WrapperSlideHandler } from '../layouts';
import { useFetchOrders } from '../hooks/useFetchOrders';
import { getCurrentDate } from '../helpers/dateFormat';
import { checkCurrentTime } from '../helpers/time';
import { checkIsBeforeDate, getNextDate, getPrevDate } from '../helpers/date';
import { useFetchWeekDays } from '../hooks/useFetchWeekDays';
import { NewOrderOrRecordModal } from '../modals';
import { useFetchGetBreak } from '../hooks/useFetchGetBreak';
import { useFetchGetDayID } from '../hooks/useFetchGetDayID';

const currentDate = getCurrentDate();

interface IProps {
  navigation?: NavigationType;
  route: RouteProp<{ params: { currentDate: string } }, 'params'>;
}

const AgendaTab: React.FC<IProps> = ({ navigation, route }) => {
  const { fetch: fetchDayID, status: dayStatus } = useFetchGetDayID();
  const { fetch: fetchWeekDays } = useFetchWeekDays();
  const { fetch: fetchAllOrders, status } = useFetchOrders();
  const { fetch: fetchAllBreaks, status: breakStatus } = useFetchGetBreak();

  const { weekDays, allOrders, notification, breaks } = useSelector((s: RootState) => s?.calendar);
  const [isSelectedDate, setIsSelectedDate] = React.useState<string>(currentDate);
  const [isSelectedTime, setIsSelectedTime] = React.useState<string>('');
  const [isVisibleNewOrderOrRecordModal, setIsVisibleNewOrderOrRecordModal] = React.useState<boolean>(false);
  const isBeforeDate = checkIsBeforeDate(isSelectedDate, currentDate);
  const refFlatList = React.useRef<FlatList>(null);
  const toast = useToast();
  const { setSchedule, setNotification } = calendarActionCreators();
  const [blockPlusBottom, setBlockPlusBottom] = React.useState(false);
  const [indexTime, setIndexTime] = React.useState<number>(36);
  const getItemLayout = React.useCallback((_: any, index: number) => {
    return { length: 33.1, offset: 33.1 * index, index };
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      if (currentDate < getCurrentDate()) {
        RNRestart.Restart();
      }
    }, 60000);
  }, []);

  React.useEffect(() => {
    fetchAllBreaks(isSelectedDate);
  }, [allOrders]);

  React.useEffect(() => {
    if (notification) {
      toast.show('Клиентам, у которых установлена Визитка, отправлено уведомление о том, что их записи были отменены', {
        type: 'default',
        duration: 6000,
        onClose: () => {
          setNotification(false);
        },
      });
    }
  }, [notification]);

  const showToast = React.useCallback(() => {
    if (!isEmpty(toast)) {
      toast.hideAll();
      setBlockPlusBottom(false);

      if (isSelectedDate !== currentDate) {
        let prevDate = getPrevDate(currentDate);
        let nextDate = getNextDate(currentDate);

        if (prevDate > isSelectedDate || nextDate < isSelectedDate) {
          setBlockPlusBottom(true);
          toast.show('Вернуться на текущую дату', {
            type: 'back',
            duration: 10000000,
            onPress: () => {
              if (weekDays?.data && weekDays?.data?.length > 0) {
                fetchWeekDays(currentDate);
              }
              setIsSelectedDate(currentDate);
            },
          });
        }
      }
    }
  }, [isSelectedDate, currentDate, weekDays]);

  React.useEffect(() => {
    if (!isUndefined(route.params)) {
      const timeout = setTimeout(() => {
        setIsSelectedDate(route.params.currentDate);
        if (weekDays?.data && weekDays?.data?.length > 0 && !weekDays?.data.includes(route.params.currentDate)) {
          fetchWeekDays(route.params.currentDate);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [route.params]);

  React.useEffect(() => {
    if (isEmpty(allOrders)) {
      fetchAllOrders(isSelectedDate);
    }
  }, [allOrders]);

  React.useEffect(() => {
    fetchDayID();
  }, [isSelectedDate]);

  React.useEffect(() => {
    if (!isEmpty(allOrders)) {
      fetchAllOrders(isSelectedDate);
    }
  }, [isSelectedDate]);

  React.useEffect(() => {
    showToast();
  }, [isSelectedDate, currentDate]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation?.addListener('focus', () => showToast());
  //   return unsubscribe;
  // });

  React.useEffect(() => {
    setSchedule([isSelectedDate]);
  }, [isSelectedDate]);

  React.useEffect(() => {
    setIndexTime(36);
    if (!isEmpty(allOrders)) {
      if (allOrders?.workSchedule[0]) {
        allOrders?.time_interval.map((item, i) => {
          if (checkCurrentTime(item, allOrders?.workSchedule[0])) {
            setIndexTime(i);
          }
          i++;
        });
      }
    }
  }, [allOrders]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
      {/* <MainLayouts> */}
      <WeekDaysBlock isSelectedDate={isSelectedDate} changeIsSelectedDate={(date: string) => setIsSelectedDate(date)} />

      <View
        style={{
          flex: 1,
          borderTopWidth: 1,
          borderColor: COLORS.border,
        }}>
        <PlusBlock
          onPress={() => {
            setIsSelectedTime('');
            setIsVisibleNewOrderOrRecordModal(true);
          }}
          styleBottomPluss={{ bottom: blockPlusBottom === false ? 16 : 70 }}
        />
        <WrapperAsyncRequest status={dayStatus}>
          <WrapperAsyncRequest status={status}>
            <WrapperAsyncRequest status={breakStatus}>
              <WrapperSlideHandler isSelectedDate={isSelectedDate} setIsSelectedDate={setIsSelectedDate}>
                <FlatList
                  initialScrollIndex={indexTime}
                  ref={refFlatList}
                  keyExtractor={(_, index) => String(index)}
                  data={allOrders.time_interval}
                  renderItem={({ item }) => (
                    <OrderItemBlock
                      isSelectedDate={isSelectedDate}
                      time={item}
                      breaks={breaks}
                      data={allOrders}
                      isBeforeDate={isBeforeDate}
                      onPress={() => {
                        setIsSelectedTime(item);
                        setIsVisibleNewOrderOrRecordModal(true);
                      }}
                    />
                  )}
                  initialNumToRender={25}
                  maxToRenderPerBatch={20}
                  removeClippedSubviews={true}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  getItemLayout={getItemLayout}
                />
              </WrapperSlideHandler>
            </WrapperAsyncRequest>
          </WrapperAsyncRequest>
        </WrapperAsyncRequest>
      </View>

      <CroppedModalWindow
        data={{ isSelectedDate: isSelectedDate, isSelectedTime: isSelectedTime }}
        type="bottom"
        navigation={navigation}
        Id={!weekDays?.data?.indexOf(isSelectedDate)}
        isVisible={isVisibleNewOrderOrRecordModal}
        component={NewOrderOrRecordModal}
        onClose={() => setIsVisibleNewOrderOrRecordModal(false)}
      />
      {/* </MainLayouts> */}
    </View>
  );
};

export default React.memo(AgendaTab);
