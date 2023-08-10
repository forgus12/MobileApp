import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';

import { COLORS } from '../constants';

interface IProps {
  children: React.ReactNode;
}

const MainLayouts: React.FC<IProps> = ({ children, customContainerStyle }) => {
  return (
    // <View style={{ flex: 1 }}>

    //   <StatusBar animated={true} backgroundColor={'#0F98C2'} hidden={false} translucent={true} barStyle={'default'} />
    //   <SafeAreaView style={{ flex: 1,...customContainerStyle}}>
    //     <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight,  }}>{children}</View>
    //   </SafeAreaView>
    // </View>

    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
        <View style={{ backgroundColor: '#0F98C2', height: 50 }}></View>
        {/* <SafeAreaView style={{ flex: 1}}> */}
        <StatusBar animated={true} backgroundColor={'#0F98C2'} hidden={false} translucent={true} barStyle={'light-content'} />
        {children}
        {/* </SafeAreaView> */}
      </View>
    </View>
  );
};

export default MainLayouts;
