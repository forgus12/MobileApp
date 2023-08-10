import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';
import { supportApi } from '../../../api/supportApi';

export const useFetchSupport = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { supportSpecialist } = supportApi();
  const { token } = useSelector(s => s?.authentication);

  const fetchSupport = useCallback(formData => {
    setStatus(APIStatus.Loading);
    supportSpecialist({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'useFetchSupportErr');
      },
      payload: formData,
      token,
    });
  }, []);

  return { fetchSupport, status };
};
