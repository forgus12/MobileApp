import React from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useField, useFormikContext } from 'formik';
import { Text, TouchableOpacity, View, TextStyle } from 'react-native';

import { AccordionModal } from '../../../layouts';
import { ModalWindow } from '../../../components';
import { APIStatus } from '../../../lib/axiosAPI';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import EditCardModal from './EditCardModal';
import { useFetchDeleteOrder } from '../hooks/useFetchDeleteOrder';
import { useFetchConfirmOrder } from '../hooks/useFetchConfirmOrder';
import { useFetchSkippedOrder } from '../hooks/useFetchSkippedOrder';

interface AccordionButtonI {
  label: string;
  customTextStyle?: TextStyle;
  onPress?: () => void;
}

interface IProps {
  data: any;
  name: string;
  closeModal: () => void;
}

const OptionsCardsModal: React.FC<IProps> = ({ data, name, closeModal, datas }) => {
  const [field, meta] = useField<any>(name);
  const { setFieldValue } = useFormikContext();
  const [isVisibleEditCardModal, setIsVisibleEditCardModal] = React.useState<boolean>(false);
  const toast = useToast();
  const { fetch: fetchDeleteOrder, status: statusDeleteOrder } = useFetchDeleteOrder();
  const { fetch: fetchConfirmOrder, status: statusConfirmOrder } = useFetchConfirmOrder();
  const { fetch: fetchSkippedOrder, status: statusSkippedOrder } = useFetchSkippedOrder();
  const { resetAllOrder } = calendarActionCreators();

  const onConfirmed = React.useCallback(() => {
    closeModal();

    const timeout = setTimeout(() => {
      fetchConfirmOrder(data.order_number);
      setFieldValue(name, 'confirmed');
    }, 3000);

    toast.show('Вы подтвердили запись', {
      type: 'loading',
      duration: 3000,
      onClose: () => clearTimeout(timeout),
    });
  }, []);

  const onNoSkipped = React.useCallback(() => {
    closeModal();

    fetchConfirmOrder(data.order_number);
    setFieldValue(name, 'confirmed');
  }, []);

  const onSkipped = React.useCallback(() => {
    fetchSkippedOrder(data.order_number);
    setFieldValue(name, 'skipped');
  }, []);

  const openEditCardModal = React.useCallback(() => {
    setIsVisibleEditCardModal(true);
  }, []);

  const deleteCard = React.useCallback(() => {
    closeModal();

    const timeout = setTimeout(() => {
      fetchDeleteOrder(data.order_number);
    }, 3000);

    toast.show('Вы удалили запись', {
      type: 'loading',
      duration: 3000,
      onClose: () => {
        clearTimeout(timeout);
        resetAllOrder();
      },
    });
  }, []);

  React.useEffect(() => {
    if (statusDeleteOrder === APIStatus.Success || statusSkippedOrder === APIStatus.Success) {
      closeModal();
    }
  }, [statusDeleteOrder, statusSkippedOrder]);

  const AccordionButton = React.useCallback(({ label, customTextStyle, onPress }: AccordionButtonI) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: SIZES.margin * 0.05,
          width: '100%',
          height: 57,
          backgroundColor: COLORS.backgroundPicker,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h2,
            color: COLORS.blue,
            ...customTextStyle,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <>
      <AccordionModal onPress={closeModal}>
        <View style={{ borderRadius: SIZES.radius * 1.6, overflow: 'hidden' }}>
          {meta.value === 'confirmed' ? (
            <AccordionButton label="Клиент не пришёл" customTextStyle={{ color: COLORS.error }} onPress={onSkipped} />
          ) : meta.value === 'skipped' ? (
            <AccordionButton label="Клиент пришёл" onPress={onNoSkipped} />
          ) : (
            <AccordionButton label="Подтвердить запись" onPress={onConfirmed} />
          )}
          <AccordionButton label="Редактировать запись" onPress={openEditCardModal} />
          <AccordionButton label="Удалить запись" customTextStyle={{ color: COLORS.error }} onPress={deleteCard} />
          {/* <AccordionButton label="Перейти в чат" /> */}
        </View>
      </AccordionModal>

      <ModalWindow
        // name={`data.${index}.status`}
        data={data}
        day_id={datas}
        title="Редактирование записи"
        isVisible={isVisibleEditCardModal}
        component={EditCardModal}
        onClose={() => (setIsVisibleEditCardModal(false), closeModal())}
      />
    </>
  );
};

export default OptionsCardsModal;
