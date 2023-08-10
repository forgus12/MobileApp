import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userAPI } from '../../../api/userApi';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/vizitnicaSlice';
// import { useFetchSMSCode } from '../../Verification/hooks/useFetchSMSCode';
import DeviceInfo from 'react-native-device-info';
import { useSignUp } from '../../PhoneVerification/hooks/useSignUp';

export const useGetIsUserExists = () => {
  const [deviceId, setDeviceId] = useState(null);
  const [status, setStatus] = useState(APIStatus.Initial);
  const { getIsUserExists } = userAPI();
  const { setIsClientExists, setUserExistsInfo } = verificationActionCreators();
  const { fetch: sendSMSCode } = useSignUp();

  const phoneNumber = useSelector(state => state.verification.phoneNumber);
  const countryCode = useSelector(({ verification }) => verification.selectedCountry.code);
  const { fetch: fetchSendSms } = useSignUp();
  const phoneUnmask = (countryCode + phoneNumber + '').split(' ').join('');

  DeviceInfo.getUniqueId().then(uniqueId => {
    setDeviceId(uniqueId);
  });

  const fetch = (phone, successCb) => {
    setStatus(APIStatus.Loading);
    getIsUserExists({
      payload: {
        phone_number: phone,
        device_id: deviceId,
      },
      onSuccess: resp => {
        setStatus(APIStatus.Success);
        typeof successCb === 'function' && successCb(resp.data);
        if (resp.data.user) {
          if (resp.data?.client || resp.data?.specialist) {
            setUserExistsInfo({
              user: resp.data.user,
              device: resp.data.device,
              client: resp.data.client,
              specialist: resp.data.specialist,
            });
            if (resp.data.user && resp.data.client) {
              setIsClientExists(true);
              sendSMSCode(phone, null);
            }
            if (resp.data.user && !resp.data.client) {
              sendSMSCode(phone, null);
            }
          }
        } else {
          fetchSendSms(phoneUnmask);
        }
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  };
  return { fetch, status };
};
