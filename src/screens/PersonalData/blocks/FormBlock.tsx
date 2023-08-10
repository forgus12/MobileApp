import * as Yup from 'yup';
import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { personalDataActionCreators, userData, UserDataI } from '../../../slices/personalDataSlice';
import { PictureI } from '../../../components/ChoiceAvatar';
import { NavigationType } from '../../../navigation/MainStackNavigator';
import { ChoiceAvatar, ModalWindow } from '../../../components';
import { CustomButton, TextField, CroppedModalWindow, Hr, SelectField } from '../../../components';
import { SIZES } from '../../../constants';

import { SelectBusinessModal, YandexMapModal } from '../modals';
import { useUploadImage } from '../hooks/useUploadImage';
import { APIStatus } from '../../../lib/axiosAPI';
import ErrorModal from '../../../components/Modals/ErrorModal';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
  activity_kind: Yup.object().shape({
    label: Yup.string().min(1).required(),
  }),
  title: Yup.string().when('activity_kind', {
    is: (activity_kind: any) => activity_kind.label === 'Другое',
    then: Yup.string().required(),
  }),
});

interface IProps {
  navigation: NavigationType;
  onScrollTo: (value: number) => void;
}

const FormBlock: React.FC<IProps> = ({ navigation, onScrollTo }) => {
  const userDatas = useSelector(s => s?.vizitnica?.userData);
  const avatarPicId = useSelector(s => s?.vizitnica?.avatarPicId);

  let normalPicId = avatarPicId ? avatarPicId.id : null;
  const userDataI = {
    ...userData,
    avatar: {
      id: normalPicId,
      url: avatarPicId?.url,
    },
    name: userDatas.name,
    surname: userDatas.surname,
  };

  const initialValues: UserDataI = userDataI;
  const { fetch: uploadImage, status } = useUploadImage();
  const [selectedPhoto, setSelectedPhoto] = React.useState<PictureI | null>(null);
  const [isErrorModal, setIsErrorModal] = React.useState(false);

  const { setUserData } = personalDataActionCreators();
  const [isVisibleSelectedBusinessModal, setIsVisibleSelectedBusinessModal] = React.useState<boolean>(false);
  const [isVisibleYandexMapModal, setIsVisibleYandexMapModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.navigate('MyBusinessCard');
    }
  }, [status]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          setUserData(values);
          if (selectedPhoto) {
            uploadImage(selectedPhoto);
          } else {
            navigation.navigate('MyBusinessCard');
          }
        }}
        validationSchema={validationSchema}>
        {({ handleSubmit, values }) => (
          <>
            <ChoiceAvatar
              onChange={data => setSelectedPhoto(data)}
              initialPhoto={userDataI.avatar.url}
              customContainerStyle={{ borderWidth: userDatas?.avatar ? 0 : 2 }}
            />
            <View
              style={{
                paddingHorizontal: SIZES.padding * 1.6,
              }}>
              <TextField label="Имя" name="name" onScrollTo={onScrollTo} />
              <TextField label="Фамилия" name="surname" />
              <SelectField
                onPress={() => setIsVisibleSelectedBusinessModal(true)}
                type="select"
                label="Чем занимаюсь"
                name="activity_kind.label"
              />
              <TextField
                label="Надпись в визитке"
                name="title"
                placeholder={
                  !values.activity_kind.label
                    ? 'Например: Парикмахер-стилист'
                    : values.activity_kind?.label === 'Другое'
                    ? 'Как вас представить клиенту?'
                    : values.activity_kind?.label
                }
                onScrollTo={onScrollTo}
              />
              <TextField
                label="О себе (макс. кол-во символов: 100)"
                name="about"
                placeholder="На чём вы специализируетесь? Какой опыт работы? Есть ли бонусная программа?"
                height={120}
                maxLength={100}
                multiline={true}
                customFieldStyle={{
                  paddingTop: SIZES.padding * 3.4,
                  fontSize: SIZES.body4,
                }}
              />
            </View>
            <Hr
              style={{
                marginTop: SIZES.margin * 1.4,
                marginBottom: SIZES.margin * 2.4,
              }}
            />
            <View
              style={{
                paddingHorizontal: SIZES.padding * 1.6,
              }}>
              <TextField label="Адрес" name="address" multiline={true} maxLength={200} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextField
                  label="Кв. / офис"
                  name="placement"
                  maxLength={5}
                  keyboardType="number-pad"
                  customContainerStyle={{ width: '49%' }}
                />
                <TextField
                  label="Этаж"
                  name="floor"
                  maxLength={5}
                  keyboardType="number-pad"
                  customContainerStyle={{ width: '49%' }}
                />
              </View>
              {/* <CustomButton
                onPress={() => setIsVisibleYandexMapModal(true)}
                type="primary"
                label="Выбрать адрес на карте"
                customContainerStyle={{
                  marginBottom: SIZES.margin * 1.6,
                }}
              /> */}
              <CustomButton onPress={handleSubmit} type="primary" label="Продолжить" status={status} />
            </View>

            <ModalWindow
              title="Чем занимаюсь"
              name="activity_kind"
              component={SelectBusinessModal}
              isVisible={isVisibleSelectedBusinessModal}
              onClose={() => setIsVisibleSelectedBusinessModal(false)}
            />
            <ModalWindow
              title="Выбрать адрес"
              name="address"
              component={YandexMapModal}
              isVisible={isVisibleYandexMapModal}
              onClose={() => setIsVisibleYandexMapModal(false)}
            />
            <CroppedModalWindow
              type="center"
              navigation={navigation}
              isVisible={isErrorModal}
              component={ErrorModal}
              onClose={() => setIsErrorModal(false)}
            />
          </>
        )}
      </Formik>
    </>
  );
};

export default FormBlock;
