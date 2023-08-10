import React, { useState } from 'react';
import Contacts from 'react-native-contacts';
import Svg, { Circle, Path } from 'react-native-svg';
import { isUndefined } from 'lodash';
import { Text, View, TouchableOpacity, FlatList, Image, PermissionsAndroid, Platform } from 'react-native';

import { MainLayouts } from '../../layouts';
import { SearchField, Hr, Checkbox } from '../../components';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { ClientFromContactBookI } from '../../slices/clientsSlice';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';

import { useAddContactsToClients } from './hooks';

interface IProps {
  navigation: NavigationType;
}

interface clientI {
  name: string;
  phone_number: string;
  surname: string;
  avatar: string;
  recordID: number;
}

const AddClients: React.FC<IProps> = ({ navigation }) => {
  const [data, setData] = React.useState<Array<clientI>>();
  const [chooseAllClientState, setChooseAllClientState] = React.useState(false);
  const [selectClients, setSelectClients] = useState<any>([]);
  const { fetch, status } = useAddContactsToClients();
  const [resContact, setResContact] = useState(null);

  React.useEffect(() => {
    if (resContact == 'granted'||'authorized') {
      getUsers();
    }
  }, [resContact]);

  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(res => {
        setResContact(res);
      })
      .catch(() => console.log('error in import'));
  } else if (Platform.OS === 'ios') {
    Contacts.requestPermission().then(per=>{
      setResContact(per);
    })
  }

  const getUsers = React.useCallback(async () => {
    const contacts = await Contacts.getAll();
    const newData = contacts
      .map((item: any) => {
        const selectedPhoneNumber = currentPhoneNumber(item);
        return {
          name: item.givenName,
          surname: item.familyName,
          phone_number: selectedPhoneNumber,
          avatar: item.thumbnailPath,
          recordID: item.recordID,
        };
      })
      .filter(i => i.phone_number);
    setData(newData);
    return newData;
  }, []);

  const requestSearch = React.useCallback((value: string) => {
    getUsers().then(data => {
      const newData = data.filter((n: clientI) => {
        return (
          (n.name + ' ' + n.surname)?.toUpperCase().indexOf(value.toUpperCase()) > -1 ||
          n.phone_number?.toUpperCase().indexOf(value.toUpperCase()) > -1
        );
      });
      setData(newData);
    });
  }, []);

  const currentPhoneNumber = (item: ClientFromContactBookI) => {
    let phoneNumber: string | undefined;
    item?.phoneNumbers?.map(item => {
      if (item.label === 'main' || item.label === 'home' || item.label === 'mobile') {
        phoneNumber = item.number;
      } else if (item.label === 'work' || item.label === 'other') {
        phoneNumber = item.number;
      }
    });
    return phoneNumber;
  };

  const handleOnChange = React.useCallback(
    (item: clientI, checked: boolean) => {
      if (checked) setSelectClients([...selectClients, item]);
      else setSelectClients(selectClients.filter((client: any) => client?.recordID !== item.recordID));
    },
    [selectClients],
  );

  const handleCheckAllClients = React.useCallback(
    (item: clientI, checked: boolean) => {
      if (checked && data !== null) setSelectClients(data);
      else setSelectClients([]);
    },
    [selectClients, data],
  );

  const renderClientsCards = ({ item, index }: { item: clientI; index: number }) => {
    const isChecked = selectClients.filter((n: clientI) => n.recordID === item.recordID).length > 0;
    return (
      <View key={index}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              marginRight: SIZES.padding * 1.6,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: SIZES.margin * 1.6,
            }}>
            <Checkbox
              onPress={checked => handleOnChange(item, checked)}
              isChecked={chooseAllClientState ? chooseAllClientState : isChecked}
              renderText={() => (
                <>
                  {item.avatar.length > 0 ? (
                    <Image
                      source={{ uri: item.avatar }}
                      style={{ width: 42, height: 42, borderRadius: 99, marginRight: SIZES.margin * 1.6 }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 99,
                        marginRight: SIZES.margin * 1.6,
                      }}>
                      <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                        <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                        <Path
                          d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                          fill="#787880"
                        />
                      </Svg>
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        marginBottom: SIZES.padding * 0.4,
                        fontFamily: FONTFAMILY.text.regular,
                        fontSize: SIZES.h4,
                        color: COLORS.black,
                        fontWeight: '400',
                      }}>
                      {item.name} {item.surname}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTFAMILY.text.regular,
                        fontSize: SIZES.h5,
                        color: COLORS.gray,
                        fontWeight: '400',
                        lineHeight: 14,
                      }}>
                      {item.phone_number}
                    </Text>
                  </View>
                </>
              )}
              customCheckboxStyle={{
                marginRight: SIZES.margin * 1.6,
                borderRadius: 99,
                borderWidth: !isChecked ? 1 : 0,
                width: 22,
                height: 22,
              }}
            />
          </View>
        </View>
        <Hr
          style={{
            marginVertical: SIZES.padding * 1.4,
            marginLeft: SIZES.margin * 1.6,
          }}
        />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: SIZES.padding * 1.6,
          paddingHorizontal: SIZES.padding * 1.6,
          marginTop: SIZES.padding * 2.4,
        }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <Path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="#38B8E0"
            />
          </Svg>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.semibold,
            fontSize: SIZES.body3,
            lineHeight: 16.94,
            color: COLORS.textBlack,
          }}>
          Добавить клиента
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              fetch(selectClients);
              navigation.goBack();
            }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.title.semibold,
                fontSize: SIZES.h5,
                color: COLORS.primary,
              }}>
              Готово
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //data?.length === selectClients.length

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      {renderHeader()}
      <View
        style={{
          paddingHorizontal: 0,
          flex: 1,
          alignItems: 'center',
        }}>
        <>
          <View style={{ marginHorizontal: SIZES.padding * 1.6 }}>
            <SearchField
              getValue={requestSearch}
              customContainerStyle={{
                marginBottom: SIZES.padding * 2.4,
              }}
            />
          </View>
          <View style={{ width: '100%', flex: 1 }}>
            {!isUndefined(data) && data?.length > 0 ? (
              <Checkbox
                onPress={checked => {
                  data?.map((item: clientI) => {
                    handleCheckAllClients(item, checked);
                    setChooseAllClientState(chooseAllClientState);
                  });
                }}
                isChecked={data?.length === selectClients.length ? true : false}
                renderText={() => (
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.text.regular,
                      fontSize: SIZES.h5,
                      lineHeight: 14.32,
                      color: COLORS.gray,
                    }}>
                    Выделить всех
                  </Text>
                )}
                customCheckboxStyle={{
                  marginRight: SIZES.margin * 1.6,
                  borderRadius: 99,
                  borderWidth: 1,
                  width: 22,
                  height: 22,
                }}
                customContainerStyle={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.border,
                  marginLeft: SIZES.margin * 1.6,
                  paddingBottom: SIZES.padding * 2,
                  marginBottom: SIZES.margin * 1.4,
                }}
              />
            ) : null}

            {data ? (
              <FlatList
                data={data}
                keyExtractor={(item, index: any) => index} //!
                renderItem={renderClientsCards}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '50%',
                    }}>
                    <Text
                      style={{
                        fontFamily: FONTFAMILY.text.regular,
                        fontSize: SIZES.h4,
                        color: COLORS.gray,
                        textAlign: 'center',
                        width: 200,
                      }}>
                      Ничего не найдено Проверьте введённые данные
                    </Text>
                  </View>
                )}
              />
            ) : (
              <View></View>
            )}
          </View>
        </>
      </View>
    </MainLayouts>
  );
};

export default AddClients;
