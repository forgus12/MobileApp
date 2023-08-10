import React from 'react';

import { calendarAPI } from '../../../api/calendarAPI';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchSvgByMonth = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getSvgByMonth } = calendarAPI();
  const { setSvgByMonth } = calendarActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback((date: Array<string>) => {
    setStatus(APIStatus.Loading);
    getSvgByMonth({
      onSuccess: response => {
        setSvgByMonth(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        dates: date,
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
