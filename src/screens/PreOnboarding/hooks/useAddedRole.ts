import React from 'react';

import { authenticationAPI } from '../../../api/authenticationAPI';
import { authenticationActionCreators } from '../../../slices/authenticationSlice';
import { APIStatus } from '../../../lib/axiosAPI';

export const useAddedRole = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { addedRole } = authenticationAPI();
  const { setPhoneNumber } = authenticationActionCreators();

  const fetch = React.useCallback(async (phone: string, role: string) => {
    setStatus(APIStatus.Loading);

    addedRole({
      onSuccess: resp => {
        setPhoneNumber(phone);
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'useAddedRoleErr');
      },
      payload: {
        phone: phone,
        role,
      },
    });
  }, []);

  return { fetch, status };
};
