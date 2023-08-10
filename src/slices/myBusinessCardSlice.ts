import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface BusinessCardsColorsI {
  title: string;
  name: string;
  description: string;
  icons: string;
}

export interface BusinessCardsI {
  value?: string;
  colors: BusinessCardsColorsI;
  url: string;
}

export interface DataI {
  data?: Array<BusinessCardsI>;
  status?: APIStatus;
}

interface SliceState {
  businessCards?: DataI;
  myBusinessCards?: Array<BusinessCardsI>;
}

const initialState: SliceState = {
  businessCards: {},
  myBusinessCards: [],
};

export const myBusinessCardSlice = createSlice({
  name: 'personalDataSlice',
  initialState,
  reducers: {
    setBusinessCards(state, action) {
      state.businessCards = action.payload;
    },
    setMyBusinessCard(state, action) {
      state.myBusinessCards = action.payload.data;
    },
  },
});

export const myBusinessCardActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...myBusinessCardSlice.actions,
    },
    dispatch,
  );
};
