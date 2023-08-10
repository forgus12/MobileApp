import React from 'react';

import { newOrderAPI } from '../../../api/newOrderAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useCreateService = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { createService } = newOrderAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback((data: any) => {
    setStatus(APIStatus.Loading);
    createService({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: { maintenances: [data] },
      variables: {
        token,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
