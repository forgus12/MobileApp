import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updateDataApi } from '../../../api/updateDataAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';
import { useGetBusinessCards } from '../../Vizitnica/hooks/useGetBusinessCards';

export const useUpdateBusinessCard = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { fetch: fetchAllCards } = useGetBusinessCards();
  const { setImage, setAvatarPicId, setIsCadrSpecialist } = verificationActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { updateBusinessCard } = updateDataApi();

  const fetch = (body, id) => {
    setStatus(APIStatus.Loading);
    updateBusinessCard({
      token,
      id,
      payload: body,
      onSuccess: resp => {
        if (resp.data === true) {
          fetchAllCards();
          setImage(null);
          setAvatarPicId(null);
          setStatus(APIStatus.Success);
          setIsCadrSpecialist(false);
        }
        if (resp.data?.id) {
          setIsCadrSpecialist(true);
        }
      },
      onError: err => console.log(err, 'err in getCard'),
    });
  };

  return { fetch, status };
};
