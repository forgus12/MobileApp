import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';
import { vizitnicaApi } from '../../../api/vizitnicaApi';
import DeviceInfo from 'react-native-device-info';

export const useLogOutClient = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { logOutClient } = vizitnicaApi();
  const { token } = useSelector(s => s?.authentication);

  const fetch = async () => {
    const uniqueId = await DeviceInfo.getUniqueId();

    setStatus(APIStatus.Loading);
    logOutClient({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      payload: {
        device_id: uniqueId,
      },
      token,

      onError: error => {
        console.log(error, 'useLogOutClientErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
