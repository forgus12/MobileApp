import React from 'react';
import { isEmpty, isUndefined } from 'lodash';
import { useToast } from 'react-native-toast-notifications';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { checkCurrentTime, getCurrentTime } from '../helpers/time';
import { useFetchDisableOrder } from '../hooks/useFetchDisableOrder';
import { getCurrentDate } from '../helpers/dateFormat';
import { useFetchAtiveOrder } from '../hooks/useFetchActiveOrder';

const currentDate = getCurrentDate();

interface IProps {
  isSelectedDate?: string;
  time: string;
  isWorkTime: boolean;
  disabled?: boolean;
  customContainerStyle?: ViewStyle;
  activePill?: boolean;
}

const TimeBlock: React.FC<IProps> = ({
  isSelectedDate,
  activePill,
  time,
  isWorkTime,
  disabled,
  customContainerStyle,
}) => {
  const { fetch: fetchDeleteOrder } = useFetchDisableOrder();
  const { fetch: fetchActiveOrder } = useFetchAtiveOrder();
  const [isCurrentTime, setIsCurrentTime] = React.useState<boolean>(checkCurrentTime(time, getCurrentTime()));
  const [isActiveTime, setActiveTime] = React.useState<boolean>(!isUndefined(activePill) ? activePill : true);
  const toast = useToast();

  const changeStateOrder = (time: string) => {
    if (!isEmpty(toast)) {
      setActiveTime(!isActiveTime);
      if (isActiveTime) {
        toast.show(`Запись на ${time} недоступна клиентам`, {
          type: 'default',
          duration: 3000,
        });
        if (!isUndefined(isSelectedDate)) fetchDeleteOrder(isSelectedDate, time);
      } else {
        toast.show(`Запись на ${time} снова доступна`, {
          type: 'default',
          duration: 3000,
        });
        if (!isUndefined(isSelectedDate)) fetchActiveOrder(isSelectedDate, time);
      }
    }
  };

  React.useEffect(() => {
    if (isSelectedDate === currentDate) {
      const interval = setInterval(() => {
        setIsCurrentTime(checkCurrentTime(time, getCurrentTime()));
      }, 10000);
      return () => clearInterval(interval);
    } else {
      setIsCurrentTime(false);
    }
  }, [isCurrentTime]);

  const backgroundColor = isCurrentTime
    ? COLORS.error
    : isWorkTime && isActiveTime
    ? COLORS.primary
    : COLORS.backgroundBreak;

  const color = isCurrentTime || (isWorkTime && isActiveTime) ? COLORS.white : COLORS.gray;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => changeStateOrder(time)}
      style={{ paddingVertical: SIZES.margin * 0.6 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: SIZES.margin * 0.8,
          width: 40,
          height: 20,
          backgroundColor,
          borderRadius: SIZES.radius * 0.5,
          ...customContainerStyle,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.medium,
            fontSize: 11,
            color,
          }}>
          {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TimeBlock;
