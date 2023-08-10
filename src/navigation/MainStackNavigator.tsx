import React, { useEffect, useRef, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import { useToast } from 'react-native-toast-notifications';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';

import { getFromStoreData, removeFromStoreData } from '../lib/asyncStorageManager';
import { useFetchUser } from '../screens/Authentication/hooks/useFetchUser';
import { RootState, useSelector } from '../store';
import { authenticationActionCreators, isAuthenticatedI } from '../slices/authenticationSlice';
import { NoInternet } from '../components';
import { useFetchSignIn } from '../screens/Authentication/hooks/useFetchSignIn';
import { APIStatus } from '../lib/axiosAPI';
import {
  Authentication,
  EnterPinCode,
  Onboarding,
  PreOnboarding,
  PhoneVerification,
  PersonalData,
  MyBusinessCard,
  MyServices,
  WorkSchedule,
  NewOrder,
  AppendBreak,
  ScheduleChange,
  ScheduleTimeChange,
  ClientData,
  EditClientData,
  AddClients,
  EditBusinessCard,
  SettingsPersonalData,
  EditPersonalData,
  SettingsBysinessCard,
  SettingServices,
  EditMyServices,
  SettingWorkSchedule,
  EditWorkShedule,
  SupportPage,
  PersonalDataClient,
  Vizitnica,
  ProfilePage,
  StoryPage,
  EditProfilePage,
  ContactImports,
  AddBusinessCard,
  BusinessCardPage,
  EditBusinessCardSpecialist,
  RecordScreen,
  Payment,
} from '../screens';

import AddService from '../screens/RecordsScreen/AddService/AddService';

import TabBarCalendar, { VizitnicaTabs } from './TabBar';
import Share from '../screens/BusinessCardPage/Share';
import HistoryPageSpecialist from '../screens/BusinessCardPage/HistorySpecialist/HistoryPageSpecialist';
import Map from '../screens/BusinessCardPage/Map';

import { useTokenMessaging } from './hooks/useTokenMessaging';
import messaging from '@react-native-firebase/messaging';
import NotificationController from '../components/pushIOS';
import { Alert, Linking, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { AppState } from 'react-native';
import BottomTabNavigator from './TopTabBar/BottomTabNavigator';
import notifee, { EventType } from '@notifee/react-native';
import Toast from 'react-native-toast-notifications/lib/typescript/toast';

const Stack = createStackNavigator();
const MainStackNavigator = () => {
  const { fetch: fetchUser, status: statusFetchUser } = useFetchUser();
  const { fetch: fetchSignIn, status: statusFetchSignIn } = useFetchSignIn();
  const { setIsAuthenticated } = authenticationActionCreators();
  const { isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const [isInternet, setIsInternet] = React.useState<boolean>(true);
  const [isInternetToast, setIsInternetToast] = React.useState<boolean>(true);
  const [isTokenExists, setIsTokenExists] = React.useState<null | boolean>(null);
  const toast = useToast();
  const [urlSpec, setUrlSpec] = useState('');
  const { fetch: fetchTokenMessaging, status: statusTokenMessaging } = useTokenMessaging();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const checkingInternet = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsInternet(true);
        getFromStoreData('phoneNumber').then(phoneNumber => {
          if (phoneNumber !== null) {
            fetchUser(String(phoneNumber));
          } else {
            setIsTokenExists(false);
            setIsAuthenticated({ data: { user: false } });
          }
        });
      } else {
        setIsInternet(false);
        RNBootSplash.hide();
      }
    });
  };

  const authorizationWithoutToken = () => {
    if (isAuthenticated?.data?.user && isAuthenticated?.data?.device) {
      if (!isAuthenticated?.data?.pin) {
        getFromStoreData('phoneNumber').then(phoneNumber => {
          if (phoneNumber !== null) {
            fetchSignIn(String(phoneNumber));
          }
        });
      } else setIsTokenExists(false);
    } else setIsTokenExists(false);
  };

  useEffect(() => {
    checkingInternet();
  }, []);

  useEffect(() => {
    if (statusFetchUser === APIStatus.Success) authorizationWithoutToken();
  }, [statusFetchUser]);

  useEffect(() => {
    if (statusFetchSignIn === APIStatus.Success) setIsTokenExists(true);
  }, [statusFetchSignIn]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!(state.isConnected && state.isInternetReachable)) {
        setIsInternetToast(false);
      } else setIsInternetToast(true);
    });
    return () => unsubscribe();
  }, [statusTokenMessaging, appState]);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      checkTokenMessaging();
    }
  };

  const checkTokenMessaging = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      fetchTokenMessaging(fcmToken);
    } else {
      console.log('err fcmToken');
    }
  };

  useEffect(() => {
    if (isTokenExists != null) {
      requestUserPermission();
    }
  }, [isTokenExists]);

  const channelId = 'channel_id';
  PushNotification.channelExists(channelId, exists => {
    if (!exists) {
      PushNotification.createChannel(
        {
          channelId: channelId,
          channelName: 'Channel Name',
          channelDescription: 'Channel Description',
          importance: 4,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const mes = remoteMessage;
      showLocalNotification(mes);
    });

    return () => unsubscribe();
  }, []);

  const showLocalNotification = async data => {
    await notifee.displayNotification({
      title: data.data.title,
      body: data.data.body,
      android: {
        channelId: 'channel_id',
        color: data.notification.android.color,
      },
    });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const mes = remoteMessage;
      showLocalNotification(mes);
    });

    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();

  const handleDeepLink = event => {
    const url = event?.url || null;

    if (url && statusFetchUser == APIStatus.Success) {
      navigation.navigate('ВизитницаТаб');
      setUrlSpec(null);
    }
  };

  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          handleDeepLink({ url });
        }
      })
      .catch(err => {
        console.error(err);
      });

    return () => {
      linkingEvent.remove();
    };
  }, []);

  useEffect(() => {
    if (!isInternetToast && appState?.current == 'active') {
      toast.show('Пропало интернет-соединение', {
        type: 'default',
        duration: 1000000000,
      });
    } else {
      toast.hideAll();
      setIsInternetToast(true);
    }
  }, [isInternetToast, appState?.current]);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          if (
            detail.notification?.title.includes('Ваша подписка') ||
            detail.notification?.title == 'Что-то пошло не так' ||
            detail.notification?.title == 'Подписка отменена'
          ) {
            navigation.navigate('Payment');
          } else {
            navigation.navigate('Календарь');
          }
          break;
      }
    });
  }, []);
  return React.useMemo(
    () =>
      isInternet ? (
        isAuthenticated !== null && isTokenExists !== null ? (
          <>
            {/* <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}> */}
            {Platform.OS == 'ios' ? <NotificationController /> : null}
            <Stack.Navigator
              initialRouteName={
                isAuthenticated?.data?.user && isAuthenticated?.data?.pin
                  ? 'Authentication'
                  : isAuthenticated?.data?.user &&
                    isAuthenticated?.data?.device &&
                    !isAuthenticated?.data?.specialist &&
                    isAuthenticated?.data?.role == 'specialist'
                  ? 'BottomTabNavigator'
                  : isAuthenticated?.data?.user && isAuthenticated?.data?.device && isAuthenticated?.data?.specialist
                  ? 'Calendar'
                  : isAuthenticated?.data?.user &&
                    isAuthenticated?.data?.device &&
                    !isAuthenticated?.data?.client == true &&
                    isAuthenticated?.data?.role == 'client'
                  ? 'PersonalDataClient'
                  : isAuthenticated?.data?.user &&
                    isAuthenticated?.data?.device &&
                    isAuthenticated?.data?.client == true
                  ? 'Vizitnica'
                  : 'Onboarding'
              }
              screenOptions={{ headerShown: false }}>
              <Stack.Screen name="PreOnboarding" component={PreOnboarding} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
              <Stack.Screen name="EnterPinCode" component={EnterPinCode} />
              <Stack.Screen name="PersonalData" component={PersonalData} options={{ gestureEnabled: false }} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />

              <Stack.Screen name="SettingsPersonalData" component={SettingsPersonalData} />
              <Stack.Screen name="EditPersonalData" component={EditPersonalData} />
              <Stack.Screen name="MyBusinessCard" component={MyBusinessCard} />
              <Stack.Screen name="SettingsBysinessCard" component={SettingsBysinessCard} />
              <Stack.Screen name="EditBusinessCard" component={EditBusinessCard} />
              <Stack.Screen name="EditBusinessCardSpecialist" component={EditBusinessCardSpecialist} />
              <Stack.Screen name="StoryPage" component={StoryPage} />
              <Stack.Screen name="Share" component={Share} />

              <Stack.Screen name="PersonalDataClient" component={PersonalDataClient} />
              <Stack.Screen name="MyServices" component={MyServices} />
              <Stack.Screen name="SettingServices" component={SettingServices} />
              <Stack.Screen name="EditMyServices" component={EditMyServices} />
              <Stack.Screen name="WorkSchedule" component={WorkSchedule} />
              <Stack.Screen name="Vizitnica" component={Vizitnica} />
              <Stack.Screen name="ContactImports" component={ContactImports} />
              <Stack.Screen name="AddBusinessCard" component={AddBusinessCard} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="RecordScreen" component={RecordScreen} />
              <Stack.Screen name="AddService" component={AddService} />
              <Stack.Screen name="HistoryPageSpecialist" component={HistoryPageSpecialist} />

              <Stack.Screen name="ProfilePage" component={ProfilePage} />
              <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
              <Stack.Screen name="BusinessCardPage" component={BusinessCardPage} />
              <Stack.Screen name="Calendar" component={TabBarCalendar} options={{ gestureEnabled: false }} />
              <Stack.Screen name="NewOrder" component={NewOrder} />
              <Stack.Screen name="AppendBreak" component={AppendBreak} />
              <Stack.Screen name="ScheduleChange" component={ScheduleChange} />
              <Stack.Screen name="ScheduleTimeChange" component={ScheduleTimeChange} />
              <Stack.Screen name="ClientData" component={ClientData} />
              <Stack.Screen name="EditClientData" component={EditClientData} />
              <Stack.Screen name="AddClients" component={AddClients} />
              <Stack.Screen name="Authentication" component={Authentication} />
              <Stack.Screen name="SettingWorkSchedule" component={SettingWorkSchedule} />
              <Stack.Screen name="EditWorkShedule" component={EditWorkShedule} />
              <Stack.Screen name="SupportPage" component={SupportPage} />
              <Stack.Screen name="ВизитницаТаб" component={VizitnicaTabs} />
            </Stack.Navigator>

            {/* </NavigationContainer> */}
          </>
        ) : null
      ) : (
        <NoInternet onPress={checkingInternet} />
      ),
    [isAuthenticated, isInternet, isTokenExists],
  );
};

export default MainStackNavigator;

export const navigationApplication = (isAuthenticated: isAuthenticatedI | null, navigation: NavigationType) => {
  if (isAuthenticated?.data?.user && !isAuthenticated?.data?.specialist) {
    return navigation.navigate('BottomTabNavigator');
  }
  if (isAuthenticated?.data?.specialist) {
    return navigation.navigate('Calendar');
  }
};

export type NavigationType = NavigationProp<ParamListBase>;
