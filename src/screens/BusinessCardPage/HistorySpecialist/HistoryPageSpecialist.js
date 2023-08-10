import { FlatList, StatusBar, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavbarRecordScreen from '../../../components/NavbarRecordScreen';
import { COLORS } from '../../../constants';
import { useFetchGetHistorySpecialist } from '../hooks/useFetchHistorYSpecialist';
import { useSelector } from 'react-redux';
import CardHistory from './CardHistory';
import ModalStory from '../modals/ModalStory';
import { useFetchDeleteAppointmentCardHistory } from '../../StoryPage/hooks/useFetchDeleteAppointmentHistoriCard';
import { useFetchUpdateHistory } from '../hooks/useFetchUpdateHistory';

const HistoryPageSpecialist = ({ navigation, route }) => {
  const params = route?.params?.params?.item;
  const textColor = params?.card?.textColor;
  const backgroundColors = params?.card?.gradientColor;
  const colorButton = params?.card?.buttonsColor;
  const idSpecialist = params?.id;
  const avatar = params?.avatar;

  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [orderNumber, setOrderNumber] = useState();
  const [id, setId] = useState();

  const { fetchGetHistorySpecialist } = useFetchGetHistorySpecialist();
  const { status: statusUpdate } = useFetchUpdateHistory();
  const { fetchDeleteAppointmentHistoryCard, status } = useFetchDeleteAppointmentCardHistory();
  const { historySpecialist } = useSelector(state => state.specialistData);
  useEffect(() => {
    fetchGetHistorySpecialist(idSpecialist);
  }, [statusUpdate, status]);

  const renderItem = ({ item }) => (
    <CardHistory
      data={item}
      colorButton={colorButton}
      setModalVisible={setModalVisible}
      setMessage={setMessage}
      setOrderNumber={setOrderNumber}
      orderNumber={orderNumber}
      setId={setId}
      navigation={navigation}
    />
  );
  const handleDelete = orderNumber => {
    fetchDeleteAppointmentHistoryCard(orderNumber);
  };

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <StatusBar animated={true} backgroundColor={backgroundColors} barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: backgroundColors,
          height: 100,
          paddingTop: StatusBar.currentHeight,
        }}>
        <NavbarRecordScreen
          navigation={navigation}
          header={'История записей'}
          url={avatar}
          icon={!!avatar}
          stylesHeadersText={{ color: textColor }}
          colorButton={textColor}
          stylesHeader={{ paddingTop: 14 }}
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16, marginBottom: 20 }}>
        <FlatList data={historySpecialist} renderItem={renderItem} keyExtractor={item => console.log(item, 'item')} />
      </View>
      <ModalStory
        visible={isModalVisible}
        setModalVisible={setModalVisible}
        header={'Вы действительно хотите отменить запись:'}
        message={`${message} ?`}
        leftButtonText={'Закрыть'}
        rightButtonText={'Отменить'}
        goTo={'HistoryPageSpecialist'}
        navigation={navigation}
        id={orderNumber}
        handleDelete={handleDelete}
        status={status}
        fetchGetHistorySpecialist={fetchGetHistorySpecialist}
      />
    </View>
  );
};

export default HistoryPageSpecialist;
