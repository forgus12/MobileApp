import React from 'react';

import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { clientActionCreators } from '../../../slices/clientsSlice';

export const useFetchGetMyProfile = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getMyProfile } = clientsAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { setMyProfile } = clientActionCreators();

  const fetch = () => {
    setStatus(APIStatus.Loading);
    getMyProfile({
      onSuccess: response => {
        setMyProfile(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useFetchGetMyProfileErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
