import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { appointmentApi } from '../../../api/appointmentApi';
import { APIStatus } from '../../../lib/axiosAPI';
import { recordScreenActionCreators, recordScreenSlice } from '../../../slices/recordScreenSlice';

export const useFetchAppointmentHistory = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getAppointmentHistory } = appointmentApi();
  const { setHistory } = recordScreenActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetchHistory = React.useCallback(() => {
    setStatus(APIStatus.Loading);

    getAppointmentHistory({
      onSuccess: response => {
        // const arr = []
        // response.data.map(r => arr.push(r.name))
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
