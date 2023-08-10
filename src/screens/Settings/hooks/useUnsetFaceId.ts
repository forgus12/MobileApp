import React from 'react';
import DeviceInfo from 'react-native-device-info';

import { APIStatus } from '../../../lib/axiosAPI';
import { settingsAPI } from '../../../api/settingsAPI';
import { RootState, useSelector } from '../../../store';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';

export const useUnsetFaceId = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { unsetFaceId } = settingsAPI();
  const { setIsAuthenticated } = authenticationActionCreators();
  const { phoneNumber, isAuthenticated } = useSelector((s: RootState) => s?.authentication);

  const fetch = async () => {
    setStatus(APIStatus.Loading);
    const uniqueId = await DeviceInfo.getUniqueId();

    unsetFaceId({
      onSuccess: () => {
        setStatus(APIStatus.Success);
        setIsAuthenticated({ data: { ...isAuthenticated?.data, face: false } });
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
