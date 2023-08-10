import { useFormikContext } from 'formik';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { AccordionModal } from '../../../layouts';
import { RootState, useSelector } from '../../../store';

interface AccordionButtonI {
  label: string;
  customTextStyle?: TextStyle;
  onPress?: () => void;
}

interface IProps {
  closeModal: () => void;
  name: string;
}

const ScheduledКecordingsModal: React.FC<IProps> = ({ closeModal, name, saves }) => {
  const { data } = useSelector((s: RootState) => s?.appendBreak);
  const { setFieldValue, submitForm } = useFormikContext();

  const confirmAndDelete = () => {
    closeModal();
    setFieldValue(name, false);
    submitForm();
    saves && saves(false);
  };

  const confirmAndSave = () => {
    closeModal();
    setFieldValue(name, true);
    submitForm();
    saves && saves(true);
  };

  const AccordionButton = React.useCallback(({ label, customTextStyle, onPress }: AccordionButtonI) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 46.5,
          backgroundColor: COLORS.backgroundPicker,
          borderWidth: 0.5,
          borderColor: '#3F3F3F',
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.semibold,
            fontSize: SIZES.body3,
            color: COLORS.red,
            ...customTextStyle,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View
      style={{
        width: 278,
        backgroundColor: COLORS.backgroundPicker,
        borderRadius: SIZES.radius * 1.6,
        overflow: 'hidden',
      }}>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: SIZES.padding * 1.6,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <Text
          style={{
            marginBottom: SIZES.margin * 0.4,
            fontFamily: FONTFAMILY.text.semibold,
            color: COLORS.text,
            fontSize: SIZES.body1,
          }}>
          Запланированные записи
        </Text>
        <Text
          style={{
            color: COLORS.textModal,
            lineHeight: 18,
            fontSize: 13,
            textAlign: 'center',
          }}>
          Есть запланированные записи {data?.data} на данный промежуток времени. Вы уверены, что хотите подтвердить
          выходной?
        </Text>
      </View>

      <AccordionButton onPress={confirmAndDelete} label="Подтвердить и отменить записи" />
      <AccordionButton onPress={confirmAndSave} label="Подтвердить и сохранить записи" />
      <AccordionButton
        onPress={closeModal}
        label="Отмена"
        customTextStyle={{ fontFamily: FONTFAMILY.title.regular, color: COLORS.blue }}
      />
    </View>
  );
};

export default ScheduledКecordingsModal;
