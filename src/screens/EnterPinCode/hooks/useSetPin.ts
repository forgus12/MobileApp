import React from 'react';
import DeviceInfo from 'react-native-device-info';

import { APIStatus } from '../../../lib/axiosAPI';
import { enterPinCodeAPI } from '../../../api/enterPinCodeAPI';
import { RootState, useSelector } from '../../../store';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';

export const useSetPin = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { setIsAuthenticated } = authenticationActionCreators();
  const { token, isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const { setPin } = enterPinCodeAPI();

  const fetch = async (phoneNumber: string, pinCode?: string) => {
    setStatus(APIStatus.Loading);
    const uniqueId = await DeviceInfo.getUniqueId();

    setPin({
      onSuccess: () => {
        setStatus(APIStatus.Success);
        setIsAuthenticated({ data: { ...isAuthenticated?.data, pin: true } });
      },
      payload: {
        phone_number: phoneNumber,
        device_id: uniqueId,
        pin: pinCode,
      },
      variables: {
        token,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
