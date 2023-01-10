import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import { ThemeContext } from '../../ThemeProvider';

const InfoBox = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.infoBox, { backgroundColor: theme.brandColor }]}>
      <Ionicons name={props.iconName} size={wp('10%')} color={'#000'} />
      <Text style={styles.timeText}>{props.text}</Text>
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  infoBox: {
    height: wp('28%'),
    width: wp('28%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  timeText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
});
