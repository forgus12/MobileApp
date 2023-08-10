import React from 'react';

import { calendarAPI } from '../../../api/calendarAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchDisableOrder = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { disableOrder } = calendarAPI();

  const fetch = React.useCallback((date: string, time: string) => {
    setStatus(APIStatus.Loading);
    disableOrder({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: {
        date: date,
        time: time,
      },
      variables: {
        token,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
