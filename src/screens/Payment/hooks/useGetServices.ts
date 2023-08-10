import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { paymentApi } from '../../../api/paymentAPI';
import { paymentActionCreators } from '../../../slices/paymentSlice';
import { RootState, useSelector } from '../../../store';

export const useGetServices = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getServicesPayment } = paymentApi();
  const { setPayments } = paymentActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = () => {
    setStatus(APIStatus.Loading);
    getServicesPayment({
      onSuccess: response => {
        setPayments(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useGetServicesErr');

        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
