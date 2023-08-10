import * as Yup from 'yup';
import React from 'react';
import { Formik } from 'formik';
import { Platform, View } from 'react-native';

import { CroppedModalWindow, CustomButton, SelectField, TextField } from '../../../components';
import { maskInputPostfix } from '../../../utils/maskInput';
import { TimePickerModal } from '../../MyServices/modals';
import { APIStatus } from '../../../lib/axiosAPI';
import { SIZES } from '../../../constants';

import { initialValuesNewService } from '../static/static';
import { useCreateService } from '../hooks/useCreateService';
import { useFetchAllServices } from '../hooks/useFetchAllServices';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(1).required(),
});

interface IProps {
  closeModal: () => void;
}

const NewServiceModal: React.FC<IProps> = ({ closeModal }) => {
  const { fetch: fetchAllServices } = useFetchAllServices();
  const { fetch: createSrivece, status } = useCreateService();
  const [isVisibleTimePickerModal, setIsVisibleTimePickerModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      closeModal();
      return () => fetchAllServices();
    }
  }, [status]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding * 1.6,
        paddingVertical: SIZES.padding * 1.6,
      }}>
      <Formik
        initialValues={initialValuesNewService}
        onSubmit={values => {
          createSrivece(values);
        }}
        validationSchema={validationSchema}>
        {({ handleSubmit, setFieldValue }) => (
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <TextField label="Название услуги" name="title" autoFocus={true} maxLength={100} />
              <View style={{ flexDirection: 'row' }}>
                <TextField
                  label="Стоимость"
                  name="price.label"
                  indent={2}
                  placeholder="0 ₽"
                  maxLength={8}
                  keyboardType={Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'}
                  onChangeText={(name, value) => {
                    setFieldValue(name, maskInputPostfix(value, ' ₽'));
                    setFieldValue('price.value', Number(maskInputPostfix(value, ' ₽').slice(0, -2)));
                  }}
                  customContainerStyle={{
                    marginRight: SIZES.margin * 0.8,
                    width: '49%',
                  }}
                />
                <SelectField
                  onPress={() => setIsVisibleTimePickerModal(true)}
                  type="default"
                  label="Длительность"
                  name="duration.label"
                  placeholder="15 мин"
                  customContainerStyle={{ flex: 1 }}
                />
              </View>
            </View>
            <CustomButton onPress={handleSubmit} type="primary" label="Добавить" status={status} />

            <CroppedModalWindow
              type="bottom"
              name="duration"
              isVisible={isVisibleTimePickerModal}
              component={TimePickerModal}
              onClose={() => setIsVisibleTimePickerModal(false)}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default NewServiceModal;
