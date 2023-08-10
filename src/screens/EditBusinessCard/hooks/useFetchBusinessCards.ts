import React from 'react';

import { myBusinessCardAPI } from '../../../api/myBusinessCardAPI';
import { myBusinessCardActionCreators } from '../../../slices/myBusinessCardSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchBusinessCards = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getBusinessCards } = myBusinessCardAPI();
  const { setBusinessCards } = myBusinessCardActionCreators();

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getBusinessCards({
      onSuccess: response => {
        setBusinessCards(response);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
