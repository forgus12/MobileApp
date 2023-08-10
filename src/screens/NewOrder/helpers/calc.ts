import moment from 'moment';

export const getDiscountedPrice = (inittialPrice: number | string, discount: number | string) => {
  return Number(inittialPrice) - Math.floor((Number(inittialPrice) * Number(discount)) / 100);
};

export const convertToDuration = (value: number) => {
  const hours = Math.trunc(value / 60);
  const minutes = value % 60;

  if (minutes === 0) {
    return `${hours} ч.`;
  } else if (hours === 0) {
    return `${minutes} мин.`;
  } else {
    return `${hours} ч. ${minutes} мин.`;
  }
};

export const sumDurations = (arr: Array<any>) => {
  return convertToDuration(
    arr.reduce((previousValue, currentValue) => {
      return Number(previousValue) + Number(currentValue.duration.value);
    }, 0),
  );
};

export const sumPrice = (arr: Array<any>) => {
  return arr.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.price.value), 0);
};

export const getEndTime = (startTime: string, arr: Array<any>) => {

  const sum = arr.reduce((previousValue, currentValue) => {
    return Number(previousValue) + Number(currentValue.duration.value);
  }, 0);
  const hours = Math.trunc(sum / 60);
  const minutes = sum % 60;

  const newDate = moment();
  newDate.set({ hour: +startTime.substring(0, 2) + hours, minute: +startTime.substring(3, 5) + minutes, second: 0 });

  // const newDate = new Date(`2022-01-01T${startTime}:00`);
  // newDate.setHours(newDate.getHours() + hours);
  // newDate.setMinutes(newDate.getMinutes() + minutes);

  // return newDate.toLocaleTimeString().substring(0, 5);
  return `${newDate.get('hour')}:${newDate.get('minute') == 0 ? newDate.get('minute') + '0' : newDate.get('minute')}`;
};
