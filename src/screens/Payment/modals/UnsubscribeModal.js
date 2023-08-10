import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTFAMILY } from '../../../constants';

const UnsubscribeModal = ({ closeModal, onPress }) => {
  const ModalButton = ({ label, customTextStyle, onPress, customContainerStyle }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: COLORS.backgroundPicker,
          ...customContainerStyle,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h3,
            lineHeight: 22,
            ...customTextStyle,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        minHeight: 113,
        borderRadius: SIZES.radius * 1.625,
        overflow: 'hidden',
        width: SIZES.width - 50,
      }}>
      <View
        style={{
          alignItems: 'center',
          marginBottom: SIZES.margin * 0.1,
          backgroundColor: COLORS.backgroundPicker,
        }}>
        <Text
          style={{
            color: COLORS.textModal,
            fontFamily: FONTFAMILY.text.regular,
            fontSize: 13,
            lineHeight: 18,
            textAlign: 'center',
            marginVertical: SIZES.margin * 1.6,
            marginHorizontal: SIZES.margin * 1.6,
          }}>
          Вы действительно хотите отменить подписку? Клиенты не смогут записаться к вам онлайн.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <ModalButton
            label="Закрыть"
            customTextStyle={{ color: COLORS.blue }}
            onPress={() => closeModal()}
            customContainerStyle={{ marginRight: SIZES.margin * 0.05 }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <ModalButton
            label="Отменить"
            customTextStyle={{ color: COLORS.red }}
            onPress={() => onPress()}
            customContainerStyle={{ marginLeft: SIZES.margin * 0.05 }}
          />
        </View>
      </View>
    </View>
  );
};
export default UnsubscribeModal;
