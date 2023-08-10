import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { COLORS } from '../../../constants';
import { NavigationType } from '../../../navigation/MainStackNavigator';

interface IProps {
  children: React.ReactNode;
  navigation: NavigationType;
  screenName?: string;
}

const WrapperSlideHandler: React.FC<IProps> = ({ children, navigation, screenName }) => {
  return (
    <FlingGestureHandler
      direction={Directions.RIGHT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          navigation.goBack();
        }
      }}>
      {screenName ? (
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              navigation.navigate(screenName);
            }
          }}>
          <View style={{ flex: 1, backgroundColor:'#0F98C2', paddingTop:50}} >
            <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
              
              {children}</View>
            </View>
        </FlingGestureHandler>
      ) : (
        <View style={{ flex: 1, backgroundColor:'#0F98C2', paddingTop:50}} >
        <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>{children}</View>
        </View>
      )}
    </FlingGestureHandler>
  );
};

export default WrapperSlideHandler;
