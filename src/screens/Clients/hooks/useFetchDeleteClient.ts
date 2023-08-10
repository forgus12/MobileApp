import React from 'react';
import { useSelector } from 'react-redux';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState } from '../../../store';

export const useDeleteClient = () => {
  const { token } = useSelector((state: RootState) => state.authentication);
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { deleteClient } = clientsAPI();

  const fetch = (args: {
    avatar: string;
    discount: number;
    id: number;
    name: string;
    phone_number: string;
    surname: string;
    type: string;
  }) => {
    setStatus(APIStatus.Loading);
    deleteClient({
      onSuccess: () => {
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
