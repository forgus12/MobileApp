import { useCallback, useState } from 'react';
import { APIStatus } from '../../lib/axiosAPI';
import { tokenMessagingApi } from '../../api/tokenMessagingApi';
import { useSelector } from '../../store';

export const useTokenMessaging = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { tokenMessaging } = tokenMessagingApi();
  const { token } = useSelector(s => s.authentication);
  const fetch = useCallback(args => {
    console.log(token);
    setStatus(APIStatus.Loading);
    tokenMessaging({
      onSuccess: response => {},
      onError: err => {
        console.log(err, 'err useTokenMessaging');
      },
      payload: { fcm_token: args },

      token: token,
    });
  });

  return { fetch, status };
};
