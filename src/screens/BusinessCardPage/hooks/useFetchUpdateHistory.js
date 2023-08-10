import React from 'react';
import { useSelector } from 'react-redux';
import { appointmentApi } from '../../../api/appointmentApi';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchUpdateHistory = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { updateHistorySpecialist } = appointmentApi();
  const { token } = useSelector(state => state.authentication);

  const fetchUpdateHistorySpecialist = React.useCallback((orderNumber, payload) => {
    setStatus(APIStatus.Loading);
    updateHistorySpecialist({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'error fetching update appointment');
      },
      token,
      orderNumber,
      payload,
    });
  }, []);

  return { fetchUpdateHistorySpecialist, status };
};
