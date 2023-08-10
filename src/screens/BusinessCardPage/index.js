import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import Icons from '../../assets/icons/svgIcons/Icons';
import RightIconArrow from '../../assets/icons/svgIcons/RightIconArrow';
import CalendarIcon from '../../assets/icons/svgIcons/calendarIcon';
import IconPhone from '../../assets/icons/svgIcons/IconPhone';
import IconHistory from '../../assets/icons/svgIcons/IconHistory';
import { IconShare } from '../../assets/icons/svgIcons/IconShare';
import { Hr } from '../../components';
import { verificationActionCreators } from '../../slices/vizitnicaSlice';
import { COLORS, SIZES } from '../../constants';
import NavbarRecordScreen from '../../components/NavbarRecordScreen';

const BusinessCardPage = ({ navigation, route }) => {
  const infoSpecialist = route?.params?.item;
  const colorHeaderText = infoSpecialist?.card?.textHeaderColor;
  const colorText = infoSpecialist?.card?.textColor;
  const colorButtonNavbar = infoSpecialist?.card?.buttonsColor || COLORS.white;

  const isSentComplaints = useSelector(state => state.vizitnica.isSentComplaints);
  const { sentComplaints } = verificationActionCreators();

  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSentComplaints) {
      toast.show('Жалоба отправлена, мы обязательно отреагируем на ваше обращение.', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
        textStyle: { ...SIZES.body3 },
        normalColor: '#435155',
      });
      sentComplaints(null);
    } else if (isSentComplaints === false) {
      toast.show('Что-то пошло не так. Попробуйте позже.', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
        textStyle: { ...SIZES.body3 },
        normalColor: '#435155',
      });
      sentComplaints(null);
    }
  }, [isSentComplaints]);

  return (
    <>

      <StatusBar animated={true} translucent backgroundColor={isOpen ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.0)'} />
      <ScrollView style={styleHeader.containerScrollView}>
        <ImageBackground
          style={{
            height: 320,
            paddingTop: 50,
          }}
          source={{ uri: infoSpecialist?.backgroundImage }}>
          <NavbarRecordScreen
            optionMenu={true}
            icon={true}
            infoSpecialist={infoSpecialist}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            stylesHeader={{ flex: 0.1 }}
            stylesHeadersText={{
              backgroundColor: colorText,
              color: colorHeaderText,
              ...styleHeader.navbar,
            }}
            colorButton={colorText}
            colorMenuOption={colorText}
            navigation={navigation}
            header={infoSpecialist?.speciality ? infoSpecialist?.speciality : 'Специальность'}
          />
          <View style={styleHeader.containerHeader}>
            {infoSpecialist?.avatar ? (
              <Image style={[styleHeader.image, { borderRadius: 50 }]} source={{ uri: infoSpecialist?.avatar }} />
            ) : (
              <Icons.Avatar styles={styleHeader.image} />
            )}
            <Text style={[styleHeader.textName, { color: colorText }]}>
              {`${infoSpecialist?.name ?? ''} ${infoSpecialist?.surname ?? ''}`}
            </Text>
            <Text style={[styleHeader.textInfo, { color: colorText }]}>{infoSpecialist?.description ?? ''}</Text>
          </View>
        </ImageBackground>
        {infoSpecialist?.address && (
          <View style={{ padding: 16 }}>
            <Text style={styleHeader.textAddress}>Адрес:</Text>
            <Text style={styleHeader.textInfoAddress}>{infoSpecialist?.address}</Text>
            {infoSpecialist?.placement && (
              <Text style={styleHeader.textInfoAddress}>
                {infoSpecialist?.placement ? `${infoSpecialist?.placement} кв./офис, ` : ''}
                {infoSpecialist?.floor ? `${infoSpecialist?.floor} этаж` : ''}
              </Text>
            )}
            {/* {!!+infoSpecialist?.coordinates?.latitude && !!+infoSpecialist?.coordinates?.longitude && (
              <TouchableOpacity
                onPress={() => !infoSpecialist?.isDummy && navigation.navigate('Map', { infoSpecialist })}
                style={styleHeader.buttonMap}>
                <Text style={[styleHeader.buttonMapText, { color: colorButtonNavbar }]}>{'Показать на карте'}</Text>
                <RightIconArrow style={styleHeader.buttonMapIcon} color={colorButtonNavbar} />
              </TouchableOpacity>
            )} */}
          </View>
        )}
        <Hr />
        <View style={styles.containerLinks}>
          <TouchableOpacity
            style={styles.containerLink}
            onPress={() => {
              navigation.navigate('RecordScreen', { infoSpecialist, name: 'BusinessCardPage' });
            }}>
            <CalendarIcon color={colorButtonNavbar} />
            <Text style={styles.textLink}>Записаться</Text>
          </TouchableOpacity>
          <Hr />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${infoSpecialist?.phoneNumber}`); // TODO change country code to dynamic value
            }}
            style={[styleHeader.buttonMap, { justifyContent: 'space-between' }]}>
            <View style={styles.containerLink}>
              <IconPhone color={colorButtonNavbar} />
              <Text style={styles.textLink}>Позвонить</Text>
            </View>
            <Text style={{ marginRight: 16, color: '#787880' }}>{infoSpecialist?.phoneNumber}</Text>
          </TouchableOpacity>
          <Hr />
          <TouchableOpacity
            style={styles.containerLink}
            onPress={() => navigation.navigate('HistoryPageSpecialist', route)}>
            <IconHistory color={colorButtonNavbar} />
            <Text style={[styles.textLink, { marginLeft: 19 }]}>История записей</Text>
          </TouchableOpacity>
          <Hr />
          <TouchableOpacity
            style={styles.containerLink}
            onPress={() => !infoSpecialist.isDummy && navigation.navigate('Share', infoSpecialist)}>
            <IconShare fill={colorButtonNavbar} />
            <Text style={[styles.textLink, { marginLeft: 24 }]}>Поделиться</Text>
          </TouchableOpacity>
          <Hr />
        </View>
      </ScrollView>
    </>
  );
};

const styleHeader = StyleSheet.create({
  containerScrollView: {
    backgroundColor: 'white',
  },
  navbar: {
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 88,
    height: 88,
    marginTop: 25,
  },
  textName: {
    fontFamily: 'SF Pro Display',
    fontWeight: '800',
    fontSize: 17,
    lineHeight: 20,
    marginTop: 16,
  },
  textInfo: {
    marginTop: 8,
    textAlign: 'center',
    marginLeft: 48,
    marginRight: 48,
    fontWeight: '400',
    ...SIZES.body8,
    letterSpacing: 1,
    fontSize: 14,
  },
  textAddress: {
    fontSize: 12,
    lineHeight: 14,
    color: '#787880',
  },
  textInfoAddress: {
    fontSize: 12,
    lineHeight: 16,
    color: '#1C1C1E',
    marginRight: 16,
    marginTop: 4,
  },
  buttonMap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonMapText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
    marginTop: 10,
  },
  buttonMapIcon: {
    marginTop: 12,
    marginLeft: 10,
  },
});

const styles = StyleSheet.create({
  containerLinks: {
    marginLeft: 16,
  },
  containerLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLink: {
    color: '#1C1C1E',
    marginTop: 19,
    marginBottom: 19,
    marginLeft: 22,
    fontSize: 15,
    lineHeight: 18,
  },
});

export default BusinessCardPage;
