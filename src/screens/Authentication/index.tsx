import React from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';

import { getFromStoreData } from '../../lib/asyncStorageManager';
import { APIStatus } from '../../lib/axiosAPI';
import { navigationApplication, NavigationType } from '../../navigation/MainStackNavigator';
import { MainLayouts } from '../../layouts';
import { RootState } from '../../store/';
import { CodeField, ModalWindow } from '../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../constants';

import { VirtualKeyboard } from './blocks';
import { PhoneNumber } from './modals';
import { useFetchSignIn } from './hooks/useFetchSignIn';

interface IProps {
  navigation: NavigationType;
}

const LENGTH_CODE = 4;

const Authentication: React.FC<IProps> = ({ navigation }) => {
  const { fetch: fetchSignIn, status } = useFetchSignIn();
  const [value, setValue] = React.useState<string>('');
  const [isError, setIsError] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.authentication);
  const [isVisibleResetPincodeModal, setIsVisibleResetPincodeModal] = React.useState<boolean>(false);

  const checkOnSuccess = (value: string): void => {
    setValue(value);
    if (value.length === LENGTH_CODE) {
      getFromStoreData('phoneNumber').then(phoneNumber => {
        if (phoneNumber !== null) {
          fetchSignIn(phoneNumber!, value);
        }
      });
    }
  };

  React.useEffect(() => {
    if (status === APIStatus.Success) {
      setLoader(false);
      navigationApplication(isAuthenticated, navigation);
    }

    if (status === APIStatus.Loading) {
      setLoader(true);
    }

    if (status === APIStatus.Failure) {
      setLoader(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setValue('');
      }, 500);
    }
  }, [status]);

  const renderCell = React.useCallback(
    (value: string) => {
      let textChild = null;
      return (
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: isError ? COLORS.red : value ? COLORS.primary : COLORS.lightGray2,
          }}>
          <Text>{textChild}</Text>
        </View>
      );
    },
    [LENGTH_CODE, isError],
  );

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          opacity: loader ? 0.5 : 1,
        }}>
        <View style={{ marginBottom: SIZES.padding * 2.4 }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.bold,
              fontSize: SIZES.h2,
              color: COLORS.textBlack,
              lineHeight: 23.9,
            }}>
            {isError ? 'Неверный PIN-код' : 'Введите PIN-код'}
          </Text>
        </View>
        <CodeField
          value={value}
          onChangeText={value => checkOnSuccess(value)}
          renderCell={renderCell}
          keyboardDisabled={true}
          customContainerStyle={{
            marginVertical: SIZES.margin * 4,
            width: 122,
          }}
        />
      </View>
      <VirtualKeyboard navigation={navigation} onPress={value => checkOnSuccess(value)} />
      <Text
        onPress={() => setIsVisibleResetPincodeModal(true)}
        style={{
          fontFamily: FONTFAMILY.text.medium,
          fontSize: SIZES.h5,
          color: COLORS.primary,
          lineHeight: 16,
          marginTop: SIZES.padding * 2.4,
          marginBottom: SIZES.padding,
          textAlign: 'center',
        }}>
        {'Забыли PIN-код?'}
      </Text>
      <ModalWindow
        title="Восстановление PIN-кода"
        name="resetPinCode"
        navigation={navigation}
        component={PhoneNumber}
        isVisible={isVisibleResetPincodeModal}
        onClose={() => setIsVisibleResetPincodeModal(false)}
      />
    </MainLayouts>
  );
};

export default Authentication;
