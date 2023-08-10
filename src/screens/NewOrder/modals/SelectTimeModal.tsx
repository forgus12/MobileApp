import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Formik, FormikProps, useFormikContext } from 'formik';
import { isEmpty } from 'lodash';
import { useToast } from 'react-native-toast-notifications';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList, View } from 'react-native';

import { RootState, useSelector } from '../../../store';
import { OrderItemBlock } from '../../Calendar/blocks';
import { useFetchOrders } from '../../Calendar/hooks/useFetchOrders';
import { WrapperAsyncRequest } from '../../../layouts';
import { CustomButton, SelectField } from '../../../components';
import { APIStatus } from '../../../lib/axiosAPI';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { COLORS, SIZES } from '../../../constants';

import { getEndTime } from '../helpers/calc';
import { InitialValuesNewOrderI } from '../static/static';
import { checkCurrentTime } from '../../Calendar/helpers/time';

interface IProps {
  closeModal: () => void;
}

const SelectTimeModal: React.FC<IProps> = ({ closeModal }) => {
  const { values, setFieldValue }: FormikProps<InitialValuesNewOrderI> = useFormikContext();
  const { allOrders, breaks } = useSelector((s: RootState) => s?.calendar);
  const { fetch: fetchAllOrders, status } = useFetchOrders();
  const { resetAllOrder } = calendarActionCreators();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [150], []);
  const toast = useToast();
  const [indexTime, setIndexTime] = React.useState<number>(36);
  const getItemLayout = React.useCallback((_: any, index: number) => {
    return { length: 33.1, offset: 33.1 * index, index };
  }, []);
  React.useEffect((): any => {
    fetchAllOrders(values.date.value);
    // return () => resetAllOrder();
  }, [values]);

  React.useEffect(() => {
    setIndexTime(36);
    if (!isEmpty(allOrders)) {
      if (allOrders?.workSchedule[0]) {
        allOrders?.time_interval.map((item, i) => {
          if (checkCurrentTime(item, allOrders?.workSchedule[0])) {
            setIndexTime(i);
          }
          i++;
        });
      }
    }
  }, [allOrders]);

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      if (!isEmpty(toast)) {
        toast.hideAll();

        toast.show('Нажмите на пустое пространство справа от времени, чтобы назначить на него запись', {
          type: 'default',
          duration: 99999999,
        });
      }
    }
  }, [status]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WrapperAsyncRequest status={status}>
        <Formik
          initialValues={{ time: { start: '', end: '' } }}
          onSubmit={values => {
            closeModal();
            setFieldValue('time.start', values.time.start);
            setFieldValue('time.end', values.time.end);
          }}>
          {({ setFieldValue, handleSubmit }) => (
            <>
              <FlatList
                initialScrollIndex={indexTime}
                keyExtractor={(_, index) => String(index)}
                data={allOrders.time_interval}
                getItemLayout={getItemLayout}
                renderItem={({ item }) => (
                  <OrderItemBlock
                    time={item}
                    data={allOrders}
                    breaks={breaks}
                    onPress={() => {
                      if (!isEmpty(toast)) toast.hideAll();

                      bottomSheetRef.current?.snapToIndex(0);
                      setFieldValue('time.start', item);
                      setFieldValue('time.end', getEndTime(item, values.services));
                    }}
                  />
                )}
              />
              <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose={true}
                snapPoints={snapPoints}
                handleStyle={{ display: 'none' }}
                style={{
                  backgroundColor: COLORS.white,
                  borderTopWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: 0,
                }}>
                <View
                  style={{
                    paddingVertical: SIZES.padding * 1.6,
                    paddingHorizontal: SIZES.padding * 1.6,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: SIZES.margin * 0.8,
                    }}>
                    <SelectField
                      type="default"
                      label="Время начала"
                      name="time.start"
                      customContainerStyle={{ width: '49%' }}
                    />
                    <SelectField
                      type="default"
                      label="Время окончания"
                      name="time.end"
                      customContainerStyle={{ width: '49%' }}
                    />
                  </View>
                  <CustomButton onPress={handleSubmit} type="primary" label="Выбрать" />
                </View>
              </BottomSheet>
            </>
          )}
        </Formik>
      </WrapperAsyncRequest>
    </GestureHandlerRootView>
  );
};

export default SelectTimeModal;
