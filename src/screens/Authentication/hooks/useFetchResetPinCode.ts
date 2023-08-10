import React from 'react';

import { resetPinCodeAPI } from '../../../api/resetPinCodeApi';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchResetPinCode = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { fetchResetPinCode } = resetPinCodeAPI();
  const { setIsAuthenticated } = authenticationActionCreators();

  const fetch = (phoneNumber: string) => {
    setStatus(APIStatus.Loading);
    fetchResetPinCode({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setIsAuthenticated(response);
      },
      payload: {
        phone_number: phoneNumber,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
