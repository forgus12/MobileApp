import React from 'react';
import { View, Text } from 'react-native';
import { ChoiceAvatar, CroppedModalWindow, CustomButton, Field } from '../../components';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { COLORS, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
import { verificationActionCreators } from '../../slices/vizitnicaSlice';
import { RootState } from '../../store';
import { useCreateVizitnica } from './hooks/useCreateVizitnica';
import { useUploadImage } from './hooks/useUploadImage';
import { APIStatus } from '../../lib/axiosAPI';
import MainLayouts from '../../layouts/MainLayouts';
import ErrorModal from '../../components/Modals/ErrorModal';

interface IProps {
  navigation: NavigationType;
}

const PersonalDataClient: React.FC<IProps> = ({ navigation }) => {
  const { fetch, status } = useCreateVizitnica();
  const { fetch: uploadImage } = useUploadImage();
  const { updateUserData } = verificationActionCreators();
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const userData = useSelector((s: RootState) => s?.vizitnica?.userData);
  const image = useSelector((s: RootState) => s?.vizitnica?.avatarPicId);
  const [isErrorModal, setIsErrorModal] = React.useState(false);

  const handleSubmitPersonalData = () => {
    const data = {
      name: userData.name,
      surname: userData.surname,
      avatar_id: image?.id,
    };
    if (!image) {
      data.avatar_id = image;
    }
    fetch({ ...data });
  };

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.navigate('Vizitnica');
    } else if (status === APIStatus.Failure) {
      setIsErrorModal(true);
    }
  }, [status]);

  const updateData = (name: any, value: any) => {
    let data = { ...userData };
    data[name] = value;
    updateUserData(data);
    setIsDisabled(!data.name.length);
  };

  React.useEffect(() => {
    let data = { ...userData };
    data['photo'] = selectedPhoto;
    uploadImage(selectedPhoto);
    updateUserData(data);
  }, [selectedPhoto]);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32, backgroundColor: COLORS.white }}>
      <View
        style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: SIZES.padding * 1.6, paddingTop: 16 }}>
        <View>
          {/* <StatusBar animated={true} backgroundColor={COLORS.primary} barStyle={'light-content'} /> */}
          <Text
            style={{
              alignSelf: 'center',
              marginBottom: SIZES.padding * 2.4,
              fontSize: SIZES.h3,
              fontFamily: 'SFProDisplay-Black',
              lineHeight: 20,
              color: COLORS.black,
            }}>
            {'Обо мне'}
          </Text>
          <ChoiceAvatar onChange={value => setSelectedPhoto(value)} />
          <Field label="Имя" updateData={updateData} field="name" showIconReset />
          <Field label="Фамилия" updateData={updateData} field="surname" showIconReset />
        </View>
        <CustomButton
          onPress={handleSubmitPersonalData}
          status={status}
          type="primary"
          disabled={isDisabled}
          label="Сохранить"
          customContainerStyle={{
            marginBottom: SIZES.margin * 1.6,
          }}
        />
      </View>
      <CroppedModalWindow
        type="center"
        navigation={navigation}
        isVisible={isErrorModal}
        component={ErrorModal}
        onClose={() => setIsErrorModal(false)}
      />
    </MainLayouts>
  );
};

export default PersonalDataClient;
