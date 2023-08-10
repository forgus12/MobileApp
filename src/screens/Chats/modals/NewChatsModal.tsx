import React from 'react';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { NavigationType } from '../../../navigation/MainStackNavigator';

import { Hr, ModalWindow, SearchField } from '../../../components';
import { WrapperAsyncRequest } from '../../../layouts';
import { RootState, useSelector } from '../../../store';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { clientActionCreators } from '../../../slices/clientsSlice';
import { useFetchAllClients } from '../hooks/useFetchAllClients';
import { AllClientsArrayI } from '../../../slices/newOrderSlice';

interface IProps {
  navigation: NavigationType;
  closeModal: () => void;
}

const NewChatsModal: React.FC<IProps> = ({ navigation, closeModal }) => {
  const { fetch: fetchAllClients, status } = useFetchAllClients();
  const { allClients } = useSelector((s: RootState) => s?.newOrder);
  const [data, setData] = React.useState<Array<AllClientsArrayI> | []>([]);
  const { setSelectedClient } = clientActionCreators();

  React.useEffect(() => {
    !allClients?.data && fetchAllClients();
  }, []);

  React.useEffect(() => {
    allClients?.data && setData(allClients?.data);
  }, [allClients?.data]);

  const requestSearch = React.useCallback(
    (value: string) => {
      if (allClients?.data) {
        const newData =
          allClients?.data &&
          allClients?.data.filter(
            n =>
              n.name.toUpperCase().indexOf(value.toUpperCase()) > -1 ||
              n.surname.toUpperCase().indexOf(value.toUpperCase()) > -1 ||
              n.phone_number.toUpperCase().indexOf(value.toUpperCase()) > -1,
          );
        setData(newData);
      }
    },
    [allClients],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: AllClientsArrayI }) => {
      return (
        <>
          <TouchableOpacity
            onPress={() =>
            (navigation.navigate('Chat'), setSelectedClient(item),
            closeModal())}
            activeOpacity={0.8}
            style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: SIZES.margin * 1.6,
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
                <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                  <Path
                    d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                    fill="#787880"
                  />
                </Svg>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  marginBottom: SIZES.margin * 0.4,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h4,
                  color: COLORS.text,
                }}>
                {item.name} {item.surname}
              </Text>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h5,
                  color: COLORS.gray,
                  lineHeight: 14,
                }}>
                {item.phone_number}
              </Text>
            </View>
          </TouchableOpacity>
          <Hr style={{ marginVertical: SIZES.margin * 1.4 }} />
        </>
      );
    },
    [allClients?.data],
  );

  const renderOnboarding = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: SIZES.padding * 1.6,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 225,
            marginTop: '50%',
          }}>
           <View style={{ marginBottom: SIZES.margin * 2.4 }}>
            <Svg width="168" height="89" viewBox="0 0 168 89" fill="none">
               <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M46.2754 71.8046H129.772C133.662 71.8046 136.814 68.6346 136.814 64.7241C136.814 60.8137 133.662 57.6437 129.772 57.6437C129.772 57.6437 123.737 54.4736 123.737 50.5632C123.737 46.6528 127.712 43.4828 132.615 43.4828H142.85C146.739 43.4828 149.892 40.3127 149.892 36.4023C149.892 32.4919 146.739 29.3218 142.85 29.3218H120.719C124.608 29.3218 127.76 26.1518 127.76 22.2414C127.76 18.3309 124.608 15.1609 120.719 15.1609H160.958C164.847 15.1609 168 11.9909 168 8.08046C168 4.17003 164.847 1 160.958 1H62.3713C58.4821 1 55.3293 4.17003 55.3293 8.08046C55.3293 11.9909 58.4821 15.1609 62.3713 15.1609H22.1317C18.2426 15.1609 15.0898 18.3309 15.0898 22.2414C15.0898 26.1518 18.2426 29.3218 22.1317 29.3218H47.2814C51.1706 29.3218 54.3234 32.4919 54.3234 36.4023C54.3234 40.3127 51.1706 43.4828 47.2814 43.4828H7.04192C3.15277 43.4828 0 46.6528 0 50.5632C0 54.4736 3.15277 57.6437 7.04192 57.6437H46.2754C42.3863 57.6437 39.2335 60.8137 39.2335 64.7241C39.2335 68.6346 42.3863 71.8046 46.2754 71.8046ZM153.916 36.4022C153.916 40.3127 157.069 43.4827 160.958 43.4827C164.847 43.4827 168 40.3127 168 36.4022C168 32.4918 164.847 29.3218 160.958 29.3218C157.069 29.3218 153.916 32.4918 153.916 36.4022Z"
                fill="#F0F2F4"
              />
              <Ellipse
                cx="73.9401"
                cy="35.8963"
                rx="33.7006"
                ry="33.8851"
                fill="#F0F2F4"
                stroke="#A4A9AE"
                stroke-width="2.5"
              />
              <Ellipse
                cx="73.9401"
                cy="35.8964"
                rx="26.6587"
                ry="26.8046"
                fill="white"
                stroke="#A4A9AE"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <Ellipse
                cx="64.8862"
                cy="26.7928"
                rx="9.55689"
                 ry="9.6092"
                stroke="#A4A9AE"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <Path
                d="M101.605 62.7007L107.641 68.7696"
                stroke="#A4A9AE"
                stroke-width="2.5"
              />
              <Path
                d="M106.639 74.7104C104.738 72.7991 104.738 69.7113 106.639 67.8C108.554 65.8739 111.671 65.8739 113.587 67.8L124.739 79.0127C126.639 80.924 126.639 84.0118 124.739 85.9231C122.823 87.8493 119.706 87.8493 117.79 85.9231L106.639 74.7104Z"
                fill="#F0F2F4"
                stroke="#A4A9AE"
                stroke-width="2.5"
              />
              <Path
                d="M111.665 69.7812L122.731 80.9077"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
              />
            </Svg>
          </View>
          <Text
             style={{
              fontFamily: FONTFAMILY.title.semibold,
              fontSize: SIZES.h4,
              lineHeight: 17.9,
              color: COLORS.textBlack,
              textAlign: 'center',
              marginBottom: SIZES.margin * 0.8,
            }}>
            Список клиентов пуст
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.h4,
              lineHeight: 16,
              color: COLORS.gray,
               textAlign: 'center',
            }}>
            Добавьте своего первого клиента в разделе “Клиенты”
          </Text>
        </View>
      </View>
    )}

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding * 1.6,
        paddingTop: SIZES.padding * 1.6,
      }}>
      <WrapperAsyncRequest status={status}>
        {data?.length > 0 ? (
        <>
          <View style={{ marginHorizontal: SIZES.padding * 1.6 }}>
            <SearchField
              getValue={requestSearch}
              customContainerStyle={{
                marginBottom: SIZES.padding * 2.4,
              }}
            />
          </View>
          <View style={{ width: '100%' }}>
            <FlatList
              data={data}
              keyExtractor={(__, index) => String(index)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                renderOnboarding()
              )}
            />
          </View>
        </>
        ) : (
          <>
			<View style={{ marginHorizontal: SIZES.padding * 1.6 }}>
            <SearchField
              getValue={requestSearch}
              customContainerStyle={{
                marginBottom: SIZES.padding * 2.4,
              }}
            />
			</View>
			<View
				style={{
				  justifyContent: 'center',
				  alignItems: 'center',
				  width: 200,
				}}>
				<Text
				  style={{
					fontFamily: FONTFAMILY.text.regular,
					fontSize: SIZES.h4,
					color: COLORS.gray,
					textAlign: 'center',
				  }}>
				  Ничего не найдено Проверьте введённые данные
				</Text>
			</View>
      </>
        )}
      </WrapperAsyncRequest>
    </View>   
  );
};

export default NewChatsModal;
