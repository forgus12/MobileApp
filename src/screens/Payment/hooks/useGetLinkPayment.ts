import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { paymentApi } from '../../../api/paymentAPI';
import { paymentActionCreators } from '../../../slices/paymentSlice';
import { RootState, useSelector } from '../../../store';

export const useGetLinkPayment = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getLinkPayment } = paymentApi();
  const { setLinkPayment } = paymentActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback((id: number) => {
    setStatus(APIStatus.Loading);
    getLinkPayment({
      onSuccess: response => {
        setLinkPayment(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        service_id: id,
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useGetLinkPaymentErr');

        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
