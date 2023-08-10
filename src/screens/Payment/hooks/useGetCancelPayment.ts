import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { paymentApi } from '../../../api/paymentAPI';
import { paymentActionCreators } from '../../../slices/paymentSlice';
import { RootState, useSelector } from '../../../store';

export const useGetCancelPayment = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getCancelPayment } = paymentApi();
  // const { setLinkPayment } = paymentActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback((id: number) => {
    setStatus(APIStatus.Loading);
    getCancelPayment({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      payload: {
        order_id: id,
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useGetCancelPaymentErr');

        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
