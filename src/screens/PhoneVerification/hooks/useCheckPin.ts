import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { phoneVerificationAPI } from '../../../api/phoneVerificationAPI';
import { phoneVerificationActionCreators } from '../../../slices/phoneVerificationSlice';

export const useCheckPin = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { checkPin } = phoneVerificationAPI();
  const { setSMSCode } = phoneVerificationActionCreators();

  const fetch = (phoneNumber: string, code: string) => {
    setStatus(APIStatus.Loading);
    checkPin({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setSMSCode(response.data.code);
      },
      payload: {
        phone: phoneNumber,
        code: code,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
