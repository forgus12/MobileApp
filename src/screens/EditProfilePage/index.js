import React from 'react';
import { View, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { ChoiceAvatar, CustomButton, Field, Hr, Navbar, CroppedModalWindow } from '../../components';
import { COLORS, SIZES } from '../../constants';
import MainLayouts from '../../layouts/MainLayouts';
import { useUpdatePersonalData } from './hooks/useUpdatePersonalData';
import { verificationActionCreators } from '../../slices/vizitnicaSlice';
import { APIStatus } from '../../lib/axiosAPI';
import { useUploadImage } from '../PersonalDataClient/hooks/useUploadImage';
import { useGetClientInfo } from '../Vizitnica/hooks/useGetClientInfo';

const EditProfilePage = ({ navigation, route }) => {
  const { updateUserData } = verificationActionCreators();
  const { fetch: uploadImage } = useUploadImage();
  const { updateUserData: updateProfile, status } = useUpdatePersonalData();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const image = useSelector(s => s?.vizitnica?.avatarPicId);
  const userData = useSelector(state => state?.vizitnica?.userData);
  const initialValue = route.params;
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);
  const { fetch: fetchClientInfo } = useGetClientInfo();

  const updateData = (name, value) => {
    let data = { ...userData };
    data[name] = value;
    updateUserData(data);
  };
  const handleSubmitPersonalData = () => {
    const data = {
      name: userData.name,
      surname: userData.surname,
      avatar_id: image?.id,
    };

    if (!image) {
      data.avatar_id = image;
    }
    updateProfile({ ...data, avatar: route.params.avatar });
  };
  React.useEffect(() => {
    let data = { ...userData };
    data['photo'] = selectedPhoto;
    uploadImage(selectedPhoto);
    updateUserData(data);
  }, [selectedPhoto]);

  React.useEffect(() => {
    setIsDisabled(!userData.name);
  }, [userData]);

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      fetchClientInfo();
      navigation.goBack();
    }
  }, [status]);

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, justifyContent: 'space-between', marginHorizontal: 16 }}>
        <View style={{ flex: 1 }}>
          <Navbar header="Редактирование профиля" navigation={navigation} initialValue={initialValue} />
          <Hr style={{ marginLeft: -4, marginTop: 5 }} />
          <View style={{ paddingTop: 24 }}>
            <ChoiceAvatar
              onChange={data => setSelectedPhoto(data)}
              initialPhoto={selectedPhoto?.path ? selectedPhoto?.path : route.params.avatar}
              customContainerStyle={{ borderWidth: route.params.avatar ? 0 : 2 }}
            />
          </View>
          <Field
            label="Имя"
            value={userData.name}
            updateData={updateData}
            field="name"
            showIconReset
            incomingValue={userData.name}
          />
          <Field
            label="Фамилия"
            value={userData.surname}
            updateData={updateData}
            field="surname"
            showIconReset
            incomingValue={userData.surname}
          />
        </View>
        <CustomButton
          label={'Сохранить'}
          status={status}
          disabled={isDisabled}
          customContainerStyle={{
            backgroundColor: COLORS.primary,
            marginBottom: SIZES.padding * 1.6,
            opacity: isDisabled ? 0.5 : 1,
          }}
          customLabelStyle={{ color: COLORS.white }}
          onPress={handleSubmitPersonalData}
        />
      </View>
    </MainLayouts>
  );
};

export default EditProfilePage;
