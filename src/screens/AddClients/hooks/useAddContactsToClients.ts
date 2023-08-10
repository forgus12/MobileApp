import React from 'react';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

interface clientI {
  name: string;
  phone_number: string;
  surname: string;
}

export const useAddContactsToClients = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { addContactsToClients } = clientsAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = (data: [clientI]) => {
    setStatus(APIStatus.Loading);
    addContactsToClients({
      onSuccess: res => {
        setStatus(APIStatus.Success);
      },
      payload: {
        data: data,
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useAddContactsToClientsErr');
        setStatus(APIStatus.Failure);
      },
    });
  };
  return { fetch, status };
};
