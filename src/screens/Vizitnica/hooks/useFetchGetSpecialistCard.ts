import React from 'react';

import { myBusinessCardAPI } from '../../../api/myBusinessCardAPI';
import { myBusinessCardActionCreators } from '../../../slices/myBusinessCardSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useFetchGetSpecialistCard = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getSpecialistCard } = myBusinessCardAPI();
  const { setMyBusinessCard } = myBusinessCardActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getSpecialistCard({
      onSuccess: response => {
        setMyBusinessCard(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useFetchGetSpecialistCardErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
