import React from 'react';

import { workSheduleAPI } from '../../../api/workSheduleAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useCreateWorkShedule = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { createWorkShedule } = workSheduleAPI();
  const [error, setError] = React.useState('');

  const fetch = React.useCallback((data: any) => {
    setStatus(APIStatus.Loading);
    createWorkShedule({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setError(err);
        console.log(err);
        setStatus(APIStatus.Failure);
      },
      payload: data,
      variables: {
        token,
      },
    });
  }, []);

  return { fetch, status, error };
};
