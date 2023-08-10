import React from 'react';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { ClientI } from '../../../slices/clientsSlice';

export const useFetchDeleteFromBlackList = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { deleteFromBlackList } = clientsAPI();

  const fetch = (data: ClientI) => {
    setStatus(APIStatus.Loading);
    deleteFromBlackList({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      variables: {
        id: data.id,
        type: data.type,
        token,
      },
      onError: err => {
        console.log(err, 'useFetchDeleteFromBlackListErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
