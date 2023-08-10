import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { FormBlock } from './blocks';
import { ScreenHeader } from '../../components';
import { WrapperSlideHandler } from '../Settings/layouts';

interface IProps {
  navigation: NavigationType;
}

const EditPersonalData: React.FC<IProps> = ({ navigation }) => {
  const refScrollView = React.useRef<ScrollView | null>(null);

  const onScrollTo = React.useCallback((position: number) => {
    refScrollView.current?.scrollTo({
      y: position,
      animated: true,
    });
  }, []);

  return (
    <WrapperSlideHandler navigation={navigation}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={16}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView ref={refScrollView} keyboardShouldPersistTaps="handled">
          <ScreenHeader
            title="Редактирование"
            customTextStyle={{
              fontSize: SIZES.h4,
              fontFamily: FONTFAMILY.title.semibold,
              lineHeight: 17.9,
            }}
            customContainerStyle={{
              // marginTop: 32,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.border,
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
          />
          <View
            style={{
              paddingTop: SIZES.padding * 2.4,
              paddingBottom: SIZES.padding * 1.6,
            }}>
            <FormBlock navigation={navigation} onScrollTo={onScrollTo} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperSlideHandler>
  );
};

export default EditPersonalData;
