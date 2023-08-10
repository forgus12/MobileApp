import React from 'react';
import { View, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { SIZES, COLORS, FONTFAMILY } from '../../../constants';
import { APIStatus } from '../../../lib/axiosAPI';
import { NavigationType } from '../../../navigation/MainStackNavigator';
//import { useFetchMassDeleteToContactList } from '../hooks/useFetchMassDeleteToContactList';

interface IProps {
  navigation: NavigationType;
  closeModal: () => void;
  data: DataI;
  status?: any;
  labelText?: string;
  onPress?: any;
}

interface DataI {
  avatar_id: string;
  discount: { label: string; value: number };
  name: string;
  phone_number: string;
  surname: string;
  id: string;
}

interface ModalButtonI {
  label: string;
  customTextStyle?: TextStyle;
  onPress?: () => void;
  customContainerStyle?: ViewStyle;
}

const UpdateModal: React.FC<IProps> = ({ closeModal, data, status, labelText, onPress }) => {
  const ModalButton = ({ label, customTextStyle, onPress, customContainerStyle }: ModalButtonI) => {
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
        minHeight: 139,
        borderRadius: SIZES.radius * 1.625,
        overflow: 'hidden',
        width: SIZES.width * 0.85,
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
          Внимание: эти изменения применятся{`\n`}
          ко всем дням. Созданные ранее{`\n`}
          перерывы пропадут
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
            label="Отмена"
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
            label="Сохранить"
            customTextStyle={{ color: COLORS.red }}
            onPress={() => onPress()}
            customContainerStyle={{ marginLeft: SIZES.margin * 0.05 }}
          />
        </View>
      </View>
    </View>
  );
};
export default UpdateModal;
