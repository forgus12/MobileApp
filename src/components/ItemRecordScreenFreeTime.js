import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const ItemRecordScreenFreeTime = ({
  data,
  time,
  backgroundColorButton = 'white',
  colorText = '#1C1C1E',
  disabled,
  valueDate,
  setCalendarValue,
  setDateInFetch,
  durationSumMinutes,
  durationSumHours,
  setValueClickedTime,
  index,
  setIndexClickedTime,
  indexTime,
  setIndexTwoArrTime,
  setDataFindCalendar,
  setTimeFindCalendar,
  setValueItem,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  let toCheckDate = valueDate;
  toCheckDate = toCheckDate.split('-').reverse().join('.');
  let countTime0;
  let countTime1;

  let addedMinute;

  const handleSelect = () => {
    setCalendarValue(
      `${toCheckDate}  ${time} - ${hours.toString().length === 1 ? '0' + hours : hours}:${
        minutes.toString().length === 1 ? minutes + '0' : minutes
      }`,
    );
    setDateInFetch(time);
    setValueClickedTime(time);
    setIndexClickedTime(index);
    setIndexTwoArrTime(indexTime);
    setTimeFindCalendar(time);
    setDataFindCalendar(+data.substring(0, 2));
    setValueItem(0);
  };

  useEffect(() => {
    countTime0 = +time.split(':')[0];
    countTime1 = +time.split(':')[1];
    setHours(durationSumHours + countTime0);

    if (durationSumMinutes + countTime1 < 60) {
      setMinutes(durationSumMinutes + countTime1);
    } else {
      setMinutes((durationSumMinutes + countTime1) % 60);
      addedMinute = Math.floor((durationSumMinutes + countTime1) / 60);
      setHours(prevState => prevState + addedMinute);
    }
  }, [durationSumHours, durationSumMinutes]);

  return (
    <TouchableOpacity disabled={disabled} onPress={handleSelect} style={styles.containerItem}>
      <Text
        style={[
          styles.textItem,
          {
            color: colorText,
            backgroundColor: backgroundColorButton,
          },
        ]}>{`${data} ${time}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#EAECEE',
    borderRadius: 4,
  },
  textItem: {
    borderRadius: 4,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    paddingTop: 5,
    paddingLeft: 8,
    paddingBottom: 5,
    paddingRight: 8,
  },
});

export default ItemRecordScreenFreeTime;
