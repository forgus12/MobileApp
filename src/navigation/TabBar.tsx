import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Calendar, Clients, Settings, Chats, Vizitka, Vizitnica } from '../screens';
import { COLORS, SIZES, FONTFAMILY } from '../constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingTabs = () => {
  return (
    <Stack.Navigator initialRouteName="Настройки">
      <Stack.Screen name="Настройки" component={Settings} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export const VizitnicaTabs = () => {
  return (
    <Stack.Navigator initialRouteName="Визитница">
      <Stack.Screen name="Визитница" component={Vizitnica} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.ligthGray4,
        tabBarStyle: {
          alignItems: 'center',
          padding: SIZES.padding * 2,
          // paddingHorizontal: SIZES.padding * 1.5,
          // paddingBottom: 0,
          height: 70,
          backgroundColor: COLORS.white,
          zIndex: 99,
        },
      }}>
      <Tab.Screen
        name="Календарь"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
                  fill={color}
                />
              </Svg>
              <Text
                style={{
                  marginVertical: SIZES.padding * 0.4,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 10,
                  lineHeight: 12,
                  color: focused ? color : COLORS.gray,
                }}>
                Календарь
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Клиент"
        component={Clients}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.67 13.1299C18.04 14.0599 19 15.3199 19 16.9999V19.9999H23V16.9999C23 14.8199 19.43 13.5299 16.67 13.1299Z"
                  fill={color}
                />
                <Path
                  d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
                  fill={color}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5 5.27 15 6.58 15 8C15 9.42 14.5 10.73 13.67 11.76C14.09 11.9 14.53 12 15 12Z"
                  fill={color}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13Z"
                  fill={color}
                />
              </Svg>
              <Text
                style={{
                  marginVertical: SIZES.padding * 0.5,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 10,
                  lineHeight: 12,
                  color: focused ? color : COLORS.gray,
                }}>
                Клиенты
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Чаты"
        component={Chats}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11Z"
                  fill={color}
                />
              </Svg>
              <Text
                style={{
                  marginVertical: SIZES.padding * 0.5,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 10,
                  lineHeight: 12,
                  color: focused ? color : COLORS.gray,
                }}>
                Чаты
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Визитк"
        component={Vizitka}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 3H22C23.1 3 24 3.9 24 5L23.99 19C23.99 20.1 23.1 21 22 21H2C0.9 21 0 20.1 0 19V5C0 3.9 0.9 3 2 3ZM12 9C12 7.34 10.66 6 9 6C7.34 6 6 7.34 6 9C6 10.66 7.34 12 9 12C10.66 12 12 10.66 12 9ZM3 17V18H15V17C15 15 11 13.9 9 13.9C7 13.9 3 15 3 17Z"
                  fill={color}
                />
              </Svg>
              <Text
                style={{
                  marginVertical: SIZES.padding * 0.5,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 10,
                  lineHeight: 12,
                  color: focused ? color : COLORS.gray,
                }}>
                Визитка
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ВизитницаТаб"
        component={VizitnicaTabs}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Svg width="24" height="24" viewBox="0 0 24 19" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.72518 3.45142H18.9769C19.9258 3.45142 20.7021 4.22775 20.7021 5.17659L20.6935 17.2528C20.6935 18.2017 19.9258 18.978 18.9769 18.978H1.72518C0.776329 18.978 0 18.2017 0 17.2528V5.17659C0 4.22775 0.776329 3.45142 1.72518 3.45142ZM10.3511 8.62694C10.3511 7.19505 9.19519 6.03918 7.76329 6.03918C6.3314 6.03918 5.17553 7.19505 5.17553 8.62694C5.17553 10.0588 6.3314 11.2147 7.76329 11.2147C9.19519 11.2147 10.3511 10.0588 10.3511 8.62694ZM2.58776 15.5276V16.3902H12.9388V15.5276C12.9388 13.8025 9.48847 12.8536 7.76329 12.8536C6.03812 12.8536 2.58776 13.8025 2.58776 15.5276Z"
                  fill={color}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.79434 2.80802C2.06875 2.66642 2.38014 2.58646 2.7102 2.58646H19.4123C20.5169 2.58646 21.4123 3.4819 21.4123 4.58646V16.113C21.4123 16.4431 21.3324 16.7545 21.1908 17.0289C21.8347 16.6966 22.2749 16.025 22.2749 15.2505V3.72388C22.2749 2.61931 21.3795 1.72388 20.2749 1.72388H3.57279C2.79828 1.72388 2.1266 2.16412 1.79434 2.80802Z"
                  fill={color}
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.51947 1.08414C3.79387 0.942543 4.10526 0.862588 4.43533 0.862588H21.1374C22.242 0.862588 23.1374 1.75802 23.1374 2.86259V14.3892C23.1374 14.7192 23.0575 15.0306 22.9159 15.305C23.5598 14.9728 24 14.3011 24 13.5266V2C24 0.895431 23.1046 0 22 0H5.29792C4.52341 0 3.85173 0.440245 3.51947 1.08414Z"
                  fill={color}
                />
              </Svg>
              <Text
                style={{
                  marginVertical: SIZES.padding * 0.5,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 10,
                  lineHeight: 12,
                  color: focused ? color : COLORS.gray,
                }}>
                Визитница
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Настройки табы"
        component={SettingTabs}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M19.1401 12.9399C19.1801 12.6399 19.2001 12.3299 19.2001 11.9999C19.2001 11.6799 19.1801 11.3599 19.1301 11.0599L21.1601 9.4799C21.3401 9.3399 21.3901 9.0699 21.2801 8.8699L19.3601 5.5499C19.2401 5.3299 18.9901 5.2599 18.7701 5.3299L16.3801 6.2899C15.8801 5.9099 15.3501 5.5899 14.7601 5.3499L14.4001 2.8099C14.3601 2.5699 14.1601 2.3999 13.9201 2.3999H10.0801C9.84011 2.3999 9.65011 2.5699 9.61011 2.8099L9.25011 5.3499C8.66011 5.5899 8.12011 5.9199 7.63011 6.2899L5.24011 5.3299C5.02011 5.2499 4.77011 5.3299 4.65011 5.5499L2.74011 8.8699C2.62011 9.0799 2.66011 9.3399 2.86011 9.4799L4.89011 11.0599C4.84011 11.3599 4.80011 11.6899 4.80011 11.9999C4.80011 12.3099 4.82011 12.6399 4.87011 12.9399L2.84011 14.5199C2.66011 14.6599 2.61011 14.9299 2.72011 15.1299L4.64011 18.4499C4.76011 18.6699 5.01011 18.7399 5.23011 18.6699L7.62011 17.7099C8.12011 18.0899 8.65011 18.4099 9.24011 18.6499L9.60011 21.1899C9.65011 21.4299 9.84011 21.5999 10.0801 21.5999H13.9201C14.1601 21.5999 14.3601 21.4299 14.3901 21.1899L14.7501 18.6499C15.3401 18.4099 15.8801 18.0899 16.3701 17.7099L18.7601 18.6699C18.9801 18.7499 19.2301 18.6699 19.3501 18.4499L21.2701 15.1299C21.3901 14.9099 21.3401 14.6599 21.1501 14.5199L19.1401 12.9399ZM12.0001 15.5999C10.0201 15.5999 8.40011 13.9799 8.40011 11.9999C8.40011 10.0199 10.0201 8.3999 12.0001 8.3999C13.9801 8.3999 15.6001 10.0199 15.6001 11.9999C15.6001 13.9799 13.9801 15.5999 12.0001 15.5999Z"
                  fill={color}
                />
              </Svg>
              <Text
                style={{
                  marginVertical: SIZES.padding * 0.5,
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: 10,
                  lineHeight: 12,
                  color: focused ? color : COLORS.gray,
                }}>
                Настройки
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
