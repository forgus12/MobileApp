import React, { useEffect } from 'react';
import { View, Text, StatusBar, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { CroppedModalWindow, ModalWindow, ScreenHeader } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import BlockOffer from './blocks/BlockOffer';
import DopBlock from './blocks/DopBlock';
import SettingsOffer from './modals/SettingsOffer';
import InfoFreeMonth from './modals/InfoFreeMonth';
import SharePaymets from './modals/SharePayments';
import { useGetServices } from './hooks/useGetServices';
import { useGetCurrentOrder } from './hooks/useGetCurrentOrder';
import { useSelector } from '../../store';
import { useGetLinkPayment } from './hooks/useGetLinkPayment';
import WebviewModal from './modals/WebviewModal';
import CheckBox from '@react-native-community/checkbox';
import { WrapperAsyncRequest } from '../../layouts';
import messaging from '@react-native-firebase/messaging';

const Payment = ({ navigation }) => {
  const [remoteMessage, setRemoteMessage] = React.useState('');

  const firebaseMessaging = messaging();

  // Подписка на получение пуш-уведомлений
  firebaseMessaging.onMessage(remoteMessage => {
    setRemoteMessage(remoteMessage);
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const { fetch, status } = useGetServices();

  useEffect(() => {
    fetch();
  }, []);

  const linkPayment = useSelector(state => state.payment.linkPayment);

  const payments = useSelector(state => state.payment.payments);

  const { fetch: currentOrder, status: orderStatus } = useGetCurrentOrder();

  useEffect(() => {
    currentOrder();
  }, [remoteMessage]);

  const order = useSelector(state => state.payment.currentOrder);
  const [isVisibleSettingsOfferModal, setIsVisibleSettingsOfferModal] = React.useState(false);
  const [isVisibleSharePayment, setIsVisibleSharePayment] = React.useState(false);
  const [isModalVisibleInfoFreeMonth, setIsModalVisibleInfoFreeMonth] = React.useState(false);

  const [isModalWebviw, setModalWebviw] = React.useState(false);
  const { fetch: getLink, status: linkStatus } = useGetLinkPayment();

  const onPressWeb = offer => {
    getLink(offer);
    setModalWebviw(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
      <StatusBar animated={true} translucent backgroundColor={'#0F98C2'} barStyle={'light-content'} />
      <View style={{ backgroundColor: '#0F98C2', height: 50 }}></View>
      {/* <View style={{ padding: 20 }}></View> */}

      <ScreenHeader
        title="Оплата"
        customTextStyle={{
          fontSize: SIZES.h4,
          fontFamily: FONTFAMILY.title.semibold,
          lineHeight: 17.9,
        }}
        customContainerStyle={{
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
      <WrapperAsyncRequest status={orderStatus}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'space-between',
              paddingTop: SIZES.padding * 1.6,
              paddingHorizontal: SIZES.padding * 1.6,
            }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.title.bold,
                fontSize: SIZES.h2,
                lineHeight: 30,
                color:
                  (order?.data?.pay_status === 'free') === true
                    ? COLORS.text
                    : order?.data?.status === 'Оплачен' || 'Отменен'
                    ? COLORS.text
                    : 'red',
              }}>
              {order?.data?.pay_status === 'expired'
                ? 'Подписка не оформлена'
                : order?.data?.pay_status === 'free'
                ? `Бесплатный период до ${order?.data?.day_expired}`
                : order?.data?.status === 'Оплачен' || 'Отменен'
                ? 'Подписка активна'
                : null}
            </Text>
            <Text
              style={{
                paddingTop: SIZES.padding * 0.8,
                paddingBottom: SIZES.padding * 1.4,
                fontFamily: FONTFAMILY.text.regular,
                fontSize: SIZES.body3,
                color: order?.data?.pay_status === 'expired' ? 'red' : COLORS.text,
              }}>
              {order?.data?.pay_status === 'expired'
                ? 'Клиенты не могут записаться к вам'
                : order?.data?.pay_status === 'free'
                ? 'Подписка позволяет клиентам записываться к вам онлайн.'
                : order?.data?.status === 'Оплачен' || 'Отменен'
                ? `Следующее списание - ${order?.data?.next_pay_in}`
                : null}
            </Text>
            <Text>
              {payments?.is_referal && order?.data?.pay_status === 'free'
                ? 'Вы установили приложение по реферальной ссылке — держите скидку 50% на первый платёж!'
                : null}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding * 1.2,
            }}>
            {order?.data?.pay_status === 'free' || order?.data?.pay_status === 'expired' ? (
              <>
                {status == 'Success' &&
                  payments?.data.map(offer => (
                    <BlockOffer
                      key={offer.id}
                      data={offer}
                      disabled={isCheckboxChecked}
                      onPress={() => onPressWeb(offer.id)}
                      referal={payments?.is_referal}
                    />
                  ))}
              </>
            ) : null}
            {order?.data?.pay_status == 'expired' || order?.data?.pay_status === 'free' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: SIZES.padding * 1.4,
                }}>
                <CheckBox
                  value={isCheckboxChecked}
                  onValueChange={setIsCheckboxChecked}
                  tintColors={true}
                  boxType="square"
                />
                <Text
                  style={{
                    padding: 10,
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.body4,
                    color: COLORS.gray,
                  }}>
                  {order?.data?.pay_status == 'expired' || order?.data?.pay_status === 'free'
                    ? 'Подписка будет продлена автоматически. Вы сможете отменить её в любой момент. Производя оплату вы принимаете '
                    : 'Дата следующего списания увеличивается на остаток дней бесплатного периода. Подписка будет продлена автоматически. Вы сможете отменить её в любой момент. Производя оплату вы принимаете '}{' '}
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
            ) : null}

            <DopBlock
              onPress={() => setIsVisibleSharePayment(true)}
              text={
                'Поделитесь приложением с коллегой - после его оплаты мы подарим вам бонусный месяц подписки. Коллега получит скидку 50% на первый платеж.'
              }
              textTouchable={'ПОДЕЛИТЬСЯ'}
            />

            {(order?.data?.status === 'Оплачен' || 'Отменен') &&
            order?.data?.pay_status !== 'expired' &&
            order?.data?.pay_status !== 'free' ? (
              <>
                <Text
                  style={{
                    paddingTop: SIZES.padding * 0.8,
                    paddingBottom: SIZES.padding * 1.4,
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.body3,
                    color: COLORS.gray,
                  }}>
                  Подписка позволяет клиентам записываться к вам онлайн.
                </Text>
                <Text
                  onPress={() => setIsVisibleSettingsOfferModal(true)}
                  style={{ textDecorationLine: 'underline', color: '#38B8E0', fontSize: SIZES.body2 }}>
                  Настроить подписку
                </Text>
              </>
            ) : null}
          </View>
        </ScrollView>
      </WrapperAsyncRequest>
      <ModalWindow
        title="Настройки подписки"
        navigation={navigation}
        isVisible={isVisibleSettingsOfferModal}
        component={SettingsOffer}
        order={order}
        onClose={() => setIsVisibleSettingsOfferModal(false)}
        renderLeftButton={() => (
          <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path
              d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressLeftButton={() => setIsVisibleSettingsOfferModal(false)}
      />

      <CroppedModalWindow
        type="center"
        navigation={navigation}
        // disabledClickOnBackground
        isVisible={isModalVisibleInfoFreeMonth}
        component={InfoFreeMonth}
        onClose={() => setIsModalVisibleInfoFreeMonth(false)}
      />

      <ModalWindow
        title="Поделиться"
        navigation={navigation}
        isVisible={isVisibleSharePayment}
        component={SharePaymets}
        onClose={() => setIsVisibleSharePayment(false)}
        renderLeftButton={() => (
          <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path
              d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressLeftButton={() => setIsVisibleSharePayment(false)}
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

export default Payment;
