import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';

import { BackToast, DefaultToast, LoadingToast, RepeatToast } from '../components';

interface IProps {
  children: React.ReactNode;
  offsetBottom?: number;
}

const ToastLayouts: React.FC<IProps> = ({ children, offsetBottom }) => {
  return (
    //@ts-ignore
    <ToastProvider
      placement="bottom"
      offsetBottom={offsetBottom || 0}
      swipeEnabled={false}
      renderType={{
        default: (toast: any) => <DefaultToast {...toast} />,
        loading: (toast: any) => <LoadingToast {...toast} />,
        back: (toast: any) => <BackToast {...toast} />,
        repeat: (toast: any) => <RepeatToast {...toast} />,
      }}>
      {children}
    </ToastProvider>
  );
};

export default ToastLayouts;
