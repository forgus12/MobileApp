import { boolean } from 'yup';
import { AllOrdersArrayI } from '../../../slices/calendarSlice';

export const getOrder = (data: Array<AllOrdersArrayI>, currentTime: string, breaks: []) => {
  let newDataSing;
  let newDataWork;
  const index = data?.findIndex(n => {
    if (n.interval.length > 0) {
      return n.interval.includes(currentTime);
    }
  });

  if (data[index]?.status != 'break') {
    newDataSing = data?.filter(n => {
      if (n.interval.length > 0) {
        return n.interval.includes(currentTime);
      }
    });
    newDataWork = data?.filter(n => {
      if (n.interval.length > 0) {
        return n.interval.includes(currentTime);
      }
    });
  } else {
    if (data[index]?.date) {
      newDataSing = data?.filter(n => {
        if (n.interval.length > 0) {
          return n.interval.includes(currentTime);
        }
      });
    } else {
      newDataWork = data?.filter(n => {
        if (n.interval.length > 0) {
          return n.interval.includes(currentTime);
        }
      });
    }
  }

  const result: {
    data: AllOrdersArrayI | undefined;
    isOrder: boolean;
    index: number;
  } = {
    data: undefined,
    isOrder: false,
    index: 0,
  };

  if (newDataSing && newDataSing.length > 0 && breaks[0]) {
    if (newDataSing[0].interval[0].includes(currentTime)) {
      result.data = newDataSing[0];
      result.index = index;
    }

    result.isOrder = true;
  } else if (newDataWork && newDataWork.length > 0 && !breaks[0]) {
    if (newDataWork[0].interval[0].includes(currentTime)) {
      result.data = newDataWork[0];
      result.index = index;
    }
    result.isOrder = true;
  }

  return result;
};

export const checkIsBeforeDate = (date1: string, date2: string) => {
  return Date.parse(date1) < Date.parse(date2);
};

export const getPrevDate = (currentDate: string) => {
  let currentDay = new Date(currentDate).setDate(new Date(currentDate).getDate() - 1);
  return new Date(currentDay).toJSON().substring(0, 10);
};

export const getNextDate = (currentDate: string) => {
  let currentDay = new Date(currentDate).setDate(new Date(currentDate).getDate() + 1);
  return new Date(currentDay).toJSON().substring(0, 10);
};
