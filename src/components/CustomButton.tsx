import React, { useEffect } from 'react';
import { Text, ViewStyle } from 'react-native';

import { APIStatus } from '../lib/axiosAPI';
import { COLORS, FONTFAMILY, SIZES } from '../constants';

import Loader from './Loader';
import TouchableBounce from './TouchableBounce';
import CroppedModalWindow from './CroppedModalWindow';
import ErrorModal from './Modals/ErrorModal';
import { NavigationType } from '../navigation/MainStackNavigator';

interface IProps {
  type: 'default' | 'primary';
  label: string;
  customContainerStyle?: ViewStyle;
  customLabelStyle?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  status?: APIStatus;
  navigation: NavigationType;
}

const CustomButton: React.FC<IProps> = ({
  type,
  label,
  customContainerStyle,
  customLabelStyle,
  onPress,
  disabled,
  status,
  navigation,
}) => {
  const [isErrorModal, setIsErrorModal] = React.useState(false);
  const backgroundColor = type === 'default' ? COLORS.white : COLORS.primary;
  const color = type === 'default' ? COLORS.primary : COLORS.white;
  const isDisabled = status === APIStatus.Loading ? true : false;

  // useEffect(() => {
  //   if (status === APIStatus.Failure) {
  //     setIsErrorModal(true);
  //   }
  // }, [status]);

  return (
    <>
      <TouchableBounce
        disabled={disabled || isDisabled}
        onPress={onPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
          backgroundColor,
          borderRadius: SIZES.radius * 12.5,
          opacity: disabled || isDisabled ? 0.5 : 1,
          ...customContainerStyle,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.bold,
            fontSize: SIZES.h3,
            color,
            ...customLabelStyle,
          }}>
          {status === APIStatus.Loading ? <Loader size={'large'} colorIndicator={COLORS.white} /> : label}
        </Text>
      </TouchableBounce>
      <CroppedModalWindow
        type="center"
        navigation={navigation}
        isVisible={isErrorModal}
        component={ErrorModal}
        onClose={() => setIsErrorModal(false)}
      />
    </>
  );
};

export default CustomButton;
