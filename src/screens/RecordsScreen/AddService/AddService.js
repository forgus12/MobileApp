import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { recordScreenActionCreators } from '../../../slices/recordScreenSlice';
import NavbarRecordScreen from '../../../components/NavbarRecordScreen';
import AddServiceCard from '../../../components/AddServiceCard';
import SearchInput from '../../../components/SearchInput';
import { COLORS } from '../../../constants';
import { useRoutService } from './useRoutService';

const AddService = ({ navigation, route }) => {
  const card = useSelector(({ recordScreen }) => recordScreen.card);

  const { addSelected } = recordScreenActionCreators();
  const image_url = route?.route?.params?.params?.avatar || route?.params?.params?.avatar;
  const buttonColor = route?.params?.route?.params?.card?.textColor || route?.params?.params?.card?.textColor;
  const color2 = route?.params?.route?.params?.card?.gradientColor || route?.params?.params?.card.gradientColor;
  const color = route.params.route?.params?.card?.gradientColor || route?.params?.params?.card.gradientColor;
  const deleteCard = route.params.onPresss;
  const indexs = route.params.index;
  const [isThisCountPrice, setIsThisCountPrice] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [id] = useState(0);
  const [isIcon, setIsIcon] = useState(false);

  const handleSelected = id => {
    if (indexs || indexs == 0) {
      deleteCard(indexs);
    }
    addSelected({ id });
    navigation.goBack();
  };

  const search = () => {
    return card.filter(item => {
      if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
        return item;
      }
    });
  };

  useEffect(() => {
    image_url ? setIsIcon(true) : setIsIcon(false);
  }, []);

  useEffect(() => {
    setIsThisCountPrice(card.some(item => item.price * item?.thisCountPrice?.value));
  }, [card]);

  useEffect(() => {
    addSelected(id);
  }, [id]);

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <StatusBar animated={false} backgroundColor={color} barStyle={'light-content'} />
      <View style={{ backgroundColor: color, paddingTop: 32 }}>
        <NavbarRecordScreen
          colorButton={buttonColor}
          navigation={navigation}
          header={'Услуга'}
          url={image_url}
          icon={isIcon}
          stylesHeadersText={{ color: buttonColor }}
          stylesHeader={{ paddingTop: 8 }}
        />
      </View>
      <View style={styles.inputSearch}>
        <SearchInput
          color={COLORS.lightGray}
          getInputData={val => setSearchText(val)}
          customContainerStyleSearch={color2}
        />
      </View>
      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={search()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleSelected(index)}>
              <AddServiceCard colorIcon={color2} item={item} isThisCountPrice={isThisCountPrice} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerAddService: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inputSearch: {
    margin: 16,
  },
  text: {
    color: '#787880',
  },
});

export default AddService;
