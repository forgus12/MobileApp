import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DeleteIcon = ({ color = '#D64641' }) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20">
      <Path
        d="M11 9H9H5V11H9H11H15V9H11ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
        fill={color}
      />
    </Svg>
  );
};

export default DeleteIcon;