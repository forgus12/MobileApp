import React from 'react';
import { View, TextStyle, TouchableOpacity, Text } from 'react-native';
import openShare from 'react-native-share';
import { ModalWindow } from '../../../components';
import { useSelector } from '../../../store';

import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import { AccordionModal } from '../../../layouts';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { calendarActionCreators } from '../../../slices/calendarSlice';
import { useFetchDeleteBreak } from '../hooks/useFetchDeleteBreak';
import EditBreakModal from './EditBreakModal';

const OptionsBreak = (data, onClose) => {
  const { fetch, status } = useFetchDeleteBreak();
  const { resetAllOrder } = calendarActionCreators();
  const { breaks } = useSelector(s => s?.calendar);
  const thisBreaks = breaks?.filter(n => {
    if (n?.start == data?.data?.interval[0]) {
      return n;
    }
  });
  const day_id = data?.datas?.id;
  const date = data?.isSelectedDate;
  const single_id = thisBreaks[0] ? thisBreaks[0].single_id : '';
  const AccordionButton = ({ label, customTextStyle, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: SIZES.margin * 0.05,
          width: '100%',
          height: 57,
          backgroundColor: COLORS.backgroundPicker,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h2,
            color: COLORS.blue,
            ...customTextStyle,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const [isEditBreakModal, setIsEditBreakModal] = React.useState(false);
  return (
    <AccordionModal onPress={() => data.closeModal()}>
      <View style={{ borderRadius: SIZES.radius * 1.6, overflow: 'hidden' }}>
        <AccordionButton
          label="Редактировать перерыв"
          onPress={() => {
            setIsEditBreakModal(true);
          }}
        />
        <AccordionButton
          customTextStyle={{ color: COLORS.error }}
          label="Удалить перерыв"
          onPress={() => {
            fetch(day_id, single_id, date);
            resetAllOrder();
          }}
        />
      </View>
      <ModalWindow
        title="Редактирование перерыва"
        data={data}
        breaks={breaks}
        isVisible={isEditBreakModal}
        component={EditBreakModal}
        onClose={() => setIsEditBreakModal(false)}
      />
    </AccordionModal>
  );
};

export default OptionsBreak;
//
