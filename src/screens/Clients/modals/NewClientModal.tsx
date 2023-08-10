import * as Yup from 'yup';
import React from 'react';
import { Formik } from 'formik';
import { Platform, ScrollView, StatusBar, Text, View } from 'react-native';

import { ChoiceAvatar, CroppedModalWindow, CustomButton, TextField } from '../../../components';
import { PictureI } from '../../../components/ChoiceAvatar';
import { maskInputPostfix } from '../../../utils/maskInput';
import { APIStatus } from '../../../lib/axiosAPI';
import { SIZES } from '../../../constants';
import { NavigationType } from '../../../navigation/MainStackNavigator';

import { useCreateClient } from '../hooks/useCreateClient';
import { useFetchAllClients } from '../hooks/useFetchAllClients';
import { useFetchUploadImage } from '../hooks/useFetchUploadImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import falseAlertModal from '../../../components/FalseAlertModal';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
  phone_number: Yup.string().min(12).required(),
});

interface IProps {
  navigation: NavigationType;
  closeModal: () => void;
}

const NewClientModal: React.FC<IProps> = ({ closeModal }) => {
  const { fetch: fetchAllClients } = useFetchAllClients();
  const { fetch: createClient, status, error } = useCreateClient();
  const { fetch: uploadImage, status: uploadImageStatus } = useFetchUploadImage();
  const [selectedPhoto, setSelectedPhoto] = React.useState<PictureI | null>(null);
  const formikRef = React.useRef(null);
  const { clientImage } = useSelector((state: RootState) => state.clients);
  const [isVisibleFalseAlert, setIsVisibleFalseAlert] = React.useState(false);

  React.useEffect(() => {
    const formik: any = formikRef.current;
    const { value } = formik?.getFieldProps();

    if (uploadImageStatus === APIStatus.Success) {
      createClient({ ...value, avatar_id: clientImage!.id });
    }
  }, [uploadImageStatus]);

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      closeModal();
      return () => fetchAllClients();
    } else if (error == 'Запись уже существует') {
      setIsVisibleFalseAlert(true);
    }
  }, [status]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        name: '',
        surname: '',
        phone_number: '+7',
        discount: { label: '', value: 0 },
        avatar_id: null,
      }}
      onSubmit={values => {
        if (selectedPhoto) {
          uploadImage(selectedPhoto);
        } else {
          createClient(values);
        }
      }}
      validationSchema={validationSchema}>
      {({ handleSubmit, setFieldValue }) => (
        <ScrollView keyboardShouldPersistTaps="handled">
          <View
            style={{
              paddingHorizontal: SIZES.padding * 1.6,
              paddingVertical: SIZES.padding * 1.6,
              minHeight: SIZES.height - 44,
            }}>
            <View style={{ flex: 1 }}>
              <ChoiceAvatar onChange={data => setSelectedPhoto(data)} />
              <TextField label="Имя" name="name" />
              <TextField label="Фамилия" name="surname" />
              <TextField
                label="Номер телефона"
                name="phone_number"
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
                mask={['+', '7', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
                onChangeText={(name, value: any) => {
                  let validityValue;
                  if (value[3] === '8') {
                    validityValue = value.slice(0, 3);
                  } else {
                    validityValue = value.slice(0);
                  }
                  setFieldValue(name, String(validityValue).replace(/ /g, ''));
                }}
              />
              <TextField
                label="Персональная скидка"
                name="discount.label"
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                indent={2}
                maxLength={5}
                onChangeText={(name, value: any) => {
                  let i = value.slice(0, 3);
                  if (i > 100) {
                    return;
                  }
                  setFieldValue(name, maskInputPostfix(value, ' %'));
                  setFieldValue('discount.value', Number(maskInputPostfix(value, ' %').slice(0, -2)) / 100);
                }}
              />
              <TextField label="Заметки" name="notes" />
            </View>
            <CustomButton onPress={handleSubmit} type="primary" label="Сохранить" status={status} />
            <CroppedModalWindow
              type="center"
              name="save"
              isVisible={isVisibleFalseAlert}
              contentText={'Клиент уже существует'}
              component={falseAlertModal}
              onClose={() => setIsVisibleFalseAlert(false)}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default NewClientModal;
