import React from 'react';

import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useGetClientInfo = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getClientInfo } = vizitnicaApi();
  const { updateUserData } = verificationActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getClientInfo({
      token,
      onSuccess: response => {
        updateUserData(response.data);
        setStatus(APIStatus.Success);
      },

      onError: error => {
        console.log(error, 'useGetClientInfoErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
