import React from 'react';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchDeleteFromBlackList = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { deleteFromBlackList } = clientsAPI();

  const fetch = (data: {
    avatar: string;
    discount: number;
    id: number;
    name: string;
    phone_number: string;
    surname: string;
    type: string;
  }) => {
    setStatus(APIStatus.Loading);
    deleteFromBlackList({
      onSuccess: res => {
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
