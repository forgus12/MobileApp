import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { SIZES, COLORS } from '../../constants';
import { CustomModalEasy, Field, Hr, Navbar } from '../../components';
import { useSelector } from 'react-redux';
import { WrapperAsyncRequest } from '../../layouts';
import { verificationActionCreators } from '../../slices/vizitnicaSlice';
import { recordScreenActionCreators } from '../../slices/recordScreenSlice';
import Icons from '../../assets/icons/svgIcons/Icons';
import { useFetchUser } from '../Authentication/hooks/useFetchUser';
import TextButton from '../../components/TextButton';
import { useGetSpecialistCard } from './hooks/useGetSpecialistCard';
import ChoiceAvatarClient from '../../components/ChooseAvatarClient';

const AddBusinessCard = ({ navigation }) => {
  const editBusinessCard = useSelector(state => state.vizitnica.editBusinessCard);
  const businessCard = useSelector(state => state.vizitnica.businessCard);
  const businessCards = useSelector(state => state.vizitnica.businessCards);
  const newCard = useSelector(state => state.recordScreen.newCard);
  const countryCode = useSelector(({ vizitnica }) => vizitnica.selectedCountry.code);
  const avatarPicId = useSelector(state => state.vizitnica.avatarPicId);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [isСonfirmation, setConfirmation] = React.useState(false);
  const [isEditBusinessCard, setIsEditBusinessCard] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isDisabledPhone, setIsDisabledPhone] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const {
    updateBusinessCard,
    addBusinessCard,
    editBusinessCardAction,
    editBusinessCardActionFinish,
    cleanBusinessCard,
    setImage,
  } = verificationActionCreators();
  const { setNewCard } = recordScreenActionCreators();
  const { fetch, status } = useFetchUser();
  const { fetch: getSpecData } = useGetSpecialistCard();
  const normalizedData = {
    id: newCard?.id,
    photo: newCard?.avatar ? newCard?.avatar?.url : null,
    name: newCard?.name,
    surname: newCard?.surname,
    phoneNumber: newCard?.phone_number,
    speciality: newCard?.title,
    description: newCard?.about,
    background_image: newCard?.card
      ? newCard?.card[0].url
      : 'https://dev.vzt.bz/storage/images/card_backgrounds/neutral_man_1.jpg',
    color: newCard ?? newCard?.colors[0],
  };

  const updateData = (name, value) => {
    if (!!editBusinessCard) {
      let data = { ...editBusinessCard };
      if (name === 'phoneNumber') {
        setIsDisabledPhone(false);
      }
      data[name] = value;
      editBusinessCardAction(data);
      setIsEditBusinessCard(true);
      setIsDisabled(!data.name || !data.phoneNumber);
    } else {
      let data = { ...businessCard };
      if (name === 'phoneNumber') {
        setIsDisabledPhone(false);
      }
      data[name] = value;
      if (businessCards.length) {
        if (businessCards[businessCards.length - 1].id === data.id) {
          data['id'] = businessCards[businessCards.length - 1].id + 1;
        }
      }
      updateBusinessCard(data);
      setIsDisabled(!data.name || !data.phoneNumber);
    }
  };

  const onPress = () => {
    if (businessCard?.phoneNumber.length > 9) {
      setIsDisabledPhone(false);
    } else {
      setIsDisabledPhone(true);
      return;
    }
    const body = {
      name: businessCard.name || '',
      surname: businessCard.surname || '',
      title: businessCard.speciality || '',
      phone_number: countryCode + businessCard.phoneNumber,
      avatar_id: avatarPicId ?? null,
      about: businessCard.description || '',
    };
    getSpecData(body);
    if (isEditBusinessCard) {
      const newBusinessCards = businessCards.map(o => {
        if (o.id === editBusinessCard.id) {
          return editBusinessCard;
        }
        return o;
      });
      editBusinessCardActionFinish(newBusinessCards);
      editBusinessCardAction(null);
      navigation.goBack();
    }
  };

  function returnContent() {
    return (
      <View>
        <Field
          label="Имя"
          updateData={updateData}
          field="name"
          showIconReset
          incomingValue={editBusinessCard?.name}
          onFocus={() => setIsFocused(false)}
        />
        <Field
          label="Фамилия (необязательно)"
          updateData={updateData}
          field="surname"
          showIconReset
          incomingValue={editBusinessCard?.surname}
          onFocus={() => setIsFocused(false)}
        />
        <Field
          label="Специальность (необязательно)"
          updateData={updateData}
          field="speciality"
          showIconReset
          incomingValue={editBusinessCard?.speciality}
          onFocus={() => setIsFocused(false)}
        />
        <View
          style={{
            borderColor:
              isFocused && !isDisabledPhone
                ? COLORS.primary
                : isFocused && isDisabledPhone
                ? COLORS.red
                : !businessCard?.phoneNumber.length
                ? COLORS.lightGray
                : businessCard?.phoneNumber.length >= 10
                ? COLORS.lightGray
                : COLORS.red,
            borderWidth: 1,
            flex: 1,
            paddingHorizontal: SIZES.padding * 1.6,
            marginBottom: SIZES.padding * 0.8,
            color: COLORS.black,
            borderRadius: SIZES.radius,
          }}>
          <View>
            <Text
              style={{
                ...SIZES.body6,
                paddingTop: SIZES.padding * 0.5,
                color: isFocused ? COLORS.primary : COLORS.gray,
              }}>
              {'Номер телефона'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TextInput
              style={{
                fontSize: SIZES.h3,
                fontFamily: 'SFProDisplay-Regular',
                lineHeight: 20.29,
                color: COLORS.black,
                height: 38,
              }}
              value={'+7'}
            />
            {isFocused && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 0,
                  zIndex: 100,
                }}
                onPress={() => updateData('phoneNumber', '')}>
                <Icons.ClearButton />
              </TouchableOpacity>
            )}
            <MaskInput
              onFocus={() => setIsFocused(true)}
              placeholderFillCharacter={'0'}
              keyboardType={Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'}
              value={businessCard?.phoneNumber}
              onChangeText={(masked, unmasked) => {
                updateData('phoneNumber', unmasked);
              }}
              mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
              style={{
                flex: 1,
                fontSize: SIZES.h3,
                fontFamily: 'SFProDisplay-Regular',
                lineHeight: 20.29,
                color: COLORS.black,
                height: 38,
              }}
            />
          </View>
        </View>
        <Field
          label="Доп. описание (необязательно)"
          updateData={updateData}
          field="description"
          incomingValue={editBusinessCard?.description}
          showIconReset
          placeholder=" "
          customContainerStyle={{ height: 120 }}
          customPlaceholderStyle={{
            fontSize: SIZES.body3,
            paddingTop: SIZES.padding * 1.5,
          }}
          onFocus={() => setIsFocused(false)}
        />
      </View>
    );
  }

  React.useEffect(() => {
    if (isСonfirmation) {
      setConfirmation(false);
      setNewCard(null);
      cleanBusinessCard();
      setImage(null);
      editBusinessCardAction(null);
      navigation.goBack();
    }
  }, [isСonfirmation]);

  React.useEffect(() => {
    if (newCard?.specialist) {
      setModalVisible(true);
    } else if (newCard != null) {
      addBusinessCard(normalizedData);
      setNewCard(null);
      cleanBusinessCard();
      setImage(null);
      editBusinessCardAction(null);
      navigation.goBack();
    }
  }, [newCard]);

  React.useEffect(() => {
    updateData('phoneNumber', '');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
      }}>
      <View style={{ backgroundColor: '#0F98C2', height: 50 }}></View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding * 1.6,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <WrapperAsyncRequest status={status}> */}
          <Navbar
            header="Новая визитка"
            navigation={navigation}
            styleBody={{
              backgroundColor: COLORS.white,
              marginLeft: SIZES.margin * 0.4,
              paddingTop: 14,
              marginBottom: 8,
            }}
            // height={65}
            styleIcon={{ paddingTop: 10 }}
          />
          <Hr
            style={{
              marginTop: -1,
            }}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            // style={{ zIndex: -500 }}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={{ paddingTop: 24 }}>
                <ChoiceAvatarClient isAvatar={true} />
              </View>
              {returnContent()}
            </ScrollView>
          </KeyboardAvoidingView>
          {/* </WrapperAsyncRequest> */}
          <TextButton
            isDisabled={isDisabled}
            label={'Добавить'}
            customContainerStyle={{
              backgroundColor: COLORS.primary,
              marginBottom: SIZES.padding * 1.6,
              opacity: isDisabled ? 0.5 : 1,
            }}
            customLabelStyle={{ color: COLORS.white }}
            onPress={onPress}
          />
          <CustomModalEasy
            button={'Ok'}
            text={'Специалист с указанным номером телефона уже зарегистрирован в системе. Его данные будут обновлены'}
            setModalVisible={setModalVisible}
            visible={modalVisible}
            setConfirmation={setConfirmation}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddBusinessCard;
