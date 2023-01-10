import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { AppointmentContext } from '../../AppointmentProvider';
import { ThemeContext } from '../../ThemeProvider';

const HomeHeader = (props) => {
  const theme = useContext(ThemeContext);
  const appointmentContext = useContext(AppointmentContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('SCHEDULED');
  const [items, setItems] = useState([
    { label: 'Scheduled', value: 'SCHEDULED' },
    { label: 'Canceled', value: 'CANCELED' },
    { label: 'All', value: undefined },
  ]);
  const [index, setIndex] = useState(0);
  const selectOption = (selected, index) => {
    setIndex(index);
    setOpen(false);
    if (value === selected.value) {
      return;
    }
    setValue(selected.value);
    appointmentContext.getAppointments(selected.value);
  };
  return (
    <View>
      <>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image
              source={require('../../assets/Logos/Icon.png')}
              style={styles.logoImage}
            />
          </View>

          <Text style={styles.headerText}>Appointments</Text>
          <TouchableOpacity
            style={[styles.toggleButton, { backgroundColor: theme.brandColor }]}
            onPress={() => setOpen(!open)}
          >
            <Text style={styles.toggleText}>{items[index].label}</Text>
            <Ionicons name='chevron-down' size={wp('5%')} />
          </TouchableOpacity>
        </View>
      </>
      <Modal
        isVisible={open}
        animationIn='fadeIn'
        animationOut='fadeOut'
        onBackdropPress={() => setOpen(false)}
        style={styles.dropDown}
      >
        {items.map((item, index) => (
          <TouchableHighlight
            style={styles.optionButton}
            underlayColor={theme.brandColor}
            onPress={() => selectOption(item, index)}
            key={item.label}
          >
            <Text style={styles.optionButtonText}>{item.label}</Text>
          </TouchableHighlight>
        ))}
      </Modal>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    width: wp('100%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
  logo: {
    width: hp('5%'),
    height: hp('5%'),
  },
  logoImage: {
    height: hp('5%'),
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  dropDown: {
    width: wp('33%'),
    backgroundColor: '#FFF',
    position: 'absolute',
    top: hp('11%'),
    right: wp('4%'),
    zIndex: 500,
    margin: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  toggleButton: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('2%'),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: wp('4%'),
    paddingRight: wp('1%'),
  },
  optionButton: {
    paddingLeft: wp('2%'),
    paddingVertical: hp('1%'),
  },
  optionButtonText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});
