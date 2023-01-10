import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AppointmentService from './services/aryeo/AppointmentService';

const AppointmentContext = React.createContext();

const AppointmentProvider = (props) => {
  const [appointments, setAppointments] = useState();
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  async function getAppointments(filter) {
    setLoadingAppointments(true);
    try {
      const result = await AppointmentService.appointments(filter);
      setLoadingAppointments(false);
      if (result) {
        setAppointments(result.result.data);
      }
    } catch (error) {
      Alert.alert(
        `We couldn't get your appointments :(`,
        'Make sure you are connected to the internet and try again',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Try again',
            onPress: () => {
              getAppointments();
            },
          },
        ]
      );
    }
  }

  async function cancelAppointment(appointment_id) {
    try {
      const result = await AppointmentService.appointmentCancel(appointment_id);
      if (result) {
        Alert.alert(
          `Appointment canceled!`,
          'Your appointment has been successfully canceled',
          [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );
        getAppointments();
      }
    } catch (result) {
      Alert.alert(
        `We couldn't cancel this appointment :(`,
        'Make sure you are connected to the internet and try again',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Try again',
            onPress: () => {
              cancelAppointment(appointment_id);
            },
          },
        ]
      );
    }
  }
  async function rescheduleAppointment(appointment_id, start_at, end_at) {
    try {
      const result = await AppointmentService.appointmentReschedule(
        appointment_id,
        start_at,
        end_at
      );
      if (result) {
        Alert.alert(
          `Appointment rescheduled!`,
          'Your appointment has been successfully rescheduled',
          [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );
        getAppointments('SCHEDULED');
      }
      return result;
    } catch (e) {
      Alert.alert(
        `We reschedule this appointment :(`,
        'Make sure you are connected to the internet and try again',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Try again',
            onPress: () => {
              rescheduleAppointment(appointment_id, start_at, end_at);
            },
          },
        ]
      );
    }
  }

  useEffect(() => {
    getAppointments('SCHEDULED');
  }, []);
  return (
    <AppointmentContext.Provider
      value={{
        getAppointments,
        loadingAppointments,
        cancelAppointment,
        appointments,
        rescheduleAppointment,
      }}
    >
      {props.children}
    </AppointmentContext.Provider>
  );
};

export { AppointmentProvider, AppointmentContext };
