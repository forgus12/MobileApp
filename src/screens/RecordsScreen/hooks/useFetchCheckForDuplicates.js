import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { settingsRecordScreenAPI } from '../../../api/settingsRecordScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { recordScreenActionCreators } from '../../../slices/recordScreenSlice';

export const useFetchCheckForDuplicates = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { checkForDuplicates } = settingsRecordScreenAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { getDuplicateAppointment } = recordScreenActionCreators();

  const fetchCheckForDuplicates = React.useCallback((id, day, date, idService) => {
    setStatus(APIStatus.Loading);
    checkForDuplicates({
      onSuccess: response => {
        getDuplicateAppointment(response?.data);
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'useFetchCheckForDuplicatesErr');
      },
      token,
      id,
      payload: {
        maintenances: idService,
        date: day,
        time_start: date,
      },
    });
  }, []);

  return { fetchCheckForDuplicates, status };
};
