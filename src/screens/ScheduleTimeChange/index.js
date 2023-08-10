import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { PaginationCircle, CustomButton, SelectField, MultiChoiceButton, CroppedModalWindow } from '../../components';
import falseAlertModal from '../../components/FalseAlertModal';
import { useChangeSchedule } from './hooks/useChangeSchedule';
import { APIStatus } from '../../lib/axiosAPI';
import { Formik, FieldArray } from 'formik';
import { MainLayouts } from '../../layouts';
import { WorkingHoursModal } from './modals';
import BreakBlock from './blocks/BreakBlock';
import { calendarActionCreators } from '../../slices/calendarSlice';
import { useSelector } from '../../store';
import { getEndTime } from './helpers/calc';
import { ScrollView } from 'react-native-gesture-handler';
import { ScheduledКecordingsModal } from '../AppendBreak/modals';

const ScheduleTimeChange = ({ navigation, navigation: { goBack } }) => {
  const { scheduleDatesChange } = useSelector(state => state.calendar);
  const { fetch, status } = useChangeSchedule();
  const { allOrders, breaks } = useSelector(s => s?.calendar);
  const [workTimeModal, setWorkTimeModal] = React.useState(false);
  const [breakTimeModal, setBreakTimeModal] = React.useState(false);
  const { resetAllOrder, setNotification } = calendarActionCreators();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const [isVisibleFalseAlert, setIsVisibleFalseAlert] = React.useState(false);
  const [massageFalse, setMassageFalse] = React.useState('');
  const [isVisibleScheduledКecordingsModal, setIsVisibleScheduledКecordingsModal] = React.useState(false);
  const [saves, setSaves] = React.useState(null);
  let newData;
  if (breaks[0]) {
    newData = allOrders?.data
      ?.filter(n => {
        return n.date != null && n.status === 'break';
      })
      .map(i => i.interval);
  } else {
    newData = allOrders?.data
      ?.filter(n => {
        return n.date == null && n.status === 'break';
      })
      .map(i => i.interval);
  }

  const breaksTime = newData.map(i => {
    const time = {
      start: i[0],
      end: getEndTime(i.slice(-1).toString(), 15),
    };
    return time;
  });

  const worksTime = {
    start: allOrders.workSchedule[0],
    end: getEndTime(allOrders.workSchedule.slice(-1).toString(), 15),
  };

  const initialValue = {
    breaks: breaksTime,
    workTime: worksTime,
  };

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.navigate('Calendar', { notification: true });
      if (saves === false) setNotification(true);
      return () => resetAllOrder();
    } else if (status === APIStatus.FailureEntry) {
      setMassageFalse('Невозможно внести изменения, т.к. на выбранный промежуток времени есть запланированные записи');
      setIsVisibleFalseAlert(true);
    } else if (status === APIStatus.FailureBreak) {
      setMassageFalse('Указанные перерывы пересекаются. Пожалуйста, измените время.');
      setIsVisibleFalseAlert(true);
    } else if (status === APIStatus.FailureWeekend) {
      setMassageFalse('Указанные перерывы пересекаются. Пожалуйста, измените время.');
      setIsVisibleScheduledКecordingsModal(true);
    }
  }, [status]);

  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 44,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => goBack()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              width: 46,
              height: '100%',
              left: 0,
            }}>
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <Path
                d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
                fill="#38B8E0"
              />
            </Svg>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.bold,
              fontSize: SIZES.h3,
              lineHeight: 18,
              color: COLORS.text,
            }}>
            Изменение графика
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.lightGray,
            paddingBottom: 12,
            marginBottom: prevRoute?.name !== 'Calendar' ? SIZES.padding * 1.6 : null,
          }}>
          {prevRoute?.name !== 'Calendar' ? <PaginationCircle data={[0, 1]} /> : null}
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.padding * 1.1,
              color: COLORS.gray,
              textAlign: 'center',
              marginHorizontal: 32,
              marginTop: prevRoute?.name !== 'Calendar' ? SIZES.padding * 1.6 : null,
            }}>
            Внесите изменение в рабочее время для ранее выбранных дней
          </Text>
        </View>
      </>
    );
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <View style={{ flex: 1 }}>
        {renderHeader()}

        <Formik
          initialValues={initialValue}
          onSubmit={values => {
            fetch({
              dates: scheduleDatesChange,
              workTime: values.workTime,
              breaks: values.breaks[0] ? values.breaks : { start: null, end: null },
              save: saves,
            });
          }}>
          {({ handleSubmit, values, setFieldValue }) => (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, marginTop: SIZES.padding * 2 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      paddingBottom: SIZES.padding * 2,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.border,
                    }}>
                    <View style={{ marginHorizontal: SIZES.padding * 1.6 }}>
                      <SelectField
                        type={'line'}
                        name="workTime"
                        label="Рабочее время:"
                        onPress={() => {
                          setWorkTimeModal(true);
                          if (values?.workTime.start == null && values?.workTime.start == undefined) {
                            setFieldValue('workTime', { start: '10:00', end: '19:00' });
                          }
                        }}
                        onDelete={() => setFieldValue('workTime', { start: null, end: null })}
                        multiChoice
                        renderContent={data => (
                          <Text
                            style={{
                              fontFamily: FONTFAMILY.title.regular,
                              fontSize: SIZES.body2,
                              color: COLORS.black,
                            }}>
                            {data.start !== null && data.start !== undefined ? `${data.start}-${data.end}` : 'Выходной'}
                          </Text>
                        )}
                      />
                    </View>
                  </View>
                  <View>
                    {values.workTime.start && (
                      <FieldArray name="breaks">
                        {({ insert, remove, push }) => (
                          <View style={{ marginTop: SIZES.padding * 1.6 }}>
                            {values.breaks.map((item, index) => (
                              <View
                                key={index}
                                style={{
                                  marginHorizontal: SIZES.padding * 1.6,
                                }}>
                                <BreakBlock key={index} name={`breaks.${index}`} index={index} onDeleteCard={remove} />
                              </View>
                            ))}
                            <View style={{ marginHorizontal: SIZES.padding * 1.6 }}>
                              <MultiChoiceButton
                                label="Добавить перерыв"
                                onPress={() =>
                                  push({
                                    start: '13:00',
                                    end: '14:00',
                                  })
                                }
                              />
                            </View>
                          </View>
                        )}
                      </FieldArray>
                    )}
                  </View>
                </ScrollView>
              </View>
              <View style={{ marginBottom: SIZES.margin * 1.6, paddingHorizontal: SIZES.padding * 1.6 }}>
                <CustomButton
                  status={status}
                  label={'Сохранить'}
                  onPress={handleSubmit}
                  // disabled={JSON.stringify(values) === JSON.stringify(initialValue)}
                />
              </View>
              <CroppedModalWindow
                type="bottom"
                name="workTime"
                title="Кол-во рабочих дней:"
                data={values.workTime}
                isVisible={workTimeModal}
                component={WorkingHoursModal}
                onClose={() => setWorkTimeModal(false)}
              />

              <CroppedModalWindow
                type="bottom"
                name="breaks"
                title="Перерыв:"
                data={values.breaks}
                isVisible={breakTimeModal}
                component={WorkingHoursModal}
                onClose={() => setBreakTimeModal(false)}
              />

              <CroppedModalWindow
                type="center"
                name="save"
                isVisible={isVisibleScheduledКecordingsModal}
                component={ScheduledКecordingsModal}
                saves={setSaves}
                onClose={() => setIsVisibleScheduledКecordingsModal(false)}
              />

              <CroppedModalWindow
                type="center"
                name="save"
                isVisible={isVisibleFalseAlert}
                contentText={massageFalse}
                component={falseAlertModal}
                onClose={() => setIsVisibleFalseAlert(false)}
              />
            </View>
          )}
        </Formik>
      </View>
    </MainLayouts>
  );
};

export default ScheduleTimeChange;
