import React from 'react';

import { personalDataAPI } from '../../../api/personalDataAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { PictureI } from '../../../components/ChoiceAvatar';
import { RootState, useSelector } from '../../../store';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';

export const useUploadImage = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { uploadImage } = personalDataAPI();
  const { setAvatarPicId } = verificationActionCreators();

  const fetch = React.useCallback((selectedPhoto: PictureI) => {
    const formData = new FormData();
    formData.append('image', {
      uri: selectedPhoto?.path,
      type: selectedPhoto?.mime,
      name: 'image',
    });

    setStatus(APIStatus.Loading);
    uploadImage({
      onSuccess: response => {
        const { data } = response;
        setAvatarPicId({ id: data.id, url: data.url });
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
      payload: formData,
      variables: {
        token,
      },
    });
  }, []);

  return { fetch, status };
};
