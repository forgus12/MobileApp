import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants';
import Modal from 'react-native-modal';

const ModalStory = ({
  visible,
  setModalVisible,
  header,
  message,
  rightButtonText,
  leftButtonText,
  navigation,
  id,
  handleDelete,
  status,
  fetchGetHistorySpecialist,
}) => {
  return (
    <View>
      <Modal isVisible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            opacity: 0.8,
            borderRadius: 13,
            width: '100%',
          }}>
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderColor: COLORS.gray,
            }}>
            <Text
              style={{
                ...SIZES.h5,
                color: COLORS.black,
              }}>
              {header}
            </Text>
            <Text
              style={{
                fontFamily: 'SFProDisplay-Semibold',
                fontSize: SIZES.h4,
                lineHeight: 17.9,
                color: COLORS.black,
              }}>
              {message}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'SFProDisplay-Bold',
                fontSize: SIZES.h3,
                lineHeight: 22,
                paddingLeft: 32,
                fontSize: SIZES.h3,
                color: COLORS.blue,
              }}
              onPress={() => setModalVisible(!visible)}>
              {leftButtonText}
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                height: '100%',
              }}></View>
            <Text
              style={{
                fontFamily: 'SFProDisplay-Bold',
                fontSize: SIZES.h3,
                lineHeight: 22,
                color: COLORS.red,
                paddingVertical: 10,
                paddingRight: 32,
              }}
              onPress={() => {
                handleDelete(id);
                setModalVisible(false);
              }}>
              {rightButtonText}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalStory;
