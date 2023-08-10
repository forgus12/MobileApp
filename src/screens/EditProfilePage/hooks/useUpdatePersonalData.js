import { useCallback, useState } from 'react';
import { useSelector } from '../../../store';
import { APIStatus } from '../../../lib/axiosAPI';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useUpdatePersonalData = () => {
  const { updatePersonalData } = vizitnicaApi();

  const [status, setStatus] = useState(APIStatus.Initial);

  const { token } = useSelector(state => state.authentication);

  const fetch = useCallback(args => {
    setStatus(APIStatus.Loading);
    updatePersonalData({
      onSuccess: res => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        console.log(err, 'useUpdatePersonalDataErr');
        setStatus(APIStatus.Failure);
      },
      payload: args,
      token,
    });
  });

  return { updateUserData: fetch, status };
};
