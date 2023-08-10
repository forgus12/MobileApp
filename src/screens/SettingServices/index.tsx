import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FlatList, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { RootState, useSelector } from '../../store';
import { WrapperAsyncRequest } from '../../layouts';
import { Hr, ListEmptyComponent, ScreenHeader } from '../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { WrapperSlideHandler } from '../Settings/layouts';

import { useFetchAllServices } from '../NewOrder/hooks/useFetchAllServices';
import { AllServicesArrayI } from '../../slices/newOrderSlice';
import { getSettingsServices } from './hooks/getSettingsServices';

interface IProps {
  navigation: NavigationType;
}

const SelectServiceModal: React.FC<IProps> = ({ navigation }) => {
  const { fetch: fetchAllServices, status } = useFetchAllServices();
  const { fetch: specialistSettingsServices, status: statusSpecialistSettingsServices } = getSettingsServices();
  const { allServices } = useSelector((s: RootState) => s?.newOrder);
  const [data, setData] = React.useState<Array<AllServicesArrayI> | []>([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    specialistSettingsServices();
  }, [isFocused]);

  React.useEffect(() => {
    fetchAllServices();
  }, [isFocused]);

  React.useEffect(() => {
    allServices?.data && setData(allServices?.data);
  }, [allServices?.data]);

  const renderItem = React.useCallback(
    ({ item, index }: { item: AllServicesArrayI; index: number }) => {
      const isPriceZero = Number(item.price.value) === 0;
      return (
        <View style={{ marginLeft: SIZES.margin * 1.6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: SIZES.padding * 1.6,
            }}>
            <View style={{ flex: 1 }}>
              <Text
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
                      }}>
                      {item.price.value + '₽'}
                    </Text>
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
          </View>
          <Hr style={{ marginVertical: SIZES.padding * 1.4 }} />
        </View>
      );
    },
    [allServices?.data],
  );

  return (
    <WrapperSlideHandler navigation={navigation} screenName="EditMyServices">
      <ScreenHeader
        title="Мои услуги"
        customTextStyle={{
          fontSize: SIZES.h4,
          fontFamily: FONTFAMILY.title.semibold,
          lineHeight: 17.9,
        }}
        customContainerStyle={{
          // marginTop: 32,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        }}
        renderLeftButton={() => (
          <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path
              d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressLeftButton={() => navigation.goBack()}
        renderRightButton={() => (
          <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <Path
              d="M0 15.2501V19.0001H3.75L14.81 7.94006L11.06 4.19006L0 15.2501ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressRightButton={() => navigation.navigate('EditMyServices')}
      />
      <WrapperAsyncRequest status={status}>
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
    </WrapperSlideHandler>
  );
};

export default SelectServiceModal;
