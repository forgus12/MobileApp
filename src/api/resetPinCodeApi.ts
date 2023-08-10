import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, callAPI } from '../lib/axiosAPI';
import { UserI } from '../slices/authenticationSlice';

interface UserRequest {
  phone_number: string;
  verification_code?: string;
  pin?: string;
}

interface UserResponse {
  data?: UserI;
}

const fetchResetPinCode: APIRequest<UserRequest, UserResponse> = args => {
  return callAPI({
    url: 'auth/forget',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const fetchPinReset: APIRequest<UserRequest> = args => {
  return callAPI({
    url: 'specialist/auth/pinReset',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

export const APIs = {
  fetchResetPinCode,
  fetchPinReset,
};

export const resetPinCodeAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
