import React from 'react';

import { calendarAPI } from '../../../api/calendarAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchAtiveOrder = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { activeOrder } = calendarAPI();

  const fetch = React.useCallback((date: string, time: string) => {
    setStatus(APIStatus.Loading);
    activeOrder({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      variables: {
        token: token,
        date: date,
        time: time,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
