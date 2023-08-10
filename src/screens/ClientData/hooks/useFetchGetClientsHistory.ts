import React from 'react';
import { useSelector } from 'react-redux';
import { clientsAPI } from '../../../api/clientsAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState } from '../../../store';
import { clientActionCreators } from '../../../slices/clientsSlice';
import { ClientI } from '../../../slices/clientsSlice';

export const useFetchGetClientsHistory = () => {
  const { token } = useSelector((state: RootState) => state.authentication);
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getClientsHistory } = clientsAPI();
  const { setClientHistory } = clientActionCreators();

  const fetch = (args: ClientI) => {
    setStatus(APIStatus.Loading);
    getClientsHistory({
      onSuccess: res => {
        setClientHistory(res);
        setStatus(APIStatus.Success);
      },
      variables: {
        id: args.id,
        type: args.type,
        token,
      },
      onError: err => {
        console.log(err, 'useFetchGetClientsHistoryErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
