import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, callAPI } from '../lib/axiosAPI';

export interface IMaintenance {
  title: string;
  price: { label: string; value: number };
  duration: { label: string; value: number };
}

export interface ISettingsServices {
  finance_analytics: boolean;
  many_maintenances: boolean;
}

export interface ServicesRequest {
  finance_analytics: boolean;
  many_maintenances: boolean;
  maintenances: [IMaintenance];
}

interface ServicesResponse {
    status: string;
    data: boolean;
}

interface ServicesVarI {
  token?: string;
  id?: number;
}

const createServices: APIRequest<
  ServicesRequest,
  null,
  null,
  ServicesVarI
> = args => {
  return callAPI({
    url: 'specialist/maintenance',
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

const updateServices: APIRequest<
  IMaintenance,
  ServicesResponse,
  null,
  ServicesVarI
> = args => {
  return callAPI({
    url: `specialist/maintenance`,
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

const updateSettingsServices: APIRequest<
  ISettingsServices,
  ServicesResponse,
  null,
  ServicesVarI
> = args => {
  return callAPI({
    url: 'specialist/maintenance/settings',
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

const getSettingsServices: APIRequest<
  null,
  {status: string, data: ServicesRequest},
  null,
  ServicesVarI
> = args => {
  return callAPI({
    url: 'specialist/maintenance',
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

export const APIs = {
  createServices,
  updateServices,
  updateSettingsServices,
  getSettingsServices
};

export const myServicesAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
