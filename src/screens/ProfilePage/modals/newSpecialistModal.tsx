import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { SIZES, COLORS, FONTFAMILY } from '../../../constants';
import { APIStatus } from '../../../lib/axiosAPI';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { useAddedRole } from '../../PreOnboarding/hooks/useAddedRole';

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

const NewSpecialistModal: React.FC<IProps> = ({ closeModal, navigation }) => {
  const { fetch: addedRole, status } = useAddedRole();
  const userData = useSelector(s => s?.vizitnica?.userData);
  const phoneNumber = userData.phone;

  const requestNewSpecialict = roles => {
    addedRole(phoneNumber, roles);
  };

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.navigate('BottomTabNavigator');
      closeModal();
    }
  }, [status]);

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
        minHeight: 200,
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
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 17,
              lineHeight: 20,
              letterSpacing: 1,
              paddingTop: 16,
              color: '#1C1C1E',
            }}>
            Создать аккаунт специалиста?
          </Text>
        </View>
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
          Клиенты смогут записываться к вам онлайн, ваше расписание будет отображаться в отдельном разделе, все функции
          этого приложения сохранятся
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
            label="Создать"
            customTextStyle={{ color: COLORS.blue }}
            onPress={() => {
              requestNewSpecialict('specialist');
            }}
            customContainerStyle={{ marginLeft: SIZES.margin * 0.05 }}
          />
        </View>
      </View>
    </View>
  );
};

export default NewSpecialistModal;
