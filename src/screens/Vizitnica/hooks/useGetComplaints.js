import { useCallback, useState } from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';
import { useSelector } from '../../../store';
import { businessCardsApi } from '../../../api/businessCardsApi';

export const useGetComplaints = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { getComplaints } = businessCardsApi();
  const { setComplaints } = verificationActionCreators();
  const { token } = useSelector(s => s?.authentication);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    getComplaints({
      onSuccess: response => {
        setComplaints(response.data);
      },
      onError: err => {
        console.log(err, 'useGetComplaintsErr');
      },
      token: token,
    });
  });

  return { fetch, status };
};
