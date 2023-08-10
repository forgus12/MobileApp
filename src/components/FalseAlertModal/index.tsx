import React from 'react';
import { Text, TextStyle, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

interface AccordionButtonI {
  label: string;
  customTextStyle?: TextStyle;
  onPress?: () => void;
}

interface IProps {
  closeModal: () => void;
  contentText: string,
}

const falseAlertModal: React.FC<IProps> = ({ closeModal, contentText }) => {
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
            color: COLORS.textModal,
            lineHeight: 18,
            fontSize: 13,
            textAlign: 'center',
          }}>
          {contentText}
        </Text>
      </View>
      <AccordionButton
        onPress={closeModal}
        label="Ок"
        customTextStyle={{ fontFamily: FONTFAMILY.title.regular, color: COLORS.blue }}
      />
    </View>
  );
};

export default falseAlertModal;
