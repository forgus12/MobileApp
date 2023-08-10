import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActivityKindsI } from '../slices/personalDataSlice';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface ActivityKindsResponse {
  data?: ActivityKindsI;
}

interface ImageResponse {
  status: string;
  data: {
    url: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

interface ImageVarI {
  token?: string;
}

const getActivityKinds: APIRequest<null, ActivityKindsResponse> = args => {
  return callAPI({
    url: 'getActivityKinds',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const uploadImage: APIRequest<any, ImageResponse, null, ImageVarI> = args => {
  return callAPI({
    url: 'image',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

export const APIs = {
  getActivityKinds,
  uploadImage,
};

export const personalDataAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
