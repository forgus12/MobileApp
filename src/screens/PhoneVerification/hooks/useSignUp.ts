import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { phoneVerificationAPI } from '../../../api/phoneVerificationAPI';
import { phoneVerificationActionCreators } from '../../../slices/phoneVerificationSlice';

export const useSignUp = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { signUp } = phoneVerificationAPI();
  const { setSMSCode } = phoneVerificationActionCreators();

  const fetch = (phoneNumber: string) => {
    setStatus(APIStatus.Loading);
    signUp({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setSMSCode(response.data.code);
      },
      payload: {
        phone_number: phoneNumber,
      },
      onError: err => {
        console.log(err, 'useSignUpErr');

        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
