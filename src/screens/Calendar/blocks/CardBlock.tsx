import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { useField } from 'formik';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { AllOrdersArrayI } from '../../../slices/calendarSlice';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { CroppedModalWindow, ModalWindow } from '../../../components';
import { OptionsCardModal, AboutCardModal, OptionsBreak } from '../modals';

interface IProps {
  data: AllOrdersArrayI;
  index: number;
  showAllServices: boolean;
}

const CardBlock: React.FC<IProps> = ({ data, index, showAllServices, dayId, isSelectedDate }) => {
  const [field, meta] = useField<any>(`data.${index}.status`);
  const [isVisibleOptionsCardModal, setIsVisibleOptionsCardModal] = React.useState<boolean>(false);
  const [isVisibleOptionsBreak, setIsVisibleOptionsBreak] = React.useState<boolean>(false);
  const [isVisibleAboutCardModal, setIsVisibleAboutCardModal] = React.useState<boolean>(false);

  const statusRecord = {
    confirmed: 'confirmed',
    unconfirmed: 'unconfirmed',
    skipped: 'skipped',
    break: 'break',
  };
  //
  const backgroundColor =
    meta.value === statusRecord.confirmed
      ? COLORS.backgroundConfirmed
      : meta.value === statusRecord.unconfirmed
      ? COLORS.backgroundUnconfirmed
      : meta.value === statusRecord.skipped
      ? COLORS.backgroundSkipped
      : COLORS.backgroundBreak;

  return meta.value !== statusRecord.break ? (
    <>
      <TouchableOpacity
        onPress={() => setIsVisibleAboutCardModal(true)}
        activeOpacity={0.8}
        style={{
          flex: 1,
          marginVertical: SIZES.margin * 0.6,
          backgroundColor,
          borderRadius: SIZES.radius * 0.8,
        }}>
        <View style={{ flexDirection: 'row', padding: SIZES.padding * 0.6 }}>
          <View style={{ marginRight: SIZES.margin * 1.2 }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -5,
                right: -5,
                width: 20,
                height: 20,
                backgroundColor,
                borderRadius: SIZES.radius * 6.25,
                zIndex: 10,
              }}>
              {meta.value === statusRecord.confirmed && (
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M5.99994 10.8001L3.19994 8.00006L2.2666 8.9334L5.99994 12.6667L13.9999 4.66673L13.0666 3.7334L5.99994 10.8001Z"
                    fill="#52AA63"
                  />
                </Svg>
              )}
              {meta.value === statusRecord.skipped && (
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M7.99992 1.33325C4.31325 1.33325 1.33325 4.31325 1.33325 7.99992C1.33325 11.6866 4.31325 14.6666 7.99992 14.6666C11.6866 14.6666 14.6666 11.6866 14.6666 7.99992C14.6666 4.31325 11.6866 1.33325 7.99992 1.33325ZM7.99992 13.3333C5.05992 13.3333 2.66659 10.9399 2.66659 7.99992C2.66659 5.05992 5.05992 2.66659 7.99992 2.66659C10.9399 2.66659 13.3333 5.05992 13.3333 7.99992C13.3333 10.9399 10.9399 13.3333 7.99992 13.3333ZM10.3933 4.66659L7.99992 7.05992L5.60659 4.66659L4.66659 5.60659L7.05992 7.99992L4.66659 10.3933L5.60659 11.3333L7.99992 8.93992L10.3933 11.3333L11.3333 10.3933L8.93992 7.99992L11.3333 5.60659L10.3933 4.66659Z"
                    fill="#D64641"
                  />
                </Svg>
              )}
              {meta.value === statusRecord.unconfirmed && (
                <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <Path
                    d="M6.99992 12.8333C7.64159 12.8333 8.16658 12.3083 8.16658 11.6666H5.83325C5.83325 12.3083 6.35242 12.8333 6.99992 12.8333ZM10.4999 9.33325V6.41658C10.4999 4.62575 9.54325 3.12659 7.87492 2.72992V2.33325C7.87492 1.84909 7.48409 1.45825 6.99992 1.45825C6.51575 1.45825 6.12492 1.84909 6.12492 2.33325V2.72992C4.45075 3.12659 3.49992 4.61992 3.49992 6.41658V9.33325L2.33325 10.4999V11.0833H11.6666V10.4999L10.4999 9.33325Z"
                    fill="#38B8E0"
                  />
                </Svg>
              )}
            </View>
            {data?.client?.photo ? (
              <Image
                source={{ uri: data.client.photo }}
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
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{
                marginBottom: SIZES.margin * 0.4,
                fontFamily: FONTFAMILY.text.semibold,
                fontSize: 11,
                lineHeight: 13,
                color: COLORS.text,
              }}>
              {data?.client?.name} {data?.client?.surname}
            </Text>
            {showAllServices || data?.services?.length == 1 ? (
              data?.services?.map((item, index) => (
                <Text
                  key={String(index)}
                  numberOfLines={1}
                  style={{
                    marginBottom: SIZES.margin * 0.4,
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: 11,
                    lineHeight: 13,
                    color: COLORS.gray,
                  }}>
                  {item.title}
                </Text>
              ))
            ) : (
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 11,
                  lineHeight: 13,
                  color: COLORS.gray,
                }}>{`Услуги: ${data?.services?.length}`}</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setIsVisibleOptionsCardModal(true)}
            style={{
              paddingVertical: SIZES.padding * 1.7,
              paddingRight: SIZES.padding * 0.4,
              paddingLeft: SIZES.padding * 2.4,
            }}>
            <Svg width="16" height="4" viewBox="0 0 16 4" fill="none">
              <Path
                d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z"
                fill="#787880"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <ModalWindow
        name={`data.${index}.status`}
        data={data}
        title={`Запись`}
        // title={`Запись №${data.order_number}`}
        isVisible={isVisibleAboutCardModal}
        component={AboutCardModal}
        onClose={() => setIsVisibleAboutCardModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        data={data}
        name={`data.${index}.status`}
        isVisible={isVisibleOptionsCardModal}
        datas={dayId}
        component={OptionsCardModal}
        onClose={() => setIsVisibleOptionsCardModal(false)}
      />
    </>
  ) : (
    <View
      style={{
        flex: 1,
        padding: SIZES.padding * 0.6,
        marginVertical: SIZES.margin * 0.6,
        backgroundColor,
        borderRadius: SIZES.radius * 0.5,
      }}>
      <View
        style={{
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => setIsVisibleOptionsBreak(true)}
          style={{
            paddingVertical: SIZES.padding * 0.6,
            // paddingRight: SIZES.padding * 0.4,
            paddingLeft: SIZES.padding * 2.4,
            //
          }}>
          <View style={{ height: 16 }}>
            <Svg width="16" height="4" viewBox="0 0 16 4" fill="none">
              <Path
                d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z"
                fill="#787880"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,

          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1 / 1.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flexDirection: 'row',
              fontFamily: FONTFAMILY.text.semibold,
              fontSize: 12,
              lineHeight: 14,
              color: COLORS.gray,
            }}>
            Перерыв
          </Text>
        </View>
      </View>
      <CroppedModalWindow
        type="bottom"
        data={data}
        datas={dayId}
        isSelectedDate={isSelectedDate}
        isVisible={isVisibleOptionsBreak}
        component={OptionsBreak}
        onClose={() => setIsVisibleOptionsBreak(false)}
      />
    </View>
  );
};

export default CardBlock;
