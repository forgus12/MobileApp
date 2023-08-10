import React from 'react';

import { newOrderAPI } from '../../../api/newOrderAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useUpdateOrder = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { updateOrder } = newOrderAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback((data: any, id: string) => {
    setStatus(APIStatus.Loading);
    updateOrder({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: {
        is_update: true,
        ...data,
      },
      variables: {
        id,
        token,
      },
      onError: err => {
        console.log(err, 'useUpdateOrderErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
