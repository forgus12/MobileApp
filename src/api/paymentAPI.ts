import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { APIRequest, callAPI } from '../lib/axiosAPI'; //getServicesPayment

export interface IMaintenance {
  title: string;
  price: { label: string; value: number };
  duration: { label: string; value: number };
}

interface ServicesVarI {
  token?: string;
  id?: number;
}

export interface ServicesRequest {
  finance_analytics: boolean;
  many_maintenances: boolean;
  maintenances: [IMaintenance];
}

const getServicesPayment: APIRequest<null, { status: string; data: ServicesRequest }, null, ServicesVarI> = args => {
  return callAPI({
    url: 'services',
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

const getLinkPayment: APIRequest<null, { status: string; data: ServicesRequest }, null, ServicesVarI> = args => {
  return callAPI({
    url: 'payment/init',
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

const getCancelPayment: APIRequest<null, { status: string; data: ServicesRequest }, null, ServicesVarI> = args => {
  return callAPI({
    url: 'payment/cancel',
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

const getCheckTerminal: APIRequest<null, { status: string; data: ServicesRequest }, null, ServicesVarI> = args => {
  return callAPI({
    url: 'payment/check_terminal',
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

const getCurrentOrder: APIRequest<null, { status: string; data: ServicesRequest }, null, ServicesVarI> = args => {
  return callAPI({
    url: 'order',
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

const getSharePayment: APIRequest<null, { status: string; data: ServicesRequest }, null, ServicesVarI> = args => {
  return callAPI({
    url: 'referral',
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

const createSharePayment: APIRequest<null, { status: string; data: ServicesRequest }, null, ServicesVarI> = args => {
  return callAPI({
    url: 'referral',
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

const APIs = {
  getServicesPayment,
  getLinkPayment,
  getCheckTerminal,
  getCurrentOrder,
  getCancelPayment,
  getSharePayment,
  createSharePayment,
};

export const paymentApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...APIs }, dispatch);
};
