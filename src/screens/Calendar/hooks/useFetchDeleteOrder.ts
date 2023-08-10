import React from 'react';

import { orderAPI } from '../../../api/orderAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
//
export const useFetchDeleteOrder = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { deleteOrder } = orderAPI();

  const fetch = React.useCallback((order: string) => {
    setStatus(APIStatus.Loading);
    deleteOrder({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      variables: {
        order,
        token,
      },
      onError: err => {
        console.log(err, 'useFetchDeleteOrderErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
