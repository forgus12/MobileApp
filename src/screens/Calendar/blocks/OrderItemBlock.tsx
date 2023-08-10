import React from 'react';
import { Formik } from 'formik';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

import CardBlock from './CardBlock';
import TimeBlock from './TimeBlock';
import { getOrder } from '../helpers/date';
import { RootState, useSelector } from '../../../store';

interface IProps {
  isSelectedDate?: string | undefined;
  time: string;
  data: any;
  isBeforeDate?: boolean;
  onPress?: () => void;
  breaks: any;
  dayId: any;
  dayID: any;
}

const OrderItemBlock: React.FC<IProps> = ({ isSelectedDate, time, data, isBeforeDate, onPress, breaks }) => {
  const { dayID, weekDays } = useSelector((s: RootState) => s?.calendar);
  const { smart_schedule, workSchedule, disabledPills, data: orders } = data;
  const isWorkTime = workSchedule?.includes(time) || disabledPills.includes(time);

  const newData = getOrder(orders, time, breaks);

  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: SIZES.padding * 0.8,
      borderBottomWidth: 1,
      borderColor: COLORS.lightGray3,
    },
  });

  return newData.isOrder ? (
    newData.data && newData?.data?.interval ? (
      <Formik initialValues={{ data: orders }} onSubmit={() => console.log('submit!')}>
        {({ values }) => (
          <View style={style.container}>
            <View>
              <FlatList
                keyExtractor={(_, index) => String(index)}
                data={newData?.data?.interval}
                renderItem={({ item: time }) => (
                  <TimeBlock
                    disabled={true}
                    time={time}
                    isWorkTime={false}
                    customContainerStyle={{
                      marginVertical: SIZES.padding * 0.051,
                    }}
                  />
                )}
                scrollEnabled={false}
              />
            </View>
            <CardBlock
              data={values.data[newData.index]}
              dayId={dayID[weekDays?.data?.indexOf(isSelectedDate)]}
              isSelectedDate={isSelectedDate}
              index={newData.index}
              showAllServices={
                newData?.data?.services ? newData?.data?.interval.length > newData?.data?.services.length : false
              }
            />
          </View>
        )}
      </Formik>
    ) : null
  ) : (
    <View>
      <TouchableOpacity
        disabled={isBeforeDate || smart_schedule}
        activeOpacity={0.8}
        onPress={onPress}
        style={style.container}>
        <TimeBlock
          isSelectedDate={isSelectedDate}
          activePill={!disabledPills.includes(time)}
          time={time}
          disabled={isBeforeDate || !isWorkTime || smart_schedule}
          isWorkTime={(!isBeforeDate && !smart_schedule && isWorkTime) || disabledPills.includes(time)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(OrderItemBlock);
