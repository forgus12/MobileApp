import React from 'react';
import { Modal, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import Icons from '../../assets/icons/svgIcons/Icons';
import { License, PersonalData, Complaint } from '../list';
import { COLORS, FONTS, SIZES } from '../../constants';
import { MainLayouts } from '../../layouts';

const Modals = ({ indexModal = 0, visibleModal = false, setVisibleModal, navigation, item }) => {
  const listModalContent = [
    {
      title: 'Пользовательское соглашение',
      content: License,
    },
    {
      title: 'Персональные данные',
      content: PersonalData,
    },
    {
      title: 'Подтверждение телефона',
      content: PersonalData,
    },
    {
      title: 'Подтверждение телефона',
      content: PersonalData,
    },
    {
      title: 'Выберите причину жалобы',
      content: Complaint,
    },
  ];

  const ModalContent = listModalContent[indexModal].content;
  const ModalTitle = listModalContent[indexModal].title;

  return (
    <Modal visible={visibleModal} animationType="slide">
      <StatusBar
        animated={true}
        backgroundColor={'#0F98C2'}
        hidden={false}
        translucent={true}
        barStyle={'light-content'}
      />
      {Platform.OS == 'ios' ? <View style={{ backgroundColor: '#0F98C2', height: 50 }}></View> : null}
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding * 1.6,
            height: 50,
            borderBottomWidth: 1,
            borderColor: COLORS.lightGray,
          }}>
          <View
            style={{
              flex: 0.1,
              alignItems: 'center',
              marginLeft: -SIZES.padding * 1.4,
            }}>
            <TouchableOpacity onPress={() => setVisibleModal(false)}>
              <Icons.CloseButton color={item?.card?.buttonsColor} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginLeft: -SIZES.padding * 1.4,
            }}>
            <Text
              style={{
                ...SIZES.h4,
                color: item?.color?.colors?.buttonsColor ? item?.color?.colors?.buttonsColor : COLORS.textBlack,
              }}>
              {ModalTitle}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      {/* <MainLayouts> */}
      <ModalContent navigation={navigation} closeModal={setVisibleModal} item={item} />
      {/* </MainLayouts> */}
    </Modal>
  );
};

export default Modals;
