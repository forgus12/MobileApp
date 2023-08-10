import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Text, View, TouchableOpacity } from 'react-native';

import { TimePickerServices } from '../static/static';
import { Picker } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

interface IProps {
  name: string;
  closeModal: () => void;
}

const TimePickerModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue }: any = useFormikContext();
  const [field, meta] = useField(name);
  const [value, setValue] = React.useState<string>('');

  const handleOnPress = () => {
    closeModal();
    setFieldValue(name, value);
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: COLORS.backgroundPicker,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 1.6,
          height: 44,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.body4,
            color: COLORS.silverGray,
          }}>
          Длительность
        </Text>
        <TouchableOpacity onPress={handleOnPress} activeOpacity={0.8}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.semibold,
              fontSize: SIZES.body2,
              color: COLORS.blue,
            }}>
            Подтвердить
          </Text>
        </TouchableOpacity>
      </View>
      <Picker
        initialValue={meta.value}
        items={TimePickerServices}
        onChangeValue={value => setValue(value)}
      />
    </View>
  );
};

export default TimePickerModal;
