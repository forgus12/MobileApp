import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { RootState, useSelector } from '../../../store';
import { WrapperAsyncRequest } from '../../../layouts';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useFetchWeekDays } from '../hooks/useFetchWeekDays';
import {
  comparisonOfDays,
  getCurrentDate,
  getDay,
} from '../helpers/dateFormat';
import { checkIsBeforeDate } from '../helpers/date';

const currentDate = getCurrentDate();

interface IProps {
  isSelectedDate: string;
  changeIsSelectedDate: (date: string) => void;
}

const WeekDaysBlock: React.FC<IProps> = ({
  isSelectedDate,
  changeIsSelectedDate,
}) => {
  const { fetch: fetchWeekDays, status } = useFetchWeekDays();
  const { weekDays } = useSelector((s: RootState) => s?.calendar);

  React.useEffect(() => {
    fetchWeekDays(isSelectedDate);
  }, []);

  const renderItem = React.useCallback(
    ({ item: date, index }: { item: string; index: number }) => {
      const isSelected = comparisonOfDays(isSelectedDate, date);
      const isCurrentDay = comparisonOfDays(currentDate, date);
      const isBeforeDate = checkIsBeforeDate(date, currentDate);

      return (
        <TouchableOpacity
          disabled={isSelected}
          key={index}
          activeOpacity={0.8}
          onPress={() => changeIsSelectedDate(date)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 22,
            backgroundColor: isSelected ? COLORS.primary : 'transparent',
            borderRadius: SIZES.radius * 0.5,
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.semibold,
              fontSize: 13,
              lineHeight: 16,
              color: isSelected
                ? COLORS.white
                : index < 5
                ? COLORS.text
                : COLORS.red,
              opacity: isBeforeDate && !isSelected ? 0.5 : 1,
            }}>
            {getDay(date)}
          </Text>
          {isCurrentDay && !isSelected && (
            <View
              style={{
                position: 'absolute',
                top: '100%',
                width: 4,
                height: 4,
                backgroundColor: COLORS.red,
                borderRadius: SIZES.radius * 10,
                zIndex: 100,
              }}
            />
          )}
        </TouchableOpacity>
      );
    },
    [isSelectedDate],
  );

  return (
    <View style={{ paddingHorizontal: SIZES.padding * 0.8, height: 36 }}>
      <WrapperAsyncRequest status={status} size="small">
        <FlatList
          data={weekDays?.data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          horizontal={true}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          style={{ flexGrow: 0, height: '100%' }}
        />
      </WrapperAsyncRequest>
    </View>
  );
};

export default React.memo(WeekDaysBlock);
