import React from 'react';
import { Text } from 'react-native';

import { CroppedModalWindow, SelectField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { WorkingHoursModal } from '../modals';

interface IProps {
  name: string;
  index: number;
}

const WorkDayBlock: React.FC<IProps> = ({ name, index }) => {
  const [isVisibleWorkingHoursModal, setIsVisibleWorkingHoursModal] =
    React.useState<boolean>(false);

  return (
    <>
      <SelectField
        onPress={() => setIsVisibleWorkingHoursModal(true)}
        type="line"
        label="Рабочее время:"
        description={`Рабочий день: ${index + 1}`}
        name={name}
        renderContent={data => {
          return (
            <Text
              style={{
                fontFamily: FONTFAMILY.title.regular,
                fontSize: SIZES.body2,
                color: COLORS.black,
              }}>
              {data.start}-{data.end}
            </Text>
          );
        }}
      />
      <CroppedModalWindow
        type="bottom"
        name={name}
        isVisible={isVisibleWorkingHoursModal}
        component={WorkingHoursModal}
        onClose={() => setIsVisibleWorkingHoursModal(false)}
      />
    </>
  );
};

export default WorkDayBlock;
