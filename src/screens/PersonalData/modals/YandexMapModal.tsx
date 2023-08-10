import React from 'react';
import { useField } from 'formik';
import { View } from 'react-native';

import { CustomButton, TextField } from '../../../components';
import { SIZES } from '../../../constants';

import { YandexMapBlock } from '../blocks';

interface IProps {
  name: string;
  closeModal: () => void;
}

const YandexMapModal: React.FC<IProps> = ({ name, closeModal }) => {
  const [field, meta] = useField<string>(name);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding * 1.6,
        paddingVertical: SIZES.padding * 1.6,
      }}>
      <TextField
        label="Адрес"
        name="address"
        multiline={true}
        maxLength={200}
      />
      <YandexMapBlock />
      <CustomButton
        disabled={meta.value === ''}
        onPress={() => closeModal()}
        type="primary"
        label="Сохранить"
      />
    </View>
  );
};

export default YandexMapModal;
