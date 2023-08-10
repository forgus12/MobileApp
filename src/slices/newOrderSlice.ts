import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface AllServicesArrayI {
  duration: {
    label: number;
    value: number;
  };
  id: number | null;
  price: {
    label: number;
    value: number;
  };
  title: string;
}

export interface AllClientsArrayI {
  id: number;
  name: string;
  surname: string;
  full_name: string;
  discount: {
    label: string;
    value: number;
  };
  phone_number: string;
  avatar: null | string;
}

interface AllClientsI {
  data?: Array<AllClientsArrayI>;
  status?: APIStatus;
}

export interface AllServicesI {
  data?: Array<AllServicesArrayI>;
  status?: APIStatus;
}

interface SliceState {
  allClients?: AllClientsI;
  allServices: AllServicesI;
}

const initialState: SliceState = {
  allClients: {},
  allServices: {},
};

export const newOrderSlice = createSlice({
  name: 'newOrderSlice',
  initialState,
  reducers: {
    setClients(state, action) {
      state.allClients = action.payload;
    },
    setServices(state, action) {
      state.allServices = action.payload;
    },
  },
});

export const newOrderActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...newOrderSlice.actions,
    },
    dispatch,
  );
};
