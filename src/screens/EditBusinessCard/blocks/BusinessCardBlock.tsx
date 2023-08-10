import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { BusinessCardsI } from '../../../slices/myBusinessCardSlice';
import { RootState } from '../../../store';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

const BusinessCardBlock: React.FC<BusinessCardsI> = ({ url, colors }) => {
  const { userData } = useSelector((s: RootState) => s?.personalData);
  const { myProfile } = useSelector((state: RootState) => state.clients);

  return (
    <ImageBackground
      source={{ uri: url }}
      resizeMode="cover"
      resizeMethod="scale"
      style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          padding: SIZES.padding * 1.6,
        }}>
        <View style={{ marginBottom: SIZES.margin * 1.4 }}>
          <Text
            style={{
              marginBottom: SIZES.padding * 0.4,
              fontFamily: FONTFAMILY.text.medium,
              fontSize: SIZES.body5,
              lineHeight: 14,
              color: colors.title,
            }}>
            {/* {!userData?.activity_kind.label
              ? userData?.title
              : userData.activity_kind?.value === 8
              ? userData?.title
              : userData?.activity_kind.label} */}
            {myProfile?.title || myProfile?.activity_kind?.id === 8
              ? myProfile?.title
              : myProfile?.activity_kind?.label}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.title.black,
              fontSize: SIZES.body3,
              lineHeight: 16,
              color: colors.name,
            }}>
            {myProfile?.name} {myProfile?.surname}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 42,
            height: 42,
            borderRadius: SIZES.radius * 4.2,
          }}>
          {myProfile?.avatar?.url ? (
            <Image
              source={{
                uri: myProfile?.avatar.url,
              }}
              resizeMode="cover"
              resizeMethod="scale"
              style={{
                width: 42,
                height: 42,
                borderRadius: SIZES.radius * 4.2,
              }}
            />
          ) : (
            <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <Circle cx="21" cy="21" r="21" fill="#EAECEE" />
              <Path
                d="M21 11C15.48 11 11 15.48 11 21C11 26.52 15.48 31 21 31C26.52 31 31 26.52 31 21C31 15.48 26.52 11 21 11ZM16.07 27.28C16.5 26.38 19.12 25.5 21 25.5C22.88 25.5 25.51 26.38 25.93 27.28C24.57 28.36 22.86 29 21 29C19.14 29 17.43 28.36 16.07 27.28ZM27.36 25.83C25.93 24.09 22.46 23.5 21 23.5C19.54 23.5 16.07 24.09 14.64 25.83C13.62 24.49 13 22.82 13 21C13 16.59 16.59 13 21 13C25.41 13 29 16.59 29 21C29 22.82 28.38 24.49 27.36 25.83ZM21 15C19.06 15 17.5 16.56 17.5 18.5C17.5 20.44 19.06 22 21 22C22.94 22 24.5 20.44 24.5 18.5C24.5 16.56 22.94 15 21 15ZM21 20C20.17 20 19.5 19.33 19.5 18.5C19.5 17.67 20.17 17 21 17C21.83 17 22.5 17.67 22.5 18.5C22.5 19.33 21.83 20 21 20Z"
                fill="#787880"
              />
            </Svg>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body5,
              lineHeight: 16,
              color: colors.description,
            }}>
            {myProfile?.about}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: SIZES.margin * 0.8,
                width: 38,
                height: 38,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
              }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6V12H19V10H5V20H12V22ZM22.13 16.99L22.84 16.28C23.23 15.89 23.23 15.26 22.84 14.87L22.13 14.16C21.74 13.77 21.11 13.77 20.72 14.16L20.01 14.87L22.13 16.99ZM21.42 17.7L16.12 23H14V20.88L19.3 15.58L21.42 17.7Z"
                  fill={colors.icons}
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 38,
                height: 38,
                backgroundColor: COLORS.white,
                borderRadius: 8,
                marginRight: 8,
              }}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path
                  d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM7 9H5V7H7V9ZM11 9H9V7H11V9ZM15 9H13V7H15V9Z"
                  fill={colors.icons}
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 38,
                height: 38,
                backgroundColor: COLORS.white,
                borderRadius: 8,
              }}>
              <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <Path
                  d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
                  fill={colors.icons}
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 38,
              height: 38,
              backgroundColor: COLORS.white,
              borderRadius: 8,
            }}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M16 5L14.58 6.42L12.99 4.83V16H11.01V4.83L9.42 6.42L8 5L12 1L16 5ZM20 10V21C20 22.1 19.1 23 18 23H6C4.89 23 4 22.1 4 21V10C4 8.89 4.89 8 6 8H9V10H6V21H18V10H15V8H18C19.1 8 20 8.89 20 10Z"
                fill={colors.icons}
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BusinessCardBlock;
