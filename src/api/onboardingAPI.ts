import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { OnboardingsArrayI } from '../slices/onboardingSlice';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface OnboardingsResponse {
  data?: Array<OnboardingsArrayI>;
}

const getOnboardings: APIRequest<null, OnboardingsResponse> = args => {
  return callAPI({
    url: 'getOnboardings',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

export const APIs = {
  getOnboardings,
};

export const onboardingAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
