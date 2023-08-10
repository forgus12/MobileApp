import React from 'react';
import { View, Text } from 'react-native';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { MainLayouts } from '../../layouts';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import { CustomButton } from '../../components';
import { Path, Svg } from 'react-native-svg';
import { useAddedRole } from './hooks/useAddedRole';
import { APIStatus } from '../../lib/axiosAPI';
import { getFromStoreData } from '../../lib/asyncStorageManager';

interface IProps {
  navigation: NavigationType;
}

const PreOnboarding: React.FC<IProps> = ({ navigation }) => {
  const { fetch: addedRole, status } = useAddedRole();
  const [role, setRole] = React.useState<string>('');

  React.useEffect(() => {
    if (status === APIStatus.Success && role == 'specialist') navigation.navigate('BottomTabNavigator');
    else if (status === APIStatus.Success && role == 'client') navigation.navigate('PersonalDataClient');
  }, [status]);

  const handleSubmit = roles => {
    getFromStoreData('phoneNumber').then(phoneNumber => {
      if (phoneNumber) {
        addedRole(phoneNumber, roles);
      }
    });
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: SIZES.width,
        }}>
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
          }}>
          <View style={{ alignItems: 'center', marginBottom: SIZES.height * 0.1, marginTop: 30, marginHorizontal: 16 }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.title.black,
                fontSize: SIZES.h3,
                color: COLORS.text,
                textAlign: 'center',
              }}>
              Как вы будете использовать приложение?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: SIZES.height * 0.12,
            }}>
            <Svg width="300" height="170" viewBox="0 0 194 106" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M41.3148 77.5683H123.046C123.509 77.5683 123.959 77.5202 124.394 77.4289C124.828 77.5202 125.278 77.5683 125.741 77.5683H172.444C175.917 77.5683 178.731 74.8566 178.731 71.5115C178.731 68.1664 175.917 65.4546 172.444 65.4546H167.056C163.583 65.4546 160.769 62.7429 160.769 59.3978C160.769 56.0527 163.583 53.341 167.056 53.341H184.12C187.593 53.341 190.407 50.6292 190.407 47.2841C190.407 43.9391 187.593 41.2273 184.12 41.2273H164.361C167.833 41.2273 170.648 38.5156 170.648 35.1705C170.648 31.8254 167.833 29.1137 164.361 29.1137H106.88C110.352 29.1137 113.167 26.4019 113.167 23.0568C113.167 19.7117 110.352 17 106.88 17H55.6852C52.2129 17 49.3981 19.7117 49.3981 23.0568C49.3981 26.4019 52.2129 29.1137 55.6852 29.1137H19.7593C16.287 29.1137 13.4722 31.8254 13.4722 35.1705C13.4722 38.5156 16.287 41.2273 19.7593 41.2273H42.213C45.6852 41.2273 48.5 43.9391 48.5 47.2841C48.5 50.6292 45.6852 53.341 42.213 53.341H6.28704C2.8148 53.341 0 56.0527 0 59.3978C0 62.7429 2.8148 65.4546 6.28704 65.4546H41.3148C37.8426 65.4546 35.0278 68.1664 35.0278 71.5115C35.0278 74.8566 37.8426 77.5683 41.3148 77.5683ZM187.713 77.5684C191.185 77.5684 194 74.8567 194 71.5116C194 68.1665 191.185 65.4547 187.713 65.4547C184.241 65.4547 181.426 68.1665 181.426 71.5116C181.426 74.8567 184.241 77.5684 187.713 77.5684Z"
                fill="#F0F2F4"
              />
              <Path
                d="M131.333 105.769H77.0352C74.8078 105.769 73 103.857 73 101.501V4.26799C73 1.91206 74.8078 0 77.0352 0H131.341C133.568 0 135.376 1.91206 135.376 4.26799V101.501C135.368 103.857 133.56 105.769 131.333 105.769ZM77.0352 1.70719C75.7036 1.70719 74.6141 2.85955 74.6141 4.26799V101.501C74.6141 102.91 75.7036 104.062 77.0352 104.062H131.341C132.672 104.062 133.762 102.91 133.762 101.501V4.26799C133.762 2.85955 132.672 1.70719 131.341 1.70719H77.0352Z"
                fill="#A4A9AE"
              />
              <Path
                d="M122.859 89.1241H92.3931C91.9492 89.1241 91.5861 88.74 91.5861 88.2705C91.5861 87.801 91.9492 87.4169 92.3931 87.4169H122.859C124.19 87.4169 125.28 86.2645 125.28 84.8561V13.2308C125.28 12.7613 125.643 12.3772 126.087 12.3772C126.531 12.3772 126.894 12.7613 126.894 13.2308V84.8561C126.894 87.212 125.086 89.1241 122.859 89.1241Z"
                fill="#A4A9AE"
              />
              <Path
                d="M82.2809 85.7097C81.837 85.7097 81.4739 85.3256 81.4739 84.8561V13.2308C81.4739 10.8748 83.2816 8.96277 85.5091 8.96277H115.975C116.419 8.96277 116.782 9.34689 116.782 9.81637C116.782 10.2858 116.419 10.67 115.975 10.67H85.5091C84.1775 10.67 83.088 11.8223 83.088 13.2308V84.8561C83.088 85.3341 82.7248 85.7097 82.2809 85.7097Z"
                fill="#A4A9AE"
              />
              <Path
                d="M104.184 100.844C101.973 100.844 100.165 98.9402 100.165 96.5928C100.165 94.2454 101.965 92.3419 104.184 92.3419C106.403 92.3419 108.203 94.2454 108.203 96.5928C108.203 98.9402 106.395 100.844 104.184 100.844ZM104.184 94.0576C102.86 94.0576 101.779 95.2014 101.779 96.6013C101.779 98.0012 102.86 99.1451 104.184 99.1451C105.508 99.1451 106.589 98.0012 106.589 96.6013C106.589 95.2014 105.508 94.0576 104.184 94.0576Z"
                fill="#A4A9AE"
              />
              <Path
                d="M116.338 59.5633C116.128 59.5633 115.926 59.478 115.765 59.3158L97.4854 39.9818C97.1707 39.6489 97.1707 39.1111 97.4854 38.7782C97.8002 38.4453 98.3086 38.4453 98.6234 38.7782L116.911 58.1208C117.226 58.4537 117.226 58.9914 116.911 59.3243C116.749 59.4865 116.548 59.5633 116.338 59.5633V59.5633Z"
                fill="#A4A9AE"
              />
              <Path
                d="M98.1151 53.0441C97.9052 53.0441 97.7035 52.9588 97.5421 52.7966L91.457 46.3605C91.1423 46.0276 91.1423 45.4898 91.457 45.1569C91.7718 44.824 92.2802 44.824 92.5949 45.1569L98.68 51.593C98.9947 51.9259 98.9947 52.4637 98.68 52.7966C98.5267 52.9588 98.3168 53.0441 98.1151 53.0441V53.0441Z"
                fill="#A4A9AE"
              />
            </Svg>
          </View>
          <CustomButton
            type="primary"
            status={status}
            onPress={() => {
              setRole('client');
              handleSubmit('client');
            }}
            label={'Я клиент'}
            customContainerStyle={{
              marginHorizontal: SIZES.margin * 1.6,
            }}
          />
          <Text
            style={{
              marginBottom: SIZES.height * 0.04,
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body3,
              lineHeight: 16,
              color: COLORS.gray,
              textAlign: 'center',
              opacity: 0.7,
              marginTop: 11,
            }}>
            И хочу записываться онлайн
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}></View>
          <CustomButton
            type="primary"
            status={status}
            onPress={() => {
              setRole('specialist');
              handleSubmit('specialist');
            }}
            label={'Я специалист'}
            customContainerStyle={{
              marginHorizontal: SIZES.margin * 1.6,
            }}
          />
          <Text
            style={{
              marginBottom: SIZES.height * 0.04,
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body3,
              lineHeight: 16,
              color: COLORS.gray,
              textAlign: 'center',
              opacity: 0.7,
              marginTop: 11,
            }}>
            И хочу, чтобы ко мне записывались
          </Text>
        </View>
      </View>
    </MainLayouts>
  );
};

export default PreOnboarding;
