import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const tokenMessaging = args => {
  return callAPI({
    url: `notify/get_token`,
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const APIs = {
  tokenMessaging,
};

export const tokenMessagingApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
