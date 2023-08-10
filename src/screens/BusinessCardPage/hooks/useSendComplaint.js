import { useCallback, useState } from 'react';
import { useSelector } from '../../../store';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';
import { businessCardsApi } from '../../../api/businessCardsApi';

export const useSendComplaint = () => {
  const [status, setStatus] = useState(APIStatus.Initial);

  const { token } = useSelector(state => state.authentication);
  const { sendComplaint } = businessCardsApi();
  const { sentComplaints } = verificationActionCreators();

  const fetch = useCallback((id, reason) => {
    setStatus(APIStatus.Loading);
    sendComplaint({
      onSuccess: res => {
        sentComplaints(true);
      },
      onError: err => {
        sentComplaints(false);
        console.log(err, 'error in creating user');
      },
      id,
      payload: {
        reason: reason,
      },
      token,
    });
  });

  return { fetch, status };
};
