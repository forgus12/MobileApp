import React from 'react';

import { workSheduleAPI } from '../../../api/workSheduleAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchUpdateWorkShedule = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { updateWorkShedule } = workSheduleAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);
  const [error, setError] = React.useState('');
  const fetch = (args: any) => {
    setStatus(APIStatus.Loading);
    updateWorkShedule({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      payload: args,
      variables: {
        token,
      },
      onError: err => {
        setError(err);
        console.log(err, 'useFetchUpdateWorkSheduleErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status, error };
};
