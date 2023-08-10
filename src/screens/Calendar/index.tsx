import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Alert, BackHandler, Linking, TouchableOpacity } from 'react-native';

import TopTabBar from '../../navigation/TopTabBar';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { MainLayouts, ToastLayouts } from '../../layouts';
import { SIZES } from '../../constants';

import { AgendaTab, CalendarTab } from './tabs';
import { WeekDayNamesBlock } from './blocks';
import { useSelector } from 'react-redux';

import { useFetchUser } from '../Authentication/hooks/useFetchUser';
import { useGetClientInfo } from '../Vizitnica/hooks/useGetClientInfo';
import { useNavigationState } from '@react-navigation/native';

interface IProps {
  navigation: NavigationType;
}

const Calendar: React.FC<IProps> = ({ navigation }) => {
  const { fetch: fetchUser } = useFetchUser();
  const { fetch: fetchClientInfo } = useGetClientInfo();
  const userData = useSelector(s => s?.vizitnica?.userData);

  React.useEffect(() => {
    fetchUser(String(userData.phone));
  }, [userData]);

  React.useEffect(() => {
    fetchClientInfo();
  }, []);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <ToastLayouts>
        <TopTabBar
          screen1={{
            name: 'AgendaTab',
            component: AgendaTab,
            label: 'День',
          }}
          screen2={{
            name: 'CalendarTab',
            component: CalendarTab,
            label: 'Месяц',
          }}
          renderRightContent={indexTab => (
            <TouchableOpacity
              style={{ marginLeft: SIZES.padding * 2.7 }}
              onPress={() =>
                indexTab === 1 ? navigation.navigate('ScheduleChange') : navigation.navigate('ScheduleTimeChange')
              }>
              <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <Path
                  d="M9 20H2C0.89 20 0 19.1 0 18L0.00999999 4C0.00999999 2.9 0.89 2 2 2H3V0H5V2H13V0H15V2H16C17.1 2 18 2.9 18 4V10H16V8H2V18H9V20ZM19.13 14.99L19.84 14.28C20.23 13.89 20.23 13.26 19.84 12.87L19.13 12.16C18.74 11.77 18.11 11.77 17.72 12.16L17.01 12.87L19.13 14.99ZM18.42 15.7L13.12 21H11V18.88L16.3 13.58L18.42 15.7Z"
                  fill="#38B8E0"
                />
              </Svg>
            </TouchableOpacity>
          )}
          renderBottomContent={() => <WeekDayNamesBlock />}
        />
      </ToastLayouts>
    </MainLayouts>
  );
};

export default Calendar;
