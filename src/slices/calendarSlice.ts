import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

interface WeekDaysI {
  data?: Array<string> | undefined;
  status?: APIStatus;
}

export interface ServicesArrayI {
  id: number;
  title: string;
  price: {
    label: number;
    value: number;
  };
  duration: {
    label: number;
    value: number;
  };
  interval: Array<string>;
}

interface ClientI {
  id: number;
  name: string;
  surname: string;
  phone_number: string;
  photo: string | null;
  discount: {
    label: string;
    value: number;
  };
}

export interface BreakI {
  id?: number;
  day_id?: number;
  date?: string;
  start?: string;
  end?: string;
  is_break?: boolean;
  status?: APIStatus;
}

export interface DayIDI {
  day: string;
  id: number;
  settings_id: number;
}

export interface AllOrdersArrayI {
  order_number: string;
  date: {
    label: string;
    value: string;
  };
  services?: Array<ServicesArrayI>;
  client?: ClientI;
  status: 'break' | 'confirmed' | 'unconfirmed' | 'skipped';
  interval: Array<string>;
  time: {
    start: string;
    end: string;
  };
}

interface AllOrdersI {
  confirmation?: boolean;
  smart_schedule?: boolean;
  data?: Array<AllOrdersArrayI>;
  workSchedule?: Array<string>;
  time_interval?: Array<string>;
}

interface SvgByMonthI {
  data?: any;
  status?: APIStatus;
}

interface SliceState {
  weekDays?: WeekDaysI;
  allOrders: AllOrdersI;
  svgByMonth?: SvgByMonthI;
  scheduleDatesChange: Array<string>;
  notification: boolean;
  dayID?: DayIDI;
  breaks?: BreakI;
}

const initialState: SliceState = {
  weekDays: {},
  allOrders: {},
  svgByMonth: {},
  scheduleDatesChange: [],
  notification: false,
  dayID: undefined,
  breaks: {},
};

export const calendarSlice = createSlice({
  name: 'calendarSlice',
  initialState,
  reducers: {
    setWeekDays(state, action) {
      state.weekDays = action.payload;
    },
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
    setSvgByMonth(state, action) {
      state.svgByMonth = action.payload;
    },
    updateDataAllOrder(state, action) {
      state.allOrders!.data = action.payload;
    },
    resetAllOrder(state) {
      state.allOrders = initialState.allOrders;
    },
    setSchedule(state, action) {
      state.scheduleDatesChange = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setDayID(state, action) {
      state.dayID = action.payload;
    },
    setBreak(state, action) {
      state.breaks = action.payload;
    },
  },
});

export const calendarActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...calendarSlice.actions,
    },
    dispatch,
  );
};
