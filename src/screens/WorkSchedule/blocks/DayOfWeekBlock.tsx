import React from 'react';
import { useFormikContext } from 'formik';
import { Text } from 'react-native';

import { CroppedModalWindow, SelectField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { WorkingHoursModal } from '../modals';

interface TimeI {
  end: string;
  start: string;
}

interface IProps {
  name: string;
  item: {
    breaks: Array<TimeI>;
    day: {
      label: string;
      value: number | string;
    };
    workTime: TimeI;
  };
}

const DayOfWeekBlock: React.FC<IProps> = ({ name, item }) => {
  const { setFieldValue } = useFormikContext();
  const [isVisibleWorkingHoursModal, setIsVisibleWorkingHoursModal] =
    React.useState<boolean>(false);

  return (
    <>
      <SelectField
        onPress={() => setIsVisibleWorkingHoursModal(true)}
        onDelete={() => setFieldValue(name, { start: null, end: null })}
        type="line"
        label={item.day.label}
        name={name}
        multiChoice={item.workTime.start !== null && item.workTime.end !== null}
        renderContent={data =>
          data.start !== null && data.end !== null ? (
            <Text
              style={{
                fontFamily: FONTFAMILY.title.regular,
                fontSize: SIZES.body2,
                color: COLORS.black,
              }}>
              {data.start} - {data.end}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: FONTFAMILY.title.regular,
                fontSize: SIZES.body2,
                color: COLORS.black,
              }}>
              Выходной
            </Text>
          )
        }
        customContainerStyle={{
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.8,
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

export default DayOfWeekBlock;
