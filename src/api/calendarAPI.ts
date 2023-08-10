import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, APIStatus, callAPI } from '../lib/axiosAPI';

interface WeekDaysRequest {
  date: string;
}

interface disableOrderRequest {
  date: string;
  time: string;
}

interface SvgByMonthRequest {
  dates: Array<string>;
  date: string;
}

interface WeekDaysResponse {
  data: Array<string>;
  status: APIStatus;
}

interface VarI {
  token?: string;
}

interface VarActiveOrder {
  token?: string;
  date?: string;
  time?: string;
}

const getWeekDays: APIRequest<WeekDaysRequest, WeekDaysResponse> = args => {
  return callAPI({
    url: 'getWeekDates',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const getAllOrders: APIRequest<WeekDaysRequest, WeekDaysResponse, null, VarI> = args => {
  return callAPI({
    url: 'specialist/appointment/byDay',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

const getSvgByMonth: APIRequest<SvgByMonthRequest, null, null, VarI> = args => {
  return callAPI({
    url: 'specialist/appointment/svgByMonth',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

const disableOrder: APIRequest<disableOrderRequest, null, null, VarI> = args => {
  return callAPI({
    url: 'specialist/pill',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

const activeOrder: APIRequest<any, any, any, VarActiveOrder> = args => {
  return callAPI({
    url: `specialist/pill/${args?.variables?.date}/${args?.variables?.time}`,
    config: {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

const getDayID: APIRequest<any, any, any, VarActiveOrder> = args => {
  return callAPI({
    url: `specialist/schedule/single/days`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args?.variables?.token}`,
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const getBreak: APIRequest<any, any, any, VarActiveOrder> = args => {
  return callAPI({
    url: 'specialist/schedule/single/breaks',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
      data: { date: args?.payload?.date },
    },

    ...args,
  });
};

export const APIs = {
  getWeekDays,
  getAllOrders,
  getSvgByMonth,
  disableOrder,
  activeOrder,
  getDayID,
  getBreak,
};

export const calendarAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
