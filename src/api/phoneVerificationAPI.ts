import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CountriesArrayI } from '../slices/phoneVerificationSlice';
import { APIRequest, APIStatus, callAPI } from '../lib/axiosAPI';
import { CheckVerificationI } from '../slices/phoneVerificationSlice';

interface CountriesResponse {
  data?: Array<CountriesArrayI>;
}

interface VerificationRequest {
  phone_number?: string;
  verification_code?: string | null;
  device_id?: string;
}

interface VerificationResponse {
  data?: CheckVerificationI;
}

interface SignUpRequest {
  phone_number?: string;
}

interface SignUpResponse {
  data: {
    code: string;
  };
  message: string;
  status: APIStatus;
}

const getCountries: APIRequest<null, CountriesResponse> = args => {
  return callAPI({
    url: 'getCountries',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const checkVerification: APIRequest<VerificationRequest, VerificationResponse> = args => {
  return callAPI({
    url: 'auth/verify',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const signUp: APIRequest<SignUpRequest, SignUpResponse> = args => {
  return callAPI({
    url: 'auth/signup',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const checkPin: APIRequest<SignUpRequest, SignUpResponse> = args => {
  return callAPI({
    url: 'auth/pin/check',
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
  getCountries,
  checkVerification,
  signUp,
  checkPin,
};

export const phoneVerificationAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
