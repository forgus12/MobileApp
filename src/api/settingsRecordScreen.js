import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';

const settingsRecordScreen = args => {
  return callAPI({
    url: `client/specialist/${args.idSpecialist}/maintenances`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const dateFreeHoursForDay = args => {
  return callAPI({
    url: `client/specialist/${args.idSpecialist}/freeHours/${args.minutes}/${args.date}/${args.time}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const checkForDuplicates = args => {
  return callAPI({
    url: `client/appointment/specialist/${args.id}/checkForDuplicates`,
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const APIs = {
  settingsRecordScreen,
  dateFreeHoursForDay,
  checkForDuplicates,
};

export const settingsRecordScreenAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...APIs }, dispatch);
};
