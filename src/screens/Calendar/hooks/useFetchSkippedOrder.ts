import React from 'react';

import { orderAPI } from '../../../api/orderAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchSkippedOrder = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { skippedOrder } = orderAPI();

  const fetch = React.useCallback((order: string) => {
    setStatus(APIStatus.Loading);
    skippedOrder({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      variables: {
        order,
        token,
      },
      onError: err => {
        console.log(err, 'useFetchSkippedOrderErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
