import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Formik } from 'formik';
import { View, ScrollView } from 'react-native';

import { APIStatus } from '../../lib/axiosAPI';
import { CroppedModalWindow, CustomButton, PaginationCircle, ScreenHeader } from '../../components';
import { MainLayouts } from '../../layouts';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { SIZES } from '../../constants';

import { StaticContentBlock, StandardScheduleBlock, FlexibleScheduleBlock, SlidingScheduleBlock } from './blocks';
import { flexibleSchedule, slidingSchedule, standardSchedule } from './static/static';
import { useCreateWorkShedule } from './hooks/useCreateWorkShedule';
import falseAlertModal from '../../components/FalseAlertModal';

interface IProps {
  navigation: NavigationType;
}

const WorkSchedule: React.FC<IProps> = ({ navigation }) => {
  const { fetch: createWorkShedule, status, error } = useCreateWorkShedule();
  const [isVisibleFalseAlertBreak, setIsVisibleFalseAlertBreak] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.navigate('Calendar');
    } else if (error === 'users.work_schedule.exceptions.specialist.work_schedule_dublicate') {
      setIsVisibleFalseAlertBreak(true);
    }
  }, [status]);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <ScreenHeader
        title="График работы"
        onPressLeftButton={() => navigation.navigate('MyServices')}
        renderLeftButton={() => (
          <Svg width="20" height="14" fill="none" viewBox="0 0 20 14">
            <Path fill="#38B8E0" d="M7 14l1.41-1.41L3.83 8H20V6H3.83l4.59-4.59L7 0 0 7l7 7z" />
          </Svg>
        )}
      />
      <PaginationCircle data={[0, 0, 0, 1]} />
      <ScrollView>
        <Formik
          initialValues={{
            type: {
              label: 'Стандартный',
              value: 'standard',
            },
            smart_schedule: false,
            confirmation: false,
            cancel_appointment: {
              label: '1 ч.',
              value: 60,
            },
            limit_before: {
              label: '1 мес.',
              value: 43800,
            },
            limit_after: {
              label: '1 ч.',
              value: 60,
            },
            // Стандартный график
            standardSchedule: standardSchedule,
            // Гибкий график
            flexibleSchedule: flexibleSchedule,
            // Скользящий график
            slidingSchedule: slidingSchedule,
          }}
          onSubmit={values => {
            createWorkShedule(values);
          }}>
          {({ handleSubmit, values }) => (
            <>
              <View
                style={{
                  paddingTop: SIZES.padding * 1.4,
                  paddingBottom: SIZES.padding * 1.6,
                }}>
                <StaticContentBlock />
                {values.type.value === 'standard' && <StandardScheduleBlock />}
                {values.type.value === 'flexible' && <FlexibleScheduleBlock />}
                {values.type.value === 'sliding' && <SlidingScheduleBlock />}
                <View
                  style={{
                    paddingTop: SIZES.padding * 2.4,
                    paddingHorizontal: SIZES.padding * 1.6,
                  }}>
                  <CustomButton onPress={handleSubmit} type="primary" label="Подтвердить" status={status} />
                </View>
              </View>
            </>
          )}
        </Formik>
        <CroppedModalWindow
          type="center"
          name="save"
          isVisible={isVisibleFalseAlertBreak}
          contentText="Указанные перерывы пересекаются или дублируются"
          component={falseAlertModal}
          onClose={() => setIsVisibleFalseAlertBreak(false)}
        />
      </ScrollView>
    </MainLayouts>
  );
};

export default React.memo(WorkSchedule);
