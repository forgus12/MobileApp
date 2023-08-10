import React from 'react';

import { calendarAPI } from '../../../api/calendarAPI';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchWeekDays = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getWeekDays } = calendarAPI();
  const { setWeekDays } = calendarActionCreators();

  const fetch = React.useCallback((date: string) => {
    setStatus(APIStatus.Loading);
    getWeekDays({
      onSuccess: response => {
        setWeekDays(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        date: date,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
