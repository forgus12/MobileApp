import React from 'react';

import { onboardingAPI } from '../../../api/onboardingAPI';
import { onboardingActionCreators } from '../../../slices/onboardingSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useFetchOnboardings = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getOnboardings } = onboardingAPI();
  const { setOnboardings } = onboardingActionCreators();

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getOnboardings({
      onSuccess: response => {
        setOnboardings(response);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
