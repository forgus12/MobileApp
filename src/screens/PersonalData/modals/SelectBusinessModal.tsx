import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useField, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import { WrapperAsyncRequest } from '../../../layouts';
import { ActivityKindsI } from '../../../slices/personalDataSlice';
import { RootState } from '../../../store';
import { useFetchActivityKinds } from '../hooks/useFetchActivityKinds';
import { ListEmptyComponent, SearchField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

interface ItemI {
  name: string;
  id: number;
}

interface IProps {
  name: string;
  closeModal: () => void;
}

const SelectBusinessModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue }: any = useFormikContext();
  const { fetch: fetchActivityKinds, status } = useFetchActivityKinds();
  const { activityKinds } = useSelector((s: RootState) => s?.personalData);
  const [data, setData] = React.useState<ActivityKindsI[] | undefined>([]);
  const [field, meta] = useField<string>(name);

  const handleOnPress = (item: ItemI) => {
    setFieldValue(name, { label: item.name, value: item.id });
    closeModal();
  };

  const requestSearch = React.useCallback(
    (value: string) => {
      const newData =
        activityKinds?.data && activityKinds?.data.filter(n => n.name.toUpperCase().indexOf(value.toUpperCase()) > -1);
      setData(newData);
    },
    [activityKinds],
  );

  React.useEffect(() => {
    fetchActivityKinds();
  }, []);

  React.useEffect(() => {
    activityKinds?.data && setData(activityKinds?.data);
  }, [activityKinds?.data]);

  const renderItems = React.useCallback(
    ({ item }: { item: ActivityKindsI }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleOnPress(item)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: COLORS.border,
          }}>
          <Text
            style={{
              paddingVertical: SIZES.padding * 1.4,
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              color: COLORS.text,
            }}>
            {item.name}
          </Text>
          {meta.value === item.name && (
            <View
              style={{
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
    },
    [data],
  );

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding * 1.6,
        paddingVertical: SIZES.padding * 1.6,
      }}>
      <WrapperAsyncRequest status={status}>
        <SearchField getValue={requestSearch} />
        <FlatList
          data={data}
          keyExtractor={item => item.name}
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          style={{ marginTop: SIZES.margin }}
        />
      </WrapperAsyncRequest>
    </View>
  );
};

export default SelectBusinessModal;
