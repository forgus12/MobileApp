import React from 'react';
import { useFormikContext } from 'formik';
import { View, Text, TouchableOpacity } from 'react-native';

import { transformDate } from '../../WorkSchedule/helpers/dateFormat';
import { MiniCalendar } from '../../../components';
import { COLORS, SIZES, FONTFAMILY } from '../../../constants';
import { useFetchSvgByMonth } from '../hooks/useFetchSvgByMonth';
import { getCurrentDate } from '../helpers/dateFormat';
import { RootState, useSelector } from '../../../store';
import Svg, { Circle } from 'react-native-svg';
import { WrapperAsyncRequest } from '../../../layouts';

interface IProps {
  name: string;
  closeModal: () => void;
}

const currentDate = getCurrentDate();

const MiniCalendarModal: React.FC<IProps> = ({ name, closeModal }) => {
  const { setFieldValue } = useFormikContext();
  const { fetch: fetchSvgByMonth, status } = useFetchSvgByMonth();
  const { svgByMonth } = useSelector((s: RootState) => s?.calendar);

  // React.useEffect(() => {
  //   fetchSvgByMonth([currentDate]);
  // }, []);

  // const renderSvg = React.useCallback(
  //   (currentDate: any) =>
  //     svgByMonth?.data && (
  //       <Svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: [{ rotate: '144deg' }] }}>
  //         {svgByMonth?.data[currentDate.dateString]?.map((item: any, index: number) => {
  //           return (
  //             <Circle
  //               r="15.9"
  //               cx="50%"
  //               cy="50%"
  //               fill="none"
  //               strokeWidth={svgByMonth?.data[currentDate.dateString].length - 1 === index ? '5' : '4'}
  //               stroke={item.stroke}
  //               strokeDasharray={`${item.strokeDasharray} 100`}
  //               strokeDashoffset={item.strokeDashoffset}
  //               key={index}
  //             />
  //           );
  //         })}
  //       </Svg>
  //     ),
  //   [svgByMonth?.data],
  // );

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.padding * 0.5,
        paddingHorizontal: SIZES.padding * 0.5,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        height: 380,
        width: '100%',
      }}>
      <MiniCalendar
        minDate={currentDate}
        dayComponent={({ date, state }: any) => {
          return (
            <WrapperAsyncRequest status={status}>
              <TouchableOpacity
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 36,
                  height: 36,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setFieldValue(name, {
                    label: transformDate('RU', date.dateString),
                    value: transformDate('RU', date.dateString),
                  });
                  closeModal();
                }}>
                {/* <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}>
                  {renderSvg(date)}
                </View> */}
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.semibold,
                    fontSize: SIZES.body4,
                    textAlign: 'center',
                    color: state === 'disabled' ? 'gray' : 'black',
                  }}>
                  {date.day}
                </Text>
              </TouchableOpacity>
            </WrapperAsyncRequest>
          );
        }}
      />
    </View>
  );
};

export default MiniCalendarModal;
