import React from 'react';

import { CroppedModalWindow, SelectField } from '../../../components';

import { MiniCalendarModal } from '../modals';

const WeekendBlock: React.FC = () => {
  const [isVisibleDateStartModal, setIsVisibleDateStartModal] = React.useState<boolean>(false);
  const [isVisibleDateEndModal, setIsVisibleDateEndModal] = React.useState<boolean>(false);
  return (
    <>
      <SelectField
        onPress={() => setIsVisibleDateStartModal(true)}
        type="default"
        label="Дата начала"
        name="weekend.start.label"
        sequentialError
      />
      <SelectField
        onPress={() => setIsVisibleDateEndModal(true)}
        type="default"
        label="Дата окончания"
        name="weekend.end.label"
        sequentialError
      />

      <CroppedModalWindow
        type="bottom"
        name="weekend.start"
        isVisible={isVisibleDateStartModal}
        component={MiniCalendarModal}
        onClose={() => setIsVisibleDateStartModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="weekend.end"
        isVisible={isVisibleDateEndModal}
        component={MiniCalendarModal}
        onClose={() => setIsVisibleDateEndModal(false)}
      />
    </>
  );
};

export default WeekendBlock;
