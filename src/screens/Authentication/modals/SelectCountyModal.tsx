import React from 'react';
import { useSelector } from 'react-redux';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

import { phoneVerificationActionCreators } from '../../../slices/phoneVerificationSlice';
import { CountriesArrayI } from '../../../slices/phoneVerificationSlice';
import { RootState } from '../../../store';
import { ListEmptyComponent, SearchField } from '../../../components';
import { WrapperAsyncRequest } from '../../../layouts';
import { COLORS, SIZES, FONTFAMILY } from '../../../constants';

import { useFetchCountries } from '../hooks/useFetchCountries';

interface IProps {
  closeModal: () => void;
}

const SelectCountryModal: React.FC<IProps> = ({ closeModal }) => {
  const { updateSelectedCountry } = phoneVerificationActionCreators();
  const { fetch: fetchCountries, status } = useFetchCountries();
  const { countries } = useSelector((s: RootState) => s?.phoneVerification);
  const [data, setData] = React.useState<CountriesArrayI[] | undefined>([]);

  const handleOnPress = React.useCallback(
    (item: CountriesArrayI) => {
      updateSelectedCountry(item);
      closeModal();
    },
    [countries],
  );

  const requestSearch = React.useCallback(
    (value: string) => {
      const newData =
        countries?.data &&
        countries?.data.filter(
          n => n.name.toUpperCase().indexOf(value.toUpperCase()) > -1,
        );
      setData(newData);
    },
    [countries],
  );

  React.useEffect(() => {
    !countries?.data && fetchCountries();
  }, []);

  React.useEffect(() => {
    countries?.data && setData(countries?.data);
  }, [countries?.data]);

  const renderItem = React.useCallback(
    ({ item }: { item: CountriesArrayI }) => {
      return (
        <TouchableOpacity
          onPress={() => handleOnPress(item)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SIZES.margin * 1.6,
          }}>
          <Image
            source={{ uri: item.flag }}
            style={{ marginRight: SIZES.margin * 2.2, width: 28, height: 18 }}
            resizeMode="cover"
          />
          <Text
            style={{
              flex: 1,
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body2,
              color: COLORS.text,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body2,
              color: COLORS.text,
            }}>
            {item.code}
          </Text>
        </TouchableOpacity>
      );
    },
    [data],
  );

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding * 1.6,
        paddingVertical: SIZES.padding * 1.6,
      }}>
      <WrapperAsyncRequest status={status}>
        <SearchField getValue={requestSearch} />
        <FlatList
          data={data}
          keyExtractor={item => item.name}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={200}
          initialNumToRender={5}
          ListEmptyComponent={ListEmptyComponent}
          style={{ marginTop: SIZES.margin * 2.4 }}
        />
      </WrapperAsyncRequest>
    </View>
  );
};

export default SelectCountryModal;
