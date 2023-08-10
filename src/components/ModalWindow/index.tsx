import React from 'react';
import { isUndefined } from 'lodash';
import { Modal, Platform, View } from 'react-native';

import { NavigationType } from '../../navigation/MainStackNavigator';
import { MainLayouts, ToastLayouts } from '../../layouts';

import HeaderModal from './HeaderModal';
import LoaderModal from './LoaderModal';
import { COLORS } from '../../constants';

interface IProps {
  isVisible: boolean;
  title?: string;
  name?: string;
  data?: any;
  component: React.ElementType;
  onClose?: () => void;
  navigation?: NavigationType;
  numberPhone?: string;
  renderRightButton?: any;
  renderLeftButton?: any;
  onPressLeftButton?: () => void;
  onPressRightButton?: any;
}

const modalWindow: React.FC<IProps> = ({
  isVisible,
  title,
  component,
  onClose,
  renderRightButton,
  renderLeftButton,
  onPressLeftButton,
  onPressRightButton,
  ...props
}) => {
  const ContentModal = component;
  const [isVisibleLoader, setIsVisibleLoader] = React.useState<boolean>(false);

  return (
    <Modal animationType="slide" visible={isVisible}>
      
      {Platform.OS === 'ios' ? <View style={{ padding:25, backgroundColor: '#0F98C2'  }} >
</View> : <View></View>}
            
      <ToastLayouts>
        {/* <MainLayouts> */}
        <HeaderModal
          title={title}
          onClose={onClose}
          renderRightButton={renderRightButton}
          renderLeftButton={renderLeftButton}
          onPressLeftButton={onPressLeftButton}
          onPressRightButton={onPressRightButton}
        />
        {!isUndefined(component) && (
          <ContentModal
            closeModal={onClose}
            onPressRightButton={onPressRightButton}
            onVisibleLoader={(state: boolean) => setIsVisibleLoader(state)}
            {...props}
          />
        )}
        {/* </MainLayouts> */}
        {isVisibleLoader && <LoaderModal />}
      </ToastLayouts>
    </Modal>
  );
};

export default modalWindow;
