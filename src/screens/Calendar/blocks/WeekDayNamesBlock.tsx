import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { weekDayNames } from '../static/static';
import { getCurrentDate } from '../helpers/dateFormat';
import { checkIsBeforeDate } from '../helpers/date';
import { RootState, useSelector } from '../../../store';

const currentDate = getCurrentDate();

const WeekDayNamesBlock: React.FC = () => {
  const { weekDays } = useSelector((s: RootState) => s?.calendar);

  return (
    <View style={{ paddingHorizontal: SIZES.padding * 0.8 }}>
      <FlatList
        data={weekDayNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isBeforeDate = weekDays?.data
            ? checkIsBeforeDate(weekDays?.data[index], currentDate)
            : false;

          return (
            <View
              style={{
                width: 40,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 11,
                  lineHeight: 13,
                  color: index < 5 ? COLORS.black : COLORS.red,
                  opacity: isBeforeDate ? 0.5 : 1,
                }}>
                {item}
              </Text>
            </View>
          );
        }}
        horizontal={true}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          marginBottom: SIZES.padding * 0.5,
        }}
        style={{ flexGrow: 0 }}
      />
    </View>
  );
};

export default React.memo(WeekDayNamesBlock);
