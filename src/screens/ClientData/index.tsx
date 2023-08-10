import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { ScreenHeader, CroppedModalWindow, Loader, ModalWindow } from '../../components';
import { MainLayouts } from '../../layouts';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { SwitchToggle } from './components';
import { ClientDataMenu } from './modals';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { callNumber } from '../../utils/phoneCall';
import {
  useFetchGetClientsHistory,
  useFetchAddBlackList,
  useFetchAllClients,
  useFetchDeleteFromBlackList,
} from './hooks';
import { useToast } from 'react-native-toast-notifications';
import { APIStatus } from '../../lib/axiosAPI';
import { BlackList } from '../Clients/modals';

interface IProps {
  navigation: NavigationType;
  route: {
    [key: string]: any;
  };
}

const ClientData: React.FC<IProps> = ({ route, navigation }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);
  const { selectedClient } = useSelector((state: RootState) => state.clients);
  const { fetch, status } = useFetchAddBlackList();
  const { fetch: clientHistoryFetch, status: clientHistoryStatus } = useFetchGetClientsHistory();
  const { fetch: allClientsFetch, status: allClientsStatus } = useFetchAllClients();
  const { fetch: deleteFromBlackList, status: statusDeleteFromBlackList } = useFetchDeleteFromBlackList();
  const { clientHistory } = useSelector((state: RootState) => state.clients);
  const { allClients } = useSelector(s => s?.newOrder);
  const [clientInBlackList, setClientInBlackList] = React.useState<boolean>(true);
  const toast = useToast();
  const toastMessag = useToast();
  const blacklistRoute = route.params;
  const [isVisibleBlackListModal, setIsVisibleBlackListModal] = React.useState(false);

  React.useEffect(() => {
    allClientsFetch();
  }, [status, statusDeleteFromBlackList]);

  React.useEffect(() => {
    allClients?.data?.find(item => item.id === selectedClient.id)
      ? setClientInBlackList(true)
      : setClientInBlackList(false);
  }, [allClients]);

  React.useEffect(() => {
    clientHistoryFetch(selectedClient);
  }, [selectedClient]);

  const onBlackList = React.useCallback(() => {
    // const timeout = setTimeout(() => {
    //   fetch(selectedClient.id, selectedClient.type!);
    // }, 3000);

    toast.show('Чёрный список находится в разработке и скоро будет доступен', {
      type: 'normal',
      duration: 5000,
      textStyle: { fontSize: 15 },
      placement: 'bottom',
      // type: 'loading',
      // duration: 3000,
      // onClose: () => clearTimeout(timeout),
    });
  }, [toast]);

  const onConfirmed = React.useCallback(() => {
    toastMessag.show('Отправка сообщений находится в режиме разработки и будет доступна позже', {
      type: 'normal',
      duration: 5000,
      textStyle: { fontSize: 15 },
      placement: 'bottom',
    });
  }, [toastMessag]);

  const renderHeader = () => {
    return (
      <ScreenHeader
        title={''}
        customTextStyle={{
          fontSize: SIZES.h4,
          fontFamily: FONTFAMILY.title.semibold,
        }}
        renderLeftButton={() => (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M11.67 3.8701L9.9 2.1001L0 12.0001L9.9 21.9001L11.67 20.1301L3.54 12.0001L11.67 3.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        //onPressLeftButton={() => blacklistRoute.parentRoute ? (setIsVisibleBlackListModal(true)) : navigation.goBack()}
        onPressLeftButton={() => navigation.goBack()}
        renderRightButton={() => (
          <Svg width="16" height="4" viewBox="0 0 16 4" fill="none">
            <Path
              d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressRightButton={() => setIsVisibleModal(true)}
      />
    );
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      {renderHeader()}
      <View
        style={{
          alignItems: 'center',
          position: 'relative',
        }}>
        {selectedClient.avatar ? (
          <Image
            style={{
              width: 88,
              height: 88,
              borderRadius: 50,
              position: 'absolute',
              top: -35,
            }}
            source={{ uri: selectedClient.avatar }}
          />
        ) : (
          <View
            style={{
              width: 88,
              height: 88,
              position: 'absolute',
              top: -35,
            }}>
            <Svg width="87" height="88" viewBox="0 0 42 42" fill="none">
              <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
              <Path
                d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                fill="#787880"
              />
            </Svg>
          </View>
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: SIZES.margin * 6.9,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.bold,
            fontSize: SIZES.h3,
            lineHeight: 20.29,
            marginBottom: SIZES.margin * 0.8,
            color: COLORS.textBlack,
          }}>
          {selectedClient.name} {selectedClient.surname}
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h5,
            lineHeight: 14.32,
            color: COLORS.textBlack,
          }}>
          {selectedClient.phone_number}
        </Text>
        {clientInBlackList ? (
          <View style={{ width: '100%', marginTop: SIZES.margin * 1.6 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => callNumber(selectedClient.phone_number)}
              style={{
                borderWidth: 1,
                borderColor: COLORS.border,
                flexDirection: 'row',
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: SIZES.margin * 1.6,
              }}>
              <View style={{ marginRight: SIZES.margin * 0.8 }}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                    fill="#38B8E0"
                  />
                </Svg>
              </View>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h6,
                  lineHeight: 14,
                  color: COLORS.primary,
                }}>
                Позвонить
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: SIZES.margin * 0.9,
            marginBottom: SIZES.margin * 1.6,
          }}>
          {clientInBlackList ? (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onConfirmed}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  height: 82,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: SIZES.margin * 1.6,
                  borderRadius: 8,
                }}>
                <View>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11Z"
                      fill="#38B8E0"
                    />
                  </Svg>
                </View>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.h6,
                    lineHeight: 14,
                    color: COLORS.primary,
                    marginTop: SIZES.margin * 0.8,
                    textAlign: 'center',
                  }}>
                  Написать в чат
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('NewOrder', { client: selectedClient })}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  height: 82,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginLeft: SIZES.margin * 1.6,
                }}>
                <View>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                      fill="#38B8E0"
                    />
                  </Svg>
                </View>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.h6,
                    lineHeight: 14,
                    color: COLORS.primary,
                    marginTop: SIZES.margin * 0.8,
                    textAlign: 'center',
                  }}>
                  Добавить запись
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onBlackList}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  height: 82,
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  marginRight: SIZES.margin * 1.6,
                }}>
                <View>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM20 6H4V4H20V6Z"
                      fill="#D64641"
                    />
                    <Path
                      d="M15 12H14.5V11C14.5 9.62 13.38 8.5 12 8.5C10.62 8.5 9.5 9.62 9.5 11V12H9C8.45 12 8 12.45 8 13V18C8 18.55 8.45 19 9 19H15C15.55 19 16 18.55 16 18V13C16 12.45 15.55 12 15 12ZM13.55 12H10.45V11C10.45 10.145 11.145 9.45 12 9.45C12.855 9.45 13.55 10.145 13.55 11V12Z"
                      fill="white"
                    />
                  </Svg>
                </View>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.h6,
                    lineHeight: 14,
                    color: COLORS.red,
                    marginTop: SIZES.margin * 0.8,
                    textAlign: 'center',
                  }}>
                  В чёрный список
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => deleteFromBlackList(selectedClient)}
              style={{
                borderWidth: 1,
                borderColor: COLORS.border,
                height: 82,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: SIZES.margin * 1.6,
                marginTop: SIZES.margin * 0.6,
                borderRadius: SIZES.radius,
              }}>
              <View>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM20 6H4V4H20V6Z"
                    fill="#D64641"
                  />
                  <Path
                    d="M15 12H14.5V11C14.5 9.62 13.38 8.5 12 8.5C10.62 8.5 9.5 9.62 9.5 11V12H9C8.45 12 8 12.45 8 13V18C8 18.55 8.45 19 9 19H15C15.55 19 16 18.55 16 18V13C16 12.45 15.55 12 15 12ZM13.55 12H10.45V11C10.45 10.145 11.145 9.45 12 9.45C12.855 9.45 13.55 10.145 13.55 11V12Z"
                    fill="white"
                  />
                </Svg>
              </View>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h6,
                  lineHeight: 14,
                  color: COLORS.red,
                  marginTop: SIZES.margin * 0.8,
                  textAlign: 'center',
                  width: 140,
                }}>
                Убрать из чёрного списка
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {clientInBlackList ? (
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.border,
              height: 56,
              marginBottom: selectedClient.notes ? null : SIZES.margin * 2.4,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                marginLeft: SIZES.margin * 1.6,
                fontFamily: FONTFAMILY.title.regular,
                fontSize: SIZES.h4,
                lineHeight: 17.9,
                color: COLORS.textBlack,
              }}>
              Персональная скидка
            </Text>
            <Text
              style={{
                marginRight: SIZES.margin * 1.6,
                fontFamily: FONTFAMILY.title.regular,
                fontSize: SIZES.h4,
                lineHeight: 17.9,
                color: COLORS.textBlack,
              }}>
              {`${selectedClient.discount!.label} %`}
            </Text>
          </View>
        ) : null}
        {selectedClient.notes ? (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: COLORS.border,
              height: 56,
              marginBottom: SIZES.margin * 2.4,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                marginLeft: SIZES.margin * 1.6,
                fontFamily: FONTFAMILY.title.regular,
                fontSize: SIZES.h4,
                lineHeight: 17.9,
                color: COLORS.textBlack,
              }}>
              {selectedClient.notes}
            </Text>
          </View>
        ) : null}
      </View>
      {/* <View
        style={{
          height: 32,
          marginHorizontal: SIZES.margin * 1.6,
          marginBottom: SIZES.margin * 1.2,
        }}>
        <SwitchToggle
          names={['История записей', 'Рефералы']}
          getCurrentIndex={(index: number) => setCurrentPage(index)}
          setIndex={currentPage}
        />
      </View> */}
      <Text
        style={{
          marginLeft: SIZES.margin * 1.6,
          fontFamily: FONTFAMILY.title.regular,
          fontSize: SIZES.h4,
          lineHeight: 17.9,
          color: COLORS.textBlack,
        }}>
        История записей
      </Text>
      {currentPage === 0 ? (
        <ScrollView>
          {clientHistoryStatus !== APIStatus.Success ? (
            <Loader />
          ) : clientHistory.length > 0 ? (
            clientHistory.map((item, index) => {
              return item.services.map((service, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginLeft: SIZES.margin * 1.6,
                      marginTop: SIZES.margin * 1.2,
                      paddingBottom: SIZES.padding * 1.2,
                      borderBottomWidth: 1,
                      borderColor: COLORS.border,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: FONTFAMILY.text.regular,
                        fontSize: SIZES.h5,
                        lineHeight: 14.32,
                        color: COLORS.gray,
                        marginBottom: SIZES.margin * 0.4,
                      }}>
                      {service.date}, {service.start}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTFAMILY.title.regular,
                        fontSize: SIZES.h4,
                        lineHeight: 17.9,
                        color: COLORS.textBlack,
                      }}>
                      {service.title}
                    </Text>
                  </View>
                );
              });
            })
          ) : null}
        </ScrollView>
      ) : null}
      <CroppedModalWindow
        type="bottom"
        name="confirmedOrder"
        isVisible={isVisibleModal}
        component={ClientDataMenu}
        onClose={() => setIsVisibleModal(false)}
        navigation={navigation}
      />
      <ModalWindow
        title="Чёрный список"
        name="blackList"
        navigation={navigation}
        component={BlackList}
        isVisible={isVisibleBlackListModal}
        onClose={() => navigation.navigate('Calendar')}
      />
    </MainLayouts>
  );
};

export default ClientData;
