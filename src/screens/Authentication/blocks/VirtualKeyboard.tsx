//@ts-nocheck
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { navigationApplication, NavigationType } from '../../../navigation/MainStackNavigator';
import { getFromStoreData } from '../../../lib/asyncStorageManager';
import { APIStatus } from '../../../lib/axiosAPI';
import { RootState, useSelector } from '../../../store';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useFetchSignIn } from '../hooks/useFetchSignIn';

interface IProps {
  onPress: (value: string) => void;
  navigation: NavigationType;
}

const LENGTH_VALUE = 4;
const BACKSPACE = 'backspace';
const TOUCHID = 'touchid';
const FACEID = 'faceid';

const VitrualKeyboard: React.FC<IProps> = ({ onPress, navigation }) => {
  const { fetch: fetchSignIn, status: statusFetchSignIn } = useFetchSignIn();
  const { isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const [mode, setMode] = React.useState<null | 'touchid' | 'faceid'>(null);
  const [value, setValue] = React.useState<string>('');
  const rnBiometrics = new ReactNativeBiometrics();
  const [firstTime, setFirstTime] = React.useState<string>('');

  React.useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const { available, biometryType } = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        setMode('touchid');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setMode('faceid');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setMode('touchid');
      }
    });
  }, []);

  React.useEffect(() => {
    if (statusFetchSignIn === APIStatus.Success) navigationApplication(isAuthenticated, navigation);
  }, [statusFetchSignIn]);

  const handleBiometrics = React.useCallback(
    (mode: string) => {
      rnBiometrics
        .simplePrompt({ promptMessage: 'Touch ID', cancelButtonText: 'Отмена' })
        .then(resultObject => {
          const { success } = resultObject;

          if (success) {
            getFromStoreData('phoneNumber').then(phoneNumber => {
              if (phoneNumber !== null) {
                fetchSignIn(String(phoneNumber));
              }
            });
          } else {
            console.log('user cancelled biometric prompt');
          }
        })
        .catch(() => {
          console.log('biometrics failed');
        });
    },
    [mode],
  );

  const handleOnPress = React.useCallback(
    (val: string | number) => {
      let curText = value;
      if (typeof val === 'string') {
        if (val === BACKSPACE) {
          curText = curText.slice(0, -1);
        }
        if (val === TOUCHID && mode !== null) {
          return handleBiometrics(TOUCHID);
        }
      } else if (curText.length === LENGTH_VALUE) {
        curText = '';
        curText += val;
      } else {
        curText += val;
      }
      setValue(curText);
      onPress(curText);
    },
    [value, mode],
  );

  const renderCell = (symbol: string | number) => {
    return (
      <View style={styles.wrapper} key={symbol}>
        <Pressable
          onPress={() => handleOnPress(symbol)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.backgroundCodeField : COLORS.white,
            },
            styles.cell,
          ]}
          accessibilityLabel={symbol.toString()}>
          <Text style={styles.number}>{symbol}</Text>
        </Pressable>
      </View>
    );
  };

  const renderRow = (numbersArray: Array<number>) => {
    let cells = numbersArray.map(val => renderCell(val));
    return <View style={styles.row}>{cells}</View>;
  };

  const renderBackspace = () => {
    return (
      <View style={styles.wrapper}>
        <Pressable
          onPress={() => handleOnPress(BACKSPACE)}
          accessibilityLabel={BACKSPACE}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.backgroundCodeField : COLORS.white,
            },
            styles.cell,
          ]}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M22 3H7C6.31 3 5.77 3.35 5.41 3.88L0 12L5.41 20.11C5.77 20.64 6.31 21 7 21H22C23.1 21 24 20.1 24 19V5C24 3.9 23.1 3 22 3ZM19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59Z"
              fill="#1C1C1E"
            />
          </Svg>
        </Pressable>
      </View>
    );
  };

  const renderTouchId = () => {
    if (mode == 'touchid' && !firstTime) {
      setFirstTime('1');
      return handleBiometrics(TOUCHID);
    }
    return (
      <View style={styles.wrapper}>
        <Pressable
          onPress={() => handleOnPress(TOUCHID)}
          accessibilityLabel={TOUCHID}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.backgroundCodeField : COLORS.white,
            },
            styles.cell,
          ]}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M17.81 4.47C17.73 4.47 17.65 4.45 17.58 4.41C15.66 3.42 14 3 12.01 3C10.03 3 8.14999 3.47 6.43999 4.41C6.19999 4.54 5.89999 4.45 5.75999 4.21C5.62999 3.97 5.71999 3.66 5.95999 3.53C7.81998 2.52 9.85998 2 12.01 2C14.14 2 16 2.47 18.04 3.52C18.29 3.65 18.38 3.95 18.25 4.19C18.16 4.37 17.99 4.47 17.81 4.47ZM3.49998 9.72C3.39998 9.72 3.29999 9.69 3.20999 9.63C2.97999 9.47 2.92998 9.16 3.08998 8.93C4.07998 7.53 5.33999 6.43 6.83999 5.66C9.97999 4.04 14 4.03 17.15 5.65C18.65 6.42 19.91 7.51 20.9 8.9C21.06 9.12 21.01 9.44 20.78 9.6C20.55 9.76 20.24 9.71 20.08 9.48C19.18 8.22 18.04 7.23 16.69 6.54C13.82 5.07 10.15 5.07 7.28999 6.55C5.92999 7.25 4.78999 8.25 3.88999 9.51C3.80999 9.65 3.65998 9.72 3.49998 9.72ZM9.74999 21.79C9.61999 21.79 9.48998 21.74 9.39998 21.64C8.52998 20.77 8.05999 20.21 7.38999 19C6.69999 17.77 6.33999 16.27 6.33999 14.66C6.33999 11.69 8.87998 9.27 12 9.27C15.12 9.27 17.66 11.69 17.66 14.66C17.66 14.94 17.44 15.16 17.16 15.16C16.88 15.16 16.66 14.94 16.66 14.66C16.66 12.24 14.57 10.27 12 10.27C9.42999 10.27 7.33999 12.24 7.33999 14.66C7.33999 16.1 7.65999 17.43 8.26999 18.51C8.90999 19.66 9.34999 20.15 10.12 20.93C10.31 21.13 10.31 21.44 10.12 21.64C10.01 21.74 9.87999 21.79 9.74999 21.79ZM16.92 19.94C15.73 19.94 14.68 19.64 13.82 19.05C12.33 18.04 11.44 16.4 11.44 14.66C11.44 14.38 11.66 14.16 11.94 14.16C12.22 14.16 12.44 14.38 12.44 14.66C12.44 16.07 13.16 17.4 14.38 18.22C15.09 18.7 15.92 18.93 16.92 18.93C17.16 18.93 17.56 18.9 17.96 18.83C18.23 18.78 18.49 18.96 18.54 19.24C18.59 19.51 18.41 19.77 18.13 19.82C17.56 19.93 17.06 19.94 16.92 19.94ZM14.91 22C14.87 22 14.82 21.99 14.78 21.98C13.19 21.54 12.15 20.95 11.06 19.88C9.65999 18.49 8.88999 16.64 8.88999 14.66C8.88999 13.04 10.27 11.72 11.97 11.72C13.67 11.72 15.05 13.04 15.05 14.66C15.05 15.73 15.98 16.6 17.13 16.6C18.28 16.6 19.21 15.73 19.21 14.66C19.21 10.89 15.96 7.83 11.96 7.83C9.11998 7.83 6.51998 9.41 5.34998 11.86C4.95998 12.67 4.75999 13.62 4.75999 14.66C4.75999 15.44 4.82998 16.67 5.42998 18.27C5.52998 18.53 5.39998 18.82 5.13998 18.91C4.87998 19.01 4.58999 18.87 4.49998 18.62C4.00998 17.31 3.76998 16.01 3.76998 14.66C3.76998 13.46 3.99998 12.37 4.44998 11.42C5.77998 8.63 8.72998 6.82 11.96 6.82C16.51 6.82 20.21 10.33 20.21 14.65C20.21 16.27 18.83 17.59 17.13 17.59C15.43 17.59 14.05 16.27 14.05 14.65C14.05 13.58 13.12 12.71 11.97 12.71C10.82 12.71 9.88999 13.58 9.88999 14.65C9.88999 16.36 10.55 17.96 11.76 19.16C12.71 20.1 13.62 20.62 15.03 21.01C15.3 21.08 15.45 21.36 15.38 21.62C15.33 21.85 15.12 22 14.91 22Z"
              fill="#1C1C1E"
            />
          </Svg>
        </Pressable>
      </View>
    );
  };

  const renderFaceId = () => {
    return (
      <View style={styles.wrapper}>
        <Pressable
          accessibilityLabel="faceid"
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.backgroundCodeField : COLORS.white,
            },
            styles.cell,
          ]}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M9.6496 16C10.2 16.4 11 16.8 12 16.8C13 16.8 13.8 16.4 14.3504 16"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M16 9.59998V11.2"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M8 9.59998V11.2"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M12 9.59998V12.8C12 13.2416 11.6416 13.6 11.2 13.6"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M20.8 7.19995V4.79995C20.8 3.91595 20.084 3.19995 19.2 3.19995H16.8"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M7.20001 3.19995H4.80001C3.91601 3.19995 3.20001 3.91595 3.20001 4.79995V7.19995"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M16.8 20.7999H19.2C20.084 20.7999 20.8 20.0839 20.8 19.1999V16.7999"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M3.20001 16.7999V19.1999C3.20001 20.0839 3.91601 20.7999 4.80001 20.7999H7.20001"
              stroke="#353535"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderRow([1, 2, 3])}
      {renderRow([4, 5, 6])}
      {renderRow([7, 8, 9])}
      <View style={styles.row}>
        {isAuthenticated?.data?.face && mode === 'touchid' ? (
          renderTouchId()
        ) : mode === 'faceid' ? (
          renderFaceId()
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {renderCell(0)}
        {renderBackspace()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: SIZES.margin * 1.2,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: FONTFAMILY.title.regular,
    fontSize: 25,
    lineHeight: 30,
    color: COLORS.text,
  },
  backspace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderRadius: 18,
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 76,
    height: 46,
    borderRadius: SIZES.radius,
  },
});

export default VitrualKeyboard;
