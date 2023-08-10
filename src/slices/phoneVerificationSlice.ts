import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface CountriesArrayI {
  code: string;
  flag: string;
  name: string;
}

export interface CheckVerificationI {
  data?: string;
}

interface CountriesI {
  data?: Array<CountriesArrayI>;
  status?: APIStatus;
}

interface SliceState {
  countries?: CountriesI;
  selectedCountry?: CountriesArrayI;
  SMSCode: string;
}

const initialState: SliceState = {
  countries: {},
  selectedCountry: {
    flag: 'https://flagcdn.com/w320/ru.png',
    code: '+7',
    name: 'Россия',
  },
  SMSCode: '',
};

export const phoneVerificationSlice = createSlice({
  name: 'phoneVerificationSlice',
  initialState,
  reducers: {
    setCountries(state, action) {
      state.countries = action.payload;
    },
    updateSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
    setSMSCode(state, action) {
      state.SMSCode = action.payload;
    },
  },
});

export const phoneVerificationActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...phoneVerificationSlice.actions,
    },
    dispatch,
  );
};
