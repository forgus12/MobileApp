import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const supportSpecialist = args => {
  return callAPI({
    url: `specialist/support`,
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
    ...args,
  });
};

const supportClient = args => {
  return callAPI({
    url: `client/support`,
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
    ...args,
  });
};

const APIs = {
  supportSpecialist,
  supportClient,
};

export const supportApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...APIs }, dispatch);
};
