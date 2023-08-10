import React from 'react';
import { View, Text, TouchableOpacity, TextStyle } from 'react-native';
import { ModalWindow } from '../../../components';
import { SIZES, COLORS, FONTFAMILY } from '../../../constants';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { NewClientModal } from '../modals';
import { AccordionModal } from '../../../layouts';

interface AccordionButtonI {
  label: string;
  customTextStyle?: TextStyle;
  onPress?: () => void;
}

interface IProps {
  navigation: NavigationType;
  closeModal: () => void;
}

const CreateOrImportClients: React.FC<IProps> = ({
  closeModal,
  navigation,
}) => {
  const AccordionButton = ({
    label,
    customTextStyle,
    onPress,
  }: AccordionButtonI) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: SIZES.margin * 0.05,
          width: '100%',
          height: 57,
          backgroundColor: COLORS.backgroundPicker,
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h2,
            color: COLORS.blue,
            ...customTextStyle,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  const [isVisibleNewClientModal, setIsVisibleNewClientModal] =
    React.useState<boolean>(false);

  return (
    <AccordionModal onPress={closeModal}>
      <View style={{ borderRadius: SIZES.radius * 1.6, overflow: 'hidden' }}>
        <AccordionButton
          label="Новый клиент"
          onPress={() => {
            setIsVisibleNewClientModal(true);
          }}
        />
        <AccordionButton
          label="Импорт контактов"
          onPress={() => {
            closeModal();
            navigation.navigate('AddClients');
          }}
        />
      </View>
      <ModalWindow
        title="Новый клиент"
        isVisible={isVisibleNewClientModal}
        component={NewClientModal}
        onClose={() => (setIsVisibleNewClientModal(false), closeModal())}
      />
    </AccordionModal>
  );
};

export default CreateOrImportClients;
