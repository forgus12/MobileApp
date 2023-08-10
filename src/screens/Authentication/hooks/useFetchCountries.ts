import React from 'react';

import { phoneVerificationAPI } from '../../../api/phoneVerificationAPI';
import { phoneVerificationActionCreators } from '../../../slices/phoneVerificationSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchCountries = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getCountries } = phoneVerificationAPI();
  const { setCountries } = phoneVerificationActionCreators();

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getCountries({
      onSuccess: response => {
        setCountries(response);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
