import moment from 'moment';

export const getEndTime = (startTime: string, number: number) => {
  const hours = Math.trunc(number / 60);
  const minutes = number % 60;

  const newDate = moment();
  newDate.set({ hour: +startTime.substring(0, 2) + hours, minute: +startTime.substring(3, 5) + minutes, second: 0 });

  return `${newDate.get('hour')}:${newDate.get('minute') == 0 ? newDate.get('minute') + '0' : newDate.get('minute')}`;
};
