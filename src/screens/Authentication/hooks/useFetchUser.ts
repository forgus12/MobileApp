import React from 'react';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';

import { authenticationAPI } from '../../../api/authenticationAPI';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchUser = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { isUserExists } = authenticationAPI();
  const { setIsAuthenticated, setUniqueId, setPhoneNumber } = authenticationActionCreators();

  const fetch = React.useCallback(async (numberPhone: string) => {
    setStatus(APIStatus.Loading);
    const uniqueId = await DeviceInfo.getUniqueId();
    const timezone = RNLocalize.getTimeZone();

    isUserExists({
      onSuccess: response => {
        setIsAuthenticated(response);
        setUniqueId(uniqueId);
        setPhoneNumber(numberPhone);
        setStatus(APIStatus.Success);
      },
      onError: err => {
        console.log(err, 'useFetchUserErr');

        setStatus(APIStatus.Failure);
      },
      payload: {
        phone_number: numberPhone,
        device_id: uniqueId,
        time_zone: timezone,
      },
    });
  }, []);

  return { fetch, status };
};
