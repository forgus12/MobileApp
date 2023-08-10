import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const sendPersonalData = args => {
  return callAPI({
    url: `client/profile`,
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

const getClientInfo = args => {
  return callAPI({
    url: `client/profile`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
    ...args,
  });
};

const logOutClient = args => {
  return callAPI({
    url: 'auth/logout',
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

const getAppointmentHistory = args => {
  return callAPI({
    url: `client/appointment/history`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

export const deleteAppointmentCardHistory = args => {
  return callAPI({
    url: `specialist/appointment/${args.orderNumbers}`,
    config: {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
      data: { is_client: true },
    },
    ...args,
  });
};

const updateHistorySpecialist = args => {
  return callAPI({
    url: `client/appointment/specialist/${args?.orderNumber}`,
    config: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const updatePersonalData = args => {
  return callAPI({
    url: 'client/profile',
    config: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const createCardsMass = args => {
  return callAPI({
    url: 'client/contactBook/mass',
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

const getUserCard = args => {
  return callAPI({
    url: 'client/card',
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

const getSpecialistById = args => {
  return callAPI({
    url: `specialist/profile/${args?.specialistId}`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const getLoggedInClient = args => {
  return callAPI({
    url: `client/profile`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const APIs = {
  sendPersonalData,
  getClientInfo,
  logOutClient,
  getAppointmentHistory,
  deleteAppointmentCardHistory,
  updateHistorySpecialist,
  updatePersonalData,
  createCardsMass,
  getUserCard,
  getSpecialistById,
  getLoggedInClient,
};

export const vizitnicaApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...APIs }, dispatch);
};
