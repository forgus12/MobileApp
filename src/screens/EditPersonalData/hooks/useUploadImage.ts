import React from 'react';

import { personalDataAPI } from '../../../api/personalDataAPI';
import { personalDataActionCreators } from '../../../slices/personalDataSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { PictureI } from '../../../components/ChoiceAvatar';
import { RootState, useSelector } from '../../../store';

export const useUploadImage = () => {
  const [status, setStatus] = React.useState<APIStatus>(APIStatus.Initial);
  const { token } = useSelector((s: RootState) => s?.authentication);
  const { uploadImage } = personalDataAPI();
  const { setImageId } = personalDataActionCreators();

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
        setImageId({ id: data.id, url: data.url });
        setStatus(APIStatus.Success);
      },
      onError: err => {
        console.log(err, 'useUploadImageErr');
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
