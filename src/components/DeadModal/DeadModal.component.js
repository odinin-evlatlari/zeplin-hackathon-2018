import React from 'react';
import { Modal, StyleSheet, View, Text, Image } from 'react-native';
import Images from '../../constants/Images.constants';

const DeadModal = ({ visible }) => (
  <Modal visible={visible} animationType="slide">
    <View style={styles.container}>
      <Image source={Images.dead} />
      <Text style={styles.txt}>OOPS!</Text>
    </View>
  </Modal>
);

export default DeadModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  txt: {
    fontSize: 86,
    color: '#fff',
    fontFamily: 'gelio-retsina',
    textAlign: 'center',
  }
});
