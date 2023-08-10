import React from 'react';

import { orderAPI } from '../../../api/orderAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchConfirmOrder = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { confirmOrder } = orderAPI();

  const fetch = React.useCallback((order: string) => {
    setStatus(APIStatus.Loading);
    confirmOrder({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      variables: {
        order,
        token,
      },
      onError: err => {
        console.log(err, 'useFetchConfirmOrderErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
