import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { ScreenHeader, ModalWindow } from '../../components';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useFetchGetSpecialistCard } from './hooks/useFetchGetSpecialistCard';
import BusinessCardBlock from './blocks/BusinessCardBlock';
import { useIsFocused } from '@react-navigation/native';
import { WrapperSlideHandler } from '../Settings/layouts';

interface IProps {
  navigation: NavigationType;
}

const SettingsBysinessCard: React.FC<IProps> = ({ navigation }) => {
  const { fetch, status } = useFetchGetSpecialistCard();
  const isFocused = useIsFocused();
  const { myBusinessCards } = useSelector((s: RootState) => s?.myBusinessCard);
  const CARD_HEIGHT = SIZES.width / (288 / 182) + SIZES.width / 182;
  React.useEffect(() => {
    fetch();
  }, [isFocused]);

  return (
    <WrapperSlideHandler navigation={navigation} screenName="EditBusinessCard">
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
        renderRightButton={() => (
          <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <Path
              d="M0 15.2501V19.0001H3.75L14.81 7.94006L11.06 4.19006L0 15.2501ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressRightButton={() => navigation.navigate('EditBusinessCard')}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: SIZES.margin * 1.6,
        }}>
        <View
          style={{
            height: CARD_HEIGHT,
            width: '100%',
          }}>
          {myBusinessCards![0] ? (
            <BusinessCardBlock url={myBusinessCards![0].url} colors={myBusinessCards![0].colors} />
          ) : null}
        </View>
      </View>
    </WrapperSlideHandler>
  );
};
export default SettingsBysinessCard;
