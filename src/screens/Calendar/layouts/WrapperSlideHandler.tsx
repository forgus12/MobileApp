import React from 'react';
import { View } from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';

import { RootState, useSelector } from '../../../store';

import { getNextDate, getPrevDate } from '../helpers/date';
import { useFetchWeekDays } from '../hooks/useFetchWeekDays';

interface IProps {
  children: React.ReactNode;
  isSelectedDate: string;
  setIsSelectedDate: (date: string) => void;
}

const WrapperSlideHandler: React.FC<IProps> = ({
  children,
  isSelectedDate,
  setIsSelectedDate,
}) => {
  const { fetch: fetchWeekDays } = useFetchWeekDays();
  const { weekDays } = useSelector((s: RootState) => s?.calendar);

  const handleOnSlide = React.useCallback((date: string) => {
    if (
      weekDays?.data &&
      weekDays?.data?.length > 0 &&
      !weekDays?.data.includes(date)
    ) {
      fetchWeekDays(date);
    }
    setIsSelectedDate(date);
  }, []);

  return (
    <FlingGestureHandler
      key="right"
      direction={Directions.RIGHT}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          handleOnSlide(getPrevDate(isSelectedDate));
        }
      }}>
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            handleOnSlide(getNextDate(isSelectedDate));
          }
        }}>
        <View style={{ flex: 1 }}>{children}</View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default WrapperSlideHandler;
