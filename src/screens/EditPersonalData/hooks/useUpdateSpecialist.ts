import React from 'react';

import { myBusinessCardAPI } from '../../../api/myBusinessCardAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useUpdateSpecialist = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { userData } = useSelector((s: RootState) => s?.personalData);
  const { updateSpecialist } = myBusinessCardAPI();

  const fetch = React.useCallback((args: any) => {
    setStatus(APIStatus.Loading);
    updateSpecialist({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      payload: args,
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useUpdateSpecialistErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
