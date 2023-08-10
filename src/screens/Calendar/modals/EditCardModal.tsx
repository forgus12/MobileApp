import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { Formik } from 'formik';
import { Image, ScrollView, Text, View } from 'react-native';

import { AllOrdersArrayI, calendarActionCreators } from '../../../slices/calendarSlice';
import { APIStatus } from '../../../lib/axiosAPI';
import { DateAndTimeBlock, ServicesBlock } from '../../NewOrder/blocks';
import { useUpdateOrder } from '../../NewOrder/hooks/useUpdateOrder';
import { CustomButton, CroppedModalWindow } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import AlertModal from '../../NewOrder/modals/AlertModal';

interface IProps {
  data: AllOrdersArrayI;
  closeModal: () => void;
}

const EditCardModal: React.FC<IProps> = ({ data, closeModal, day_id }) => {
  const { fetch: updateOrder, status } = useUpdateOrder();
  const { resetAllOrder } = calendarActionCreators();
  const { client, services, date, time } = data;
  const [isVisibleAlertModal, setIsVisibleAlertModal] = React.useState<boolean>(false);

  React.useEffect((): any => {
    if (status === APIStatus.Success) {
      closeModal();
      return () => resetAllOrder();
    } else if (status === APIStatus.Failure) {
      setIsVisibleAlertModal(true);
    }
  }, [status]);

  return (
    <Formik
      initialValues={{
        day_id: day_id?.id,
        client: client,
        services: services,
        date: {
          label: date.label,
          value: date.value,
        },
        time: {
          start: time.start,
          end: time.end,
        },
      }}
      onSubmit={values => {
        updateOrder(values, data?.order_number);
      }}>
      {({ handleSubmit }) => (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding * 1.6,
                height: 74,
                backgroundColor: COLORS.backgroundAlert,
              }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginBottom: SIZES.margin * 0.4,
                    fontFamily: FONTFAMILY.title.semibold,
                    fontSize: SIZES.h4,
                    color: COLORS.white,
                  }}>
                  {client?.name} {client?.surname}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.title.regular,
                    fontSize: SIZES.h5,
                    color: COLORS.white,
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

            <ServicesBlock />
            <DateAndTimeBlock />
          </ScrollView>
          <View
            style={{
              paddingHorizontal: SIZES.padding * 1.6,
              paddingVertical: SIZES.padding * 1.6,
            }}>
            <CustomButton onPress={handleSubmit} type="primary" label="Сохранить изменения" status={status} />
          </View>
          <CroppedModalWindow
            type="center"
            name="save"
            isVisible={isVisibleAlertModal}
            component={AlertModal}
            onClose={() => setIsVisibleAlertModal(false)}
          />
        </View>
      )}
    </Formik>
  );
};

export default EditCardModal;
