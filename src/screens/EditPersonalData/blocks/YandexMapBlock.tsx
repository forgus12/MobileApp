import React from 'react';
import RNLocation from 'react-native-location';
import { useFormikContext } from 'formik';
import { YaMap, Marker, Geocoder } from 'react-native-yamap';
import { View, TouchableOpacity, Image } from 'react-native';

import { COLORS, SIZES, api, icons } from '../../../constants';

YaMap.init(api.map_key);
YaMap.setLocale('ru_RU');
Geocoder.init(api.geocoder_key);

const YandexMapBlock = () => {
  const { setFieldValue } = useFormikContext();
  const map = React.useRef<any>(null);
  const [zoom, setZoom] = React.useState(14);
  const [coor, setCoor] = React.useState({ lat: 55.75222, lon: 37.6155 });
  const [marker, setMarker] = React.useState(null);

  const onMapPress = (e: any) => {
    setMarker(e.nativeEvent);
    map.current?.getCameraPosition((position: any) => {
      setZoom(position.zoom);
    });
    Geocoder.geoToAddress(e.nativeEvent).then(
      address => {
        setFieldValue('address', address?.formatted);
      },
      err => {
        console.log(err, 'YandexMapBlockErr');
      },
    );
  };

  const myLocation = () => {
    RNLocation.getLatestLocation().then(latestLocation => {
      latestLocation &&
        setCoor({
          lat: latestLocation.latitude,
          lon: latestLocation.longitude,
        });
    });
  };

  React.useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Location permission',
          message: 'We use your location to demo the library',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then(granted => {
      if (granted) {
        myLocation();
      }
      (err: any) => {
        console.log(err);
      };
    });
  }, []);

  React.useEffect(() => {
    map?.current?.setZoom(zoom, 0, 3);
  }, [zoom]);

  React.useEffect(() => {
    map?.current?.setCenter(coor, zoom, 10, 0, 1);
  }, [coor]);

  const ButtonMap = ({ top, onPress, icons }: any) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: top,
          zIndex: 1,
          right: 16,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginBottom: 16,
          }}
          onPress={onPress}>
          <Image source={icons} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightGray,
        marginVertical: SIZES.padding,
      }}>
      <YaMap
        ref={map}
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMapPress={onMapPress}
        showUserPosition>
        {marker && <Marker point={marker} source={icons.point_icon} scale={1} />}
      </YaMap>
      <ButtonMap top={20} onPress={myLocation} icons={icons.location_icon} />
      {/*<ButtonMap top={90} onPress={() => setZoom(zoom + 1)} icons={icons.bigPlus_icon} />
      <ButtonMap top={140} onPress={() => setZoom(zoom - 1)} icons={icons.bigMinus_icon} /> */}
    </View>
  );
};

export default YandexMapBlock;
