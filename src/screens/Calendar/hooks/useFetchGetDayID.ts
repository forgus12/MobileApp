import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { calendarAPI } from '../../../api/calendarAPI';

export const useFetchGetDayID = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getDayID } = calendarAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { setDayID } = calendarActionCreators();

  const fetch = () => {
    setStatus(APIStatus.Loading);
    getDayID({
      onSuccess: response => {
        setDayID(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useFetchGetDayIDErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
