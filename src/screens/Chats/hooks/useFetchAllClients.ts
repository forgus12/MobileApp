import React from 'react';

import { newOrderAPI } from '../../../api/newOrderAPI';
import { newOrderActionCreators } from '../../../slices/newOrderSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchAllClients = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getAllClients } = newOrderAPI();
  const { setClients } = newOrderActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getAllClients({
      onSuccess: response => {
        setClients(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useFetchAllClientsErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
