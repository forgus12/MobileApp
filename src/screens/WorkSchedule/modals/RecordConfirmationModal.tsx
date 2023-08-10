import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Hr } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

interface IProps {
  closeModal: () => void;
}

const RecordConfirmationModal: React.FC<IProps> = ({ closeModal }) => {
  return (
    <View
      style={{
        width: 270,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: SIZES.radius * 1.6,
      }}>
      <View
        style={{
          alignItems: 'center',
          padding: SIZES.padding * 1.6,
        }}>
        <Text
          style={{
            marginBottom: SIZES.margin * 0.8,
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: SIZES.body1,
            color: COLORS.text,
          }}>
          Подтверждение записи
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body3 - 1,
            color: COLORS.textModal,
            lineHeight: 18,
            textAlign: 'center',
          }}>
          Включите, если будете подтверждать каждую запись
        </Text>
      </View>
      <Hr
        style={{
          backgroundColor: COLORS.gray,
        }}
      />
      <TouchableOpacity
        onPress={closeModal}
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 44,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: SIZES.body1,
            color: COLORS.blue,
          }}>
          Ок
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordConfirmationModal;
