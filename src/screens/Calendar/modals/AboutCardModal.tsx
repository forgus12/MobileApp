import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { useFormikContext } from 'formik';
import { isUndefined } from 'lodash';
import { useToast } from 'react-native-toast-notifications';
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { AllOrdersArrayI } from '../../../slices/calendarSlice';
import { TotalDurationAndPriceBlock } from '../../NewOrder/blocks';
import { callNumber } from '../../../utils/phoneCall';
import { getDiscountedPrice } from '../../NewOrder/helpers/calc';
import { Hr } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useFetchConfirmOrder } from '../hooks/useFetchConfirmOrder';
import { useFetchSkippedOrder } from '../hooks/useFetchSkippedOrder';
import { useSelector } from 'react-redux';
import { getCurrentTime } from '../helpers/time';
import { getCurrentDate } from '../helpers/dateFormat';

interface IProps {
  name: string;
  data: AllOrdersArrayI;
}

const AboutCardModal: React.FC<IProps> = ({ name, data }) => {
  // const currentDate = new Date();
  // const currentTime = currentDate.toLocaleTimeString();
  const { setFieldValue } = useFormikContext();
  const { client, services, status, time, date } = data;
  const { fetch: fetchConfirmOrder } = useFetchConfirmOrder();
  const { fetch: fetchSkippedOrder } = useFetchSkippedOrder();
  const { allOrders } = useSelector(s => s?.calendar);
  const [statusText, setStatusText] = React.useState<string>();
  const toast = useToast();
  const currentDate = getCurrentDate();
  const isCurrentTime = time.start <= getCurrentTime();
  const isCurrentDate = date.value <= currentDate;

  const onConfirmed = React.useCallback(() => {
    const timeout = setTimeout(() => {
      setFieldValue(name, 'confirmed');
      fetchConfirmOrder(data.order_number);
    }, 3000);

    toast.show('Вы подтвердили запись', {
      type: 'loading',
      duration: 3000,
      onClose: () => clearTimeout(timeout),
    });
  }, [toast]);

  const onMeetTookPlace = React.useCallback(() => {
    setFieldValue(name, 'confirmed');
    fetchConfirmOrder(data.order_number);
  }, []);

  const onSkipped = React.useCallback(() => {
    setFieldValue(name, 'skipped');
    fetchSkippedOrder(data.order_number);
  }, []);

  const statusRecord = {
    confirmed: 'confirmed',
    unconfirmed: 'unconfirmed',
    skipped: 'skipped',
    break: 'break',
  };

  const backgroundColor =
    status === statusRecord.confirmed
      ? COLORS.backgroundConfirmed
      : status === statusRecord.unconfirmed
      ? COLORS.backgroundUnconfirmed
      : status === statusRecord.skipped
      ? COLORS.backgroundSkipped
      : COLORS.backgroundBreak;

  React.useEffect(() => {
    setStatusText(
      status === statusRecord.confirmed
        ? undefined
        : status === statusRecord.unconfirmed
        ? 'На подтверждении'
        : 'Клиент не пришёл',
    );
  }, [status]);

  React.useEffect(() => {
    if (isCurrentDate || isCurrentTime) {
      if (status === statusRecord.confirmed) {
        setStatusText('Встреча состоялась');
      }
    }
  }, [date.value, time.start, status]);

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.9,
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginBottom: SIZES.margin * 0.4,
              fontFamily: FONTFAMILY.title.semibold,
              fontSize: SIZES.h4,
              color: COLORS.text,
            }}>
            {client?.name} {client?.surname}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h5,
              color: COLORS.gray,
              lineHeight: 14,
            }}>
            {client?.phone_number}
          </Text>
        </View>
        {client?.photo ? (
          <Image
            source={{ uri: client.photo }}
            style={{
              width: 38,
              height: 38,
              borderRadius: SIZES.radius * 10,
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

      <View
        style={{
          display: !allOrders?.confirmation && isCurrentDate && !isCurrentTime ? 'none' : 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: SIZES.margin * 0.8,
          paddingHorizontal: SIZES.padding * 1.6,
          height: status === statusRecord.confirmed && !(isCurrentDate || isCurrentTime) ? 0 : 48, // Убрать status === statusRecord.confirmed && !(isCurrentDate || isCurrentTime) ? 0 : для подтверждено
          backgroundColor: backgroundColor,
          overflow: 'hidden',
        }}>
        <View style={{ marginRight: SIZES.margin }}>
          {status === statusRecord.confirmed && (isCurrentDate || isCurrentTime) ? ( // Убрать && (isCurrentDate || isCurrentTime) и null для подтаерждено
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M5.99994 10.8001L3.19994 8.00006L2.2666 8.9334L5.99994 12.6667L13.9999 4.66673L13.0666 3.7334L5.99994 10.8001Z"
                fill="#52AA63"
              />
            </Svg>
          ) : null}
          {status === statusRecord.skipped && (
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M7.99992 1.33325C4.31325 1.33325 1.33325 4.31325 1.33325 7.99992C1.33325 11.6866 4.31325 14.6666 7.99992 14.6666C11.6866 14.6666 14.6666 11.6866 14.6666 7.99992C14.6666 4.31325 11.6866 1.33325 7.99992 1.33325ZM7.99992 13.3333C5.05992 13.3333 2.66659 10.9399 2.66659 7.99992C2.66659 5.05992 5.05992 2.66659 7.99992 2.66659C10.9399 2.66659 13.3333 5.05992 13.3333 7.99992C13.3333 10.9399 10.9399 13.3333 7.99992 13.3333ZM10.3933 4.66659L7.99992 7.05992L5.60659 4.66659L4.66659 5.60659L7.05992 7.99992L4.66659 10.3933L5.60659 11.3333L7.99992 8.93992L10.3933 11.3333L11.3333 10.3933L8.93992 7.99992L11.3333 5.60659L10.3933 4.66659Z"
                fill="#D64641"
              />
            </Svg>
          )}
          {status === statusRecord.unconfirmed && (
            <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <Path
                d="M6.99992 12.8333C7.64159 12.8333 8.16658 12.3083 8.16658 11.6666H5.83325C5.83325 12.3083 6.35242 12.8333 6.99992 12.8333ZM10.4999 9.33325V6.41658C10.4999 4.62575 9.54325 3.12659 7.87492 2.72992V2.33325C7.87492 1.84909 7.48409 1.45825 6.99992 1.45825C6.51575 1.45825 6.12492 1.84909 6.12492 2.33325V2.72992C4.45075 3.12659 3.49992 4.61992 3.49992 6.41658V9.33325L2.33325 10.4999V11.0833H11.6666V10.4999L10.4999 9.33325Z"
                fill="#38B8E0"
              />
            </Svg>
          )}
        </View>
        <Text
          style={{
            flex: 1,
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h5,
            color: COLORS.text,
          }}>
          {statusText}
        </Text>
        {isCurrentDate && isCurrentTime && status === statusRecord.confirmed && (
          <TouchableOpacity onPress={onSkipped}>
            <Text
              style={{
                fontFamily: FONTFAMILY.title.semibold,
                fontSize: SIZES.h5,
                color: COLORS.error,
                textDecorationLine: 'underline',
              }}>
              Клиент не пришёл
            </Text>
          </TouchableOpacity>
        )}
        {status === statusRecord.unconfirmed && (
          <TouchableOpacity onPress={onConfirmed}>
            <Text
              style={{
                fontFamily: FONTFAMILY.title.semibold,
                fontSize: SIZES.h5,
                color: COLORS.primary,
                textDecorationLine: 'underline',
              }}>
              Подтвердить
            </Text>
          </TouchableOpacity>
        )}
        {status !== statusRecord.confirmed && status !== statusRecord.unconfirmed && (
          <TouchableOpacity onPress={onMeetTookPlace}>
            <Text
              style={{
                fontFamily: FONTFAMILY.title.semibold,
                fontSize: SIZES.h5,
                color: COLORS.lightBlue,
                textDecorationLine: 'underline',
              }}>
              Встреча состоялась
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {services?.map((item, index: number) => {
        const isPriceZero = Number(item.price.value) === 0;
        const discount = getDiscountedPrice(item.price.value, Number(client?.discount.value) * 100);
        const isDiscount = !isUndefined(client?.discount) && client?.discount.value !== 0;

        return (
          <View
            key={String(index)}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.margin * 0.8,
              paddingVertical: SIZES.padding * 0.4,
              paddingHorizontal: SIZES.padding * 1.6,
              backgroundColor: COLORS.lightGray2,
            }}>
            <View style={{ marginRight: SIZES.margin * 2.4 }}>
              {item.interval.map((time, index: number) => (
                <View
                  key={String(index)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: SIZES.margin * 0.4,
                    width: 40,
                    height: 20,
                    backgroundColor: COLORS.backgroundAlert,
                    borderRadius: SIZES.radius * 0.5,
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.text.medium,
                      fontSize: SIZES.body5,
                      color: COLORS.white,
                    }}>
                    {time}
                  </Text>
                </View>
              ))}
            </View>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {isPriceZero ? (
                  <Text
                    style={{
                      fontFamily: FONTFAMILY.text.regular,
                      fontSize: SIZES.h5,
                      color: COLORS.gray,
                      lineHeight: 18,
                    }}>
                    {item.duration.label}
                  </Text>
                ) : (
                  <>
                    <Text
                      style={{
                        fontFamily: FONTFAMILY.text.regular,
                        fontSize: SIZES.body4,
                        color: COLORS.gray,
                        lineHeight: 18,
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
                          lineHeight: 14,
                        }}>
                        {' ' + discount + '₽'}
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
          </View>
        );
      })}

      <TotalDurationAndPriceBlock
        // @ts-ignore
        data={data}
        numberServicesToDisplay={0}
        customContainerStyle={{
          paddingHorizontal: SIZES.padding * 1.6,
          marginTop: SIZES.padding * 2.4,
          marginBottom: SIZES.padding * 2.4,
        }}
      />

      <Hr />
      <TouchableOpacity
        onPress={() => callNumber(client?.phone_number)}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.9,
        }}>
        <View style={{ marginRight: SIZES.margin * 2.6 }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
              fill="#38B8E0"
            />
          </Svg>
        </View>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h4,
            color: COLORS.text,
          }}>
          Позвонить
        </Text>
      </TouchableOpacity>
      <Hr />
      {/* <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.9,
        }}>
        <View style={{ marginRight: SIZES.margin * 2.6 }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11Z"
              fill="#38B8E0"
            />
          </Svg>
        </View>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h4,
            color: COLORS.text,
          }}>
          Написать
        </Text>
      </TouchableOpacity> */}
      {/* <Hr /> */}
      {/* <Toast ref={toastRef} /> */}
    </ScrollView>
  );
};

export default AboutCardModal;
