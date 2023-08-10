import React from 'react';
import { View } from 'react-native';

import Loader from '../Loader';

const LoaderModal: React.FC = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 1000,
      }}>
      <Loader />
    </View>
  );
};

export default LoaderModal;
