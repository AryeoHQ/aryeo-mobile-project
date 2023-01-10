import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppointmentProvider } from './AppointmentProvider';
import AppointmentList from './src/components/AppointmentList';
import Header from './src/components/Header';
import { ThemeProvider } from './ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <AppointmentProvider>
        <View style={styles.container}>
          <Header />
          <AppointmentList />
        </View>
      </AppointmentProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
