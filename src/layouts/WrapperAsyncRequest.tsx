import React from 'react';
import { View, Image, Text } from 'react-native';
import { CustomButton, Loader } from '../components';
import { COLORS, FONTFAMILY, SIZES } from '../constants';
import { APIStatus } from '../lib/axiosAPI';

interface IProps {
  children: React.ReactNode;
  status: APIStatus;
  colorIndicator?: string;
  size?: 'large' | 'small' | number;
  fetch?: () => void;
}

const WrapperAsyncRequest: React.FC<IProps> = ({ children, status, colorIndicator, size, fetch }) => {
  return status === APIStatus.Success ? ( //|| status === APIStatus.Initial
    <>{children}</>
  ) : status === APIStatus.Failure && fetch ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/internet.png')}
          style={{
            width: 64,
            height: 64,
            marginBottom: SIZES.padding * 2,
          }}
        />
        <Text
          style={{
            fontFamily: FONTFAMILY.title.bold,
            fontSize: SIZES.body2,
            color: COLORS.textBlack,
            marginBottom: SIZES.padding,
          }}>
          {'Ошибка подключения'}
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.body4,
            color: COLORS.gray,
            marginHorizontal: SIZES.padding * 2.4,
            textAlign: 'center',
          }}>
          {'Проверьте ваше интернет-соединение и повторите попытку'}
        </Text>
      </View>
      <CustomButton
        type="primary"
        onPress={fetch}
        label={'Повторить попытку'}
        customContainerStyle={{
          width: '90%',
          margin: SIZES.margin * 1.6,
        }}
      />
    </View>
  ) : (
    <Loader colorIndicator={colorIndicator} size={size} />
  );
};

export default WrapperAsyncRequest;
