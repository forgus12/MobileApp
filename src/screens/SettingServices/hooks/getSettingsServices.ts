import React from 'react';

import { myServicesAPI } from '../../../api/myServicesAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { myServicesActionCreators } from '../../../slices/myServicesSlice';

export const getSettingsServices = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { getSettingsServices } = myServicesAPI();
  const { setspecialistServiceSettings } = myServicesActionCreators();

  const fetch = () => {
    setStatus(APIStatus.Loading);
    getSettingsServices({
      onSuccess: response => {
        setspecialistServiceSettings(response)
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      variables: {
        token,
      },
    });
  };

  return { fetch, status };
};
