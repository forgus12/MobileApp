import React from 'react';

import { myBusinessCardAPI } from '../../../api/myBusinessCardAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useCreateSpecialist = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { userData } = useSelector((s: RootState) => s?.personalData);
  const { createSpecialist } = myBusinessCardAPI();

  const fetch = React.useCallback(
    (background_image: string) => {
      setStatus(APIStatus.Loading);
      createSpecialist({
        onSuccess: response => {
          setStatus(APIStatus.Success);
        },
        onError: err => {
          console.log(err, 'useCreateSpecialistErr');
          setStatus(APIStatus.Failure);
        },
        payload: { background_image, ...userData },
        variables: {
          token,
        },
      });
    },
    [userData],
  );

  return { fetch, status };
};
