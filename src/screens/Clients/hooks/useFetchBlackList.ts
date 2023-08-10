import React from 'react';

import { clientsAPI } from '../../../api/clientsAPI';
import { clientActionCreators } from '../../../slices/clientsSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useFetchBlackList = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getBlacklist } = clientsAPI();
  const { setBlackList } = clientActionCreators();

  const { token } = useSelector((state: RootState) => state.authentication);

  const fetch = () => {
    setStatus(APIStatus.Loading);
    getBlacklist({
      onSuccess: response => {
        setBlackList(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useFetchBlackListErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
