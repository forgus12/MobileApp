import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserI } from '../slices/authenticationSlice';
import { APIRequest, callAPI } from '../lib/axiosAPI';

interface UserResponse {
  data?: UserI;
}

interface UserRequest {
  phone_number: string;
  device_id?: string;
  pin?: string;
}

interface IsUserRequest {
  phone_number: string;
  device_id: string;
}

const isUserExists: APIRequest<IsUserRequest, UserResponse> = args => {
  return callAPI({
    url: 'isUserExists',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const fetchSignIn: APIRequest<UserRequest, UserResponse> = args => {
  return callAPI({
    url: 'auth/signin',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const addedRole: APIRequest<IsUserRequest, UserResponse> = args => {
  return callAPI({
    url: 'auth/user/set_role',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

export const APIs = {
  isUserExists,
  fetchSignIn,
  addedRole,
};

export const authenticationAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
