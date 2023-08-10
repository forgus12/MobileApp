import React from 'react';
import { useSelector } from '../../../store';
import { APIStatus } from '../../../lib/axiosAPI';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useFetchDeleteAppointmentCardHistory = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { deleteAppointmentCardHistory } = vizitnicaApi();
  const { token } = useSelector(s => s?.authentication);

  const fetchDeleteAppointmentHistoryCard = React.useCallback(orderNumbers => {
    setStatus(APIStatus.Loading);
    deleteAppointmentCardHistory({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'useFetchDeleteAppointmentCardHistoryErr');
      },
      token,
      orderNumbers,
    });
  }, []);

  return { fetchDeleteAppointmentHistoryCard, status };
};
