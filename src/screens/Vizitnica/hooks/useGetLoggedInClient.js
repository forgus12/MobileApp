import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';
import { vizitnicaApi } from '../../../api/vizitnicaApi';

export const useGetLoggedInClient = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { getLoggedInClient } = vizitnicaApi();
  const { updateUserData } = verificationActionCreators();
  const { token } = useSelector(s => s?.authentication);
  const userData = useSelector(state => state.vizitnica.userData);

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    getLoggedInClient({
      token,
      onSuccess: res => {
        setStatus(APIStatus.Success);
        const normalizedData = {
          ...userData,
          id: res.data.id,
          photo: res.data.avatar,
          name: res.data.name,
          surname: res.data.surname,
          phone: res.data.phone,
        };

        updateUserData(normalizedData);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  });

  return { fetch, status };
};
