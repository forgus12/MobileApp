import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { AccordionModal } from '../../layouts';

const ShareModal = ({ closeModal, setShare }) => {
  const AccordionButton = ({ label, customTextStyle, onPress }) => {
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
  };

  return (
    <AccordionModal onPress={closeModal}>
      <View style={{ borderRadius: SIZES.radius * 1.6, overflow: 'hidden' }}>
        <AccordionButton
          label="Отправить QR-код"
          onPress={() => {
            setShare('onShareQr');
            // closeModal();
          }}
        />
        <AccordionButton
          label="Отправить ссылку"
          onPress={() => {
            setShare('onShareLink');
            // closeModal();
          }}
        />
      </View>
    </AccordionModal>
  );
};

export default ShareModal;
