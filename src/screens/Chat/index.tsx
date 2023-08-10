import React from 'react';
import { Image, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { MainLayouts } from '../../layouts';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';
import { ScreenHeader, CroppedModalWindow } from '../../components';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ClientChatsMenu from './modals/ClientChatsMenu';

interface IProps {
  navigation: NavigationType;
}

const Chat: React.FC<IProps> = ({ navigation }) => {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);
  const { selectedClient } = useSelector((state: RootState) => state.clients);

  const RenderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.margin * 0.8,
        }}>
        <ScreenHeader
          title={''}
          customTextStyle={{
            fontSize: SIZES.h4,
            fontFamily: FONTFAMILY.title.semibold,
          }}
          onPressLeftButton={() => navigation.goBack()}
          renderLeftButton={() => (
            <View
              style={{
                marginTop: SIZES.margin * 1.2,
              }}>
              <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M11.67 3.8701L9.9 2.1001L0 12.0001L9.9 21.9001L11.67 20.1301L3.54 12.0001L11.67 3.8701Z"
                  fill="#38B8E0"
                />
              </Svg>
            </View>
          )}
          onPressRightButton={() => setIsVisibleModal(true)}
          renderRightButton={() => (
            <View
              style={{
                marginTop: SIZES.margin * 1.1,
              }}>
              <Svg width="20" height="6" viewBox="0 0 16 4" fill="none">
                <Path
                  d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z"
                  fill="#38B8E0"
                />
              </Svg>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      {RenderHeader()}
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.margin * 0.6,
          marginVertical: SIZES.margin * 1.2,
          marginHorizontal: SIZES.margin * 5.6,
        }}>
        <View>
          {selectedClient.avatar ? (
            <Image
              style={{
                width: 42,
                height: 42,
                borderRadius: 99,
                position: 'absolute',
              }}
              source={{ uri: selectedClient.avatar }}
            />
          ) : (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 99,
                position: 'absolute',
              }}>
              <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                <Path
                  d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                  fill="#787880"
                />
              </Svg>
            </View>
          )}
        </View>
        <View>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.bold,
              fontSize: SIZES.h3,
              lineHeight: 20.29,
              marginBottom: SIZES.margin * 0.2,
              marginLeft: SIZES.margin * 6,
              color: COLORS.textBlack,
            }}>
            {selectedClient.name} {selectedClient.surname}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.h5,
              lineHeight: 14.32,
              marginLeft: SIZES.margin * 6,
              color: COLORS.textBlack,
            }}>
            Online
            {/* {selectedClient.phone_number} */}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          backgroundColor: COLORS.backgroundPicker,
        }}></View>
      <CroppedModalWindow
        type="bottom"
        name="confirmedOrder"
        isVisible={isVisibleModal}
        component={ClientChatsMenu}
        onClose={() => setIsVisibleModal(false)}
        navigation={navigation}
      />
    </MainLayouts>
  );
};

export default Chat;
