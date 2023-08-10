import React from 'react';
import { useFormikContext, useField } from 'formik';
import { View, Text, FlatList } from 'react-native';

import { CustomButton, Checkbox } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { weekendsList } from '../static/static';

interface ItemI {
  label: string;
  cut: string;
  value: string | number;
}

interface WeekendsI {
  item: ItemI;
  index: number;
}

interface IProps {
  name: string;
  closeModal: () => void;
}

const WeekendsModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue, values }: any = useFormikContext();
  const [field, meta] = useField<any>(name);
  const [weekends, setWeekends] = React.useState<Array<ItemI>>(meta.value);

  const handleOnChange = React.useCallback(
    (item: ItemI, checked: boolean) => {
      if (checked) setWeekends([...weekends, item]);
      else
        setWeekends(weekends.filter(weekend => weekend?.value !== item.value));
    },
    [weekends],
  );

  const handleOnPress = () => {
    setFieldValue(name, weekends);
    closeModal();
  };

  const renderItem = React.useCallback(
    ({ item, index }: WeekendsI) => {
      const isChecked =
        weekends.filter(weekend => weekend.value === item.value).length > 0;

      return (
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: COLORS.border,
          }}>
          <Checkbox
            onPress={checked => handleOnChange(item, checked)}
            isChecked={isChecked}
            renderText={() => (
              <Text
                style={{
                  fontFamily: FONTFAMILY.title.regular,
                  fontSize: SIZES.h4,
                  color: COLORS.text,
                }}>
                {item.label}
              </Text>
            )}
            customCheckboxStyle={{
              marginRight: SIZES.margin * 2.7,
            }}
            customContainerStyle={{
              width: '100%',
              paddingVertical: SIZES.padding * 1.9,
            }}
          />
        </View>
      );
    },
    [weekends],
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: SIZES.padding * 0.8,
        paddingBottom: SIZES.padding * 1.6,
        paddingHorizontal: SIZES.padding * 1.6,
      }}>
      <FlatList data={weekendsList} renderItem={renderItem} />
      <CustomButton
        onPress={handleOnPress}
        type="primary"
        label="Подтвердить"
      />
    </View>
  );
};

export default WeekendsModal;
