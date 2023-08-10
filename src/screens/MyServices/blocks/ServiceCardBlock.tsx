import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useFormikContext, useField } from 'formik';
import { View, TouchableOpacity, Platform } from 'react-native';

import { maskInputPostfix } from '../../../utils/maskInput';
import { CroppedModalWindow, SelectField, TextField } from '../../../components';
import { COLORS, SIZES } from '../../../constants';

import { TimePickerModal } from '../modals';

interface IProps {
  index: number;
  removeSeriveCard: (state: number) => void;
  isDelete: boolean;
  isFinancialAnalytics: boolean;
  autoFocus?: boolean;
}

const ServiceCardBlock: React.FC<IProps> = ({
  index,
  removeSeriveCard,
  isDelete,
  isFinancialAnalytics,
  autoFocus = true,
}) => {
  const { setFieldValue, values }: any = useFormikContext();
  const [isVisibleTimePickerModal, setIsVisibleTimePickerModal] = React.useState<boolean>(false);

  return (
    <View
      style={{
        marginBottom: SIZES.margin * 0.8,
        paddingVertical: SIZES.padding * 1.6,
        paddingHorizontal: SIZES.padding * 1.6,
        height: 152,
        width: '100%',
        backgroundColor: COLORS.lightGray2,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextField
          label="Название услуги"
          name={`maintenances.${index}.title`}
          maxLength={100}
          autoFocus={autoFocus}
          customContainerStyle={{ flex: 1 }}
        />
        {isDelete && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => removeSeriveCard(index)}
            style={{
              width: SIZES.padding * 2,
              height: SIZES.padding * 2,
              marginLeft: SIZES.padding * 1.8,
            }}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path
                d="M11 9H9H5V11H9H11H15V9H11ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                fill="#D64641"
              />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {isFinancialAnalytics && (
          <TextField
            label="Стоимость"
            name={`maintenances.${index}.price.label`}
            indent={2}
            placeholder="0 ₽"
            maxLength={8}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'}
            onChangeText={(name, value) => {
              setFieldValue(name, maskInputPostfix(value, ' ₽'));
              setFieldValue(`maintenances.${index}.price.value`, Number(maskInputPostfix(value, ' ₽').slice(0, -2)));
            }}
            customContainerStyle={{
              marginRight: SIZES.margin * 0.8,
              width: '49%',
            }}
          />
        )}
        <SelectField
          onPress={() => setIsVisibleTimePickerModal(true)}
          type="default"
          label="Длительность"
          name={`maintenances.${index}.duration.label`}
          placeholder="15 мин"
          customContainerStyle={{ flex: 1 }}
        />
      </View>
      <CroppedModalWindow
        type="bottom"
        name={`maintenances.${index}.duration`}
        isVisible={isVisibleTimePickerModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleTimePickerModal(false)}
      />
    </View>
  );
};

export default ServiceCardBlock;
