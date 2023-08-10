import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, APIStatus, callAPI } from '../lib/axiosAPI';

interface ServicesVarI {
    token?: string;
}

interface ResponseI {
  data: boolean;
  status: APIStatus;
}

const changeSchedule: APIRequest<any, ResponseI, null, ServicesVarI> = args => {
    return callAPI({
      url: 'specialist/schedule/single/workday',
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
    changeSchedule,
};

export const changeScheduleAPI = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
      {
        ...APIs,
      },
      dispatch,
    );
  };