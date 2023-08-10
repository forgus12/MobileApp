import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { appendBreakAPI } from '../../../api/appendBreakAPI';
import { RootState, useSelector } from '../../../store';
import { appendBreakActionCreators } from '../../../slices/appendBreakSlice';

export const useFetchDeleteBreak = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { deleteBreak } = appendBreakAPI();

  const fetch = React.useCallback((day_id: string, single_id: any, date: string) => {
    setStatus(APIStatus.Loading);
    deleteBreak({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      payload: {
        date: date,
        single_id: single_id,
      },

      variables: {
        day_id,
        token,
      },
      onError: err => {
        console.log(err, 'useFetchDeleteBreakErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
