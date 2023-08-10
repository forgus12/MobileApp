import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { paymentApi } from '../../../api/paymentAPI';
import { paymentActionCreators } from '../../../slices/paymentSlice';
import { RootState, useSelector } from '../../../store';

export const useGetSharePayment = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getSharePayment } = paymentApi();
  const { setSharePayment } = paymentActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = () => {
    setStatus(APIStatus.Loading);
    getSharePayment({
      onSuccess: response => {
        // setSharePayment(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useGetSharePaymentErr');

        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
