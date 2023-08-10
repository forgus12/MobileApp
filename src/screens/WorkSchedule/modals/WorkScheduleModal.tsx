import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useFormikContext, useField } from 'formik';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import { SIZES, COLORS, FONTFAMILY } from '../../../constants';

interface ItemI {
  label: string;
  description: string;
  value: string | number;
}

interface ItemsI {
  item: ItemI;
  index: number;
}

interface IProps {
  name: string;
  data: Array<ItemI>;
  closeModal: () => void;
}

const WorkScheduleModal: React.FC<IProps> = ({ name, closeModal, data }) => {
  const { setFieldValue }: any = useFormikContext();
  const [field, meta] = useField<ItemI>(name);

  const handleOnPress = (item: ItemI) => {
    setFieldValue(name, { label: item.label, value: item.value });
    closeModal();
  };

  const renderItem = ({ item, index }: ItemsI) => {
    return (
      <TouchableOpacity
        onPress={() => handleOnPress(item)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: SIZES.padding * 1.9,
          borderBottomWidth: 1,
          borderColor: COLORS.border,
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginBottom: SIZES.margin * 0.4,
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              lineHeight: 18,
              color: COLORS.text,
            }}>
            {item.label}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body4,
              lineHeight: 16,
              color: COLORS.gray,
            }}>
            {item.description}
          </Text>
        </View>
        {meta.value.value == item.value && (
          <View
            style={{
              marginLeft: SIZES.margin * 1.5,
              width: 18,
              height: 18,
              marginRight: SIZES.margin * 2.2,
            }}>
            <Svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <Path
                d="M6.00002 11.2L1.80002 7L0.400024 8.4L6.00002 14L18 2.00001L16.6 0.600006L6.00002 11.2Z"
                fill="#38B8E0"
              />
            </Svg>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: SIZES.padding * 0.8,
        paddingBottom: SIZES.padding * 1.6,
        paddingHorizontal: SIZES.padding * 1.6,
      }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default WorkScheduleModal;
