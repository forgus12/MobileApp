import React from 'react';
import { RootState, useSelector } from '../../../store';
import { APIStatus } from '../../../lib/axiosAPI';
import { recordScreenActionCreators } from '../../../slices/recordScreenSlice';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useFetchAppointmentHistory = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getAppointmentHistory } = vizitnicaApi();
  const { setHistory } = recordScreenActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetchHistory = React.useCallback(() => {
    setStatus(APIStatus.Loading);

    getAppointmentHistory({
      onSuccess: response => {
        setHistory(response.data);
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'useFetchAppointmentHistoryErr');
      },
      token,
    });
  }, []);

  return { fetchHistory, status };
};
