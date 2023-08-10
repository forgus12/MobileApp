import React from 'react';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { ClientI } from '../../../slices/clientsSlice';

export const useFetchUpdateClientsData = () => {
  const { token } = useSelector((state: RootState) => state.authentication);
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { updateClientsData } = clientsAPI();

  const fetch = (args: ClientI) => {
    setStatus(APIStatus.Loading);
    updateClientsData({
      onSuccess: res => {
        setStatus(APIStatus.Success);
      },
      payload: args,
      variables: {
        id: args.id,
        token,
      },
      onError: err => {
        console.log(err, 'useFetchUpdateClientsDataErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
