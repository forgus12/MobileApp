import React from 'react';
import DeviceInfo from 'react-native-device-info';

import { APIStatus } from '../../../lib/axiosAPI';
import { settingsAPI } from '../../../api/settingsAPI';
import { RootState, useSelector } from '../../../store';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';

export const useLogout = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { logout } = settingsAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = async () => {
    setStatus(APIStatus.Loading);
    const uniqueId = await DeviceInfo.getUniqueId();

    logout({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: {
        device_id: uniqueId,
      },
      variables: {
        token,
      },
      onError: (err) => {
        console.log(err,'useLogoutErr');
        
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
