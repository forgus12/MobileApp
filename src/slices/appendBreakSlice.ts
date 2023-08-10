import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface DataI {
  data?: number | boolean;
  status?: APIStatus;
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

interface SliceState {
  data?: DataI | null;
  breaks?: BreakI | null;
}

const initialState: SliceState = {
  data: null,
  breaks: {},
};

export const appendBreakSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setBreak(state, action) {
      state.breaks = action.payload;
    },
  },
});

export const appendBreakActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...appendBreakSlice.actions,
    },
    dispatch,
  );
};
