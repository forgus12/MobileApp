import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, APIStatus, callAPI } from '../lib/axiosAPI';

interface PinCodeRequest {
  phone_number: string;
  device_id: string;
  pin?: string;
}

interface PinCodeResponse {
  message: string;
  status: APIStatus;
}

interface PinCodeVarI {
  token?: string;
}

const setPin: APIRequest<PinCodeRequest, PinCodeResponse, null, PinCodeVarI> = args => {
  return callAPI({
    url: 'auth/pin/set',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

export const APIs = {
  setPin,
};

export const enterPinCodeAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
