import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { NavigationType } from '../../../navigation/MainStackNavigator';
import { Hr } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { RootState, useSelector } from '../../../store';
import RNRestart from 'react-native-restart';

interface IProps {
  navigation: NavigationType;
  closeModal: () => void;
}

const InfoModal: React.FC<IProps> = ({ navigation, closeModal }) => {
  const { isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const handleOnPress = () => {
    closeModal();
    if (isAuthenticated?.data?.user) navigation.navigate('Calendar');
    else {
      navigation.navigate('BottomTabNavigator');
    }
  };

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
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body3 - 1,
            color: COLORS.textModal,
            lineHeight: 18,
            textAlign: 'center',
          }}>
          Параметры входа можно изменить позже в разделе Настройки
        </Text>
      </View>
      <Hr
        style={{
          backgroundColor: COLORS.gray,
        }}
      />
      <TouchableOpacity
        onPress={handleOnPress}
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

export default InfoModal;
