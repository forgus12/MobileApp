import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { appendBreakAPI } from '../../../api/appendBreakAPI';
import { RootState, useSelector } from '../../../store';
import { appendBreakActionCreators } from '../../../slices/appendBreakSlice';

export const useUpdateBreak = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { updateBreak } = appendBreakAPI();
  const { setData } = appendBreakActionCreators();

  const fetch = (data: any) => {
    setStatus(APIStatus.Loading);
    updateBreak({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        setData(response);
      },
      payload: data,
      variables: {
        token,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
