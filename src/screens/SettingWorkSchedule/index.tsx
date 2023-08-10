import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { MainLayouts } from '../../layouts';
import { ScreenHeader, CroppedModalWindow } from '../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { NavigationType } from '../../navigation/MainStackNavigator';
import Svg, { Path } from 'react-native-svg';
import { useFetchGetWorkShedule } from './hooks/useFetchGetWorkShedule';
import { RootState, useSelector } from '../../store';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { FlexibleSchedule, SlidingSchedule, StandartSchedule } from './blocks';
import RecordConfirmationModal from '../WorkSchedule/modals/RecordConfirmationModal';
import { WrapperSlideHandler } from '../Settings/layouts';

interface IProps {
  navigation: NavigationType;
}

interface IField {
  label?: string;
  value?: string;
  note?: boolean;
  onpress?: () => void;
  extraLabel?: any;
  extraValue?: string;
}

const SettingWorkSchedule: React.FC<IProps> = ({ navigation }) => {
  const { fetch, status } = useFetchGetWorkShedule();
  const { myWorkShedule } = useSelector((s: RootState) => s?.workShedule);
  const [workSheduleType, setWorkSheduleType] = React.useState<string>('');
  const [isVisibleRecordConfirmationModal, setIsVisibleRecordConfirmationModal] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    fetch();
  }, [isFocused]);

  React.useEffect(() => {
    if (myWorkShedule?.type?.value) {
      myWorkShedule?.type?.value === 'standard'
        ? setWorkSheduleType('standard')
        : myWorkShedule?.type?.value === 'flexible'
        ? setWorkSheduleType('flexible')
        : myWorkShedule?.type?.value === 'sliding'
        ? setWorkSheduleType('sliding')
        : null;
    }
  }, [myWorkShedule?.type?.value]);

  const Field: React.FC<IField> = ({ label, value, note, onpress, extraLabel, extraValue }) => {
    return (
      <View
        style={{
          borderBottomColor: COLORS.border,
          borderBottomWidth: 1,
          paddingVertical: SIZES.padding * 1.6,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginLeft: SIZES.margin * 1.6,
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.h5,
              lineHeight: 14.32,
              color: COLORS.gray,
              marginBottom: SIZES.margin * 0.4,
            }}>
            {label}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.h5,
              lineHeight: 16,
              color: COLORS.textBlack,
            }}>
            {value}
          </Text>
          {extraLabel && (
            <>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h5,
                  lineHeight: 14.32,
                  color: COLORS.gray,
                  marginBottom: SIZES.margin * 0.4,
                  marginTop: SIZES.margin * 1.6,
                }}>
                {extraLabel}
              </Text>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h5,
                  lineHeight: 16,
                  color: COLORS.textBlack,
                }}>
                {extraValue}
              </Text>
            </>
          )}
        </View>
        {note ? (
          <View
            style={{
              justifyContent: 'center',
              marginRight: SIZES.margin * 1.6,
            }}>
            <TouchableOpacity onPress={onpress}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                  fill="#787880"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <WrapperSlideHandler navigation={navigation} screenName="EditWorkShedule">
      <ScreenHeader
        title="График работы"
        customTextStyle={{
          fontSize: SIZES.h4,
          fontFamily: FONTFAMILY.title.semibold,
          lineHeight: 17.9,
        }}
        customContainerStyle={{
          // marginTop: 32,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
          marginBottom: SIZES.margin * 0.8,
        }}
        renderLeftButton={() => (
          <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path
              d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressLeftButton={() => navigation.goBack()}
        renderRightButton={() => (
          <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <Path
              d="M0 15.2501V19.0001H3.75L14.81 7.94006L11.06 4.19006L0 15.2501ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressRightButton={() => navigation.navigate('EditWorkShedule')}
      />
      <ScrollView>
        {/* <Field label="Умный график" value={myWorkShedule?.smart_schedule ? 'Вкл.' : 'Выкл.'} /> */}
        {/* <Field
          label="Подтверждение записи:"
          value={myWorkShedule?.confirmation ? 'Вкл.' : 'Выкл.'}
          note
          onpress={() => setIsVisibleRecordConfirmationModal(true)}
        /> */}
        {/* <View
          style={{
            borderBottomColor: COLORS.border,
            borderBottomWidth: 1,
            paddingVertical: SIZES.padding * 1.6,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginHorizontal: SIZES.margin * 1.6,
            }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.text.regular,
                fontSize: SIZES.h5,
                lineHeight: 14.32,
                color: COLORS.gray,
                marginBottom: SIZES.margin * 0.4,
              }}>
              Ограничение отмены записи:
            </Text>

            <Text
              style={{
                fontFamily: FONTFAMILY.text.regular,
                fontSize: SIZES.h5,
                lineHeight: 16,
                color: COLORS.textBlack,
              }}>
              {myWorkShedule?.cancel_appointment?.value ? 'Вкл.' : 'Выкл.'}
            </Text>
            {myWorkShedule?.cancel_appointment?.value ? (
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h5,
                  lineHeight: 14.32,
                  color: COLORS.gray,
                  marginTop: SIZES.margin * 1.6,
                }}>
                Клиент может отменить запись не позднее, чем за{' '}
                <Text
                  style={{
                    fontFamily: FONTFAMILY.title.black,
                    color: COLORS.textBlack,
                  }}>
                  {myWorkShedule?.cancel_appointment?.label}
                </Text>{' '}
                до визита
              </Text>
            ) : null}
          </View>
        </View> */}
        {/* <Field label="Ограничение новой записи:" value={myWorkShedule?.limit_after?.value ? 'Вкл.' : 'Выкл.'} /> */}
        <Field label="График работы:" value={myWorkShedule?.type?.label} />
        {workSheduleType === 'flexible' && <FlexibleSchedule />}
        {workSheduleType === 'sliding' && <SlidingSchedule />}
        {workSheduleType === 'standard' && <StandartSchedule />}
        <CroppedModalWindow
          type="center"
          isVisible={isVisibleRecordConfirmationModal}
          component={RecordConfirmationModal}
          onClose={() => setIsVisibleRecordConfirmationModal(false)}
        />
      </ScrollView>
    </WrapperSlideHandler>
  );
};

export default SettingWorkSchedule;
