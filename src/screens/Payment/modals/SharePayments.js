import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import openShare from 'react-native-share';
import { IconShare } from '../../../assets/icons/svgIcons/IconShare';
import Icons from '../../../assets/icons/svgIcons/Icons';
import { SIZES, FONTFAMILY, COLORS } from '../../../constants';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useGetSharePayment } from '../hooks/useGetSharePayment';
import { useSelector } from '../../../store';
import { useFetchGetMyProfile } from '../../SettingsBusinessCard/hooks/useFetchGetMyProfile';
import { CroppedModalWindow } from '../../../components';
import ShareModal from '../../Vizitka/ShareModal';
import { ScrollView } from 'react-native-gesture-handler';
import { useCreateSharePayments } from '../hooks/useCreateSharePayments';
import { WrapperAsyncRequest } from '../../../layouts';

const Share = ({ navigation, route }) => {
  let logoFromFile = require('../../../assets/icons/Group581.png');

  const { fetch: getMyProfile } = useFetchGetMyProfile();
  const { myProfile } = useSelector(state => state.clients);
  React.useEffect(() => {
    getMyProfile();
  }, []);

  const [share, setShare] = useState(false);

  const [isVisibleQRShare, setIsVisibleQRShare] = useState(false);

  const { fetch, status } = useGetSharePayment();
  const { fetch: fetchCreate, status: statusCreate } = useCreateSharePayments();

  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    fetchCreate();
  }, []);

  const sharePayment = useSelector(state => state.payment.sharePayment);

  let svg = useRef(null);

  const getDataURL = () => {
    svg?.toDataURL(callback);
  };

  function callback(dataURL) {
    setQrCode(dataURL);
  }
  const onShare = async to => {
    const shareOptions = {
      title: 'Визитка',
      message: `Добавить визитку\nСпециалист: ${myProfile.name} ${myProfile.surname ?? ''}\n${myProfile.title}\n`,
      url: to === 'onShareQr' ? sharePayment?.qr : sharePayment?.url + sharePayment?.hash,
    };

    try {
      await openShare.open(shareOptions);
      setIsVisibleQRShare(false);
    } catch (error) {
      setShare(false);
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    if (share) {
      onShare(share).then(() => setShare(false));
    }
  }, [share]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <WrapperAsyncRequest status={statusCreate}>
        <ScrollView>
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingVertical: SIZES.padding * 0.5,
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              height: '70%',
              width: '100%',
            }}>
            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{ fontSize: SIZES.h2, color: COLORS.p }}>
                  {myProfile?.name} {myProfile?.surname}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  getDataURL();
                  setIsVisibleQRShare(true);
                }}>
                <Svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M12 4L10.58 5.42L8.99 3.83V15H7.01V3.83L5.42 5.42L4 4L8 0L12 4ZM16 9V20C16 21.1 15.1 22 14 22H2C0.89 22 0 21.1 0 20V9C0 7.89 0.89 7 2 7H5V9H2V20H14V9H11V7H14C15.1 7 16 7.89 16 9Z"
                    fill="#435155"
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
              <View
                style={{
                  flex: 1,
                  marginBottom: 8,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: COLORS.backgroundAlert,
                }}>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginVertical: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      paddingVertical: SIZES.padding,
                      fontSize: SIZES.h3,
                      color: 'white',
                      fontFamily: FONTFAMILY.text.semibold,
                    }}>
                    {myProfile?.title}
                  </Text>
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
                    value={sharePayment?.link}
                    size={SIZES.width * 0.82}
                    logo={logoFromFile}
                    logoSize={40}
                    logoBackgroundColor="white"
                    logoMargin="10"
                    quietZone="5"
                    getRef={c => (svg = c)}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
    </View>
  );
};

export default Share;
