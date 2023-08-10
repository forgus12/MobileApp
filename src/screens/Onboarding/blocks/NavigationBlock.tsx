import React from 'react';
import { useSelector } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';

import { NavigationType } from '../../../navigation/MainStackNavigator';
import { RootState } from '../../../store';
import { CustomButton } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

interface IProps {
  navigation: NavigationType;
  curentIndexSlide: number;
  moveOnNextSlide: () => void;
}

const NavigationBlock: React.FC<IProps> = ({ navigation, curentIndexSlide, moveOnNextSlide }) => {
  const { onboardings } = useSelector((s: RootState) => s?.onboarding);

  return (
    <>
      <CustomButton
        type="default"
        onPress={() => moveOnNextSlide()}
        label={onboardings?.data && curentIndexSlide === onboardings?.data.length - 1 ? 'Отлично' : 'Дальше'}
        customContainerStyle={{
          marginHorizontal: SIZES.margin * 1.6,
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('PhoneVerification')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: SIZES.padding * 1.6,
        }}>
        {/* <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.white,
          }}>
          Пропустить
        </Text> */}
      </TouchableOpacity>
    </>
  );
};

export default NavigationBlock;
