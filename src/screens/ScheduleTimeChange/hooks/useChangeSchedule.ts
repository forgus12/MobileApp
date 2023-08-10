import React from 'react';

import { changeScheduleAPI } from '../../../api/changeScheduleAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';

export const useChangeSchedule = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { changeSchedule } = changeScheduleAPI();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetch = args => {
    setStatus(APIStatus.Loading);
    changeSchedule({
      onSuccess: response => {
        setStatus(APIStatus.Success);
      },
      payload: args,
      variables: {
        token,
      },
      onError: err => {
        if (err === 'Already was intersection break') {
          setStatus(APIStatus.FailureEntry);
        } else if (err === 'Break already was') {
          setStatus(APIStatus.FailureBreak);
        } else if (err === 'Already was intersection weekend') {
          setStatus(APIStatus.FailureWeekend);
        }
      },
    });
  };

  return { fetch, status };
};
