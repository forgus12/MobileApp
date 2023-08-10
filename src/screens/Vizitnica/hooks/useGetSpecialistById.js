import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useGetSpecialistById = () => {
  const { getSpecialistById } = vizitnicaApi();
  const [status, setStatus] = useState(APIStatus.Initial);
  const { token } = useSelector(s => s?.authentication);

  const fetch = useCallback((id = 0, successCb) => {
    getSpecialistById({
      specialistId: id,
      token,
      onSuccess: res => {
        setStatus(APIStatus.Success);
        if (typeof successCb === 'function') {
          successCb(res);
        }
      },
      onError: err => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
