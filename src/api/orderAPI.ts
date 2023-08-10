import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, callAPI } from '../lib/axiosAPI';
import { APIStatus } from '../lib/axiosAPI';

interface ServicesVarI {
    token?: string;
    order?: string;
  }

  interface OrderI {
    data?: boolean;
    status?: APIStatus;
  }

  const confirmOrder: APIRequest<null, OrderI, null, ServicesVarI> = args => {
    return callAPI({
      url: `specialist/appointment/${args?.variables?.order}/confirm`,
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

  const skippedOrder: APIRequest<null, OrderI, null, ServicesVarI> = args => {
    return callAPI({
      url: `specialist/appointment/${args?.variables?.order}/skipped`,
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

  const deleteOrder: APIRequest<null, OrderI, null, ServicesVarI> = args => {
    return callAPI({
      url: `specialist/appointment/${args?.variables?.order}`,
      config: {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${args?.variables?.token}`,
        },
      },
      ...args,
    });
  };

  export const APIs = {
    confirmOrder,
    skippedOrder,
    deleteOrder,
  };

  export const orderAPI = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
      {
        ...APIs,
      },
      dispatch,
    );
  };
  