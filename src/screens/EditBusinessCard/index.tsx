import React from 'react';
import SelectBusinessCardBlock from './blocks';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { ScreenHeader } from '../../components';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { WrapperSlideHandler } from '../Settings/layouts';

interface IProps {
  navigation: NavigationType;
}

const EditBusinessCard: React.FC<IProps> = ({ navigation }) => {
  return (
    <WrapperSlideHandler navigation={navigation}>
      <ScreenHeader
        title="Моя визитка"
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
      <SelectBusinessCardBlock navigation={navigation} />
    </WrapperSlideHandler>
  );
};
export default EditBusinessCard;
