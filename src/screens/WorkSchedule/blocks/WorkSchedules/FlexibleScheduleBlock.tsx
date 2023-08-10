import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { View } from 'react-native';
import * as Yup from 'yup';

import { Hr, ModalWindow, MultiChoiceButton, SelectField } from '../../../../components';
import { SIZES } from '../../../../constants';

import BreakBlock from '../BreakBlock';
import DayOfWeekBlock from '../DayOfWeekBlock';
import { breakType } from '../../static/static';
import { WorkScheduleModal } from '../../modals';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
  activity_kind: Yup.object().shape({
    label: Yup.string().min(1).required(),
  }),
  title: Yup.string().when('activity_kind', {
    is: (activity_kind: any) => activity_kind.label === 'Другое',
    then: Yup.string().required(),
  }),
});

const FlexibleScheduleBlock: React.FC = () => {
  const { values }: { values: any } = useFormikContext();
  const [isVisibleWorkScheduleModal, setIsVisibleWorkScheduleModal] = React.useState<boolean>(false);

  return (
    <>
      {/* Дни недели */}
      <FieldArray name="flexibleSchedule.data">
        {({ insert, remove, push }) => (
          <>
            {values.flexibleSchedule.data.length > 0 &&
              values.flexibleSchedule.data.map((item: any, index: number) => (
                <View key={String(index)}>
                  <DayOfWeekBlock item={item} name={`flexibleSchedule.data.${index}.workTime`} />
                  {values.flexibleSchedule.breakType.value === 'individual' &&
                    item.workTime.start !== null &&
                    item.workTime.end !== null && (
                      <>
                        <View
                          style={{
                            paddingBottom: SIZES.padding * 1.8,
                            paddingHorizontal: SIZES.padding * 1.6,
                          }}>
                          {/* Перерывы */}
                          <FieldArray name={`flexibleSchedule.data.${index}.breaks`}>
                            {({ insert, remove, push }) => (
                              <>
                                {item.breaks.length > 0 &&
                                  item.breaks.map((item: any, i: number) => (
                                    <BreakBlock
                                      key={String(i)}
                                      name={`flexibleSchedule.data.${index}.breaks.${i}`}
                                      index={i}
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
                      </>
                    )}
                  <Hr />
                </View>
              ))}
          </>
        )}
      </FieldArray>

      {/* Тип перерыва */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleWorkScheduleModal(true)}
          type="line"
          label="Тип перерыва:"
          name="flexibleSchedule.breakType"
        />
      </View>
      <Hr />

      {/* Перерыв */}
      {values.flexibleSchedule.breakType.value === 'united' && (
        <>
          <View
            style={{
              paddingVertical: SIZES.padding * 1.8,
              paddingHorizontal: SIZES.padding * 1.6,
            }}>
            <FieldArray name="flexibleSchedule.breaks">
              {({ insert, remove, push }) => (
                <>
                  {values?.flexibleSchedule?.breaks?.length > 0 &&
                    values.flexibleSchedule.breaks.map((_: any, index: number) => (
                      <BreakBlock
                        key={String(index)}
                        name={`flexibleSchedule.breaks.${index}`}
                        index={index}
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
        </>
      )}

      <ModalWindow
        name="flexibleSchedule.breakType"
        title="Тип перерыва"
        data={breakType}
        isVisible={isVisibleWorkScheduleModal}
        component={WorkScheduleModal}
        onClose={() => setIsVisibleWorkScheduleModal(false)}
      />
    </>
  );
};

export default FlexibleScheduleBlock;
