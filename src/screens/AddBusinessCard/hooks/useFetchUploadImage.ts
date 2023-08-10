import React from 'react';

import { personalDataAPI } from '../../../api/personalDataAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { PictureI } from '../../../components/ChoiceAvatar';
import { RootState, useSelector } from '../../../store';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';

export const useFetchUploadImage = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { uploadImage } = personalDataAPI();
  const { setAvatarUrl, setAvatarPicId } = verificationActionCreators();
  const { setImage } = verificationActionCreators();

  const fetch = React.useCallback((selectedPhoto: PictureI, isAvatar = true) => {
    const formData = new FormData();
    formData.append('image', {
      uri: selectedPhoto?.path,
      type: selectedPhoto?.mime,
      name: 'image',
    });

    setStatus(APIStatus.Loading);
    uploadImage({
      onSuccess: response => {
        if (isAvatar) {
          setAvatarPicId(response?.data.id);
          setAvatarUrl(response?.data.url);
        } else {
          setImage(response.data);
        }
      },
      payload: formData,
      variables: {
        token,
      },
    });
  }, []);

  return { fetch, status };
};
