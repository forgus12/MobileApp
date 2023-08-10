import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Restore = ({ color = '#38B8E0' }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none">
      <Path
        d="M8 4V0L3 5L8 10V6C11.31 6 14 8.69 14 12C14 15.31 11.31 18 8 18C4.69 18 2 15.31 2 12H0C0 16.42 3.58 20 8 20C12.42 20 16 16.42 16 12C16 7.58 12.42 4 8 4Z"
        fill={color}
      />
    </Svg>
  );
};

export default Restore;
