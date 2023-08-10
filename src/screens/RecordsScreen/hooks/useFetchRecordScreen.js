import React from 'react';
import { settingsRecordScreenAPI } from '../../../api/settingsRecordScreen';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState } from '../../../store';
import { recordScreenActionCreators } from '../../../slices/recordScreenSlice';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const useFetchRecordScreen = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { settingsRecordScreen } = settingsRecordScreenAPI();
  const { getRecordScreenService } = recordScreenActionCreators();
  const { token } = useSelector((s: RootState) => s?.authentication);

  const fetchRecordScreenService = React.useCallback(id => {
    setStatus(APIStatus.Loading);
    settingsRecordScreen({
      token,
      idSpecialist: id,
      onSuccess: response => {
        const listRecordScreenService = response?.data?.map(item => {
          return {
            id: item?.id,
            title: item?.title,
            price: item?.price?.value,
            thisCountPrice: item?.discount,
            time: {
              hours: Math.floor(item?.duration?.value / 60),
              minutes: item?.duration?.value % 60,
            },
            selected: false,
            countServices: null,
          };
        });
        getRecordScreenService(listRecordScreenService);
        setStatus(APIStatus.Success);
      },
      onError: err => {
        console.log(err, 'useFetchRecordScreenErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetchRecordScreenService, status };
};

export const useFetchDateFreeHoursRecordScreen = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { dateFreeHoursForDay } = settingsRecordScreenAPI();
  const { getFreeHoursInDays } = recordScreenActionCreators();
  const { token } = useSelector(state => state.authentication);
  const time = moment().format('HH:mm');
  const today = moment().format('YYYY-MM-DD');
  const month = moment().format('YYYY-MM');

  const fetchFreeHoursDateRecordScreen = React.useCallback((dateSelect, id, minutes) => {
    dateSelect = dateSelect?.split('.')?.reverse()?.join('-');
    if (today != dateSelect) {
      dateSelect = dateSelect.substring(0, dateSelect.length - 2) + '01';
    }
    if (dateSelect != today && dateSelect.slice(0, 7) === month) {
      dateSelect = today;
    }
    setStatus(APIStatus.Loading);
    dateFreeHoursForDay({
      date: dateSelect,
      token,
      idSpecialist: id,
      minutes,
      time,

      onSuccess: response => {
        const dateFreeHours = response?.data?.map((item, index) => {
          return { ...item, id: index };
        });
        setStatus(APIStatus.Success);
        getFreeHoursInDays(dateFreeHours);
        return dateFreeHours;
      },
      onError: err => {
        console.log(err, 'useFetchDateFreeHoursRecordScreenErr');
        setStatus(APIStatus.Failure);
      },
    });
  }, []);
  return { fetchFreeHoursDateRecordScreen, status };
};
