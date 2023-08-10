import React from 'react';
import { useSelector } from '../../../store';
import { APIStatus } from '../../../lib/axiosAPI';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useFetchUpdateHistory = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { updateHistorySpecialist } = vizitnicaApi();
  const { token } = useSelector(s => s?.authentication);

  const fetchUpdateHistorySpecialist = React.useCallback((orderNumber, payload) => {
    setStatus(APIStatus.Loading);
    updateHistorySpecialist({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'useFetchUpdateHistoryErr');
      },
      token,
      orderNumber,
      payload,
    });
  }, []);

  return { fetchUpdateHistorySpecialist, status };
};
