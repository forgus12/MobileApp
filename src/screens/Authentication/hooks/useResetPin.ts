import React from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';
import { resetPinCodeAPI } from '../../../api/resetPinCodeApi';
import { RootState } from '../../../store';

export const useResetPin = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { fetchPinReset } = resetPinCodeAPI();
  const { isAuthenticated, phoneNumber } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback((pin: string) => {
    setStatus(APIStatus.Loading);
    fetchPinReset({
      onSuccess: res => {
        setStatus(APIStatus.Success);
      },
      payload: {
        phone_number: phoneNumber,
        verification_code: isAuthenticated!.data!.code,
        pin: pin,
      },
      onError: err => {
        console.log(err, 'useResetPinErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
