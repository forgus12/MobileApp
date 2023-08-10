import React from 'react';

import { myServicesAPI, ServicesRequest } from '../../../api/myServicesAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useCreateServices = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { createServices } = myServicesAPI();

  const fetch = React.useCallback((data: ServicesRequest) => {
    setStatus(APIStatus.Loading);
    createServices({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      payload: data,
      variables: {
        token,
      },
    });
  }, []);

  return { fetch, status };
};
