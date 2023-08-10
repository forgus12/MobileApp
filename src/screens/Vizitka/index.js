import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { CroppedModalWindow, ScreenHeader } from '../../components';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';
import { MainLayouts, WrapperAsyncRequest } from '../../layouts';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import ShareModal from './ShareModal';

import { useFetchGetMyProfile } from '../SettingsBusinessCard/hooks/useFetchGetMyProfile';
import openShare from 'react-native-share';
import { ScrollView } from 'react-native-gesture-handler';

const Vizitka = navigation => {
  const [qrCode, setQrCode] = useState('');
  const [share, setShare] = useState(false);
  const [isVisibleQRShare, setIsVisibleQRShare] = useState(false);

  let svg = useRef(null);

  const getDataURL = () => {
    svg?.toDataURL(callback);
  };

  function callback(dataURL) {
    setQrCode(dataURL);
  }

  //Запрос данных о пользователе
  const { fetch: getMyProfile, status } = useFetchGetMyProfile();
  const { myProfile } = useSelector(state => state.clients);
  React.useEffect(() => {
    getMyProfile();
  }, []);

  React.useEffect(() => {
    if (isVisibleQRShare) {
      setShare(false);
    }
  }, [isVisibleQRShare]);

  React.useEffect(() => {
    if (share) {
      onShare(share).then(() => setShare(false));
    }
  }, [share]);

  const onShare = async data => {
    const shareOptions = {
      title: 'Визитка',
      message: `Добавить визитку\nСпециалист: ${myProfile.name} ${myProfile.surname ?? ''}\n${myProfile.title}`,
      url: data == 'onShareQr' ? myProfile?.share?.qr : myProfile?.share?.link,
    };

    try {
      await openShare.open(shareOptions);
      setIsVisibleQRShare(false);
    } catch (error) {
      setShare(false);
      console.log(error, 'setShareErr');
    }
  };
  let logoFromFile = require('../../assets/icons/Group581.png');
  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <ScrollView>
        <ScreenHeader
          title="Визитка"
          customTextStyle={{
            fontSize: SIZES.h1,
            lineHeight: 29.83,
          }}
          customContainerStyle={{
            alignItems: 'flex-start',
            marginHorizontal: SIZES.margin * 1.6,
            marginTop: SIZES.margin * 2.5,
          }}
        />
        <View style={{ paddingLeft: 16 }}>
          <Text style={{ fontSize: SIZES.body1, color: COLORS.gray }}>
            Раздел в разработке. Скоро вы сможете делиться вашей визиткой с клиентами
          </Text>
        </View>
        <WrapperAsyncRequest status={status}>
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingVertical: SIZES.padding * 0.5,
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              height: '70%',
              width: '100%',
            }}>
            <View style={styles.header}>
              <View>
                <Text style={styles.descriptionText}>
                  {myProfile?.name} {myProfile?.surname}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  getDataURL();
                  setIsVisibleQRShare(true);
                }}
                style={{
                  padding: SIZES.padding,
                }}>
                <Svg width="26" height="34" viewBox="0 0 16 22" fill="none">
                  <Path
                    d="M12 4L10.58 5.42L8.99 3.83V15H7.01V3.83L5.42 5.42L4 4L8 0L12 4ZM16 9V20C16 21.1 15.1 22 14 22H2C0.89 22 0 21.1 0 20V9C0 7.89 0.89 7 2 7H5V9H2V20H14V9H11V7H14C15.1 7 16 7.89 16 9Z"
                    fill="#38B8E0"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginHorizontal: 10,
              }}>
              <LinearGradient
                colors={['#45BAE1', '#0F98C2']}
                style={{
                  flex: 1,
                  marginBottom: 8,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderRadius: 12,
                }}>
                <View style={styles.headerQr}>
                  <Text style={styles.descriptionQr}>{myProfile?.title ? myProfile?.title.toUpperCase() : ''}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    padding: 8,
                    borderWidth: 8,
                    borderColor: 'white',
                    marginBottom: 8,
                  }}>
                  <QRCode
                    value={myProfile?.share?.link}
                    size={SIZES.width * 0.82}
                    logo={logoFromFile}
                    logoSize={40}
                    logoBackgroundColor="white"
                    logoMargin="10"
                    quietZone="5"
                    getRef={c => (svg = c)}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        </WrapperAsyncRequest>
        <CroppedModalWindow
          data={myProfile}
          type="bottom"
          navigation={navigation}
          isVisible={isVisibleQRShare}
          setShare={setShare}
          component={ShareModal}
          onClose={() => setIsVisibleQRShare(false)}
        />
      </ScrollView>
    </MainLayouts>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 16,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  descriptionQr: {
    paddingVertical: SIZES.padding,
    fontSize: SIZES.h3,
    color: 'white',
    fontFamily: FONTFAMILY.text.semibold,
  },

  headerQr: {
    flex: 1,
    // marginVertical: ,
    // paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontFamily: FONTFAMILY.text.regular,
    color: COLORS.textBlack,
    fontSize: SIZES.h4,
  },

  descriptionText: {
    fontSize: SIZES.h2,
    color: COLORS.primary,
  },
});

export default Vizitka;
