import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, APIStatus, callAPI } from '../lib/axiosAPI';

interface BreakResponse {
  data: number | boolean;
  status: APIStatus;
  id: number;
}

interface VarI {
  token?: string;
  id?: number;
  type?: string;
  day_id?: string;
}

const appendBreak: APIRequest<null, BreakResponse, null, VarI> = args => {
  return callAPI({
    url: 'specialist/schedule/single',
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

const getBreak: APIRequest<null, BreakResponse, null, VarI> = args => {
  return callAPI({
    url: 'specialist/schedule/single/breaks',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

const updateBreak: APIRequest<null, BreakResponse, null, VarI> = args => {
  return callAPI({
    url: 'specialist/schedule/single/update_break',
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

const deleteBreak: APIRequest<null, BreakResponse, null, VarI> = args => {
  return callAPI({
    url: `specialist/schedule/single/break/${args?.variables?.day_id}`,
    config: {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
      data: { date: args?.payload?.date, single_id: args?.payload?.single_id },
    },
    ...args,
  });
};

export const APIs = {
  appendBreak,
  getBreak,
  updateBreak,
  deleteBreak,
};

export const appendBreakAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
