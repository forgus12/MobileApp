import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, View, TouchableOpacity, BackHandler } from 'react-native';
import RNRestart from 'react-native-restart';

import { NavigationType } from '../../navigation/MainStackNavigator';
import { removeFromStoreData } from '../../lib/asyncStorageManager';
import { MainLayouts } from '../../layouts';
import { Hr, ModalWindow } from '../../components';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';

import { SecurityModal } from './modals';
import { useLogout } from './hooks/useLogout';
import { ScrollView } from 'react-native-gesture-handler';

interface IProps {
  navigation: NavigationType;
}

const Settings: React.FC<IProps> = ({ navigation }) => {
  const [isVisibleSecurityModal, setIsVisibleSecurityModal] = React.useState<boolean>(false);
  const { fetch, status } = useLogout();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => false);
    return () => backHandler.remove();
  }, []);

  const logOut = () => {
    fetch();
  };

  React.useEffect(() => {
    if (status == 'Success') {
      RNRestart.Restart();
    }
  }, [status]);

  const renderHeader = () => {
    return (
      <Text
        style={{
          fontFamily: FONTFAMILY.title.black,
          fontSize: SIZES.h1,
          color: COLORS.textBlack,
          lineHeight: 29.83,
          marginLeft: SIZES.margin * 1.6,
          marginVertical: SIZES.margin * 2.4,
        }}>
        Настройки
      </Text>
    );
  };

  const mainSettings = () => {
    const card = (
      title: string,
      subtitle: string,
      svg: JSX.Element,
      onPress: any, //!!!!
    ) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPress()}
          style={{
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            width: (SIZES.width - 40) / 2,
          }}>
          <View
            style={{
              marginLeft: SIZES.margin,
              marginVertical: SIZES.margin * 1.6,
            }}>
            {svg}
          </View>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.semibold,
              fontSize: 13,
              lineHeight: 15.51,
              color: COLORS.textBlack,
              marginLeft: SIZES.margin,
              marginBottom: SIZES.margin * 0.8,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body6,
              lineHeight: 14,
              color: COLORS.gray,
              marginLeft: SIZES.margin,
              marginBottom: SIZES.margin * 1.6,
              width: 120,
            }}>
            {subtitle}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          marginHorizontal: SIZES.margin * 1.6,
          marginBottom: SIZES.margin * 2.4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: SIZES.margin * 0.8,
          }}>
          {card(
            'Личные данные',
            'Редактирование личных данных',
            <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <Path
                d="M17 0.333496C7.80001 0.333496 0.333344 7.80016 0.333344 17.0002C0.333344 26.2002 7.80001 33.6668 17 33.6668C26.2 33.6668 33.6667 26.2002 33.6667 17.0002C33.6667 7.80016 26.2 0.333496 17 0.333496ZM17 5.3335C19.7667 5.3335 22 7.56683 22 10.3335C22 13.1002 19.7667 15.3335 17 15.3335C14.2333 15.3335 12 13.1002 12 10.3335C12 7.56683 14.2333 5.3335 17 5.3335ZM17 29.0002C12.8333 29.0002 9.15001 26.8668 7.00001 23.6335C7.05001 20.3168 13.6667 18.5002 17 18.5002C20.3167 18.5002 26.95 20.3168 27 23.6335C24.85 26.8668 21.1667 29.0002 17 29.0002Z"
                fill="#38B8E0"
              />
            </Svg>,
            () => navigation.navigate('SettingsPersonalData'),
          )}
          {card(
            'Моя визитка',
            'Редактирование стиля моей визитки',
            <Svg width="35" height="33" viewBox="0 0 35 33" fill="none">
              <Path
                d="M2.21667 28.7502L4.45 29.6835V14.6335L0.400002 24.4002C-0.283331 26.1002 0.533336 28.0502 2.21667 28.7502ZM34.7167 22.5835L26.45 2.6335C25.9333 1.3835 24.7167 0.616829 23.4333 0.583496C23 0.583496 22.55 0.650163 22.1167 0.833496L9.83334 5.91683C8.58334 6.4335 7.81667 7.6335 7.78334 8.91683C7.76667 9.36683 7.85 9.81683 8.03334 10.2502L16.3 30.2002C16.8167 31.4668 18.05 32.2335 19.35 32.2502C19.7833 32.2502 20.2167 32.1668 20.6333 32.0002L32.9 26.9168C34.6 26.2168 35.4167 24.2668 34.7167 22.5835ZM11.1333 10.5835C10.2167 10.5835 9.46667 9.8335 9.46667 8.91683C9.46667 8.00016 10.2167 7.25016 11.1333 7.25016C12.05 7.25016 12.8 8.00016 12.8 8.91683C12.8 9.8335 12.05 10.5835 11.1333 10.5835ZM7.8 28.9168C7.8 30.7502 9.3 32.2502 11.1333 32.2502H13.55L7.8 18.3502V28.9168Z"
                fill="#38B8E0"
              />
            </Svg>,
            () => navigation.navigate('SettingsBysinessCard'),
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {card(
            'Мои услуги',
            'Редактирование списка оказываемых услуг',
            <Svg width="30" height="34" viewBox="0 0 30 34" fill="none">
              <Path
                d="M27.5 2.8335L25 0.333496L22.5 2.8335L20 0.333496L17.5 2.8335L15 0.333496L12.5 2.8335L10 0.333496L7.5 2.8335L5 0.333496V23.6668H0V28.6668C0 31.4335 2.23333 33.6668 5 33.6668H25C27.7667 33.6668 30 31.4335 30 28.6668V0.333496L27.5 2.8335ZM26.6667 28.6668C26.6667 29.5835 25.9167 30.3335 25 30.3335C24.0833 30.3335 23.3333 29.5835 23.3333 28.6668V23.6668H8.33333V5.3335H26.6667V28.6668Z"
                fill="#38B8E0"
              />
              <Path d="M20 8.66699H10V12.0003H20V8.66699Z" fill="#38B8E0" />
              <Path d="M25 8.66699H21.6667V12.0003H25V8.66699Z" fill="#38B8E0" />
              <Path d="M20 13.667H10V17.0003H20V13.667Z" fill="#38B8E0" />
              <Path d="M25 13.667H21.6667V17.0003H25V13.667Z" fill="#38B8E0" />
            </Svg>,
            () => navigation.navigate('SettingServices'),
          )}
          {card(
            'График работы',
            'Редактирование графика работы',
            <Svg width="31" height="36" viewBox="0 0 31 36" fill="none">
              <Path
                d="M22.3333 18.9998C17.7333 18.9998 14 22.7332 14 27.3332C14 31.9332 17.7333 35.6665 22.3333 35.6665C26.9333 35.6665 30.6667 31.9332 30.6667 27.3332C30.6667 22.7332 26.9333 18.9998 22.3333 18.9998ZM25.0833 31.2498L21.5 27.6665V22.3332H23.1667V26.9832L26.25 30.0665L25.0833 31.2498ZM24 3.99984H18.7C18 2.0665 16.1667 0.666504 14 0.666504C11.8333 0.666504 9.99999 2.0665 9.29999 3.99984H3.99999C2.16666 3.99984 0.666656 5.49984 0.666656 7.33317V32.3332C0.666656 34.1665 2.16666 35.6665 3.99999 35.6665H14.1833C13.2 34.7165 12.4 33.5832 11.8167 32.3332H3.99999V7.33317H7.33332V12.3332H20.6667V7.33317H24V15.7998C25.1833 15.9665 26.3 16.3165 27.3333 16.7998V7.33317C27.3333 5.49984 25.8333 3.99984 24 3.99984ZM14 7.33317C13.0833 7.33317 12.3333 6.58317 12.3333 5.6665C12.3333 4.74984 13.0833 3.99984 14 3.99984C14.9167 3.99984 15.6667 4.74984 15.6667 5.6665C15.6667 6.58317 14.9167 7.33317 14 7.33317Z"
                fill="#38B8E0"
              />
            </Svg>,
            () => navigation.navigate('SettingWorkSchedule'),
          )}
        </View>
      </View>
    );
  };

  const additionalSettings = () => {
    return (
      <View
        style={{
          marginLeft: SIZES.margin * 1.6,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.h5,
            lineHeight: 14.32,
            color: COLORS.gray,
          }}>
          Дополнительные настройки
        </Text>
        <Hr
          style={{
            marginTop: SIZES.margin * 0.8,
          }}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsVisibleSecurityModal(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.padding * 1.6,
          }}>
          <Svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <Path
              d="M9 0L0 4V10C0 15.55 3.84 20.74 9 22C14.16 20.74 18 15.55 18 10V4L9 0ZM9 10.99H16C15.47 15.11 12.72 18.78 9 19.93V11H2V5.3L9 2.19V10.99Z"
              fill="#38B8E0"
            />
          </Svg>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              lineHeight: 17.9,
              color: COLORS.textBlack,
              marginLeft: SIZES.margin * 2.4,
            }}>
            Безопасность
          </Text>
        </TouchableOpacity>
        <Hr />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.padding * 1.6,
          }}
          onPress={() => navigation.navigate('Payment')}>
          <Svg width="20" height="19" viewBox="0 0 20 19" fill="none">
            <Path
              d="M17.83 5.5L15.56 3.23C15.63 2.81 15.74 2.42 15.88 2.08C15.96 1.9 16 1.71 16 1.5C16 0.67 15.33 0 14.5 0C12.86 0 11.41 0.79 10.5 2H5.5C2.46 2 0 4.46 0 7.5C0 10.54 2.5 19 2.5 19H8V17H10V19H15.5L17.18 13.41L20 12.47V5.5H17.83ZM11 7H6V5H11V7ZM14 9C13.45 9 13 8.55 13 8C13 7.45 13.45 7 14 7C14.55 7 15 7.45 15 8C15 8.55 14.55 9 14 9Z"
              fill="#38B8E0"
            />
          </Svg>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              lineHeight: 17.9,
              color: COLORS.textBlack,
              marginLeft: SIZES.margin * 2.4,
            }}>
            Оплата
          </Text>
        </TouchableOpacity>
        <Hr />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.padding * 1.6,
          }}
          onPress={() => navigation.navigate('SupportPage')}>
          <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
            <Path
              d="M19 9.22C19 3.73 14.74 0 10 0C5.31 0 1 3.65 1 9.28C0.4 9.62 0 10.26 0 11V13C0 14.1 0.9 15 2 15H3V8.9C3 5.03 6.13 1.9 10 1.9C13.87 1.9 17 5.03 17 8.9V16H9V18H17C18.1 18 19 17.1 19 16V14.78C19.59 14.47 20 13.86 20 13.14V10.84C20 10.14 19.59 9.53 19 9.22Z"
              fill="#38B8E0"
            />
            <Path
              d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44772 7.55228 9 7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11Z"
              fill="#38B8E0"
            />
            <Path
              d="M13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11Z"
              fill="#38B8E0"
            />
            <Path
              d="M16 8.03C15.52 5.18 13.04 3 10.05 3C7.02 3 3.76 5.51 4.02 9.45C6.49 8.44 8.35 6.24 8.88 3.56C10.19 6.19 12.88 8 16 8.03Z"
              fill="#38B8E0"
            />
          </Svg>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              lineHeight: 17.9,
              color: COLORS.textBlack,
              marginLeft: SIZES.margin * 2.4,
            }}>
            Написать в поддержку
          </Text>
        </TouchableOpacity>
        <Hr />

        <TouchableOpacity
          onPress={logOut}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.padding * 1.6,
          }}>
          <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
            <Path
              d="M15 4L13.59 5.41L16.17 8H6V10H16.17L13.59 12.58L15 14L20 9L15 4ZM2 2H10V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H10V16H2V2Z"
              fill="#38B8E0"
            />
          </Svg>

          <Text
            style={{
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              lineHeight: 17.9,
              color: COLORS.textBlack,
              marginLeft: SIZES.margin * 2.4,
            }}>
            Выйти из аккаунта
          </Text>
        </TouchableOpacity>
        <Hr />
      </View>
    );
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {mainSettings()}
        {additionalSettings()}
      </ScrollView>
      <ModalWindow
        title="Безопасность"
        navigation={navigation}
        isVisible={isVisibleSecurityModal}
        component={SecurityModal}
        onClose={() => setIsVisibleSecurityModal(false)}
        renderLeftButton={() => (
          <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path
              d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressLeftButton={() => setIsVisibleSecurityModal(false)}
      />
    </MainLayouts>
  );
};

export default Settings;
