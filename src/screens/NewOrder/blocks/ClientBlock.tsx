import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { Image, Text, View } from 'react-native';

import { Hr, ModalWindow, SelectField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { NewClientModal, SelectClientModal } from '../modals';

const ClientBlock: React.FC = () => {
  const [isVisibleSelectClientModal, setIsVisibleSelectClientModal] = React.useState<boolean>(false);
  const [isVisibleNewClientModal, setIsVisibleNewClientModal] = React.useState<boolean>(false);
  //
  return (
    <>
      <View
        style={{
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.6,
        }}>
        <SelectField
          onPress={() => setIsVisibleSelectClientModal(true)}
          type="select"
          name="client"
          label="Клиент"
          height={74}
          renderContent={data =>
            data.name ? (
              <View>
                <Text
                  style={{
                    marginBottom: SIZES.padding * 0.4,
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.body2,
                    color: COLORS.text,
                  }}>
                  {data.name} {data.surname}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.body4,
                    color: COLORS.text,
                    lineHeight: 14,
                  }}>
                  {data.phone_number}
                </Text>
              </View>
            ) : null
          }
          renderCustomIcon={data =>
            data.name ? (
              data.avatar ? (
                <Image
                  source={{ uri: data.avatar }}
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
              )
            ) : (
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" fill="#38B8E0" />
              </Svg>
            )
          }
        />
      </View>
      <Hr />

      <ModalWindow
        name="client"
        title="Клиент"
        isVisible={isVisibleSelectClientModal}
        component={SelectClientModal}
        onClose={() => setIsVisibleSelectClientModal(false)}
        onPressRightButton={() => setIsVisibleNewClientModal(true)}
        renderRightButton={() => (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#38B8E0" />
          </Svg>
        )}
      />
      <ModalWindow
        // name="standardSchedule.weekends"
        title="Новый клиент"
        isVisible={isVisibleNewClientModal}
        component={NewClientModal}
        onClose={() => setIsVisibleNewClientModal(false)}
      />
    </>
  );
};

export default ClientBlock;
