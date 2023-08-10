import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const IconShare = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 24" fill="none">
      <Path
        {...props}
        d="M12 4L10.58 5.42L8.99 3.83V15H7.01V3.83L5.42 5.42L4 4L8 0L12 4ZM16 9V20C16 21.1 15.1 22 14 22H2C0.89 22 0 21.1 0 20V9C0 7.89 0.89 7 2 7H5V9H2V20H14V9H11V7H14C15.1 7 16 7.89 16 9Z"
      />
    </Svg>
  );
};
