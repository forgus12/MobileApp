import React from 'react';

import { calendarAPI } from '../../../api/calendarAPI';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchGetBreak = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { getBreak } = calendarAPI();
  const { setBreak } = calendarActionCreators();

  const fetch = (date: string) => {
    setStatus(APIStatus.Loading);
    getBreak({
      onSuccess: response => {
        setBreak(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        date: date,
      },
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
