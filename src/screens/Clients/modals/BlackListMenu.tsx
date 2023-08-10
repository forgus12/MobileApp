import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTFAMILY } from '../../../constants';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { useSelector, RootState } from '../../../store';
import { useFetchDeleteFromBlackList } from '../hooks/useFetchDeleteFromBlackList';

interface IProps {
  navigation: NavigationType;
  closeModal: () => void;
}

const BlackListMenu: React.FC<IProps> = ({ closeModal }) => {
  const { fetch, status } = useFetchDeleteFromBlackList();
  const {selectedClient} = useSelector((s: RootState) => s?.clients);

  const button = (nameButton: string, careful = false, onPress: () => void) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.82)',
          alignItems: 'center',
          height: SIZES.padding * 6,
          paddingVertical: SIZES.padding * 1.6,
          justifyContent: 'center',
          marginBottom: 0.5,
        }}
        activeOpacity={0.8}
        onPress={() => (onPress(), closeModal())}>
        <Text
          style={{
            color: careful ? COLORS.red : COLORS.blue,
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.padding * 2,
            lineHeight: SIZES.padding * 2.5,
          }}>
          {nameButton}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        minHeight: SIZES.padding * 6,
        marginBottom: SIZES.padding * 1.6,
        width: '100%',
      }}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}>
        {button('Убрать из чёрного списка', false, () => fetch(selectedClient))}
        {button('Удалить', true, () => closeModal())}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 13,
          height: SIZES.padding * 6,
          alignItems: 'center',
          paddingVertical: SIZES.padding * 1.6,
          marginVertical: 9,
          marginHorizontal: SIZES.padding,
        }}
        onPress={() => closeModal()}>
        <Text
          style={{
            color: COLORS.blue,
            fontFamily: FONTFAMILY.title.semibold,
            fontSize: SIZES.padding * 2,
            lineHeight: SIZES.padding * 2.5,
          }}>
          Отмена
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlackListMenu;
