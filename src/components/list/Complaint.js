import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { Hr, RadioButton } from '../../components';
import { COLORS, SIZES } from '../../constants';
import { useSendComplaint } from '../../screens/BusinessCardPage/hooks/useSendComplaint';

const Complaint = ({ item, closeModal }) => {
  const [chooseItem, setChooseItem] = React.useState(null);
  const complaints = useSelector(state => state.vizitnica.complaints);
  const { fetch } = useSendComplaint();
  const { id, card } = item;
  function Item({ item }) {
    return (
      <View style={{ marginLeft: 18 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 24,
            paddingVertical: 19,
          }}
          onPress={() => setChooseItem(item.name)}>
          <RadioButton isTrue={chooseItem === item.name ? true : false} color={card?.buttonsColor} />
          <Text
            style={{
              ...SIZES.body1,
              color: COLORS.textBlack,
              paddingRight: 18,
            }}>
            {item.value}
          </Text>
        </TouchableOpacity>
        <Hr />
      </View>
    );
  }

  return (
    <>
      {/* <StatusBar animated={true} backgroundColor={card?.gradientColor} barStyle={'light-content'} /> */}
      <View style={{ flex: 1, alignSelf: 'space-between', paddingBottom: 16 }}>
        <FlatList data={complaints} renderItem={({ item }) => <Item item={item} />} keyExtractor={item => item.name} />
      </View>
      <TouchableOpacity
        disabled={chooseItem === null ? true : false}
        onPress={() => {
          fetch(id, chooseItem), closeModal();
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 56,
          borderRadius: 100,
          backgroundColor: COLORS.primary,
          opacity: chooseItem ? 1 : 0.7,
          margin: SIZES.margin * 1.6,
          padding: SIZES.padding * 1.6,
        }}>
        <Text
          style={{
            color: card?.textColor,
            fontFamily: 'SFProDisplay-Bold',
            fontSize: SIZES.h3,
            lineHeight: 20.29,
          }}>
          {'Отправить жалобу'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Complaint;
