import React from 'react';
import { Text, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationType } from '../../navigation/MainStackNavigator';
import { ScreenHeader, TextField, CustomButton } from '../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';
import Svg, { Circle, Path } from 'react-native-svg';
import { Formik } from 'formik';
import { maskInputPostfix } from '../../utils/maskInput';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useFetchUpdateClientsData } from './hooks';
import { APIStatus } from '../../lib/axiosAPI';
import { clientActionCreators } from '../../slices/clientsSlice';
import { MainLayouts } from '../../layouts';

interface IProps {
  navigation: NavigationType;
}

const EditClientData: React.FC<IProps> = ({ navigation }) => {
  const { selectedClient } = useSelector((state: RootState) => state.clients);
  const { fetch, status } = useFetchUpdateClientsData();
  const { setSelectedClient } = clientActionCreators();

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      navigation.goBack();
    }
  }, [status]);

  const renderHeader = () => {
    return (
      <ScreenHeader
        title={'Редактирование данных'}
        customTextStyle={{
          fontSize: SIZES.h4,
          fontFamily: FONTFAMILY.title.semibold,
        }}
        customContainerStyle={{
          borderBottomWidth: 1,
          borderColor: COLORS.border,
        }}
        renderLeftButton={() => (
          <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path
              d="M11.67 1.8701L9.9 0.100098L0 10.0001L9.9 19.9001L11.67 18.1301L3.54 10.0001L11.67 1.8701Z"
              fill="#38B8E0"
            />
          </Svg>
        )}
        onPressLeftButton={() => navigation.goBack()}
      />
    );
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={32}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
        }}>
        {renderHeader()}
        <View
          style={{
            alignItems: 'center',
            marginTop: SIZES.margin * 2.4,
          }}>
          {selectedClient.avatar ? (
            <Image
              source={{ uri: selectedClient.avatar }}
              style={{
                width: 88,
                height: 88,
                borderRadius: 50,
              }}
            />
          ) : (
            <View
              style={{
                width: 88,
                height: 88,
                borderRadius: 50,
              }}>
              <Svg width="87" height="88" viewBox="0 0 42 42" fill="none">
                <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                <Path
                  d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                  fill="#787880"
                />
              </Svg>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: SIZES.margin * 1.6,
            marginTop: SIZES.margin * 2.4,
          }}>
          <Formik
            initialValues={{
              name: selectedClient.name,
              surname: selectedClient.surname,
              full_name: selectedClient.name + ' ' + selectedClient.surname,
              phone_number: selectedClient.phone_number,
              discount:
                selectedClient!.discount!.value === 0
                  ? {
                      label: '',
                      value: selectedClient!.discount!.value,
                    }
                  : {
                      label: `${selectedClient!.discount!.label} %`,
                      value: selectedClient!.discount!.value,
                    },
              notes: null,
              id: selectedClient.id,
              avatar: selectedClient.avatar,
              type: selectedClient.type,
            }}
            onSubmit={values => {
              setSelectedClient({
                ...values,
                discount: { label: values.discount.label.slice(0, -2), value: values.discount.value },
              });
              fetch(values);
            }}>
            {({ handleSubmit, setFieldValue }) => (
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  <TextField label="Имя" name="name" />
                  <TextField label="Фамилия" name="surname" />
                  <TextField
                    label="Номер телефона"
                    name="phone_number"
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
                    mask={
                      selectedClient.phone_number[0] != 8
                        ? ['+', '7', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]
                        : [/\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]
                    }
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
                </ScrollView>
                <View style={{ paddingBottom: SIZES.padding * 1.6 }}>
                  <CustomButton type="primary" label="Сохранить" onPress={handleSubmit} status={status} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </MainLayouts>
  );
};
export default EditClientData;
