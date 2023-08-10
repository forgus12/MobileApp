import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';
import { supportApi } from '../../../api/supportApi';

export const useFetchSupportClient = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { supportClient } = supportApi();
  const { token } = useSelector(s => s?.authentication);

  const fetchSupport = useCallback(formData => {
    setStatus(APIStatus.Loading);
    supportClient({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'useFetchSupportClientErr');
      },
      payload: formData,
      token,
    });
  }, []);

  return { fetchSupport, status };
};
