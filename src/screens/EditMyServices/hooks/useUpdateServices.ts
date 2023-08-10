import React from 'react';

import { myServicesAPI, IMaintenance } from '../../../api/myServicesAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useUpdateServices = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { updateServices } = myServicesAPI();

  const fetch = React.useCallback((args: IMaintenance) => {
    setStatus(APIStatus.Loading);
    updateServices({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        console.log(err, 'useUpdateServicesErr');
        setStatus(APIStatus.Failure);
      },
      payload: args,
      variables: {
        token,
        //id,
      },
    });
  }, []);

  return { fetch, status };
};
