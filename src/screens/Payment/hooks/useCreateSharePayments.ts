import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { paymentApi } from '../../../api/paymentAPI';
import { paymentActionCreators } from '../../../slices/paymentSlice';
import { RootState, useSelector } from '../../../store';

export const useCreateSharePayments = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { createSharePayment } = paymentApi();
  const { setSharePayment } = paymentActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = () => {
    setStatus(APIStatus.Loading);
    createSharePayment({
      onSuccess: response => {
        console.log(response, 'response');

        setSharePayment(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useCreateSharePaymentErr');

        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
