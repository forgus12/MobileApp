import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { NavigationType } from '../../navigation/MainStackNavigator';
import { MainLayouts } from '../../layouts';
import { PaginationCircle, ScreenHeader } from '../../components';

import { SelectBusinessCardBlock } from './blocks';

interface IProps {
  navigation: NavigationType;
}

const MyBusinessCard: React.FC<IProps> = ({ navigation }) => {
  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <ScreenHeader
        title="Моя визитка"
        onPressLeftButton={() => navigation.navigate('PersonalData')}
        renderLeftButton={() => (
          <Svg width="20" height="14" fill="none" viewBox="0 0 20 14">
            <Path fill="#38B8E0" d="M7 14l1.41-1.41L3.83 8H20V6H3.83l4.59-4.59L7 0 0 7l7 7z"></Path>
          </Svg>
        )}
      />
      <PaginationCircle data={[0, 1, 0, 0]} />
      <SelectBusinessCardBlock navigation={navigation} />
    </MainLayouts>
  );
};

export default MyBusinessCard;
