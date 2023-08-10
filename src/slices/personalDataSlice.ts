import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface ActivityKindsI {
  id: number;
  name: string;
}

interface DataI {
  data?: Array<ActivityKindsI>;
  status?: APIStatus;
}

export interface UserDataI {
  avatar: {
    id: number | null;
    url: string;
  };
  name: string;
  surname: string;
  activity_kind: {
    label: string;
    value: number | null;
  };
  title: string;
  about: string;
  placement: string;
  address: string;
  floor: string;
  background_image?: {
    colors?: {
      description: string;
      icons: string;
      name: string; 
      title: string;
    }, 
    url?: string;
    value?: string;
  };
}

interface SliceState {
  activityKinds?: DataI;
  userData: UserDataI;
}

export const userData = {
  avatar: {
    id: null,
    url: '',
  },
  name: '',
  surname: '',
  activity_kind: {
    label: '',
    value: null,
  },
  title: '',
  about: '',
  placement: '',
  address: '',
  floor: '',
};

const initialState: SliceState = {
  activityKinds: {},
  userData: userData,
};

export const personalDataSlice = createSlice({
  name: 'personalDataSlice',
  initialState,
  reducers: {
    setActivityKinds(state, action) {
      state.activityKinds = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setImageId(state, action) {
      state.userData.avatar = action.payload;
    },
  },
});

export const personalDataActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...personalDataSlice.actions,
    },
    dispatch,
  );
};
