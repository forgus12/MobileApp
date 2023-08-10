import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  BackHandler,
  Linking,
  Platform,
} from 'react-native';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';
import { useToast } from 'react-native-toast-notifications';
import { SIZES, COLORS, FONTFAMILY } from '../../constants';

import { MainLayouts, WrapperAsyncRequest } from '../../layouts';
import { CroppedModalWindow, SearchField } from '../../components';
import SpecialistMenu from './modal/SpecialistMenu';
import { SwipeableCards } from '../../components/SwipeableCards';

import { useGetClientInfo } from './hooks/useGetClientInfo';
import { useSelector } from 'react-redux';
import { verificationActionCreators } from '../../slices/vizitnicaSlice';
import { useDeleteSpecById } from './hooks/useDeleteSpecById';
import { useGetBusinessCards } from './hooks/useGetBusinessCards';
import { useGetComplaints } from './hooks/useGetComplaints';
import { useFetchCreateAppointment } from '../RecordsScreen/hooks/useFatchCreateAppoinment';
import { useFetchUser } from '../Authentication/hooks/useFetchUser';
import { getId } from '../../utils/getId';
import { useGetSpecialistById } from './hooks/useGetSpecialistById';
import { useGetSpecialistCard } from './hooks/useGetSpecialistCard';
import { useGetLoggedInClient } from './hooks/useGetLoggedInClient';

