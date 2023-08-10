import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import RNLocation from 'react-native-location';
import { YaMap, Marker, Geocoder } from 'react-native-yamap';
import Icons from '../../assets/icons/svgIcons/Icons';
import Plus from '../../assets/icons/svgIcons/plus';
import Minus from '../../assets/icons/svgIcons/minus';
import Location from '../../assets/icons/svgIcons/location';
import point_icon from '../../assets/icons/point_icon.png';
import { FONTS, COLORS, api, SIZES } from '../../constants';

// YaMap.т(api.map_key);
Geocoder.init(api.geocoder_key);

const Map = ({ navigation, route }) => {
  const infoSpecialist = route.params.infoSpecialist;

  const map = React.useRef(null);
  const lat = +infoSpecialist.coordinates.latitude;
  const lon = +infoSpecialist.coordinates.longitude;
  const marker = { lat: lat, lon: lon };
  const [zoom, setZoom] = React.useState(14);
  const [coor, setCoor] = React.useState({ lat: lat, lon: lon });

  const myLocation = () => {
    RNLocation.getLatestLocation().then(latestLocation => {
      latestLocation &&
        setCoor({
          lat: latestLocation.latitude,
          lon: latestLocation.longitude,
        });
    });
  };

  const MarkerCoor = () => {
    RNLocation.getLatestLocation().then(latestLocation => {
      latestLocation &&
        setCoor({
          lat: lat,
          lon: lon,
        });
    });
  };

  React.useEffect(() => {
    map?.current?.setZoom(zoom, 0, 3);
  }, [zoom]);

  React.useEffect(() => {
    map?.current?.setCenter(coor, zoom, 0, 0, 1);
  }, [coor]);

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
        MarkerCoor();
      }
      err => {
        console.log(err);
      };
    });
  }, []);

  const ButtonMap = ({ top, onPress, icons }) => {
    return (
      <View style={[styleButtonMap.containerButton, { top: top }]}>
        <TouchableOpacity style={styleButtonMap.button} onPress={onPress}>
          {icons}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
        }}>
        <View style={stylePage.containerNavbar}>
          <View style={stylePage.backButtonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={stylePage.button}>
              <Icons.ArrowBack color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={stylePage.textContainer}>
            <Text style={stylePage.textHeader}>{'Карта'}</Text>
          </View>
        </View>
        <View style={stylePage.containerMap}>
          <YaMap ref={map} style={stylePage.map} showUserPosition>
            {marker && <Marker point={marker} source={point_icon} scale={2} />}
          </YaMap>
          <ButtonMap top={'40%'} icons={<Location />} imageW={22} imageH={22} onPress={() => myLocation()} />
          <ButtonMap
            top={'50%'}
            icons={<Plus color={'#787880'} />}
            onPress={() => setZoom(zoom + 1)}
            imageW={14}
            imageH={14}
          />
          <ButtonMap top={'60%'} icons={<Minus />} onPress={() => setZoom(zoom - 1)} imageW={14} imageH={2} />
        </View>
      </View>
    </>
  );
};

const styleButtonMap = StyleSheet.create({
  containerButton: {
    position: 'absolute',
    zIndex: 1,
    right: 16,
  },
  button: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 16,
  },
});

const stylePage = StyleSheet.create({
  containerNavbar: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
  },
  backButtonContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  button: {
    padding: 16,
    margin: -10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -50,
  },
  textHeader: {
    ...SIZES.h4,
    color: COLORS.textBlack,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 12,
  },
  containerMap: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
  },
  map: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Map;
