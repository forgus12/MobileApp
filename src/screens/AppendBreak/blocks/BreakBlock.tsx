import React from 'react';
import { View } from 'react-native';

import { CroppedModalWindow, SelectField } from '../../../components';

import { MiniCalendarModal, TimePickerModal } from '../modals';
import { TimePickerAllTime } from '../static/static';

const BreakBlock: React.FC = () => {
  const [isVisibleDateModal, setIsVisibleDateModal] = React.useState<boolean>(false);
  const [isVisibleTimeStartModal, setIsVisibleTimeStartModal] = React.useState<boolean>(false);
  const [isVisibleTimeEndModal, setIsVisibleTimeEndModal] = React.useState<boolean>(false);

  return (
    <>
      <SelectField
        onPress={() => setIsVisibleDateModal(true)}
        type="default"
        label="Дата"
        name="break.date.label"
        sequentialError
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <SelectField
          onPress={() => setIsVisibleTimeStartModal(true)}
          type="default"
          label="Время начала"
          name="break.time.start"
          sequentialError
          customContainerStyle={{
            width: '49%',
          }}
        />
        <SelectField
          onPress={() => setIsVisibleTimeEndModal(true)}
          type="default"
          label="Время окончания"
          name="break.time.end"
          sequentialError
          customContainerStyle={{
            width: '49%',
          }}
        />
      </View>

      <CroppedModalWindow
        type="bottom"
        name="break.date"
        isVisible={isVisibleDateModal}
        component={MiniCalendarModal}
        onClose={() => setIsVisibleDateModal(false)}
      />
      <CroppedModalWindow
        data={TimePickerAllTime}
        type="bottom"
        name="break.time.start"
        isVisible={isVisibleTimeStartModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleTimeStartModal(false)}
      />
      <CroppedModalWindow
        data={TimePickerAllTime}
        type="bottom"
        name="break.time.end"
        isVisible={isVisibleTimeEndModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleTimeEndModal(false)}
      />
    </>
  );
};

export default BreakBlock;
