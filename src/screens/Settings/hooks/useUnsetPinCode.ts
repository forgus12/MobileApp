import React from 'react';
import DeviceInfo from 'react-native-device-info';

import { APIStatus } from '../../../lib/axiosAPI';
import { settingsAPI } from '../../../api/settingsAPI';
import { RootState, useSelector } from '../../../store';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';

export const useUnsetPinCode = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { unsetPinCode } = settingsAPI();
  const { setIsAuthenticated } = authenticationActionCreators();
  const { phoneNumber, isAuthenticated } = useSelector((s: RootState) => s?.authentication);

  const fetch = async () => {
    setStatus(APIStatus.Loading);
    const uniqueId = await DeviceInfo.getUniqueId();

    unsetPinCode({
      onSuccess: () => {
        setStatus(APIStatus.Success);
        setIsAuthenticated({ data: { ...isAuthenticated?.data, pin: false } });
      },
      payload: {
        phone_number: phoneNumber,
        device_id: uniqueId,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
