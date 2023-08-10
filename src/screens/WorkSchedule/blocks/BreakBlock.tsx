import React from 'react';
import { Text } from 'react-native';

import { CroppedModalWindow, SelectField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { WorkingHoursModal } from '../modals';

interface IProps {
  name: string;
  index: number;
  onDeleteCard: (state: number) => void;
}

const BreakBlock: React.FC<IProps> = ({ name, index, onDeleteCard }) => {
  const [isVisibleWorkingHoursModal, setIsVisibleWorkingHoursModal] =
    React.useState<boolean>(false);

  return (
    <>
      <SelectField
        onPress={() => setIsVisibleWorkingHoursModal(true)}
        onDelete={() => onDeleteCard(index)}
        type="line"
        label="Перерыв:"
        name={name}
        multiChoice={true}
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
        customContainerStyle={{ paddingBottom: SIZES.padding * 1.8 }}
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

export default BreakBlock;
