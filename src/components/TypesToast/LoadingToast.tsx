import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Loader from '../Loader';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

interface IProps {
  id: string;
  message: string;
  onHide: (id: string) => void;
}

const LoadingToast: React.FC<IProps> = ({ message, id, onHide}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.margin * 0.8,
        paddingHorizontal: SIZES.padding,
        width: SIZES.width - 16,
        height: 40,
        backgroundColor: COLORS.backgroundToast,
        borderRadius: SIZES.radius,
      }}>
      <Loader size={20} colorIndicator={COLORS.white} />
      <Text
        style={{
          flex: 1,
          marginLeft: SIZES.margin * 1.6,
          fontFamily: FONTFAMILY.text.regular,
          fontSize: 12,
          color: COLORS.white,
        }}>
        {message}
      </Text>
      <TouchableOpacity
        onPress={() => onHide(id)}
        activeOpacity={0.8}
        style={{
          marginRight: SIZES.margin * 0.6,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.semibold,
            fontSize: 13,
            color: COLORS.white,
          }}>
          Отмена
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoadingToast;
