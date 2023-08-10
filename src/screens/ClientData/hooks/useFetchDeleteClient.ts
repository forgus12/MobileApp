import React from 'react';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { ClientI } from '../../../slices/clientsSlice';

export const useDeleteClient = () => {
  const { token } = useSelector((state: RootState) => state.authentication);
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { deleteClient } = clientsAPI();

  const fetch = (args: ClientI) => {
    setStatus(APIStatus.Loading);
    deleteClient({
      onSuccess: res => {
        setStatus(APIStatus.Success);
      },
      variables: {
        id: args.id,
        type: args.type,
        token,
      },
      onError: err => {
        console.log(err, 'useDeleteClientErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
