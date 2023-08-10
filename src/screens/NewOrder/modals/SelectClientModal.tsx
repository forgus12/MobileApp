import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { useFormikContext } from 'formik';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Hr, ListEmptyComponent, SearchField } from '../../../components';
import { WrapperAsyncRequest } from '../../../layouts';
import { RootState, useSelector } from '../../../store';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useFetchAllClients } from '../hooks/useFetchAllClients';
import { AllClientsArrayI } from '../../../slices/newOrderSlice';

interface IProps {
  name: string;
  closeModal: () => void;
}

const SelectClientModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue } = useFormikContext();
  const { fetch: fetchAllClients, status } = useFetchAllClients();
  const { allClients } = useSelector((s: RootState) => s?.newOrder);
  const [data, setData] = React.useState<Array<AllClientsArrayI> | []>([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    fetchAllClients();
  }, [isFocused]);

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
              n.name?.toUpperCase().indexOf(value.toUpperCase()) > -1 ||
              n.surname?.toUpperCase().indexOf(value.toUpperCase()) > -1 ||
              n.phone_number?.toUpperCase().indexOf(value.toUpperCase()) > -1,
          );
        setData(newData);
      }
    },
    [allClients],
  );

  const handleOnPress = React.useCallback((data: AllClientsArrayI) => {
    setFieldValue(name, data);
    closeModal();
  }, []);

  const renderItem = React.useCallback(
    ({ item }: { item: AllClientsArrayI }) => {
      return (
        <>
          <TouchableOpacity onPress={() => handleOnPress(item)} activeOpacity={0.8} style={{ flexDirection: 'row' }}>
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

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding * 1.6,
        paddingTop: SIZES.padding * 1.6,
      }}>
      <WrapperAsyncRequest status={status}>
        <SearchField getValue={requestSearch} />
        <FlatList
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          ListEmptyComponent={ListEmptyComponent}
          style={{ marginTop: SIZES.margin * 2.4 }}
        />
      </WrapperAsyncRequest>
    </View>
  );
};

export default SelectClientModal;