const Vizitnica = ({ navigation, route }) => {
  const { fetch: fetchSpecById } = useGetSpecialistById();
  const { fetch } = useGetBusinessCards();
  const { fetch: useGetComplaint } = useGetComplaints();
  const { fetch: deleteSpecById } = useDeleteSpecById();
  const { fetch: fetchClientInfo } = useGetClientInfo();
  const { fetch: fetchCreatAppointment } = useFetchCreateAppointment();
  const { fetch: getSpecData } = useGetSpecialistCard();
  const { fetch: fetchLoggedInUser } = useGetLoggedInClient();
  const [specId, setSpecId] = useState(null);

  const { fetch: fetchUser, status: statusFetchUser } = useFetchUser();

  const [isVisibleSpecialistMenu, setIsVisibleSpecialistMenu] = React.useState(false);
  const userData = useSelector(s => s?.vizitnica?.userData);
  const roles = useSelector(s => s.authentication.isAuthenticated.data);
  const cardBlock = useSelector(s => s?.vizitnica?.businessCards);
  const [searchValue, setSearchValue] = React.useState(false);
  const { argsCreateHistoryCard } = useSelector(({ recordScreen }) => recordScreen);

  //   const photo = useSelector(state => state.verification.userData.photo);
  const complaints = useSelector(state => state.vizitnica.complaints);
  const currentToken = useSelector(state => state.vizitnica.token);
  const { editBusinessCardActionFinish, setShouldShowOnboarding } = verificationActionCreators();
  const [isSearching, setIsSearching] = useState(false);
  const [isDeleteCard, setIsDeleteCard] = useState(true);
  const [cardsToRender, setCardsToRender] = useState(cardBlock);

  const { token } = useSelector(s => s?.authentication);
  const toast = useToast();

  const deleteCard = item => {
    if (!!item.color?.activity_kind) {
      deleteSpecById({ id: item?.id, type: 'specialist' });
    } else {
      deleteSpecById({ id: item?.id, type: 'dummy' });
    }
    const newCards = cardBlock.filter(card => card.id !== item.id);
    editBusinessCardActionFinish(newCards);
    setCardsToRender(newCards);
    fetch();
    setIsDeleteCard(true);
  };
  const handleDelete = item => {
    const duration = 4000;
    let isCancel = false;
    const arrBusinessCards = cardBlock;
    setIsDeleteCard(false);
    setCardsToRender(cardBlock.filter(i => i.id !== item.id));
    let id = toast.show('Визитка удалена', {
      type: 'loading',
      duration: duration,
      placement: 'bottom',
      offset: 30,
      animationType: 'slide-in',
      onHide: () => {
        toast.hide(id), (isCancel = true);
        setCardsToRender(arrBusinessCards);
        setIsDeleteCard(true);
      },
    });
    setTimeout(() => !isCancel && deleteCard(item), duration);
  };

  useEffect(() => {
    fetchLoggedInUser();
    fetch();
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   BackHandler.exitApp();
    // });
    if (token) {
      setShouldShowOnboarding(false);
    }
    Linking.getInitialURL()
      .then(url => {
        const id = url ? getId(url) : url;
        setSpecId(id);
      })
      .catch(err => {
        console.error(err);
      });
    Linking.addEventListener('url', url => {
      const id = url.url ? getId(url.url) : url.url;
      setSpecId(id);
    });
  }, []);

  useEffect(() => {
    if (specId) {
      fetchSpecById(specId, res => {
        const specData = {
          name: res.data.name,
          phone_number: res.data.phone,
          surname: res.data.surname,
        };
        getSpecData(specData);
      });
    }
  }, [specId]);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => false);
    return () => backHandler.remove();
  }, []);

  const handleSearch = React.useCallback(
    (value = '') => {
      value.length > 0 ? setSearchValue(true) : setSearchValue(false);
      setIsSearching(true);
      if (value.toString().trim() === '') {
        setCardsToRender(cardBlock);
      }
      const filteredCards = cardBlock.filter(card => {
        const { name, surname, phoneNumber, speciality } = card;
        return `${name ?? ''} ${surname ?? ''} ${phoneNumber ?? ''} ${speciality ?? ''}`
          .toLowerCase()
          ?.includes(value.toString()?.trim()?.toLowerCase());
      });
      setCardsToRender(filteredCards);
    },
    [isSearching],
  );

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  };

  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'flex',
        alignItems: 'center',
        padding: SIZES.padding * 0.5,
        paddingBottom: 0,
        height: 48,
        backgroundColor: COLORS.white,
        zIndex: 99,
      },
    });
  };

  useEffect(() => {
    fetchClientInfo();
    fetch();
    if (token) {
      setShouldShowOnboarding(false);
    }
  }, []);

  useEffect(() => {
    setCardsToRender(cardBlock);
  }, [cardBlock]);

  useEffect(() => {
    fetchUser(String(userData.phone));
  }, [userData]);

  useEffect(() => {
    fetch();
    if (isDeleteCard) {
      setCardsToRender(cardBlock);
      fetch();
    }
  }, [cardBlock.length, navigation, currentToken]);

  useEffect(() => {
    if (!complaints) {
      useGetComplaint();
    }
  }, [complaints]);

  useEffect(() => {
    if (route?.params?.name === 'RecordScreen') {
      const duration = 4000;
      let isCancel = false;

      setTimeout(() => {
        fetchCreatAppointment(argsCreateHistoryCard)
          .then(response => {
            if (response.status === 'Success' && !isCancel) {
              let id = toast.show('Запись создана', {
                type: 'custom_type',
                duration: 4000,
                placement: 'bottom',
                offset: 30,
                animationType: 'slide-in',
                onPress: () => {
                  isCancel = true;
                  toast.hide(id);
                },
              });
            }
          })
          .catch(error => {
            let id = toast.show('Специалист отключил онлайн-запись. Пожалуйста, сообщите ему об этом.', {
              type: 'custom_type',
              duration: 4000,
              placement: 'bottom',
              offset: 30,
              animationType: 'slide-in',
              onPress: () => {
                isCancel = true;
                toast.hide(id);
              },
            });
          });
      }, duration);
    }
  }, [route]);

  React.useEffect(() => {
    if (searchValue) {
      hideTabBar();
    } else {
      showTabBar();
    }
  }, [searchValue]);

  const renderHeader = () => {
    if (isSearching) {
      // Поиск
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: SIZES.padding * 1.6,
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchValue(false);
              setCardsToRender(cardBlock);
            }}
            style={{
              paddingRight: SIZES.padding * 2.8,
            }}>
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <Path
                d="M11.67 1.86998L9.9 0.0999756L0 9.99998L9.9 19.9L11.67 18.13L3.54 9.99998L11.67 1.86998Z"
                fill="#38B8E0"
              />
            </Svg>
          </TouchableOpacity>
          <SearchField
            customContainerStyle={{ width: '90%' }}
            getValue={handleSearch}
            placeholder={'Поиск специалиста'}
            autoFocus={true}
          />
        </View>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '85%',
          // alignItems: 'center',
        }}>
        <View style={{ marginLeft: 16, height: 48, width: 48 }}>
          {roles.role != 'specialist' ? (
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding * 1.2,
                marginTop: SIZES.padding * 1.4,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
                {userData?.avatar ? (
                  <Image
                    source={{ uri: userData?.avatar }}
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 50,
                    }}
                  />
                ) : (
                  <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                    <Path
                      d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                      fill="#787880"
                    />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            // alignItems: 'flex-end',
            width: '100%',
            paddingHorizontal: SIZES.padding * 0.6,
            marginTop: SIZES.padding * 2.5,
          }}>
          {/* Кнопка поиска */}
          <TouchableOpacity
            onPress={() => setIsSearching(true)}
            style={{
              padding: SIZES.padding,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding * 1.2,
            }}>
            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <Path
                d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                fill={COLORS.lightBlue}
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVisibleSpecialistMenu(true)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding * 1.2,
            }}>
            <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill={COLORS.lightBlue} />
            </Svg>
          </TouchableOpacity>
          {roles.role == 'specialist' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('StoryPage')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding * 1.2,
              }}>
              <Svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M12 0C7.03 0 3 4.03 3 9H0L3.89 12.89L3.96 13.03L8 9H5C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 12.87 15.87 16 12 16C10.07 16 8.32 15.21 7.06 13.94L5.64 15.36C7.27 16.99 9.51 18 12 18C16.97 18 21 13.97 21 9C21 4.03 16.97 0 12 0ZM11 5V10L15.25 12.52L16.02 11.24L12.5 9.15V5H11Z"
                  fill={COLORS.lightBlue}
                />
              </Svg>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const renderOnboarding = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            width: 270,
            height: 160,
            marginBottom: 20,
          }}>
          <Svg width="270" height="224" viewBox="0 0 224 198" fill="none">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M138.046 89.5505H56.3148C52.8426 89.5505 50.0278 86.75 50.0278 83.2955C50.0278 79.8409 52.8426 77.0404 56.3148 77.0404H21.287C17.8148 77.0404 15 74.2399 15 70.7854C15 67.3308 17.8148 64.5303 21.287 64.5303H57.213C60.6852 64.5303 63.5 61.7298 63.5 58.2753C63.5 54.8207 60.6852 52.0202 57.213 52.0202H34.7593C31.287 52.0202 28.4722 49.2197 28.4722 45.7652C28.4722 42.3106 31.287 39.5101 34.7593 39.5101H70.6852C67.2129 39.5101 64.3981 36.7096 64.3981 33.2551C64.3981 29.8005 67.2129 27 70.6852 27H121.88C125.352 27 128.167 29.8005 128.167 33.2551C128.167 36.7096 125.352 39.5101 121.88 39.5101H179.361C182.833 39.5101 185.648 42.3106 185.648 45.7652C185.648 49.2197 182.833 52.0202 179.361 52.0202H199.12C202.593 52.0202 205.407 54.8207 205.407 58.2753C205.407 61.7298 202.593 64.5303 199.12 64.5303H182.056C178.583 64.5303 175.769 67.3308 175.769 70.7854C175.769 74.2399 178.583 77.0404 182.056 77.0404H187.444C190.917 77.0404 193.731 79.8409 193.731 83.2955C193.731 86.75 190.917 89.5505 187.444 89.5505H140.741C140.278 89.5505 139.828 89.5008 139.394 89.4066C138.959 89.5008 138.509 89.5505 138.046 89.5505Z"
              fill="#F0F2F4"
            />
            <Ellipse cx="202.713" cy="83.2956" rx="6.28704" ry="6.25505" fill="#F0F2F4" />
            <Path
              d="M101.738 23.8829L179.548 42.4055C181.894 42.964 183.344 45.319 182.785 47.6659L171.341 95.742C170.782 98.0889 168.427 99.5384 166.081 98.9799L88.2708 80.4573C85.9248 79.8988 84.4755 77.5438 85.0341 75.1969L96.4786 27.1207C97.0373 24.7739 99.3923 23.3244 101.738 23.8829Z"
              fill="#F0F2F4"
              stroke="#A4A9AE"
              stroke-width="2"
            />
            <Path
              d="M182.677 52.4397L94.4256 31.4275L92.0312 41.4878L180.282 62.5001L182.677 52.4397Z"
              fill="#A4A9AE"
            />
            <Path
              d="M168.531 90.018L150.983 85.8399C150.927 85.8266 150.871 85.8611 150.858 85.917L149.746 90.5872C149.733 90.6431 149.768 90.6991 149.823 90.7124L167.371 94.8905C167.427 94.9038 167.483 94.8693 167.496 94.8134L168.608 90.1432C168.621 90.0873 168.587 90.0313 168.531 90.018Z"
              fill="#A4A9AE"
            />
            <Path
              d="M44.3998 48.3729L135.024 17.148C137.305 16.3624 139.79 17.5743 140.576 19.8552L160.095 76.5289C160.88 78.8098 159.669 81.2956 157.388 82.0812L66.7638 113.306C64.4837 114.092 61.9983 112.88 61.2127 110.599L41.6934 53.9252C40.9079 51.6443 42.1197 49.1586 44.3998 48.3729Z"
              fill="white"
              stroke="#A4A9AE"
              stroke-width="2"
            />
            <Path
              d="M122.571 28.1168L133.142 24.4746C134.301 24.0752 135.564 24.6912 135.964 25.851L139.605 36.4241C140.005 37.5838 139.389 38.8476 138.229 39.247L127.658 42.8892C126.499 43.2886 125.236 42.6726 124.836 41.5128L121.195 30.9397C120.795 29.78 121.411 28.5162 122.571 28.1168Z"
              fill="#F0F2F4"
              stroke="#A4A9AE"
              stroke-width="2"
            />
            <Path
              d="M62.9828 90.6714L61.7174 86.9974L95.3533 75.4081L96.6186 79.0821L62.9828 90.6714Z"
              fill="white"
              stroke="#A4A9AE"
              stroke-width="2"
            />
            <Path
              d="M66.683 101.417L65.4177 97.7428L114.074 80.9783L115.339 84.6523L66.683 101.417Z"
              fill="white"
              stroke="#A4A9AE"
              stroke-width="2"
            />
          </Svg>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: SIZES.h4,
            color: COLORS.black,
            marginBottom: 8,
          }}>
          {roles.role == 'specialist'
            ? 'Здесь будут визитки' + `\n` + 'ваших специалистов'
            : 'Здесь будут ваши визитки'}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h4,
            color: COLORS.gray,
            marginHorizontal: 16,
          }}>
          {roles.role == 'specialist'
            ? 'В этом разделе вы можете записаться к' +
              `\n` +
              'другим специалистам' +
              `\n` +
              'Добавьте первую визитку, нажав на "+" в' +
              `\n` +
              'правом верхнем углу'
            : 'Добавьте первую визитку,' + `\n` + 'нажав на «+» в правом верхнем углу'}
        </Text>
      </View>
    );
  };

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0} style={{ flex: 1 }}>
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <WrapperAsyncRequest status={statusFetchUser}>
        {renderHeader()}
        {cardBlock[0] ? (
          <View
            style={{
              flex: 1,
              justifyContent: !cardsToRender.length ? 'flex-start' : 'flex-end',
              marginTop: SIZES.padding * 0.8,
              padding: SIZES.padding * 1.4,
            }}>
            {!cardsToRender.length ? (
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.gray,
                  }}>
                  {'Ничего не найдено'}
                </Text>
              </View>
            ) : (
              <SwipeableCards route={route} navigation={navigation} handleDelete={handleDelete} data={cardsToRender} />
            )}
          </View>
        ) : (
          renderOnboarding()
        )}
      </WrapperAsyncRequest>

      <CroppedModalWindow
        type="bottom"
        name="SpecialistMenu"
        isVisible={isVisibleSpecialistMenu}
        component={SpecialistMenu}
        onClose={() => setIsVisibleSpecialistMenu(false)}
        navigation={navigation}
      />
    </MainLayouts>
    // </KeyboardAvoidingView>
  );
};

export default Vizitnica;
