import React from 'react';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchAddBlackList = () => {
  const { token } = useSelector((state: RootState) => state.authentication);
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { addToBlackList } = clientsAPI();

  const fetch = (id: string, type: string) => {
    setStatus(APIStatus.Loading);
    addToBlackList({
      onSuccess: res => {
        setStatus(APIStatus.Success);
      },
      payload: {
        type: type,
      },
      variables: {
        token,
        id,
      },
      onError: err => {
        console.log(err, 'useFetchAddBlackListErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
