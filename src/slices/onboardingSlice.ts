import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface OnboardingsArrayI {
  title: string;
  description: string;
  textButton: string;
  imageSrc: string;
}

interface OnboardingsI {
  data?: Array<OnboardingsArrayI>;
  status?: APIStatus;
}

interface SliceState {
  onboardings?: OnboardingsI;
}

const initialState: SliceState = {
  onboardings: {},
};

export const onboardingSlice = createSlice({
  name: 'onboardingSlice',
  initialState,
  reducers: {
    setOnboardings(state, action) {
      state.onboardings = action.payload;
    },
  },
});

export const onboardingActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...onboardingSlice.actions,
    },
    dispatch,
  );
};
