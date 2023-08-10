import React from 'react';
import { useSelector } from 'react-redux';

import { setFromStoreData } from '../../../lib/asyncStorageManager';
import { APIStatus } from '../../../lib/axiosAPI';
import { phoneVerificationAPI } from '../../../api/phoneVerificationAPI';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';
import { RootState } from '../../../store';

export const useCheckVerification = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { checkVerification } = phoneVerificationAPI();
  const { setToken } = authenticationActionCreators();

  const { uniqueId } = useSelector((s: RootState) => s?.authentication);

  const fetch = (phoneNumber: string, SMSCode: string) => {
    setStatus(APIStatus.Loading);
    checkVerification({
      onSuccess: (response: any) => {
        setStatus(APIStatus.Success);
        setToken(response?.data);
        setFromStoreData('token', response?.data);
      },
      payload: {
        phone_number: phoneNumber,
        verification_code: SMSCode,
        device_id: uniqueId,
      },
      onError: err => {
        console.log(err, 'useCheckVerificationErr');

        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
