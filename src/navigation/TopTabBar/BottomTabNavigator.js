import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyBusinessCard, MyServices, PersonalData, WorkSchedule } from '../../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PersonalData"
        component={PersonalData}
        options={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyBusinessCard"
        component={MyBusinessCard}
        options={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyServices"
        component={MyServices}
        options={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WorkSchedule"
        component={WorkSchedule}
        options={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
