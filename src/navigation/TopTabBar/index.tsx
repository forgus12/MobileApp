import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CustomTabBar from './CustomTabBar';

const Tab = createMaterialTopTabNavigator();

interface ScreenOptionsI {
  name: string;
  component: any;
  label: string;
}

interface IProps {
  screen1: ScreenOptionsI;
  screen2: ScreenOptionsI;
  renderRightContent?: (indexTab: number) => JSX.Element;
  renderBottomContent?: () => JSX.Element;
}

const TopTabBar: React.FC<IProps> = ({ screen1, screen2, renderBottomContent, renderRightContent }) => {
  return (
    <Tab.Navigator
      screenOptions={{ swipeEnabled: false }}
      tabBar={props => (
        <CustomTabBar {...props} renderBottomContent={renderBottomContent} renderRightContent={renderRightContent} />
      )}>
      <Tab.Screen name={screen1.name} component={screen1.component} options={{ tabBarLabel: screen1.label }} />
      <Tab.Screen name={screen2.name} component={screen2.component} options={{ tabBarLabel: screen2.label }} />
    </Tab.Navigator>
  );
};

export default React.memo(TopTabBar);
