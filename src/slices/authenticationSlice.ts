import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface UserI {
  user?: boolean;
  pin?: boolean;
  face?: boolean;
  device?: boolean;
  code?: string;
  client?: boolean;
  specialist?: boolean;
}

export interface isAuthenticatedI {
  data?: UserI;
  status?: APIStatus;
}

interface SliceState {
  isAuthenticated: isAuthenticatedI | null;
  phoneNumber?: any;
  uniqueId?: string;
  token?: string;
}

const initialState: SliceState = {
  isAuthenticated: null,
  phoneNumber: '',
  uniqueId: '',
  token: '',
};

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUniqueId(state, action) {
      state.uniqueId = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const authenticationActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...authenticationSlice.actions,
    },
    dispatch,
  );
};
