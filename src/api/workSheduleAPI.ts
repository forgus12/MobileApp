import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, callAPI } from '../lib/axiosAPI';
import { IWorkShedule, IWorkSheduleObject } from '../slices/workShedule';

interface WorkSheduleVarI {
  token?: string;
}

const createWorkShedule: APIRequest<null, null, null, WorkSheduleVarI> = args => {
  return callAPI({
    url: 'specialist/schedule',
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

const getWorkShedule: APIRequest<null, IWorkShedule, null, WorkSheduleVarI> = args => {
  return callAPI({
    url: 'specialist/schedule',
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

const updateWorkShedule: APIRequest<IWorkSheduleObject, IWorkShedule, null, WorkSheduleVarI> = args => {
  return callAPI({
    url: 'specialist/schedule',
    config: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.variables?.token}`,
      },
    },
    ...args,
  });
};

export const APIs = {
  createWorkShedule,
  getWorkShedule,
  updateWorkShedule,
};

export const workSheduleAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
