import React from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';

import { vizitnicaApi } from '../../../api/vizitnicaApi';
import { useGetBusinessCards } from '../../Vizitnica/hooks/useGetBusinessCards';

export const useCreateCardsMass = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { createCardsMass } = vizitnicaApi();
  const { token } = useSelector(s => s?.authentication);
  const { fetch: fetchAll } = useGetBusinessCards();

  const fetch = data => {
    setStatus(APIStatus.Loading);
    createCardsMass({
      onSuccess: () => {
        setStatus(APIStatus.Success);
        fetchAll();
      },
      payload: {
        data: data,
      },
      token,
      onError: err => {
        console.log(err, 'useCreateCardsMassErr');
        setStatus(APIStatus.Failure);
      },
    });
  };
  return { fetch, status };
};
