import React from 'react';
import DeviceInfo from 'react-native-device-info';

import { authenticationAPI } from '../../../api/authenticationAPI';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchSignIn = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { fetchSignIn } = authenticationAPI();
  const { setIsAuthenticated, setToken } = authenticationActionCreators();

  const fetch = async (phoneNumber: string, pinCode?: string) => {
    setStatus(APIStatus.Loading);
    const uniqueId = await DeviceInfo.getUniqueId();

    fetchSignIn({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setToken(response?.data);
      },
      payload: {
        phone_number: phoneNumber,
        device_id: uniqueId,
        pin: pinCode,
      },
      onError: err => {
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
