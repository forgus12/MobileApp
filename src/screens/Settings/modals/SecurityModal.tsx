import React from 'react';
import { Text, View } from 'react-native';

import { NavigationType } from '../../../navigation/MainStackNavigator';
import { RootState, useSelector } from '../../../store';
import { Hr, SwitchToggle } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { useUnsetPinCode } from '../hooks/useUnsetPinCode';
import { useSetFaceId } from '../hooks/useSetFaceId';
import { useUnsetFaceId } from '../hooks/useUnsetFaceId';
import { APIStatus } from '../../../lib/axiosAPI';

interface IProps {
  closeModal: () => void;
  navigation: NavigationType;
  onVisibleLoader: any;
}

const SecurityModal: React.FC<IProps> = ({ closeModal, navigation, onVisibleLoader }) => {
  const { isAuthenticated } = useSelector((s: RootState) => s?.authentication);
  const { fetch: resetPinCode, status: statusResetPinCode } = useUnsetPinCode();
  const { fetch: setFaceId, status: statusSetFaceId } = useSetFaceId();
  const { fetch: unsetFaceId, status: statusUnsetFaceId } = useUnsetFaceId();
  const [isPinCode, setIsPinCode] = React.useState<boolean>(isAuthenticated?.data?.pin ? true : false);
  const [isFaceId, setIsFaceId] = React.useState<boolean>(isAuthenticated?.data?.face ? true : false);

  React.useEffect(() => {
    if (
      statusResetPinCode === APIStatus.Success ||
      statusSetFaceId === APIStatus.Success ||
      statusUnsetFaceId === APIStatus.Success
    )
      onVisibleLoader(false);
    if (
      statusResetPinCode === APIStatus.Loading ||
      statusSetFaceId === APIStatus.Loading ||
      statusUnsetFaceId === APIStatus.Loading
    )
      onVisibleLoader(true);
  }, [statusResetPinCode, statusSetFaceId, statusUnsetFaceId]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.6,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginRight: SIZES.margin,
              fontFamily: FONTFAMILY.title.regular,
              fontSize: SIZES.h4,
              color: COLORS.text,
            }}>
            Вход по PIN-коду
          </Text>
        </View>
        <SwitchToggle
          isEnabled={isPinCode}
          setIsEnabled={() => {
            setIsPinCode(!isPinCode);
            if (!isPinCode) {
              closeModal();
              navigation.navigate('EnterPinCode', { goBack: true });
            } else {
              resetPinCode();
            }
          }}
        />
      </View>
      <Hr />

      {isPinCode ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding * 1.6,
              paddingVertical: SIZES.padding * 1.6,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  marginRight: SIZES.margin,
                  fontFamily: FONTFAMILY.title.regular,
                  fontSize: SIZES.h4,
                  color: COLORS.text,
                }}>
                Вход по биометрии
              </Text>
            </View>
            <SwitchToggle
              isEnabled={isFaceId}
              setIsEnabled={() => {
                setIsFaceId(!isFaceId);
                if (!isFaceId) setFaceId();
                else unsetFaceId();
              }}
            />
          </View>
          <Hr />
        </>
      ) : null}
    </View>
  );
};

export default SecurityModal;
