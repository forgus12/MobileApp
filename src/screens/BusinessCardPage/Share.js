import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { IconShare } from '../../assets/icons/svgIcons/IconShare';
import Icons from '../../assets/icons/svgIcons/Icons';
import { CroppedModalWindow } from '../../components';
import { SIZES } from '../../constants';
import QRCode from 'react-native-qrcode-svg';
import openShare from 'react-native-share';
import ShareModal from '../Vizitka/ShareModal';

const Share = ({ navigation, route }) => {
  const { name, surname, card, avatar, speciality, share } = route.params;

  const [qrCode, setQrCode] = useState('');
  const [shares, setShares] = useState(false);
  const [isVisibleQRShare, setIsVisibleQRShare] = useState(false);

  let svg = useRef(null);

  const getDataURL = () => {
    svg?.toDataURL(callback);
  };

  function callback(dataURL) {
    setQrCode(dataURL);
  }

  React.useEffect(() => {
    if (isVisibleQRShare) {
      setShares(false);
    }
  }, [isVisibleQRShare]);

  React.useEffect(() => {
    if (shares) {
      onShare(shares).then(() => setShares(false));
    }
  }, [shares]);

  const onShare = async data => {
    const shareOptions = {
      title: 'Визитка',
      message: `Добавить визитку\nСпециалист: ${name} ${surname ?? ''}\n${speciality}`,
      url: data == 'onShareQr' ? share?.qr : share?.link,
    };

    try {
      await openShare.open(shareOptions);
      setIsVisibleQRShare(false);
    } catch (error) {
      setShares(false);
    }
  };
  let logoFromFile = require('../../assets/icons/Group581.png');
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <StatusBar animated={true} backgroundColor={card.gradientColor} barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: card.gradientColor,
          paddingTop: 32,
        }}></View>
      <View
        style={{
          // paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: SIZES.padding * 1.6,
          backgroundColor: card.gradientColor,
        }}>
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 16, margin: -10 }}>
            <Icons.ArrowBack color={card.textColor} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...SIZES.h4,
            fontWeight: '600',
            textAlign: 'center',
            color: card.textColor,
          }}>
          {'Поделиться'}
        </Text>
        {!avatar ? (
          <Icons.Avatar styles={{ marginRight: SIZES.padding }} />
        ) : (
          <Image
            style={{
              height: 32,
              width: 32,
              borderRadius: 50,
              marginRight: SIZES.padding,
            }}
            source={{ uri: avatar }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 16,
        }}>
        <Text
          style={{
            fontFamily: 'SFProDisplay-Bold',
            fontSize: SIZES.h4,
            lineHeight: 50,
            color: card.buttonsColor,
          }}>{`${name ?? ''} ${surname ?? ''}`}</Text>
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
          }}
          onPress={() => {
            getDataURL();
            setIsVisibleQRShare(true);
          }}>
          <IconShare fill={card.buttonsColor} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginHorizontal: 4,
          paddingTop: 20,
          height: '50%',
          borderRadius: 12,
          backgroundColor: card.gradientColor,
        }}>
        <Text
          style={{
            ...SIZES.h4,
            fontSize: 13,
            lineHeight: 15.51,
            fontWeight: '700',
            textAlign: 'center',
            paddingBottom: 16,
            color: card.textColor,
          }}
          numberOfLines={1}>
          {speciality?.toUpperCase()}
        </Text>

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
            value={share?.link}
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
      <CroppedModalWindow
        data={share}
        type="bottom"
        navigation={navigation}
        isVisible={isVisibleQRShare}
        setShare={setShares}
        component={ShareModal}
        onClose={() => setIsVisibleQRShare(false)}
      />
    </View>
  );
};

export default Share;
