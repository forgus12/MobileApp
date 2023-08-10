import React from 'react';

import { workSheduleAPI } from '../../../api/workSheduleAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { workSheduleActionCreators } from '../../../slices/workShedule';

export const useFetchGetWorkShedule = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { getWorkShedule } = workSheduleAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { setWorkShedule } = workSheduleActionCreators();

  const fetch = () => {
    setStatus(APIStatus.Loading);
    getWorkShedule({
      onSuccess: response => {
        setWorkShedule(response);
        setStatus(APIStatus.Success);
      },
      variables: {
        token,
      },
      onError: err => {
        console.log(err, 'useFetchGetWorkSheduleErr');
        setStatus(APIStatus.Failure);
      },
    });
  };

  return { fetch, status };
};
