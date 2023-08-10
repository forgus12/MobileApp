import React from 'react';
import WebView from 'react-native-webview';

const WebviewModal = ({ navigation, link, closeModal }) => {
  const uri = link;
  return (
    <WebView
      source={{ uri }}
      onNavigationStateChange={navState => {
        if (navState.title == 'https://vizitka.bz') {
          closeModal();
        }
      }}
    />
  );
};

export default WebviewModal;
