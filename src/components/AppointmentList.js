import React, { useContext } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import AppointmentItem from './AppointmentItem';
import { AppointmentContext } from '../../AppointmentProvider';

const AppointmentList = (props) => {
  const appointmentContext = useContext(AppointmentContext);
  const appointments = appointmentContext.appointments;
  let newDays = [];

  //Checks for the first item of a new day to separate days
  appointments &&
    appointments.forEach((item, index) => {
      //if its the first day or if its the first of the new day
      if (
        index === 0 ||
        moment(item.start_at).format('dddd, MMM D, YYYY') !==
          moment(appointments[index - 1].start_at).format('dddd, MMM D, YYYY')
      ) {
        newDays.push(item.id);
      }
    });

  return (
    <View>
      {appointmentContext.loadingAppointments ? (
        <Text style={styles.loadingText}>Loading appointments...</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={({ item }, index) => (
            <AppointmentItem
              data={item}
              isNewDay={newDays.includes(item.id) ? true : false}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  list: {
    marginBottom: hp('15%'),
  },
  loadingText: {
    fontSize: wp('5%'),
    paddingLeft: wp('2%'),
    paddingVertical: hp('0.5%'),
    fontWeight: 'bold',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
  },
});
