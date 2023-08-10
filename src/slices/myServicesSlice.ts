import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface ServicesRequest {
  id?: number;
  finance_analytics?: boolean;
  many_maintenances?: boolean;
  maintenances?: [{
    id: number;
    title: string;
    price: { label: string; value: number };
    duration: { label: string; value: number };
  }];
}

interface SliceState {
  specialistServiceSettings: ServicesRequest;
}
  
const initialState: SliceState = {
  specialistServiceSettings: {}
};
  
  export const myServicesSlice = createSlice({
    name: 'personalDataSlice',
    initialState,
    reducers: {
      setspecialistServiceSettings(state, action) {
        state.specialistServiceSettings = action.payload.data;
      },
    },
  });
  
  export const myServicesActionCreators = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
      {
        ...myServicesSlice.actions,
      },
      dispatch,
    );
  };
  