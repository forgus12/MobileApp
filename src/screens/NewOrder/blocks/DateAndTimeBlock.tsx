import React from 'react';
import { isUndefined } from 'lodash';
import { FormikProps, useFormikContext } from 'formik';
import { Text, View } from 'react-native';
import { transformDate } from '../../WorkSchedule/helpers/dateFormat';

import { CroppedModalWindow, ModalWindow, SelectField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import MiniCalendarModal from '../modals/MiniCalendarModal';
import { SelectTimeModal } from '../modals';
import { initialValuesNewOrder, InitialValuesNewOrderI } from '../static/static';
import { getEndTime } from '../helpers/calc';

const DateAndTimeBlock: React.FC = () => {
  const { values, setFieldValue }: FormikProps<InitialValuesNewOrderI> = useFormikContext();
  const [isVisibleDateModal, setIsVisibleDateModal] = React.useState<boolean>(false);
  const [isVisibleSelectTimeModal, setIsVisibleSelectTimeModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isUndefined(values.time) && values.time.start !== '')
      setFieldValue('time.end', getEndTime(values.time.start, values.services));
  }, [values.services]);

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding * 1.6,
        paddingVertical: SIZES.padding * 1.6,
      }}>
      <SelectField
        onPress={() => setIsVisibleDateModal(true)}
        type="date"
        name="date.label"
        label="Дата"
        renderContent={data => {
          return data == '' ? null : (
            <Text
              style={{
                fontFamily: FONTFAMILY.text.regular,
                fontSize: SIZES.body2,
                color: COLORS.text,
              }}>
              {data}
            </Text>
          );
        }}
      />
      <SelectField
        onPress={() => setIsVisibleSelectTimeModal(true)}
        disabled={!values.date || values.services[0].id === null}
        type="select"
        name="time"
        label="Время"
        renderContent={data => {
          return data.start !== '' ? (
            <Text
              style={{
                fontFamily: FONTFAMILY.text.regular,
                fontSize: SIZES.body2,
                color: COLORS.text,
              }}>
              {values.services[0].id === null ? data.start : data.start + '-' + data.end}
            </Text>
          ) : null;
        }}
      />

      <CroppedModalWindow
        type="bottom"
        name="date"
        isVisible={isVisibleDateModal}
        component={MiniCalendarModal}
        onClose={() => setIsVisibleDateModal(false)}
      />
      <ModalWindow
        title="Время"
        isVisible={isVisibleSelectTimeModal}
        component={SelectTimeModal}
        onClose={() => setIsVisibleSelectTimeModal(false)}
      />
    </View>
  );
};

export default DateAndTimeBlock;
