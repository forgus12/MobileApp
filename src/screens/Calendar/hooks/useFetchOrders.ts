import React from 'react';

import { calendarAPI } from '../../../api/calendarAPI';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchOrders = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { getAllOrders } = calendarAPI();
  const { setAllOrders } = calendarActionCreators();

  const fetch = React.useCallback((date: string) => {
    setStatus(APIStatus.Loading);
    getAllOrders({
      onSuccess: response => {
        setAllOrders(response);
        setStatus(APIStatus.Success);
      },
      payload: {
        date,
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
