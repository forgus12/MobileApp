import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useFormikContext } from 'formik';
import { Text, TouchableOpacity, View } from 'react-native';

import { Hr, SelectField, SwitchToggle, ModalWindow, CroppedModalWindow } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { WorkScheduleModal, SmartGraphModal, TimePickerModal } from '../modals';
import {
  TimePickerLimitBefore,
  TimePickerLimitAfter,
  TimePickerCancelAppointment,
  workScheduleType,
} from '../static/static';
import RecordConfirmationModal from '../modals/RecordConfirmationModal';

const StaticContentBlock: React.FC = () => {
  const { values, setFieldValue }: any = useFormikContext();
  const [isVisibleWorkScheduleModal, setIsVisibleWorkScheduleModal] = React.useState<boolean>(false);
  const [isVisibleSmartGraphModal, setIsVisibleSmartGraphModal] = React.useState<boolean>(false);
  const [isVisibleCancelAppointmentModal, setIsVisibleCancelAppointmentModal] = React.useState<boolean>(false);
  const [isVisibleLimitBeforeModal, setIsVisibleLimitBeforeModal] = React.useState<boolean>(false);
  const [isVisibleLimitAfterModal, setIsVisibleLimitAfterModal] = React.useState<boolean>(false);
  const [isVisibleRecordConfirmationModal, setIsVisibleRecordConfirmationModal] = React.useState<boolean>(false);

  return (
    <>
      {/* Умный график */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.6,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: SIZES.margin,
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              color: COLORS.text,
            }}>
            Умный график
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsVisibleSmartGraphModal(true)}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h5,
              color: COLORS.gray,
            }}>
            {values.smart_schedule ? 'Вкл' : 'Выкл'}
          </Text>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
              fill="#38B8E0"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <Hr /> */}

      {/* Подтверждение записи */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.6,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: SIZES.margin,
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              color: COLORS.text,
            }}>
            Подтверждение записи
          </Text>
          <TouchableOpacity
            onPress={() => setIsVisibleRecordConfirmationModal(true)}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                fill="#787880"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <SwitchToggle
          isEnabled={values.confirmation}
          setIsEnabled={() =>
            setFieldValue('confirmation', !values.confirmation)
          }
        />
      </View> */}
      {/* <Hr /> */}

      {/* Отмена записи клиентом */}
      {/* <View
        style={{
          paddingHorizontal: SIZES.padding * 1.6,
          paddingTop: SIZES.padding * 2.2,
          paddingBottom: SIZES.padding * 1.6,
        }}>
        <Text
          style={{
            paddingBottom: SIZES.padding * 1.6,
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h4,
            color: COLORS.text,
          }}>
          Отмена записи клиентом
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              flex: 1,
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body4,
              color: COLORS.gray,
            }}>
            Клиент может отменить запись не позднее, чем за{' '}
            {values.cancel_appointment.label} до визита
          </Text>
          <View style={{ marginLeft: SIZES.margin * 1.6, width: 90 }}>
            <SelectField
              onPress={() => setIsVisibleCancelAppointmentModal(true)}
              type="default"
              name="cancel_appointment.label"
              customContainerStyle={{ marginBottom: 0 }}
            />
          </View>
        </View>
      </View>
      <Hr /> */}

      {/* Ограничение новой записи */}
      {/* <View
        style={{
          paddingHorizontal: SIZES.padding * 1.6,
          paddingTop: SIZES.padding * 2.2,
          paddingBottom: SIZES.padding * 1.6,
        }}>
        <Text
          style={{
            paddingBottom: SIZES.padding * 1.6,
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h4,
            color: COLORS.text,
          }}>
          Ограничение новой записи
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: SIZES.padding * 1.6,
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body4,
              color: COLORS.gray,
            }}>
            Запись открыта на {values.limit_before.label} вперёд
          </Text>
          <View style={{ marginLeft: SIZES.margin * 1.6, width: 90 }}>
            <SelectField
              onPress={() => setIsVisibleLimitBeforeModal(true)}
              type="default"
              name="limit_before.label"
              customContainerStyle={{ marginBottom: 0 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              flex: 1,
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body4,
              color: COLORS.gray,
            }}>
            Клиент может записаться минимум за {values.limit_after.label} до
            визита
          </Text>
          <View style={{ marginLeft: SIZES.margin * 1.6, width: 90 }}>
            <SelectField
              onPress={() => setIsVisibleLimitAfterModal(true)}
              type="default"
              name="limit_after.label"
              customContainerStyle={{ marginBottom: 0 }}
            />
          </View>
        </View>
      </View>
      <Hr /> */}

      {/* График работы */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleWorkScheduleModal(true)}
          type="line"
          label="График работы:"
          name="type"
        />
      </View>
      <Hr />

      <ModalWindow
        name="type"
        title="График работы"
        data={workScheduleType}
        isVisible={isVisibleWorkScheduleModal}
        component={WorkScheduleModal}
        onClose={() => setIsVisibleWorkScheduleModal(false)}
      />
      <ModalWindow
        name="smart_schedule"
        title="Умный график"
        isVisible={isVisibleSmartGraphModal}
        component={SmartGraphModal}
        onClose={() => setIsVisibleSmartGraphModal(false)}
      />
      <CroppedModalWindow
        type="center"
        isVisible={isVisibleRecordConfirmationModal}
        component={RecordConfirmationModal}
        onClose={() => setIsVisibleRecordConfirmationModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="cancel_appointment"
        title="Отмена записи клиентом"
        data={TimePickerCancelAppointment}
        isVisible={isVisibleCancelAppointmentModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleCancelAppointmentModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="limit_before"
        title="Ограничение отмены записи"
        data={TimePickerLimitBefore}
        isVisible={isVisibleLimitBeforeModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleLimitBeforeModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="limit_after"
        title="Ограничение отмены записи"
        data={TimePickerLimitAfter}
        isVisible={isVisibleLimitAfterModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleLimitAfterModal(false)}
      />
    </>
  );
};

export default StaticContentBlock;
