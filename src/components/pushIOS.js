import { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIos from '@react-native-community/push-notification-ios';
import { useNavigation } from '@react-navigation/native';

const NotificationController = props => {
  const navigation = useNavigation();

  PushNotification.configure({
    onNotification: notification => {
      if (notification) {
      }
    },
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotificationIos.addNotificationRequest({
        id: remoteMessage.messageId,
        body: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        userInfo: remoteMessage.data,
      });
    });

    return unsubscribe;
  }, []);

  return null;
};

export default NotificationController;
