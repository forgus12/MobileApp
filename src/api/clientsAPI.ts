import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { APIRequest, APIStatus, callAPI } from '../lib/axiosAPI';
import { ClientI, ProfileI } from '../slices/clientsSlice';

interface ContactBookI {
  status: APIStatus;
  data: Array<ClientI>;
}

interface VarI {
  token?: string;
  id?: string | number;
  type?: string;
}

interface ImportClientI {
  phone_number?: string;
  name?: string;
  surname?: string;
}

interface ImportMassClientsI {
  data: Array<ImportClientI>;
}

interface ResImportMassClientI {
  status: APIStatus;
  data: Array<{
    client_id: number;
    specialist_id: number;
    updated_at: string;
    created_at: string;
    id: number;
  }>;
}

interface AddToBlacklistI {
  type: string;
}

interface MassDeleteI {
  client_ids: Array<number>;
  dummy_client_ids: Array<number>;
}

interface ResI {
  data: boolean;
  status: string;
}

const getAllClients: APIRequest<null, ContactBookI, any, VarI> = args => {
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

const deleteClient: APIRequest<null, ResI, any, VarI> = args => {
  return callAPI({
    url: `specialist/contactBook/${args?.variables?.id}/${args.variables?.type}`,
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

const addContactsToClients: APIRequest<ImportMassClientsI, ResImportMassClientI, any, VarI> = args => {
  return callAPI({
    url: 'specialist/contactBook/mass',
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

const getBlacklist: APIRequest<null, ContactBookI, any, VarI> = args => {
  return callAPI({
    url: 'specialist/blacklist',
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

const addToBlackList: APIRequest<AddToBlacklistI, ResI, any, VarI> = args => {
  return callAPI({
    url: `specialist/blacklist/${args?.variables?.id}`,
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

const deleteFromBlackList: APIRequest<AddToBlacklistI, ResI, any, VarI> = args => {
  return callAPI({
    url: `specialist/blacklist/${args?.variables?.id}/${args?.variables?.type}`,
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

const updateClientsData: APIRequest<ClientI, ClientI, any, VarI> = args => {
  return callAPI({
    url: `specialist/clientData/${args?.variables?.id}`,
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

const getClientsHistory: APIRequest<null, ProfileI, any, VarI> = args => {
  return callAPI({
    url: `specialist/clientData/${args?.variables?.id}/${args?.variables?.type}/history`,
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

const deleteToContactList: APIRequest<MassDeleteI, any, any, VarI> = args => {
  return callAPI({
    url: 'specialist/contactBook/massDelete',
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

const getMyProfile: APIRequest<null, ProfileI, any, VarI> = args => {
  return callAPI({
    url: 'specialist/profile',
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
  getAllClients,
  deleteClient,
  addContactsToClients,
  getBlacklist,
  addToBlackList,
  deleteFromBlackList,
  updateClientsData,
  getClientsHistory,
  deleteToContactList,
  getMyProfile,
};

export const clientsAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
