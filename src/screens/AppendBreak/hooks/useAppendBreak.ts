import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { appendBreakAPI } from '../../../api/appendBreakAPI';
import { RootState, useSelector } from '../../../store';
import { appendBreakActionCreators } from '../../../slices/appendBreakSlice';

export const useAppendBreak = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { appendBreak } = appendBreakAPI();
  const { setData } = appendBreakActionCreators();
  const [error, setError] = React.useState('');

  const fetch = (data: any) => {
    setStatus(APIStatus.Loading);
    appendBreak({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setData(response);
      },
      payload: data,
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useAppendBreakErr');

        setError(err);
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status, error };
};
