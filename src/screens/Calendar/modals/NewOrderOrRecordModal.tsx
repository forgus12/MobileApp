import React from 'react';
import { View, TextStyle, TouchableOpacity, Text } from 'react-native';

import { AccordionModal } from '../../../layouts';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { RootState, useSelector } from '../../../store';

interface AccordionButtonI {
  label: string;
  customTextStyle?: TextStyle;
  onPress?: () => void;
}

interface IProps {
  navigation: NavigationType;
  data: {
    isSelectedDate: string;
    isSelectedTime: string;
  };
  closeModal: () => void;
  Id: any;
}

const NewOrderOrRecordModal: React.FC<IProps> = ({ navigation, closeModal, data, Id }) => {
  const { isSelectedDate, isSelectedTime } = data;
  const { dayID } = useSelector((s: RootState) => s?.calendar);
  const AccordionButton = ({ label, customTextStyle, onPress }: AccordionButtonI) => {
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
          label="Добавить запись"
          onPress={() => {
            closeModal();
            navigation.navigate('NewOrder', {
              isSelectedDate: data.isSelectedDate,
              isSelectedTime: data.isSelectedTime,
              dayId: dayID[Id],
            });
          }}
        />
        <AccordionButton
          label="Добавить перерыв"
          onPress={() => {
            closeModal();
            navigation?.navigate('AppendBreak', {
              isSelectedDate: isSelectedDate,
              isSelectedTime: isSelectedTime,
            });
          }}
        />
      </View>
    </AccordionModal>
  );
};

export default NewOrderOrRecordModal;
