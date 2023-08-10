import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';

import { NavigationType } from '../../navigation/MainStackNavigator';
import { ScreenHeader, PaginationCircle } from '../../components';
import { MainLayouts } from '../../layouts';
import { SIZES } from '../../constants';

import { FormBlock } from './blocks';

interface IProps {
  navigation: NavigationType;
}

const PersonalData: React.FC<IProps> = ({ navigation }) => {
  const refScrollView = React.useRef<ScrollView | null>(null);

  const onScrollTo = React.useCallback((position: number) => {
    refScrollView.current?.scrollTo({
      y: position,
      animated: true,
    });
  }, []);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={16}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView ref={refScrollView} keyboardShouldPersistTaps="handled">
          <ScreenHeader title="Личные данные" />
          <PaginationCircle data={[1, 0, 0, 0]} />
          <View
            style={{
              paddingTop: SIZES.padding * 2.4,
              paddingBottom: SIZES.padding * 1.6,
            }}>
            <FormBlock navigation={navigation} onScrollTo={onScrollTo} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainLayouts>
  );
};

export default PersonalData;
