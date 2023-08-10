import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { MainLayouts } from '../../layouts';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';
import { SearchField, Hr, CroppedModalWindow, ModalWindow, Checkbox, ModalAlert } from '../../components';
import { useSelector } from 'react-redux';
import { useFetchAllClients } from './hooks/useFetchAllClients';
import { useDeleteClient } from './hooks/useFetchDeleteClient';
import { useFetchMassDeleteToContactList } from './hooks/useFetchMassDeleteToContactList';
import { CreateOrImportClients, ClientMenu, DeleteClientsModal } from './modals';
import { useIsFocused } from '@react-navigation/native';
import { BlackList } from './modals';
import { clientActionCreators } from '../../slices/clientsSlice';
import { PlusBlock } from './components';
import { APIStatus } from '../../lib/axiosAPI';

const Clients = ({ navigation, route }) => {
  const { allClients } = useSelector(s => s?.newOrder);
  const { selectedClient } = useSelector(state => state.clients);
  const { setSelectedClient } = clientActionCreators();
  const [data, setData] = React.useState(null);
  const { fetch, status } = useFetchAllClients();
  const { fetch: fetchDeleteClient, status: fetchStatusDeleteCLient } = useDeleteClient();
  const { fetch: deleteMassClients, status: statusDeleteMassClients } = useFetchMassDeleteToContactList();
  const [chooseClientState, setChooseClientState] = React.useState(false);
  const [chooseAllClientState, setChooseAllClientState] = React.useState(false);
  const [selectClients, setSelectClients] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [isVisibleBlackListModal, setIsVisibleBlackListModal] = React.useState(false);
  const [isVisibleClientMenuModal, setIsVisibleClientMenuModal] = React.useState(false);
  const isFocused = useIsFocused();
  const [isVisibleDeleteAlertModal, setIsVisibleDeleteAlerttModal] = React.useState(false);
  const [deleteClientStatus, setDeleteClientStatus] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(false);

  React.useEffect(() => {
    if (statusDeleteMassClients === APIStatus.Success) {
      setSelectClients([]);
      setIsVisibleDeleteAlerttModal(false);
    }
  }, [statusDeleteMassClients]);

  React.useEffect(() => {
    if (fetchStatusDeleteCLient === APIStatus.Success) {
      setDeleteClientStatus(false);
    }
  }, [fetchStatusDeleteCLient]);

  React.useEffect(() => {
    if (allClients?.data?.length === 0) {
      setChooseClientState(false);
    }
  }, [allClients]);

  React.useEffect(() => {
    fetch();
  }, [
    isFocused,
    isVisibleClientMenuModal,
    isVisibleModal,
    isVisibleBlackListModal,
    isVisibleDeleteAlertModal,
    fetchStatusDeleteCLient,
  ]);

  React.useEffect(() => {
    setData(allClients?.data);
  }, [allClients]);

  const requestSearch = React.useCallback(
    value => {
      // value.length > 1 ? setSearchValue(true) : setSearchValue(false);
      const newData = allClients?.data?.filter(
        n =>
          (n.name + ' ' + n.surname).toUpperCase().indexOf(value.toUpperCase()) > -1 ||
          n.phone_number.toUpperCase().indexOf(value.toUpperCase()) > -1,
      );
      setData(newData);
    },
    [allClients],
  );

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  };

  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {
        alignItems: 'center',
        padding: SIZES.padding * 2,
        height: 70,
        backgroundColor: COLORS.white,
        zIndex: 99,
      },
    });
  };

  const bottomTab = React.useCallback(() => {
    return (
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 48,
          paddingBottom: 0,
          position: 'absolute',
          bottom: 0,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity
          style={{
            // width: '50%',
            width: '100%',
            borderRightWidth: 0.5,
            borderRightColor: COLORS.lightGray3,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: selectClients.length === 0 ? 0.5 : 1,
          }}
          activeOpacity={0.8}
          onPress={() => setIsVisibleDeleteAlerttModal(true)}
          disabled={selectClients.length === 0}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.semibold,
              fontSize: SIZES.h4,
              color: COLORS.red,
            }}>
            Удалить
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [selectClients]);
  {
    /* <TouchableOpacity
          style={{
            width: '50%',
            borderLeftWidth: 0.5,
            borderLeftColor: COLORS.lightGray3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.8}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.semibold,
              fontSize: SIZES.h4,
              color: COLORS.primary,
            }}>
            Написать
          </Text>
        </TouchableOpacity> */
  }
  React.useEffect(() => {
    if (chooseClientState || searchValue) {
      hideTabBar();
    } else {
      showTabBar();
    }
  }, [chooseClientState, searchValue]);

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
            width: 200,
            height: 150,
            marginBottom: 24,
          }}>
          <Svg width="200" height="150" viewBox="0 0 146 89" fill="none">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40.2156 74.2176H112.778C116.158 74.2176 118.898 71.4811 118.898 68.1055C118.898 64.7299 116.158 61.9935 112.778 61.9935C112.778 61.9935 107.533 59.257 107.533 55.8815C107.533 52.5059 110.988 49.7694 115.249 49.7694H124.144C127.524 49.7694 130.263 47.033 130.263 43.6574C130.263 40.2818 127.524 37.5453 124.144 37.5453H104.91C108.29 37.5453 111.03 34.8089 111.03 31.4333C111.03 28.0577 108.29 25.3212 104.91 25.3212H139.88C143.26 25.3212 146 22.5848 146 19.2092C146 15.8336 143.26 13.0972 139.88 13.0972H54.2036C50.8237 13.0972 48.0838 15.8336 48.0838 19.2092C48.0838 22.5848 50.8237 25.3212 54.2036 25.3212H19.2335C15.8537 25.3212 13.1138 28.0577 13.1138 31.4333C13.1138 34.8089 15.8537 37.5453 19.2335 37.5453H41.0898C44.4697 37.5453 47.2096 40.2818 47.2096 43.6574C47.2096 47.033 44.4697 49.7694 41.0898 49.7694H6.11976C2.73991 49.7694 0 52.5059 0 55.8815C0 59.257 2.73991 61.9935 6.11976 61.9935H40.2156C36.8357 61.9935 34.0958 64.7299 34.0958 68.1055C34.0958 71.4811 36.8357 74.2176 40.2156 74.2176ZM133.76 43.6575C133.76 47.033 136.5 49.7695 139.88 49.7695C143.26 49.7695 146 47.033 146 43.6575C146 40.2819 143.26 37.5454 139.88 37.5454C136.5 37.5454 133.76 40.2819 133.76 43.6575Z"
              fill="#F0F2F4"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M93.258 12.2243L101.39 71.4611L102.121 77.404C102.356 79.3185 100.993 81.0611 99.0761 81.2962L47.8797 87.5744C45.9628 87.8094 44.218 86.448 43.9826 84.5334L36.1005 20.4203C35.9829 19.463 36.6644 18.5917 37.6229 18.4742C37.629 18.4734 37.635 18.4727 37.6411 18.4721L41.8885 17.9962M45.3231 17.6116L49.3333 17.1623L45.3231 17.6116Z"
              fill="white"
            />
            <Path
              d="M94.4965 12.0546C94.4026 11.3707 93.772 10.8922 93.088 10.9859C92.4041 11.0796 91.9257 11.7099 92.0196 12.3939L94.4965 12.0546ZM101.39 71.4611L102.631 71.3089L102.63 71.3002L102.629 71.2914L101.39 71.4611ZM102.121 77.404L103.362 77.2518L102.121 77.404ZM99.0761 81.2962L99.2286 82.5368L99.0761 81.2962ZM47.8797 87.5744L48.0322 88.815L47.8797 87.5744ZM43.9826 84.5334L45.2233 84.3813L43.9826 84.5334ZM37.6411 18.4721L37.7806 19.7142L37.6411 18.4721ZM42.0281 19.2384C42.7141 19.1615 43.2078 18.5431 43.1308 17.857C43.0537 17.171 42.435 16.6772 41.749 16.754L42.0281 19.2384ZM45.1835 16.3694C44.4974 16.4463 44.0038 17.0647 44.0808 17.7508C44.1579 18.4368 44.7765 18.9306 45.4626 18.8538L45.1835 16.3694ZM49.4728 18.4045C50.1589 18.3276 50.6526 17.7092 50.5755 17.0232C50.4985 16.3371 49.8798 15.8433 49.1937 15.9201L49.4728 18.4045ZM92.0196 12.3939L100.152 71.6307L102.629 71.2914L94.4965 12.0546L92.0196 12.3939ZM100.15 71.6132L100.88 77.5561L103.362 77.2518L102.631 71.3089L100.15 71.6132ZM100.88 77.5561C101.031 78.784 100.157 79.9043 98.9235 80.0555L99.2286 82.5368C101.829 82.2179 103.681 79.853 103.362 77.2518L100.88 77.5561ZM98.9235 80.0555L47.7272 86.3337L48.0322 88.815L99.2286 82.5368L98.9235 80.0555ZM47.7272 86.3337C46.494 86.4849 45.3743 85.6092 45.2233 84.3813L42.7419 84.6856C43.0617 87.2868 45.4315 89.134 48.0322 88.815L47.7272 86.3337ZM45.2233 84.3813L37.3412 20.2681L34.8598 20.5724L42.7419 84.6856L45.2233 84.3813ZM37.3412 20.2681C37.308 19.9975 37.5008 19.7485 37.7754 19.7149L37.4704 17.2335C35.8281 17.4349 34.6577 18.9285 34.8598 20.5724L37.3412 20.2681ZM37.7754 19.7149C37.7772 19.7146 37.7789 19.7144 37.7806 19.7142L37.5015 17.2299C37.4912 17.231 37.4808 17.2323 37.4704 17.2335L37.7754 19.7149ZM37.7806 19.7142L42.0281 19.2384L41.749 16.754L37.5015 17.2299L37.7806 19.7142ZM45.4626 18.8538L49.4728 18.4045L49.1937 15.9201L45.1835 16.3694L45.4626 18.8538Z"
              fill="#A4A9AE"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M91.0446 15.9518L98.4054 69.6363L99.0675 75.022C99.2808 76.7571 98.0621 78.3343 96.3454 78.5448L50.4979 84.1671C48.7813 84.3776 47.2167 83.1417 47.0034 81.4067L39.9092 23.7018C39.7744 22.6055 40.5539 21.6078 41.6503 21.4734L47.0724 20.8084"
              fill="#F0F2F4"
            />
            <Path
              d="M53.4182 4C53.4182 2.48122 54.6494 1.25 56.1682 1.25H95.2865C96.015 1.25 96.7136 1.53902 97.2292 2.05363L108.686 13.4887C109.203 14.0045 109.493 14.7048 109.493 15.435V69.3445C109.493 70.8633 108.262 72.0945 106.743 72.0945H56.1682C54.6494 72.0945 53.4182 70.8633 53.4182 69.3445V4Z"
              fill="white"
              stroke="#A4A9AE"
              stroke-width="2.5"
            />
            <Path
              d="M95.8809 2.09814V12.2242C95.8809 13.6709 97.0551 14.8436 98.5036 14.8436H105.44"
              stroke="#A4A9AE"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M62.6593 12.3438C61.2786 12.3438 60.1593 13.463 60.1593 14.8438H62.6593V12.3438ZM85.3898 12.3438H62.6593V14.8438H85.3898V12.3438ZM87.8898 14.8438C87.8898 13.463 86.7706 12.3438 85.3898 12.3438V14.8438H87.8898ZM85.3898 17.3438C86.7706 17.3438 87.8898 16.2245 87.8898 14.8438H85.3898V14.8438V17.3438ZM62.6593 17.3438H85.3898V14.8438H62.6593V17.3438ZM60.1593 14.8438C60.1593 16.2245 61.2786 17.3438 62.6593 17.3438V14.8438V14.8438H60.1593ZM62.6593 22.8213C61.2786 22.8213 60.1593 23.9406 60.1593 25.3213H62.6593V22.8213ZM100.252 22.8213H62.6593V25.3213H100.252V22.8213ZM102.752 25.3213C102.752 23.9406 101.633 22.8213 100.252 22.8213V25.3213H102.752ZM100.252 27.8213C101.633 27.8213 102.752 26.702 102.752 25.3213H100.252V27.8213ZM62.6593 27.8213H100.252V25.3213H62.6593V27.8213ZM60.1593 25.3213C60.1593 26.702 61.2786 27.8213 62.6593 27.8213V25.3213H60.1593ZM62.6593 36.6724V34.1724C61.2786 34.1724 60.1593 35.2917 60.1593 36.6724H62.6593ZM62.6593 36.6724H60.1593C60.1593 38.0531 61.2786 39.1724 62.6593 39.1724V36.6724ZM100.252 36.6724H62.6593V39.1724H100.252V36.6724ZM100.252 36.6724V39.1724C101.633 39.1724 102.752 38.0531 102.752 36.6724H100.252ZM100.252 36.6724H102.752C102.752 35.2917 101.633 34.1724 100.252 34.1724V36.6724ZM62.6593 36.6724H100.252V34.1724H62.6593V36.6724ZM62.6593 45.5234C61.2786 45.5234 60.1593 46.6427 60.1593 48.0234H62.6593V45.5234ZM100.252 45.5234H62.6593V48.0234H100.252V45.5234ZM102.752 48.0234C102.752 46.6427 101.633 45.5234 100.252 45.5234V48.0234H102.752ZM100.252 50.5234C101.633 50.5234 102.752 49.4041 102.752 48.0234H100.252V50.5234ZM62.6593 50.5234H100.252V48.0234H62.6593V50.5234ZM60.1593 48.0234C60.1593 49.4042 61.2786 50.5234 62.6593 50.5234V48.0234H60.1593ZM62.6593 59.3745V56.8745C61.2786 56.8745 60.1593 57.9938 60.1593 59.3745H62.6593ZM62.6593 59.3745H60.1593C60.1593 60.7552 61.2786 61.8745 62.6593 61.8745V59.3745ZM85.3898 59.3745H62.6593V61.8745H85.3898V59.3745ZM85.3898 59.3745V61.8745C86.7706 61.8745 87.8898 60.7552 87.8898 59.3745H85.3898ZM85.3898 59.3745H87.8898C87.8898 57.9938 86.7706 56.8745 85.3898 56.8745V59.3745ZM62.6593 59.3745H85.3898V56.8745H62.6593V59.3745Z"
              fill="#F0F2F4"
            />
          </Svg>
        </View>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: SIZES.h3,
            color: COLORS.black,
            marginBottom: 8,
          }}>
          {'Здесь будут ваши клиенты'}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h4,
            color: COLORS.gray,
            marginHorizontal: 16,
          }}>
          {'Нажмите на кнопку "+", чтобы добавить' + `\n` + 'нового клиента или импортировать из' + `\n` + 'контактов'}
        </Text>
      </View>
    );
  };

  const handleOnChange = React.useCallback(
    (item, checked) => {
      if (checked) {
        setSelectClients([...selectClients, item]);
      } else {
        setSelectClients(selectClients.filter(client => client?.id !== item.id));
      }
    },
    [selectClients],
  );

  const handleCheckAllClients = React.useCallback(
    (item, checked) => {
      if (checked && data !== null) setSelectClients(data);
      else setSelectClients([]);
    },
    [selectClients, data],
  );
  function renderClientsCards({ item, index }) {
    const isChecked = selectClients.filter(n => n.id === item.id).length > 0;
    return (
      <View key={index}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <>
            {chooseClientState ? (
              <View
                style={{
                  marginRight: SIZES.padding * 1.6,
                  marginLeft: SIZES.margin * 1.6,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Checkbox
                  onPress={checked => handleOnChange(item, checked)}
                  isChecked={chooseAllClientState ? chooseAllClientState : isChecked}
                  renderText={() => (
                    <>
                      {item.avatar ? (
                        <View style={{ marginRight: SIZES.margin * 1.6 }}>
                          <Image
                            source={{ uri: item.avatar }}
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: 99,
                            }}
                          />
                        </View>
                      ) : (
                        <View style={{ marginRight: SIZES.margin * 1.6 }}>
                          <Svg
                            width="42"
                            height="42"
                            viewBox="0 0 42 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
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
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ClientData') || setSelectedClient(item)}
                style={{ flexDirection: 'row', flex: 1 }}>
                <View
                  style={{
                    marginRight: SIZES.padding * 1.6,
                    marginLeft: SIZES.margin * 1.6,
                  }}>
                  {item.avatar ? (
                    <Image
                      source={{ uri: item.avatar }}
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 99,
                      }}
                    />
                  ) : (
                    <View>
                      <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                        <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                        <Path
                          d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                          fill="#787880"
                        />
                      </Svg>
                    </View>
                  )}
                </View>

                <View>
                  <Text
                    style={{
                      marginBottom: SIZES.padding * 0.4,
                      fontFamily: FONTFAMILY.text.regular,
                      fontSize: SIZES.h4,
                      color: COLORS.black,
                      fontWeight: '400',
                    }}>
                    {item?.name} {item?.surname}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.text.regular,
                      fontSize: SIZES.h5,
                      color: COLORS.gray,
                      fontWeight: '400',
                      lineHeight: 14,
                    }}>
                    {item?.phone_number}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </>
          {chooseClientState ? null : (
            <TouchableOpacity
              style={{
                paddingHorizontal: SIZES.padding * 1.6,
                paddingVertical: SIZES.padding,
              }}
              activeOpacity={0.8}
              onPress={() => setIsVisibleClientMenuModal(true) || setSelectedClient(item)}>
              <Svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z"
                  fill="#787880"
                />
              </Svg>
            </TouchableOpacity>
          )}
        </View>
        <Hr style={{ marginVertical: SIZES.padding * 1.4 }} />
      </View>
    );
  }

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: SIZES.padding * 1.6,
          paddingHorizontal: SIZES.padding * 1.6,
          marginTop: SIZES.padding * 2.5,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.black,
            fontSize: SIZES.h1,
            lineHeight: SIZES.body6 * 3,
            color: COLORS.textBlack,
          }}>
          Клиенты
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!chooseClientState ? (
            <>
              {data?.length > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setChooseClientState(true)}
                  style={{
                    paddingVertical: SIZES.padding,
                    paddingRight: SIZES.padding * 0.4,
                    paddingLeft: SIZES.padding * 1.5,
                  }}>
                  <Svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M20 3.99993H11V5.99993H20V3.99993ZM20 11.9999H11V13.9999H20V11.9999ZM3.54 7.99993L0 4.45993L1.41 3.04993L3.53 5.16993L7.77 0.929932L9.18 2.33993L3.54 7.99993ZM3.54 15.9999L0 12.4599L1.41 11.0499L3.53 13.1699L7.77 8.92993L9.18 10.3399L3.54 15.9999Z"
                      fill="#38B8E0"
                    />
                  </Svg>
                </TouchableOpacity>
              ) : null}
              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginLeft: SIZES.padding * 1.6 }}
                onPress={() => setIsVisibleBlackListModal(true)}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM20 6H4V4H20V6Z"
                    fill="#38B8E0"
                  />
                  <Path
                    d="M15 12H14.5V11C14.5 9.62 13.38 8.5 12 8.5C10.62 8.5 9.5 9.62 9.5 11V12H9C8.45 12 8 12.45 8 13V18C8 18.55 8.45 19 9 19H15C15.55 19 16 18.55 16 18V13C16 12.45 15.55 12 15 12ZM13.55 12H10.45V11C10.45 10.145 11.145 9.45 12 9.45C12.855 9.45 13.55 10.145 13.55 11V12Z"
                    fill="white"
                  />
                </Svg>
              </TouchableOpacity> */}
            </>
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setChooseClientState(false)}>
              <Text
                style={{
                  fontFamily: FONTFAMILY.title.semibold,
                  fontSize: SIZES.h5,
                  color: COLORS.primary,
                }}>
                Отмена
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <MainLayouts>
      {chooseClientState ? null : <PlusBlock onPress={() => setIsVisibleModal(true)} />}
      {renderHeader()}
      <View
        style={{
          paddingHorizontal: 0,
          flex: 1,
          alignItems: 'center',
        }}>
        {allClients?.data?.length > 0 ? (
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
              {chooseClientState ? (
                <Checkbox
                  onPress={checked => {
                    data?.map(item => {
                      handleCheckAllClients(item, checked);
                      setChooseAllClientState(chooseAllClientState);
                    });
                  }}
                  isChecked={data.length === selectClients.length ? true : false}
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

              <FlatList
                data={data}
                keyExtractor={(item, index) => index}
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
                      }}>
                      Ничего не найдено {'\n'} Проверьте введённые данные
                    </Text>
                  </View>
                )}
              />
            </View>
          </>
        ) : (
          renderOnboarding()
        )}
      </View>
      <CroppedModalWindow
        type="bottom"
        name="CreateOrImportClients"
        isVisible={isVisibleModal}
        component={CreateOrImportClients}
        onClose={() => setIsVisibleModal(false)}
        navigation={navigation}
      />

      <CroppedModalWindow
        type="bottom"
        name="ClientMenu"
        isVisible={isVisibleClientMenuModal}
        component={ClientMenu}
        onClose={() => setIsVisibleClientMenuModal(false)}
        navigation={navigation}
        status={setDeleteClientStatus}
      />
      {chooseClientState ? bottomTab() : null}
      {/* <ModalWindow
        title="Чёрный список"
        name="blackList"
        navigation={navigation}
        component={BlackList}
        isVisible={isVisibleBlackListModal}
        onClose={() => setIsVisibleBlackListModal(false)}
      /> */}
      <ModalAlert
        name="deleteAlert"
        data={selectClients}
        component={DeleteClientsModal}
        isVisible={isVisibleDeleteAlertModal}
        onClose={() => setIsVisibleDeleteAlerttModal(false)}
        labelText="Вы действительно хотите удалить выбранных клиентов?"
        onPress={() => deleteMassClients(selectClients?.map(item => item.id))}
      />
      <ModalAlert
        name="deleteAlert"
        data={selectedClient}
        component={DeleteClientsModal}
        isVisible={deleteClientStatus}
        onClose={() => setDeleteClientStatus(false)}
        onPress={() => fetchDeleteClient(selectedClient)}
      />
    </MainLayouts>
  );
};

export default Clients;
