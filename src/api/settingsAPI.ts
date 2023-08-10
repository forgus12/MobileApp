import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, callAPI } from '../lib/axiosAPI';

const unsetPinCode: APIRequest<any, any> = args => {
  return callAPI({
    url: 'auth/pin/unset',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const setFaceId: APIRequest<any, any> = args => {
  return callAPI({
    url: 'auth/face/set',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const unsetFaceId: APIRequest<any, any> = args => {
  return callAPI({
    url: 'auth/face/unset',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const logout: APIRequest<any, any> = args => {
  return callAPI({
    url: 'auth/logout',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

export const APIs = {
  unsetPinCode,
  setFaceId,
  unsetFaceId,
  logout,
};

export const settingsAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
