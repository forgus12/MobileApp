import React from 'react';
import MaskInput from 'react-native-mask-input';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';

import { RootState } from '../../../store';
import { ModalWindow } from '../../../components';
import { SIZES, FONTFAMILY, COLORS } from '../../../constants';

import { SelectCountyModal } from '../modals';

interface IProps {
  value: string;
  onChangeText: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  error?: boolean | string;
}

const FieldPhone: React.FC<IProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
}) => {
  const { selectedCountry } = useSelector(
    (s: RootState) => s?.phoneVerification,
  );
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [isVisibleModalCounty, setIsVisibleModalCounty] =
    React.useState<boolean>(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderColor: error
          ? COLORS.error
          : isFocused
          ? COLORS.primary
          : COLORS.border,
        borderWidth: 1,
        borderRadius: SIZES.radius,
      }}>
      <TouchableOpacity
        onPress={() => setIsVisibleModalCounty(true)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: '100%',
        }}>
        <Image
          source={{ uri: selectedCountry?.flag }}
          style={{ width: 28, height: 18 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View
        style={{
          height: 28,
          width: 1,
          backgroundColor: COLORS.border,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: SIZES.margin * 1.6,
          height: '100%',
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body1,
            lineHeight: 20,
            color: COLORS.text,
          }}>
          {selectedCountry?.code}
        </Text>
        <MaskInput
          value={value}
          placeholderFillCharacter="0"
          placeholderTextColor={COLORS.placeholderLight}
          maxLength={13}
          autoFocus={true}
          keyboardType={
            Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(masked, unmasked) => onChangeText(unmasked)}
          onEndEditing={onBlur}
          mask={[
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
          ]}
          style={{
            flex: 1,
            marginLeft: SIZES.margin * 0.4,
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body1,
            color: COLORS.text,
          }}
        />
      </View>

      <ModalWindow
        title="Выберите страну"
        component={SelectCountyModal}
        isVisible={isVisibleModalCounty}
        onClose={() => setIsVisibleModalCounty(false)}
      />
    </View>
  );
};

export default FieldPhone;
