import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Linking, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES, COLORS } from '../constants';

const DefaultCard = ({ gradientColor, textColor, colorIcons, navigation, item, index }) => {
  const { name, surname } = item;
  const nameNormalized = typeof name === 'string' ? name : '';
  const surnameNormalized = typeof surname === 'string' ? surname : '';
  return (
    <LinearGradient index={index} colors={gradientColor} style={styles.containerCard}>
      <ImageBackground source={{ uri: item.backgroundImage }} resizeMode="stretch" style={styles.imageBackground}>
        <View style={styles.containerHeaderCard}>
          <View>
            <Text style={[styles.textHeaderSpeciality, { color: textColor }]}>
              {item.speciality != 'Другое' ? item.speciality : item.title}
            </Text>
            <Text style={[styles.textHeaderNameSurname, { color: textColor }]}>
              {`${nameNormalized} ${surnameNormalized}`}
            </Text>
          </View>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.imageCard} />
          ) : (
            <View style={styles.iconAvatar}>
              <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
                <Path
                  d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                  fill="#787880"
                />
              </Svg>
            </View>
          )}
        </View>
        <Text style={[styles.descriptionStyle, { color: textColor }]}>{item.description}</Text>
        <View style={[styles.containerFooter, { paddingHorizontal: 16 }]}>
          <View style={styles.containerFooter}>
            <View style={{ flexDirection: 'row' }}>
              {!item.isDummy && (
                <TouchableOpacity
                  onPress={() => navigation?.navigate('RecordScreen', item)}
                  style={[styles.iconsFooter, { backgroundColor: COLORS.white }]}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6V12H19V10H5V20H12V22ZM22.13 16.99L22.84 16.28C23.23 15.89 23.23 15.26 22.84 14.87L22.13 14.16C21.74 13.77 21.11 13.77 20.72 14.16L20.01 14.87L22.13 16.99ZM21.42 17.7L16.12 23H14V20.88L19.3 15.58L21.42 17.7Z"
                      fill={colorIcons}
                    />
                  </Svg>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)} // TODO change country code to dynamic value}
                style={[styles.iconsFooter, { backgroundColor: COLORS.white }]}>
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <Path
                    d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
                    fill={colorIcons}
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            {!item.isDummy ? (
              <TouchableOpacity
                style={[styles.iconsFooter, { backgroundColor: COLORS.white, marginRight: 2 }]}
                onPress={() => navigation.navigate('Share', item)}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M16 5L14.58 6.42L12.99 4.83V16H11.01V4.83L9.42 6.42L8 5L12 1L16 5ZM20 10V21C20 22.1 19.1 23 18 23H6C4.89 23 4 22.1 4 21V10C4 8.89 4.89 8 6 8H9V10H6V21H18V10H15V8H18C19.1 8 20 8.89 20 10Z"
                    fill={colorIcons}
                  />
                </Svg>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.iconsFooter, styles.iconPensil]}
                onPress={() => navigation.navigate('EditBusinessCardSpecialist', item)}>
                <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <Path
                    d="M0 15.2501V19.0001H3.75L14.81 7.94006L11.06 4.19006L0 15.2501ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"
                    fill="#FFF"
                  />
                </Svg>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    width: '100%',
    height: 182,
    marginBottom: SIZES.padding * 0.2,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  containerHeaderCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  textHeaderSpeciality: {
    ...SIZES.body6,
    textAlign: 'left',
    marginBottom: SIZES.padding * 0.4,
  },
  textHeaderNameSurname: {
    ...SIZES.h3,
    fontSize: SIZES.body2,
    lineHeight: 14,
    textAlign: 'left',
    height: SIZES.padding * 2.8,
    // marginTop: SIZES.padding * 0.8,
  },
  imageCard: {
    width: 42,
    height: 42,
    borderRadius: 50,
    paddingRight: 30,
  },
  iconAvatar: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  descriptionStyle: {
    ...SIZES.h6,
    textAlign: 'left',
    paddingHorizontal: 16,
    height: SIZES.padding * 4.8,
    marginTop: SIZES.padding * 0.8,
    marginBottom: SIZES.padding,
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconsFooter: {
    height: SIZES.padding * 3.8,
    width: SIZES.padding * 3.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    marginRight: SIZES.radius,
  },
  iconPensil: {
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 2,
  },
});

export default DefaultCard;
