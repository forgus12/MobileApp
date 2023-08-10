import React from 'react';

import { newOrderAPI } from '../../../api/newOrderAPI';
import { newOrderActionCreators } from '../../../slices/newOrderSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchAllServices = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getAllServices } = newOrderAPI();
  const { setServices } = newOrderActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getAllServices({
      onSuccess: response => {
        setServices(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
