import React from 'react';
import { Switch } from 'react-native-switch';

import { COLORS, SIZES } from '../constants';

interface IProps {
  isEnabled: boolean;
  setIsEnabled: (state: boolean) => void;
}

const SwitchToggle: React.FC<IProps> = ({ isEnabled, setIsEnabled }) => {
  return (
    <Switch
      value={isEnabled}
      onValueChange={() => setIsEnabled(!isEnabled)}
      circleSize={26}
      barHeight={30}
      backgroundActive={COLORS.backgroundActiveSwitch}
      backgroundInactive={COLORS.white}
      circleActiveColor={COLORS.white}
      circleInActiveColor={COLORS.white}
      containerStyle={{
        borderColor: COLORS.borderSwitch,
        borderWidth: isEnabled ? 0 : 2,
      }}
      changeValueImmediately={true}
      innerCircleStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.borderSwitch,
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2.5}
      switchRightPx={2}
      switchBorderRadius={SIZES.radius * 80}
    />
  );
};

export default SwitchToggle;
