import React from 'react';

import { newOrderAPI } from '../../../api/newOrderAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useCreateOrder = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { createOrder } = newOrderAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback((data: any) => {
    setStatus(APIStatus.Loading);
    createOrder({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: data,
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useCreateOrderErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
