import React from 'react';
import Modal from 'react-native-modal';

import { NavigationType } from '../../navigation/MainStackNavigator';

interface IProps {
  data?: any;
  title?: string;
  type: 'bottom' | 'center';
  isVisible: boolean;
  disabledClickOnBackground?: boolean;
  name?: string;
  component: React.ElementType;
  navigation?: NavigationType;
  onClose?: () => void;
}

const ModalAlert: React.FC<IProps> = ({
  type,
  isVisible,
  disabledClickOnBackground,
  component,
  onClose,
  ...props
}) => {
  const ContentModal = component;

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      style={{
        margin: 0,
        justifyContent: type === 'bottom' ? 'flex-end' : 'center',
        alignItems: 'center',
      }}
      onBackdropPress={!disabledClickOnBackground ? onClose : undefined}>
      <ContentModal closeModal={onClose} {...props} />
    </Modal>
  );
};

export default ModalAlert;
