import React from 'react';

import { myServicesAPI, ISettingsServices } from '../../../api/myServicesAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useUpdateSettingsServices = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { updateSettingsServices } = myServicesAPI();

  const fetch = React.useCallback((args: ISettingsServices) => {
    setStatus(APIStatus.Loading);
    updateSettingsServices({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        console.log(err, 'useUpdateSettingsServicesErr');
        setStatus(APIStatus.Failure);
      },
      payload: args,
      variables: {
        token,
      },
    });
  }, []);

  return { fetch, status };
};
