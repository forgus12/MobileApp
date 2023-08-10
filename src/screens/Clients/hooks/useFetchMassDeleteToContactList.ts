import React from 'react';
import { RootState, useSelector } from '../../../store';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchMassDeleteToContactList = () => {
  const { token } = useSelector((s: RootState) => s?.authentication);
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { deleteToContactList } = clientsAPI();

  const fetch = (args: Array<number>) => {
    setStatus(APIStatus.Loading);
    deleteToContactList({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: {
        client_ids: [],
        dummy_client_ids: args,
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useFetchMassDeleteToContactListErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
