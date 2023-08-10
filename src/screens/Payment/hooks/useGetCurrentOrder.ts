import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { paymentApi } from '../../../api/paymentAPI';
import { paymentActionCreators } from '../../../slices/paymentSlice';
import { RootState, useSelector } from '../../../store';

export const useGetCurrentOrder = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getCurrentOrder } = paymentApi();
  const { setCurrentOrder } = paymentActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getCurrentOrder({
      onSuccess: response => {
        setCurrentOrder(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useGetCurrentOrderErr');

        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
