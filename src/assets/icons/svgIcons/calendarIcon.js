import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CalendarIcon = ({ color }) => {
  return (
    <Svg width="18" height="20" viewBox="0 0 18 20">
      <Path
        d="M14 11H9V16H14V11ZM13 0V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0H13ZM16 18H2V7H16V18Z"
        fill={color}
      />
    </Svg>
  );
};

export default CalendarIcon;
