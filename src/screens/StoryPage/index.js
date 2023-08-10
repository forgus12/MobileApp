import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Hr, Navbar, StoryCard } from '../../components';
import MainLayouts from '../../layouts/MainLayouts';
import { COLORS, SIZES } from '../../constants';
import { FlatList, StatusBar, View, Text } from 'react-native';
// import StoryCard from '../../components/StoryCard';
import { useFetchAppointmentHistory } from './hooks/useFetchAppointmentHistory';
import { useFetchDeleteAppointmentCardHistory } from './hooks/useFetchDeleteAppointmentHistoriCard';
import { useFetchUpdateHistory } from './hooks/useFetchUpdateHistory';
// import { Text } from 'react-native-svg';

const StoryPageClient = ({ navigation }) => {
  const [orderNumber, setOrderNumber] = useState();
  const [id, setId] = useState();

  const history = useSelector(s => s.recordScreen.appointmentHistory);
  const { fetchHistory } = useFetchAppointmentHistory();
  const { fetchDeleteAppointmentHistoryCard, status } = useFetchDeleteAppointmentCardHistory();
  const { status: statusUpdate } = useFetchUpdateHistory();

  const handleDelete = orderNumber => {
    fetchDeleteAppointmentHistoryCard(orderNumber);
  };
  useEffect(() => {
    fetchHistory();
  }, [status, statusUpdate]);

  const checkId = arr => {
    return arr.map(item => item.id);
  };

  return (
    <MainLayouts customContainerStyle={{ marginTop: 32, backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 16, marginBottom: SIZES.margin * 4.2 }}>
        <Navbar header="История записей" navigation={navigation} height={40} />
        <Hr style={{ marginLeft: -16 }} />
        <FlatList
          data={history}
          renderItem={({ item }) => {
            return (
              <StoryCard
                avatar={item?.specialist.avatar}
                date={item?.services[0]?.date}
                name={item?.specialist.name}
                surname={item?.specialist.surname}
                status={item?.status}
                services={item?.services}
                worker={item?.worker}
                price={item?.price}
                work={item?.work}
                orderNumberItem={item?.order_number}
                idService={checkId(item?.services)}
                handleDelete={handleDelete}
                setOrderNumber={setOrderNumber}
                navigation={navigation}
                statusFetch={status}
                isOver={item?.services[0]?.isOver}
                setId={setId}
                specialist={item?.specialist}
              />
            );
          }}
          keyExtractor={item => item.order_number}
        />
      </View>
    </MainLayouts>
  );
};
export default StoryPageClient;
