import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { View } from 'react-native';

import {
  CroppedModalWindow,
  Hr,
  ModalWindow,
  MultiChoiceButton,
  SelectField,
} from '../../../../components';
import { breakType, weekdaysCount, workdaysCount } from '../../static/static';
import { SIZES } from '../../../../constants';

import WorkDayBlock from '../WorkDayBlock';
import BreakBlock from '../BreakBlock';
import {
  MiniCalendarModal,
  TimePickerModal,
  WorkScheduleModal,
} from '../../modals';

const SlidingScheduleBlock: React.FC = () => {
  const { values }: { values: any } = useFormikContext();
  const [isVisibleWorkDaysCountModal, setIsVisibleWorkDaysCountModal] =
    React.useState<boolean>(false);
  const [isVisibleWeekDaysCountModal, setIsVisibleWeekDaysCountModal] =
    React.useState<boolean>(false);
  const [isVisibleWorkScheduleModal, setIsVisibleWorkScheduleModal] =
    React.useState<boolean>(false);
  const [isVisibleDateModal, setIsVisibleDateModal] =
    React.useState<boolean>(false);

  return (
    <>
      {/* Кол-во рабочих дней */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleWorkDaysCountModal(true)}
          type="line"
          label="Кол-во рабочих дней:"
          name="slidingSchedule.workdaysCount"
        />
      </View>
      <Hr />

      {/* Кол-во выходных после */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleWeekDaysCountModal(true)}
          type="line"
          label="Кол-во выходных после:"
          name="slidingSchedule.weekdaysCount"
        />
      </View>
      <Hr />

      {/* Отсчёт графика с */}
      <View
        style={{
          paddingVertical: SIZES.padding * 1.8,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleDateModal(true)}
          type="line"
          label="Отсчёт графика с:"
          name="slidingSchedule.startFrom.label"
        />
      </View>
      <Hr />

      {/* Рабочее время */}
      {values.slidingSchedule.workdaysCount &&
        Array(Number(values.slidingSchedule.workdaysCount))
          .fill(0)
          .map((item: any, index: number) => {
            return (
              <View key={String(index)}>
                <View
                  style={{
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding * 1.6,
                  }}>
                  <WorkDayBlock
                    name={`slidingSchedule.data.${index}.workTime`}
                    index={index}
                  />
                  {values?.slidingSchedule?.breakType?.value === 'individual' && (
                    <>
                      <View
                        style={{
                          paddingTop: SIZES.padding * 1.8,
                        }}>
                        {/* Перерывы */}
                        <FieldArray
                          name={`slidingSchedule.data.${index}.breaks`}>
                          {({ insert, remove, push }) => (
                            <>
                              {values.slidingSchedule.data[index].breaks
                                .length > 0 &&
                                values.slidingSchedule.data[index].breaks.map(
                                  (item: any, i: number) => (
                                    <BreakBlock
                                      key={String(i)}
                                      name={`slidingSchedule.data.${index}.breaks.${i}`}
                                      index={i}
                                      onDeleteCard={remove}
                                    />
                                  ),
                                )}
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
                </View>
                <Hr />
              </View>
            );
          })}

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
          name="slidingSchedule.breakType"
        />
      </View>
      <Hr />
      {/* Перерыв */}
      {values?.slidingSchedule?.breakType?.value === 'united' && (
        <>
          <View
            style={{
              paddingVertical: SIZES.padding * 1.8,
              paddingHorizontal: SIZES.padding * 1.6,
            }}>
            <FieldArray name="slidingSchedule.breaks">
              {({ insert, remove, push }) => (
                <>
                  {values.slidingSchedule.breaks.length > 0 &&
                    values.slidingSchedule.breaks.map(
                      (_: any, index: number) => (
                        <BreakBlock
                          key={String(index)}
                          name={`slidingSchedule.breaks.${index}`}
                          index={index}
                          onDeleteCard={remove}
                        />
                      ),
                    )}
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
        name="slidingSchedule.breakType"
        title="Тип перерыва"
        data={breakType}
        isVisible={isVisibleWorkScheduleModal}
        component={WorkScheduleModal}
        onClose={() => setIsVisibleWorkScheduleModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="slidingSchedule.workdaysCount"
        title="Кол-во рабочих дней:"
        data={workdaysCount}
        isVisible={isVisibleWorkDaysCountModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleWorkDaysCountModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="slidingSchedule.weekdaysCount"
        title="Кол-во выходных после:"
        data={weekdaysCount}
        isVisible={isVisibleWeekDaysCountModal}
        component={TimePickerModal}
        onClose={() => setIsVisibleWeekDaysCountModal(false)}
      />
      <CroppedModalWindow
        type="bottom"
        name="slidingSchedule.startFrom"
        isVisible={isVisibleDateModal}
        component={MiniCalendarModal}
        onClose={() => setIsVisibleDateModal(false)}
      />
    </>
  );
};

export default SlidingScheduleBlock;
