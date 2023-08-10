import React from 'react';

import { personalDataAPI } from '../../../api/personalDataAPI';
import { personalDataActionCreators } from '../../../slices/personalDataSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchActivityKinds = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getActivityKinds } = personalDataAPI();
  const { setActivityKinds } = personalDataActionCreators();

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getActivityKinds({
      onSuccess: response => {
        setActivityKinds(response);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
