import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useFormikContext } from 'formik';
import { Text, TouchableOpacity, View } from 'react-native';

import { SwitchToggle, CroppedModalWindow } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { FinancialAnalyticsModal } from '../modals';

interface IProps {
  setIsFewServices: (bool: boolean) => void;
}

const SwitchBlock: React.FC<IProps> = ({ setIsFewServices }) => {
  const { values, setFieldValue }: any = useFormikContext();
  const [isVisibleAnalyticsModal, setIsVisibleAnalyticsModal] = React.useState<boolean>(false);

  return (
    <>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: SIZES.margin * 1.6,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: SIZES.margin,
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              color: COLORS.text,
            }}>
            Финансовая аналитика
          </Text>
          <TouchableOpacity onPress={() => setIsVisibleAnalyticsModal(true)}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                fill="#787880"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <SwitchToggle
          isEnabled={values.finance_analytics}
          setIsEnabled={() =>
            setFieldValue('finance_analytics', !values.finance_analytics)
          }
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONTFAMILY.title.regular,
            fontSize: SIZES.h4,
            color: COLORS.text,
          }}>
          Оказываю несколько услуг
        </Text>
        <SwitchToggle
          isEnabled={values.many_maintenances}
          setIsEnabled={() => {
            setFieldValue('many_maintenances', !values.many_maintenances);
            setIsFewServices(!values.many_maintenances);
          }}
        />
      </View>
      <CroppedModalWindow
        type="center"
        isVisible={isVisibleAnalyticsModal}
        component={FinancialAnalyticsModal}
        onClose={() => setIsVisibleAnalyticsModal(false)}
      /> */}
    </>
  );
};

export default SwitchBlock;
