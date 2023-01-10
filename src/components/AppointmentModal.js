import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Linking from 'expo-linking';
import Modal from 'react-native-modal';
import * as Clipboard from 'expo-clipboard';
import { AppointmentContext } from '../../AppointmentProvider';
import InfoBox from './InfoBox';
import Button from './Button';
import BackHeader from './BackHeader';
import ActionableInfoButton from './ActionableInfoButton';

const AppointmentModal = (props) => {
  const appointmentContext = useContext(AppointmentContext);
  const [start_at, setStart_at] = useState();
  const [end_at, setEnd_at] = useState();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  //user data is not in a structured object so i am using string
  //manipulation as a workaround to get the values needed
  const parseUserDataFromBigString = () => {
    setName(
      props.data.data.description
        .slice(
          props.data.data.description.indexOf('Name') + 6,
          props.data.data.description.indexOf('Email')
        )
        .trim()
    );
    setAddress(
      props.data.data.title.slice(props.data.data.title.lastIndexOf('-') + 2)
    );
    setPhone(
      props.data.data.description
        .slice(
          props.data.data.description.indexOf('Phone') + 7,
          props.data.data.description.indexOf('Notes')
        )
        .trim()
    );
    setEmail(
      props.data.data.description
        .slice(
          props.data.data.description.indexOf('Email') + 7,
          props.data.data.description.indexOf('Phone')
        )
        .trim()
    );
  };

  const onChangeDay = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      return;
    }
    const currentDate = selectedDate || props.data.data.start_at;
    var newEnd_date = moment(currentDate).add(
      props.data.data.duration,
      'minutes'
    );
    setStart_at(currentDate);
    setEnd_at(newEnd_date);
  };

  const onChangeStartDate = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      return;
    }
    const currentDate = selectedDate || props.data.data.start_at;
    setStart_at(currentDate);
  };
  const onChangeEndDate = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      return;
    }
    const currentDate = selectedDate || props.data.data.end_at;
    setEnd_at(currentDate);
  };

  const cancelAppointment = async () => {
    Alert.alert(
      'Cancel appointment?',
      'Are you sure you want to cancel this appointment?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Cancel it!',
          onPress: () => {
            appointmentContext.cancelAppointment(props.data.data.id);
            setShow(false);
          },
        },
      ]
    );
  };

  const rescheduleAppointment = async () => {
    if (moment(start_at).isAfter(end_at)) {
      Alert.alert(
        'Invalid appointment times',
        'Your start time must be before the end time',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'Ok',
          },
        ]
      );
      return;
    }
    if (moment(start_at).isBefore(new Date())) {
      Alert.alert(
        'Invalid appointment date',
        'You cannot schedule an appointment in the past',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'Ok',
          },
        ]
      );
      return;
    }
    const result = appointmentContext.rescheduleAppointment(
      props.data.data.id,
      start_at,
      end_at
    );
    await result;
    appointmentContext.getAppointments('SCHEDULED');
    setShow(false);
  };

  const getDirections = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
    });
    Linking.openURL(url).catch(() => {
      Alert.alert(
        `We couldn't open maps :(, copy address?`,
        'You can copy the clients address',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Copy it!',
            onPress: async () => {
              await Clipboard.setStringAsync(address);
            },
          },
        ]
      );
    });
  };
  const emailClient = () => {
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert(
        `We couldn't open your email client :( copy email address?`,
        'You can copy the clients email address',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Copy it!',
            onPress: async () => {
              await Clipboard.setStringAsync(email);
            },
          },
        ]
      );
    });
  };
  const callClient = () => {
    Linking.openURL(`tel:+1 ${phone}`).catch((error) => {
      Alert.alert(
        `We couldn't the dial the number`,
        'You can copy the clients phone number instead',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Copy it!',
            onPress: async () => {
              await Clipboard.setStringAsync(phone);
            },
          },
        ]
      );
    });
  };

  useEffect(() => {
    if (props.isVisible === true) {
      parseUserDataFromBigString();
      setStart_at(new Date(props.data.data.start_at));
      setEnd_at(new Date(props.data.data.end_at));
    }
  }, [props.isVisible]);

  if (props.data) {
    return (
      <Modal
        isVisible={props.isVisible}
        animationIn='slideInRight'
        animationOut='slideOutLeft'
        transparent
        style={{ margin: 0 }}
        swipeDirection={'right'}
        propagateSwipe
        deviceWidth={wp('100%')}
        deviceHeight={hp('100%')}
        onSwipeComplete={() => {
          props.hideModal();
        }}
      >
        <View style={styles.fullScreenModal}>
          <BackHeader
            text={moment(props.data.data.start_at).format('dddd, MMM D, YYYY')}
            onPressBack={props.hideModal}
          />
          <View style={styles.timeInfo}>
            <InfoBox
              iconName={'time-outline'}
              text={moment(props.data.data.start_at).format('h:mm A')}
            />
            <InfoBox
              iconName={'ios-timer-outline'}
              text={`${props.data.data.duration} Minutes`}
            />
            <InfoBox
              iconName={'information-circle-outline'}
              text={props.data.data.status}
            />
          </View>

          <ActionableInfoButton
            headerText={'Name'}
            iconName='person'
            buttonText={name}
            color={'#000'}
          />
          <ActionableInfoButton
            headerText={'Directions'}
            onPress={() => getDirections()}
            iconName='location-sharp'
            buttonText={address}
            color={'#1972E7'}
          />
          <ActionableInfoButton
            headerText={'Phone'}
            onPress={() => callClient()}
            iconName='call'
            buttonText={phone}
            color={'#30D64A'}
          />
          <ActionableInfoButton
            headerText={'Email'}
            onPress={() => emailClient()}
            iconName='mail'
            buttonText={email}
            color={'grey'}
          />
          {props.data.data.status === 'SCHEDULED' ? (
            <View style={styles.buttons}>
              <Button text='Cancel' onPress={cancelAppointment} />
              <Button text='Reschedule' onPress={() => setShow(!show)} />
            </View>
          ) : null}
          <Modal
            transparent={true}
            isVisible={show}
            animationIn='fadeIn'
            animationOut='fadeOut'
            onBackdropPress={() => setShow(false)}
            style={{ margin: 0 }}
            swipeDirection={'right'}
            propagateSwipe
            deviceWidth={wp('100%')}
            deviceHeight={hp('100%')}
            onSwipeComplete={() => {
              setShow(!show);
            }}
          >
            <View style={styles.rescheduleModal}>
              <Text style={styles.rescheduleHeaderText}>
                Reschedule your appointment
              </Text>
              <View style={styles.newDates}>
                <View style={styles.chooseDate}>
                  <Text style={styles.chooseDateText}>Date:</Text>
                  <DateTimePicker
                    testId='dateAndTimePicker'
                    mode='date'
                    is24Hour={false}
                    display='default'
                    value={start_at}
                    onChange={onChangeDay}
                  />
                </View>
                <View style={styles.chooseDate}>
                  <Text style={styles.chooseDateText}>Time:</Text>
                  <Text style={styles.fromToText}>From</Text>
                  <DateTimePicker
                    testId='dateAndTimePicker'
                    mode='time'
                    is24Hour={false}
                    display='default'
                    value={new Date(props.data.data.start_at)}
                    onChange={onChangeStartDate}
                  />
                  <Text style={styles.fromToText}>To</Text>
                  <DateTimePicker
                    testId='dateAndTimePicker'
                    mode='time'
                    is24Hour={false}
                    display='default'
                    value={new Date(props.data.data.end_at)}
                    onChange={onChangeEndDate}
                  />
                </View>
                <View style={styles.submit}>
                  <Button text='Submit' onPress={rescheduleAppointment} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('1%'),
    backgroundColor: '#4ecca3',
    borderBottomWidth: wp('0.5%'),
    shadowColor: '#000',
    width: wp('100%'),
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp('2%'),
    marginBottom: hp('2%'),
  },
  buttons: {
    position: 'absolute',
    bottom: hp('4%'),
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2'),
  },
  rescheduleModal: {
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 35,
    paddingVertical: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  newDates: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('5%'),
  },
  rescheduleHeaderText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  chooseDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp('2%'),
  },
  chooseDateText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  fromToText: {
    paddingHorizontal: wp('2%'),
    fontWeight: 'bold',
  },
  submit: {
    alignItems: 'center',
    paddingTop: hp('3%'),
  },
});

export default AppointmentModal;
