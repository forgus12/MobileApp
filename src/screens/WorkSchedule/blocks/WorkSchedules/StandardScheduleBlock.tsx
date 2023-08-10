import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { Text, View } from 'react-native';

import { CroppedModalWindow, Hr, ModalWindow, MultiChoiceButton, SelectField } from '../../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../../constants';

import BreakBlock from '../BreakBlock';
import { WeekendsModal, WorkingHoursModal } from '../../modals';

const StandardScheduleBlock: React.FC = () => {
  const { values }: { values: any } = useFormikContext();
  const [isVisibleWeekendsModal, setIsVisibleWeekendsModal] = React.useState<boolean>(false);
  const [isVisibleWorkingHoursModal, setIsVisibleWorkingHoursModal] = React.useState<boolean>(false);

  return (
    <>
      {/* Рабочее время */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleWorkingHoursModal(true)}
          type="line"
          label="Рабочее время:"
          name="standardSchedule.workTime"
          renderContent={data => (
            <Text
              style={{
                fontFamily: FONTFAMILY.title.regular,
                fontSize: SIZES.body2,
                color: COLORS.black,
              }}>
              {data.start} - {data.end}
            </Text>
          )}
        />
      </View>
      <Hr />

      {/* Выходные */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleWeekendsModal(true)}
          type="line"
          label="Выходные:"
          name="standardSchedule.weekends"
          renderContent={data =>
            data.length > 0 ? (
              data.map((weekends: any, index: number) => (
                <Text
                  key={String(index)}
                  style={{
                    fontFamily: FONTFAMILY.title.regular,
                    fontSize: SIZES.body2,
                    color: COLORS.black,
                  }}>
                  {data.length - 1 === index ? weekends.cut + '.' : weekends.cut + '., '}
                </Text>
              ))
            ) : (
              <Text
                style={{
                  fontFamily: FONTFAMILY.title.regular,
                  fontSize: SIZES.body2,
                  color: COLORS.black,
                }}>
                Не указано
              </Text>
            )
          }
        />
      </View>
      <Hr />

      {/* Перерыв */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <FieldArray name="standardSchedule.breaks">
          {({ insert, remove, push }) => (
            <>
              {values.standardSchedule.breaks.length > 0 &&
                values.standardSchedule.breaks.map((_: any, index: number) => (
                  <BreakBlock
                    key={String(index)}
                    index={index}
                    name={`standardSchedule.breaks.${index}`}
                    onDeleteCard={remove}
                  />
                ))}
              <MultiChoiceButton
                label="Добавить перерыв"
                onPress={() =>
                  push({
                    start: '13:00',
                    end: '14:00',
                  })
                }
              />
            </>
          )}
        </FieldArray>
      </View>
      <Hr />

      <ModalWindow
        name="standardSchedule.weekends"
        title="Выходные"
        isVisible={isVisibleWeekendsModal}
        component={WeekendsModal}
        onClose={() => setIsVisibleWeekendsModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="standardSchedule.workTime"
        isVisible={isVisibleWorkingHoursModal}
        component={WorkingHoursModal}
        onClose={() => setIsVisibleWorkingHoursModal(false)}
      />
    </>
  );
};

export default StandardScheduleBlock;
