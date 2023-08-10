import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Modal from 'react-native-modal';
import Modals from './Modals';
import { useSelector } from 'react-redux';

export const ModalConfirm = ({
  visible,
  navigation,
  closeModal,
  openModal,
  text,
  text2,
  colorText,
  buttonFunction,
  buttonFunction2,
  setIsOpen,
  isOpen,
  infoSpecialist,
}) => {
  const [openModalComplaint, setOpenModalComplaint] = React.useState(false);
  React.useEffect(() => {
    if (isSentComplaints) {
      setOpenModalComplaint(!openModalComplaint);
    } else if (isSentComplaints === false) {
      setOpenModalComplaint(!openModalComplaint);
    }
  }, [isSentComplaints]);

  const isSentComplaints = useSelector(state => state.vizitnica.isSentComplaints);

  const closeModals = () => {
    setOpenModalComplaint(!openModalComplaint);
    closeModal(false);
    setIsOpen(false);
  };

  return (
    <View style={styles.modal}>
      <View style={styles.containerButtonAdd}>
        <TouchableOpacity style={styles.buttonAddCard} onPress={buttonFunction}>
          <Text style={[styles.textButton, { color: colorText }]}>{text}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerButtonImportContact}>
        <TouchableOpacity
          onPress={() => {
            setOpenModalComplaint(!openModalComplaint);
            // closeModal(false);
            // setIsOpen(false);
          }}
          style={styles.buttonAddCard}>
          <Text style={[styles.textButton, { color: colorText }]}>{text2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerCancelButton}>
        <TouchableOpacity
          onPress={() => {
            closeModal(false);
            setIsOpen(false);
          }}
          style={styles.buttonAddCard}>
          <Text style={styles.textCancelButton}>Отмена</Text>
        </TouchableOpacity>
      </View>
      <Modals
        indexModal={4}
        visibleModal={openModalComplaint}
        setVisibleModal={closeModals}
        navigation={navigation}
        item={infoSpecialist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    margin: 0,
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  containerButtonAdd: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#73575D',
  },
  containerButtonImportContact: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  containerCancelButton: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 13,
  },
  buttonAddCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 57,
  },

  textButton: {
    fontSize: 18,
    letterSpacing: 0.38,
    fontWeight: '400',
  },
  textCancelButton: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '600',
    letterSpacing: 0.38,
  },
});
