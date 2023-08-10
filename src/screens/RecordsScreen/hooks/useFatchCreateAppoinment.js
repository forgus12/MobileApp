import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { appointmentApi } from '../../../api/appointmentApi';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchCreateAppointment = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { createAppointment } = appointmentApi();
  const { token } = useSelector(s => s?.authentication);

  const fetch = React.useCallback(objArgs => {
    setStatus(APIStatus.Loading);

    return new Promise((resolve, reject) => {
      createAppointment({
        onSuccess: response => {
          setStatus(APIStatus.Success);
          resolve(response); // Резолвим промис с полученными данными
        },
        onError: err => {
          setStatus(APIStatus.Failure);
          console.log(err, 'useFetchCreateAppointmentErr');
          reject(err); // Реджектим промис с ошибкой
        },
        token,
        id: objArgs?.idSpecialist,
        payload: {
          maintenances: objArgs?.idService,
          date: objArgs?.day,
          time_start: objArgs?.dateInFetch,
        },
      });
    });
  }, []);

  return { fetch, status };
};
