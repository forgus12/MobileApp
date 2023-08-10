import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import Icons from '../../assets/icons/svgIcons/Icons';
import { Hr, ModalAlert } from '../../components';
import { COLORS, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
import { APIStatus } from '../../lib/axiosAPI';
import { useLogOutClient } from './hooks/useLogOutClient';
import LogOutClientModal from './modals/logOutClientModal';
import NewSpecialistModal from './modals/newSpecialistModal';
import RNRestart from 'react-native-restart';
import { MainLayouts } from '../../layouts';

const ProfilePage = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleSpec, setModalVisibleSpec] = useState(false);
  const { fetch, status } = useLogOutClient();
  const userData = useSelector(s => s?.vizitnica?.userData);
  const photo = userData.avatar;

  useEffect(() => {
    if (status === APIStatus.Success) {
      setModalVisible(!isModalVisible);
      RNRestart.Restart();
    }
  }, [status]);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 16, paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, margin: -10 }}>
              <Icons.ArrowBack />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfilePage', {
                  ...userData,
                })
              }
              style={{ padding: 10, margin: -10 }}>
              <Icons.Edit />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: SIZES.padding * 2.4,
              width: 88,
              height: 88,
              borderRadius: 100,
              backgroundColor: COLORS.secondary,
              borderWidth: !!photo ? null : 2,
              borderColor: !!photo ? null : COLORS.primary,
            }}>
            {!!photo ? (
              <Image
                source={{ uri: userData?.avatar }}
                resizeMode="cover"
                resizeMethod="scale"
                style={{ width: '100%', height: '100%', borderRadius: 100 }}
              />
            ) : (
              <Icons.Camera />
            )}
          </View>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.black,
              textAlign: 'center',
              fontWeight: '800',
            }}>
            {userData?.name} {userData?.surname}
          </Text>
          <Text
            style={{
              fontSize: SIZES.h3,
              textAlign: 'center',
              color: COLORS.gray,
            }}>
            {userData?.phone}
          </Text>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Icons.History />
            <TouchableOpacity onPress={() => navigation.navigate('StoryPage')}>
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginLeft: 26,
                }}>
                История записей
              </Text>
            </TouchableOpacity>
          </View>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Icons.SupportGirl />
            <TouchableOpacity onPress={() => navigation.navigate('SupportPage')}>
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginLeft: 26,
                }}>
                Написать в поддержку
              </Text>
            </TouchableOpacity>
          </View>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Icons.NewSpecialist />
              <TouchableOpacity onPress={() => setModalVisibleSpec(true)}>
                <Text
                  style={{
                    fontSize: SIZES.h4,
                    color: COLORS.black,
                    marginLeft: 26,
                  }}>
                  Создать свою визитку
                </Text>
              </TouchableOpacity>
            </View>
            <Hr
              style={{
                marginTop: SIZES.padding * 1.4,
                marginBottom: SIZES.padding * 2.4,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icons.Logout />
            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginLeft: 26,
                }}>
                Выйти из аккаунта
              </Text>
            </TouchableOpacity>
          </View>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <ModalAlert
            name="logOutClient"
            component={LogOutClientModal}
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            labelText="Вы действительно хотите выйти из аккаунта?"
            onPress={() => fetch()}
          />
          <ModalAlert
            name="newSpecialistModal"
            component={NewSpecialistModal}
            isVisible={isModalVisibleSpec}
            onClose={() => setModalVisibleSpec(false)}
            labelText="Создать аккаунт специалиста?"
            navigation={navigation}
          />
        </View>
      </View>
    </MainLayouts>
  );
};

export default ProfilePage;
