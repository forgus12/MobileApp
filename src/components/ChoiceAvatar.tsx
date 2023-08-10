import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Svg, { Path } from 'react-native-svg';
import { Image, TouchableOpacity, ViewStyle, TextStyle, Text, View } from 'react-native';

import { COLORS, SIZES, FONTFAMILY } from '../constants';
import { CroppedModalWindow } from '../components';
import { AccordionModal } from '../layouts';

export interface PictureI {
  cropRect: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  height: number;
  width: number;
  mime: string;
  modificationDate: string;
  path: string;
  size: number;
}

interface AccordionButtonI {
  label: string;
  customTextStyle?: TextStyle;
  onPress?: () => void;
}

interface IProps {
  onChange: (data: any) => void;
  customContainerStyle?: ViewStyle;
  closeModal?: () => void;
  initialPhoto?: string;
}

const ChoiceAvatar: React.FC<IProps> = ({ onChange, customContainerStyle, closeModal, initialPhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = React.useState<PictureI | null>(null);
  const [isVisibleChoiceAvatarModal, setIsVisibleChoiceAvatarModal] = React.useState<boolean>(false);

  const pickPicture = React.useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      cropperRotateButtonsHidden: true,
      cropperStatusBarColor: '#0F98C2',
      cropperToolbarWidgetColor: '#0F98C2',
      hideBottomControls: true,
      showCropFrame: false,
      showCropGuidelines: false,
      cropperToolbarTitle: 'Редактировать фото',
    })
      .then((image: any) => {
        setSelectedPhoto(image);
        onChange(image);
      })
      .catch(() => {
        console.log('Api call error');
      });
  }, [selectedPhoto]);

  const pickPhoto = React.useCallback(() => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      cropperRotateButtonsHidden: true,
      cropperStatusBarColor: '#0F98C2',
      cropperToolbarWidgetColor: '#0F98C2',
      hideBottomControls: true,
      showCropFrame: false,
      showCropGuidelines: false,
      cropperToolbarTitle: 'Редактировать фото',
    })
      .then((image: any) => {
        setSelectedPhoto(image);
        onChange(image);
      })
      .catch(() => {
        console.log('Api call error');
      });
  }, [selectedPhoto]);

  const AccordionButton = ({ label, customTextStyle, onPress }: AccordionButtonI) => {
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

  const openModal = () => {
    return (
      <AccordionModal onPress={() => setIsVisibleChoiceAvatarModal(false)}>
        <View style={{ borderRadius: SIZES.radius * 1.6, overflow: 'hidden' }}>
          <AccordionButton
            label="Сделать фото"
            onPress={() => {
              pickPhoto();
              setIsVisibleChoiceAvatarModal(false);
            }}
          />
          <AccordionButton
            label="Загрузить из галереи"
            onPress={() => {
              pickPicture();
              setIsVisibleChoiceAvatarModal(false);
            }}
          />
        </View>
      </AccordionModal>
    );
  };

  React.useEffect(() => {
    if (isVisibleChoiceAvatarModal) {
      openModal();
    }
  }, [isVisibleChoiceAvatarModal]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisibleChoiceAvatarModal(true)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: SIZES.margin * 2.4,
          width: 88,
          height: 88,
          borderRadius: SIZES.radius * 8.8,
          backgroundColor: COLORS.secondary,
          borderWidth: !selectedPhoto ? 2 : 0,
          borderColor: COLORS.primary,
          ...customContainerStyle,
        }}>
        {!initialPhoto ? (
          !selectedPhoto ? (
            <Svg width="40" height="40" fill="none" viewBox="0 0 40 40">
              <Path fill="#38B8E0" d="M20 25.333a5.333 5.333 0 100-10.666 5.333 5.333 0 000 10.666z" />
              <Path
                fill="#38B8E0"
                d="M15 3.333l-3.05 3.334H6.667A3.343 3.343 0 003.334 10v20c0 1.833 1.5 3.333 3.333 3.333h26.666c1.834 0 3.334-1.5 3.334-3.333V10c0-1.833-1.5-3.333-3.334-3.333H28.05L25 3.333H15zm5 25A8.336 8.336 0 0111.667 20c0-4.6 3.733-8.333 8.333-8.333S28.334 15.4 28.334 20 24.6 28.333 20 28.333z"
              />
            </Svg>
          ) : (
            <Image
              source={{ uri: selectedPhoto?.path }}
              resizeMode="cover"
              resizeMethod="scale"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: SIZES.radius * 8.8,
              }}
            />
          )
        ) : (
          <Image
            source={{ uri: initialPhoto }}
            resizeMode="cover"
            resizeMethod="scale"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: SIZES.radius * 8.8,
            }}
          />
        )}
      </TouchableOpacity>

      <CroppedModalWindow
        type="bottom"
        name="ChoiceAvatar"
        isVisible={isVisibleChoiceAvatarModal}
        component={openModal}
        onClose={() => setIsVisibleChoiceAvatarModal(false)}
      />
    </>
  );
};

export default ChoiceAvatar;
