import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BusinessCardsI, DataI } from '../slices/myBusinessCardSlice';
import { APIRequest, callAPI } from '../lib/axiosAPI';
import { UserDataI } from '../slices/personalDataSlice';

interface SpecialistVarI {
  token?: string;
}

const getBusinessCards: APIRequest<null, BusinessCardsI> = args => {
  return callAPI({
    url: 'getBackgrounds',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const createSpecialist: APIRequest<
  UserDataI,
  null,
  null,
  SpecialistVarI
> = args => {
  return callAPI({
    url: 'specialist/profile',
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

const updateSpecialist: APIRequest<
  UserDataI,
  null,
  null,
  SpecialistVarI
> = args => {
  return callAPI({
    url: 'specialist/profile',
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

const getSpecialistCard: APIRequest<null, DataI, null, SpecialistVarI> = args => {
  return callAPI({
    url: 'specialist/card',
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
  getBusinessCards,
  createSpecialist,
  updateSpecialist,
  getSpecialistCard,
};

export const myBusinessCardAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
