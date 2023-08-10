import React from 'react';

import { newOrderAPI } from '../../../api/newOrderAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useCreateClient = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { createClient } = newOrderAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);
  const [error, setError] = React.useState('');

  const fetch = React.useCallback((data: any) => {
    setStatus(APIStatus.Loading);
    createClient({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: data,
      variables: {
        token,
      },
      onError: err => {
        setError(err);
        console.log(err, 'useCreateClientErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status, error };
};
