import Contacts from 'react-native-contacts';
import { FlatList, Image, Text, View, StatusBar, PermissionsAndroid, Platform } from 'react-native';

import React, { useCallback, useEffect, useState } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';
import Icons from '../../assets/icons/svgIcons/avatar';
import Checkbox from '../../components/Checkbox';

import Header from '../../components/Header';
import SearchField from '../../components/SearchField';
import { COLORS, SIZES } from '../../constants';

import WrapperAsyncRequest from '../../layouts/WrapperAsyncRequest';
import { APIStatus } from '../../lib/axiosAPI';
import { specialistActionCreators } from '../../slices/specialistSlice';
import { useCreateCardsMass } from './hooks/useCreateCardsMass';
import { MainLayouts } from '../../layouts';

const ContactImports = ({ navigation }) => {
  const { setContacts } = specialistActionCreators();
  const contacts = useSelector(state => state.specialistData.contacts);
  const [getContactStatus, setGetContactStatus] = useState(APIStatus.Initial);

  const [isOpen, setIsOpen] = useState(true);

  const [allSelected, setAllSelected] = useState(false);
  const [chooseAllClientState, setChooseAllClientState] = useState(false);

  const [dataToRender, setData] = useState([]);
  const [resContact, setResContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const setDataToRender = items => {
    if (!items) return;
    setData(items);
  };

  const normalizePhone = phoneNumber => {
    return phoneNumber
      ?.split('')
      ?.filter(item => !isNaN(item) && item.trim())
      .join('');
  };

  const { fetch, status } = useCreateCardsMass();

  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(res => {
        setResContact(res);
      })
      .catch(() => console.log('error in import'));
  } else if (Platform.OS === 'ios') {
    Contacts.requestPermission().then(per=>{
      console.log(per);
      setResContact(per);
    })
  }

  useEffect(() => {
    if (resContact === 'granted'|| 'authorized') {
      console.log('1');
      setGetContactStatus(APIStatus.Loading);
      Contacts.getAll()
        .then(res => {
          const normalizedData = res.reduce((acc, item) => {
            const set = [...new Set(item.phoneNumbers.map(el => el.number).slice(0, 1))];
            const numbers = set.map(num => {
              return {
                givenName: item.givenName,
                familyName: item.familyName,
                thumbnailPath: item.hasThumbnail ? item.thumbnailPath : null,
                recordID: item.recordID,
                phoneNumber: normalizePhone(num),
              };
            });

            return acc.concat(numbers);
          }, []);
          setContacts(normalizedData);
          setDataToRender(normalizedData);

          setGetContactStatus(APIStatus.Success);
        })
        .catch(err => console.log(err, 'error getting contacts'));
    }
  }, [resContact]);

  useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.goBack();
    }
  }, [status]);

  const closeModal = bool => {
    setIsOpen(bool);
  };

  const onSubmit = () => {
    const normalizedData = selectedContacts.map(item => ({
      name: item.name,
      surname: item.surname,
      phone_number: item.phone_number,
    }));

    fetch(normalizedData);
  };

  useEffect(() => {
    if (!isOpen) {
      navigation.goBack();
    }
  }, [isOpen]);

  const handleOnChange = useCallback(
    (item, checked) => {
      if (checked) {
        setSelectedContacts([
          ...selectedContacts,
          {
            recordID: item.recordID,
            name: item.givenName,
            surname: item.familyName,
            phone_number:
              item.phoneNumber.substr(0, 1) != '+' && item.phoneNumber.substr(0, 1) != '8'
                ? `+${item.phoneNumber}`
                : item.phoneNumber,
          },
        ]);
      } else setSelectedContacts(selectedContacts.filter(client => client?.recordID !== item.recordID));
    },
    [selectedContacts],
  );

  const handleCheckAllClients = useCallback(
    (item, checked) => {
      const selectedPhoneNumber = item.phoneNumber;

      if (checked)
        setSelectedContacts(selectedContacts => [
          ...selectedContacts,
          {
            recordID: item.recordID,
            name: item.givenName,
            surname: item.familyName,
            phone_number:
              selectedPhoneNumber.substr(0, 1) != '+' && selectedPhoneNumber.substr(0, 1) != '8'
                ? `+${selectedPhoneNumber}`
                : selectedPhoneNumber,
          },
        ]);
      else setSelectedContacts([]);
    },
    [selectedContacts],
  );

  const handleToggleSelectAllContacts = () => {
    const mappedContacts = dataToRender?.map(cont => ({ ...cont, isChecked: !allSelected }));

    setDataToRender(mappedContacts);
  };

  const handleSearch = searchValue => {
    if (searchValue.trim() === '') {
      setDataToRender(contacts);
      return;
    } else {
      const filteredContacts = contacts?.filter(item => {
        return (item.familyName + item.givenName + item.phoneNumber)
          .toLowerCase()
          .trim()
          .includes(searchValue.toLowerCase().trim());
      });
      setDataToRender(filteredContacts);
    }
  };

  return (
    <MainLayouts style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
      <StatusBar animated={true} translucent backgroundColor={'#0F98C2'} barStyle={'light-content'} />
      {/* <View style={{ backgroundColor: '#0F98C2', padding: 20 }}></View> */}
      <Header
        navigation={navigation}
        toggleModal={closeModal}
        buttonText={'Готово'}
        colorReady={COLORS.primary}
        onSubmit={onSubmit}
        emptyReady={!!selectedContacts.length}
        header={'Добавить специалиста'}
        customContainerStyle={{
          paddingHorizontal: 0,
        }}
        customHeaderStyle={{
          marginLeft: 0,
        }}
        // style={{ paddingTop: 16 }}
      />

      <View
        style={{
          paddingBottom: 18,
          paddingTop: 18,
        }}>
        <SearchField
          customContainerStyle={{ marginHorizontal: SIZES.margin * 1.5, width: '92%' }}
          getValue={handleSearch}
          placeholder={'Имя или телефон'}
          autoFocus={true}
        />
      </View>

      <Checkbox
        onPress={checked => {
          setAllSelected(!allSelected);
          handleToggleSelectAllContacts();
          dataToRender?.map(item => {
            handleCheckAllClients(item, checked);
            setChooseAllClientState(!chooseAllClientState);
          });
        }}
        renderText={() => (
          <Text
            style={{
              fontSize: SIZES.h5,
              lineHeight: 14.32,
              color: COLORS.gray,
            }}>
            Выделить всех
          </Text>
        )}
        customCheckboxStyle={{
          marginHorizontal: 16,
          // marginRight: SIZES.margin * 1.6,
          borderRadius: 99,
          borderWidth: 1,
          width: 22,
          height: 22,
        }}
        customContainerStyle={{
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray,
          paddingBottom: SIZES.padding * 2,
          marginBottom: SIZES.margin * 1.4,
        }}
      />
{console.log(getContactStatus,status)}
      {/* <WrapperAsyncRequest status={status}> */}
        <WrapperAsyncRequest status={getContactStatus}>
          {dataToRender[0] ? (
            <FlatList
              data={dataToRender}
              style={{ marginHorizontal: 16 }}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                      isChecked={item.isChecked}
                      onPress={checked => handleOnChange(item, checked)}
                      renderText={() => (
                        <>
                          <View
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: 99,
                              marginRight: SIZES.margin * 1.6,
                              display: 'flex',
                              justifyContent: 'center',
                            }}>
                            {!item.thumbnailPath ? (
                              <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 42 42"
                                fill="none"
                                style={{ width: 42, height: 42 }}>
                                <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                                <Path
                                  d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                                  fill={'#787880'}
                                />
                              </Svg>
                            ) : (
                              <Image
                                style={{ width: 42, height: 42, borderRadius: 99 }}
                                source={{ uri: item.thumbnailPath }}
                              />
                            )}
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text
                              style={{
                                marginBottom: SIZES.padding * 0.4,
                                fontSize: SIZES.h4,
                                color: COLORS.black,
                                fontWeight: '400',
                              }}>
                              {item.givenName} {item.familyName}
                            </Text>
                            <Text
                              style={{
                                fontSize: SIZES.body3,
                                color: COLORS.gray,
                                fontWeight: '400',
                                lineHeight: 14,
                              }}>
                              {item.phoneNumber.substr(0, 1) != '+' && item.phoneNumber.substr(0, 1) != '8'
                                ? `+${item.phoneNumber}`
                                : item.phoneNumber}
                            </Text>
                          </View>
                        </>
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
                        paddingVertical: 17,
                        borderColor: COLORS.lightGray,
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <View></View>
          )}
        </WrapperAsyncRequest>
      {/* </WrapperAsyncRequest> */}
    </MainLayouts>
  );
};

export default ContactImports;
