import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, callAPI } from '../lib/axiosAPI';
import { AllServicesI } from '../slices/newOrderSlice';

interface ServicesVarI {
  token?: string;
}

const getAllClients: APIRequest<null, null, null, ServicesVarI> = args => {
  return callAPI({
    url: 'specialist/contactBook',
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

const getAllServices: APIRequest<null, AllServicesI, null, ServicesVarI> = args => {
  return callAPI({
    url: 'specialist/maintenance/all',
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

const createClient: APIRequest<any, any, any, ServicesVarI> = args => {
  return callAPI({
    url: 'specialist/client',
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

const createService: APIRequest<any, any, any, ServicesVarI> = args => {
  return callAPI({
    url: 'specialist/maintenance/new',
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

const createOrder: APIRequest<null, null, null, ServicesVarI> = args => {
  return callAPI({
    url: 'specialist/appointment',
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

const updateOrder: APIRequest<any, any, any, any> = args => {
  return callAPI({
    url: `specialist/appointment/${args?.variables.id}`,
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
  getAllClients,
  getAllServices,
  createClient,
  createService,
  createOrder,
  updateOrder,
};

export const newOrderAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
