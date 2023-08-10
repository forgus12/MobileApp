import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { isUndefined } from 'lodash';
import { FormikProps, useFormikContext } from 'formik';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { RootState, useSelector } from '../../../store';
import { WrapperAsyncRequest } from '../../../layouts';
import { Hr, ListEmptyComponent, SearchField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useFetchAllServices } from '../hooks/useFetchAllServices';
import { convertToDuration, getDiscountedPrice } from '../helpers/calc';
import { InitialValuesNewOrderI } from '../static/static';
import { AllServicesArrayI } from '../../../slices/newOrderSlice';

interface IProps {
  name: string;
  closeModal: () => void;
}

const SelectServiceModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { values, setFieldValue }: FormikProps<InitialValuesNewOrderI> = useFormikContext();
  const { fetch: fetchAllServices, status } = useFetchAllServices();
  const { allServices } = useSelector((s: RootState) => s?.newOrder);
  const [data, setData] = React.useState<Array<AllServicesArrayI> | []>([]);

  React.useEffect(() => {
    fetchAllServices();
  }, []);

  React.useEffect(() => {
    allServices?.data && setData(allServices?.data);
  }, [allServices?.data]);

  const handleOnPress = React.useCallback((data: AllServicesArrayI) => {
    setFieldValue(name, data);
    closeModal();
  }, []);

  const requestSearch = React.useCallback(
    (value: string) => {
      if (allServices?.data) {
        const newData =
          allServices?.data &&
          allServices?.data.filter((n: AllServicesArrayI) => n.title.toUpperCase().indexOf(value.toUpperCase()) > -1);
        setData(newData);
      }
    },
    [allServices],
  );

  const renderItem = React.useCallback(
    ({ item, index }: { item: AllServicesArrayI; index: number }) => {
      const isSelected = values.services.some(elem => elem.id === item.id);
      const isPriceZero = Number(item.price.value) === 0;
      const isDiscount = !isUndefined(values.client.discount) && values.client.discount.value !== 0;
      return (
        <>
          <TouchableOpacity
            disabled={isSelected}
            onPress={() => handleOnPress(item)}
            activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  marginBottom: SIZES.margin * 0.4,
                  fontFamily: FONTFAMILY.title.regular,
                  fontSize: SIZES.body2,
                  color: COLORS.text,
                }}>
                {item.title}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {isPriceZero ? (
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.text.regular,
                      fontSize: SIZES.h5,
                      color: COLORS.gray,
                      fontWeight: '400',
                      lineHeight: 14,
                    }}>
                    {item.duration.label}
                  </Text>
                ) : (
                  <>
                    <Text
                      style={{
                        fontFamily: FONTFAMILY.text.regular,
                        fontSize: SIZES.h5,
                        color: COLORS.gray,
                        lineHeight: 14,
                        textDecorationLine: isDiscount ? 'line-through' : 'none',
                      }}>
                      {item.price.value + '₽'}
                    </Text>
                    {isDiscount && (
                      <Text
                        style={{
                          fontFamily: FONTFAMILY.text.regular,
                          fontSize: SIZES.h5,
                          color: COLORS.red,
                          fontWeight: '400',
                          lineHeight: 14,
                        }}>
                        {' ' + getDiscountedPrice(item.price.value, values.client.discount.value * 100) + '₽' + ' '}
                      </Text>
                    )}
                    <Text
                      style={{
                        fontFamily: FONTFAMILY.text.regular,
                        fontSize: SIZES.h5,
                        color: COLORS.gray,
                        fontWeight: '400',
                        lineHeight: 14,
                      }}>
                      {' / ' + item.duration.label}
                    </Text>
                  </>
                )}
              </View>
            </View>
            {isSelected && (
              <View
                style={{
                  width: 18,
                  height: 18,
                  marginRight: SIZES.margin * 2.2,
                }}>
                <Svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <Path
                    d="M6.00002 11.2L1.80002 7L0.400024 8.4L6.00002 14L18 2.00001L16.6 0.600006L6.00002 11.2Z"
                    fill="#38B8E0"
                  />
                </Svg>
              </View>
            )}
          </TouchableOpacity>
          <Hr style={{ marginVertical: SIZES.padding * 1.4 }} />
        </>
      );
    },
    [allServices?.data],
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

export default SelectServiceModal;
