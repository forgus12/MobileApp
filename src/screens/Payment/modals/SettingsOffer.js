import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native';
import { ModalWindow, ModalAlert } from '../../../components';
import Svg, { Path } from 'react-native-svg';
import CheckBox from '@react-native-community/checkbox';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';
import BlockOffer from '../blocks/BlockOffer';
import UnsubscribeModal from './UnsubscribeModal';
import WebviewModal from './WebviewModal';
import { useGetServices } from '../hooks/useGetServices';
import { useSelector } from '../../../store';
import { useGetLinkPayment } from '../hooks/useGetLinkPayment';
import { useGetCancelPayment } from '../hooks/useGetCancelPayment';

const SettingsOffer = ({ closeModal, navigation, order }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalWebviw, setModalWebviw] = React.useState(false);
  const { fetch: getLink, status: linkStatus } = useGetLinkPayment();
  const { fetch, status } = useGetCancelPayment();

  const payments = useSelector(state => state.payment.payments);
  const linkPayment = useSelector(state => state.payment.linkPayment);
  const onPressWeb = offer => {
    getLink(offer);
    setModalWebviw(true);
  };

  function getTermLabel(term) {
    if (term == 1) {
      return 'месяц';
    } else if (term >= 2 && term <= 4) {
      return 'месяца';
    } else {
      return 'месяцев';
    }
  }

  //${data.price}
  const curentServices = payments?.data.find(service => service.id == order.data.service_id);
  const anotherServices = payments?.data.filter(service => service.id !== order.data.service_id);
  return (
    <View
      style={{
        justifyContent: 'space-between',
        paddingTop: SIZES.padding * 1.6,
        paddingHorizontal: SIZES.padding * 1.6,
      }}>
      <Text
        style={{
          paddingBottom: SIZES.padding * 1.6,
          fontFamily: FONTFAMILY.text.regular,
          fontSize: SIZES.body4,
          color: COLORS.gray,
        }}>
        {`Ваш текущий тариф: ${curentServices?.sale_price}₽/${curentServices?.term} мес, `}
        {curentServices.term == '1'
          ? 'оплата ежемесячно'
          : `оплата ${curentServices.price}₽ раз в ${curentServices.term} ${getTermLabel(curentServices.term)}`}
      </Text>

      {anotherServices.map(offer => (
        <BlockOffer key={offer.id} data={offer} disabled={isCheckboxChecked} onPress={() => onPressWeb(offer.id)} />
      ))}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: SIZES.padding * 1.4,
        }}>
        <CheckBox value={isCheckboxChecked} onValueChange={setIsCheckboxChecked} tintColors={true} boxType="square" />
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.gray,
            padding: 10,
          }}>
          Дата следующего списания увеличивается на остаток дней бесплатного периода. Подписка будет продлена
          автоматически. Вы сможете отменить её в любой момент. Производя оплату вы принимаете{' '}
          <Text
            onPress={() => Linking.openURL('https://vizitka.bz/subscription_terms')}
            style={{ textDecorationLine: 'underline' }}>
            Условия подписки
          </Text>
          {' и '}
          <Text
            onPress={() => Linking.openURL('https://vizitka.bz/cardholder_credentials')}
            style={{ textDecorationLine: 'underline' }}>
            Соглашение о хранении учетных данных владельца карты
          </Text>
        </Text>
      </View>
      {/* <Text
        style={{
          fontFamily: FONTFAMILY.text.regular,
          fontSize: SIZES.body4,
          color: COLORS.gray,
        }}>
        Дата следующего списания увеличивается на остаток дней бесплатного периода. Подписка будет продлена
        автоматически. Вы сможете отменить её в любой момент. Производя оплату вы принимаете{' '}
        <Text
          onPress={() => Linking.openURL('https://vizitka.bz/app_user_agreement')}
          style={{ textDecorationLine: 'underline' }}>
          Условия подписки
        </Text>
        {'.'}
      </Text> */}
      <Text
        onPress={() => setModalVisible(true)}
        style={{
          paddingTop: SIZES.padding * 1.6,
          textDecorationLine: 'underline',
          color: 'red',
          fontSize: SIZES.body2,
        }}>
        Отменить подписку
      </Text>
      <ModalAlert
        name="unsubscribe"
        component={UnsubscribeModal}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onPress={() => {
          fetch(order?.data?.id);
          closeModal();
        }}
      />

      <ModalWindow
        title="Платежные данные"
        navigation={navigation}
        isVisible={isModalWebviw}
        component={WebviewModal}
        link={linkPayment.PaymentURL}
        onClose={() => setModalWebviw(false)}
        renderLeftButton={() => (
          <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path
              d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressLeftButton={() => setModalWebviw(false)}
      />
    </View>
  );
};

export default SettingsOffer;
