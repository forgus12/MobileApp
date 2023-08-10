import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useCreateVizitnica = () => {
  const { token } = useSelector((state: RootState) => state.authentication);
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { sendPersonalData } = vizitnicaApi();

  const fetch = args => {
    setStatus(APIStatus.Loading);
    sendPersonalData({
      token,
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      payload: args,
      onError: err => {
        console.log(err, 'errUseCreateVizitnica');

        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
