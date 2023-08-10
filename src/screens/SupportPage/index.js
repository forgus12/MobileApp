import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import Icons from '../../assets/icons/svgIcons/Icons';
import { COLORS, SIZES, FONTFAMILY } from '../../constants';
import React, { useEffect, useState } from 'react';
import { Field } from '../../components';
import * as DocumentPicker from 'react-native-document-picker';
import { useFetchSupport } from './hooks/useFetchSupport';
import { useToast } from 'react-native-toast-notifications';
import { APIStatus } from '../../lib/axiosAPI';
import { useSelector } from '../../store';
import { useFetchSupportClient } from './hooks/useFetchSupportClient';
const SupportPage = ({ navigation }) => {
  const toast = useToast();
  const [valueTextArea, setValueTextArea] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [file, setFile] = useState([{ name: 'Прикрепить файл' }]);
  const [errorQuestion, setErrorQuestion] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocusedQuestion, setIsFocusedQuestion] = React.useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = React.useState(false);
  const [isFormatEmail, setIsFormatEmail] = useState(false);
  const { isAuthenticated } = useSelector(s => s?.authentication);
  const { fetchSupport, status: statusSpecialist } = useFetchSupport();
  const { fetchSupport: fetchClient, status: statusClient } = useFetchSupportClient();
  const handleError = () => {
    !valueTextArea ? setErrorQuestion(true) : setErrorQuestion(false);
    !valueEmail ? setErrorEmail(true) : setErrorEmail(false);
    if (valueEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setIsFormatEmail(false);
    } else {
      setIsFormatEmail(true);
    }
  };

  const createSupport = () => {
    let loadedFile = new FormData();
    if (file[0]?.uri) {
      loadedFile.append('file', {
        uri: file[0]?.uri,
        type: file[0]?.type,
        name: file[0]?.name,
      });
    }
    loadedFile.append('text', valueTextArea);
    loadedFile.append('email', valueEmail);
    if (!!valueTextArea.length && valueEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setIsDisabled(true);
      if (isAuthenticated?.data?.role == 'specialist') {
        fetchSupport(loadedFile, valueTextArea, valueEmail);
      } else if (isAuthenticated?.data?.role == 'client') {
        fetchClient(loadedFile, valueTextArea, valueEmail);
      }
    }
  };

  useEffect(() => {
    if (statusSpecialist === APIStatus.Success) {
      setIsDisabled(false);
      toast.show('Ваше обращение успешно отправлено. Мы ответим по электронной почте', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
        normalColor: '#435155',
      });
      if (isAuthenticated?.data?.role == 'specialist') {
        navigation.navigate('Calendar');
      }
    } else if (statusSpecialist === APIStatus.Failure) {
      toast.show('Что то пошло не так, жалоба не была отправлена', {
        duration: 4000,
      });
      setIsDisabled(false);
    }
  }, [statusSpecialist]);

  useEffect(() => {
    if (statusClient === APIStatus.Success) {
      setIsDisabled(false);
      toast.show('Ваше обращение успешно отправлено. Мы ответим по электронной почте', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
        normalColor: '#435155',
      });
      if (isAuthenticated?.data?.role == 'client') {
        navigation.navigate('Vizitnica');
      }
    } else if (statusClient === APIStatus.Failure) {
      toast.show('Что то пошло не так, жалоба не была отправлена', {
        duration: 4000,
      });
      setIsDisabled(false);
    }
  }, [statusClient]);

  const updateData = (name, value) => {
    if (name === 'question') {
      setValueTextArea(value);
      setErrorQuestion(!value.length);
    }
    if (name === 'email') {
      setValueEmail(value);
    }
  };

  const uploadFile = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    setFile(res);
  };

  return (
    <>
      <View style={{ backgroundColor: '#0F98C2', height: 50 }}></View>
      {/* <SafeAreaView> */}
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding * 1.6,
            borderBottomWidth: 1,
            borderColor: COLORS.lightGray,
            paddingVertical: SIZES.padding * 1.6,
          }}>
          <View
            style={{
              flex: 0.1,
              alignItems: 'center',
              marginLeft: -SIZES.padding * 1.4,
            }}>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                if (isAuthenticated?.data?.role == 'specialist') {
                  navigation.navigate('Calendar');
                } else if (isAuthenticated?.data?.role == 'client') {
                  navigation.navigate('ProfilePage');
                }
              }}>
              <Icons.CloseButton color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginLeft: -SIZES.padding * 1.4,
            }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.title.semibold,
                fontSize: 14,
                lineHeight: 17,
                color: COLORS.textBlack,
              }}>
              Обращение
            </Text>
          </View>
        </View>
        <View style={styles.containerBody}>
          <Field
            label="Ваш вопрос"
            updateData={updateData}
            styleLabel={styles.textAreaPlaceholder}
            showIconReset
            customContainerStyle={{
              height: 120,
              borderColor:
                errorQuestion || (isFocusedEmail && !valueTextArea.length)
                  ? 'red'
                  : isFocusedQuestion
                  ? COLORS.primary
                  : COLORS.lightGray,
            }}
            customPlaceholderStyle={{
              fontSize: SIZES.body3,
              paddingTop: SIZES.padding * 1.5,
            }}
            maxLength={1000}
            field={'question'}
            onFocus={() => {
              setIsFocusedQuestion(!isFocusedQuestion), setIsFocusedEmail(false);
            }}
          />
          <View style={styles.containerAddedFile}>
            <TouchableOpacity style={[styles.addedFile, { marginBottom: 22 }]} onPress={uploadFile}>
              <Icons.AddFile />
              <Text style={{ marginLeft: 8, color: COLORS.gray }}>{file[0].name}</Text>
            </TouchableOpacity>
            {file[0].name !== 'Прикрепить файл' && (
              <TouchableOpacity onPress={() => setFile([{ name: 'Прикрепить файл' }])}>
                <Icons.DeleteIcon />
              </TouchableOpacity>
            )}
          </View>
          <Field
            label="Email"
            updateData={updateData}
            showIconReset
            customContainerStyle={{
              borderColor: errorEmail || isFormatEmail ? 'red' : isFocusedEmail ? COLORS.primary : COLORS.lightGray,
            }}
            field={'email'}
            onFocus={() => {
              setIsFocusedEmail(!isFocusedEmail), setIsFocusedQuestion(false);
            }}
          />
          {isFormatEmail && (
            <Text style={{ color: 'red' }}>Невозможно связаться по этому адресу. Проверьте, нет ли ошибок</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            disabled={isDisabled}
            onPress={() => {
              handleError();
              createSupport();
            }}>
            <Text style={styles.buttonText}>Отправить</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%',
    // marginTop: 16,
  },
  containerBody: {
    margin: 16,
  },
  textArea: {
    borderRadius: 8,
    height: 128,
  },
  textAreaPlaceholder: {
    top: -70,
  },
  containerAddedFile: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    height: 48,
    width: '100%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 20.29,
    fontSize: 17,
  },
});

export default SupportPage;
