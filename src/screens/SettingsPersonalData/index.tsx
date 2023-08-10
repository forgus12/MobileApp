import React from 'react';
import { Text, View, Image } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { useFetchGetMyProfile } from './hooks/useFetchGetMyProfile';
import { RootState, useSelector } from '../../store';
import { useIsFocused } from '@react-navigation/native';
import { ScreenHeader } from '../../components';
import { WrapperSlideHandler } from '../Settings/layouts';
import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: NavigationType;
}

const SettingsPersonalData: React.FC<IProps> = ({ navigation }) => {
  const { fetch: getMyProfile, status } = useFetchGetMyProfile();
  const { myProfile } = useSelector((state: RootState) => state.clients);
  const [adress, setAdress] = React.useState<string>('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (myProfile?.address) {
      setAdress(myProfile.address);
    }
    if (myProfile?.placement) {
      setAdress(`${myProfile.address}, ${myProfile.placement}`);
    }
    if (myProfile?.floor) {
      setAdress(`${myProfile.address}, ${myProfile.placement}, ${myProfile.floor}`);
    }
  }, [myProfile]);

  React.useEffect(() => {
    getMyProfile();
  }, [isFocused]);

  const renderIntro = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingBottom: SIZES.padding * 2.4,
          borderBottomWidth: 1,
          borderColor: COLORS.border,
          marginTop: SIZES.margin * 2.4,
        }}>
        <>
          {myProfile?.avatar?.url ? (
            <Image
              source={{
                uri: myProfile?.avatar.url,
              }}
              resizeMode="cover"
              resizeMethod="scale"
              style={{
                width: 88,
                height: 88,
                borderRadius: SIZES.radius * 8.8,
              }}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                width: 88,
                height: 88,
                borderRadius: SIZES.radius * 8.8,
                backgroundColor: COLORS.secondary,
                marginBottom: SIZES.margin * 1.6,
              }}>
              <Svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                <Path fill="#38B8E0" d="M20 25.333a5.333 5.333 0 100-10.666 5.333 5.333 0 000 10.666z" />
                <Path
                  fill="#38B8E0"
                  d="M15 3.333l-3.05 3.334H6.667A3.343 3.343 0 003.334 10v20c0 1.833 1.5 3.333 3.333 3.333h26.666c1.834 0 3.334-1.5 3.334-3.333V10c0-1.833-1.5-3.333-3.334-3.333H28.05L25 3.333H15zm5 25A8.336 8.336 0 0111.667 20c0-4.6 3.733-8.333 8.333-8.333S28.334 15.4 28.334 20 24.6 28.333 20 28.333z"
                />
              </Svg>
            </View>
          )}
        </>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h4,
            lineHeight: 17.9,
            color: COLORS.textBlack,
            marginBottom: SIZES.margin * 0.4,
          }}>
          {myProfile?.name} {myProfile?.surname}
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h5,
            lineHeight: 14.32,
            color: COLORS.gray,
          }}>
          {myProfile?.activity_kind?.label}
        </Text>
      </View>
    );
  };

  const field = (title: string, text: string) => {
    return (
      <View
        style={{
          marginTop: SIZES.margin * 1.6,
          paddingBottom: SIZES.padding * 1.6,
          borderBottomWidth: 1,
          borderColor: COLORS.border,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h5,
            lineHeight: 14.32,
            color: COLORS.gray,
            marginLeft: SIZES.margin * 1.6,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h5,
            lineHeight: 16,
            color: COLORS.textBlack,
            marginLeft: SIZES.margin * 1.6,
          }}>
          {text}
        </Text>
      </View>
    );
  };

  return (
    <WrapperSlideHandler navigation={navigation} screenName="EditPersonalData">
            
      <ScreenHeader
        title="Личные данные"
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
        onPressRightButton={() => navigation.navigate('EditPersonalData')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderIntro()}
        {field('Надпись в визитке:', `${myProfile?.title}`)}
        {field('О себе (макс. кол-во символов: 100):', `${myProfile?.about ? myProfile?.about : ''}`)}
        {field('Адрес:', `${adress}`)}
      </ScrollView>
    </WrapperSlideHandler>
  );
};

export default SettingsPersonalData;
