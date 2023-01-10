import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ActionableInfoButton = (props) => {
  return (
    <>
      <Text style={styles.headerText}>{props.headerText}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: props.color }]}
        onPress={props.onPress}
      >
        <Ionicons
          name={props.iconName}
          size={wp('8%')}
          color='#FFF'
          style={{ paddingHorizontal: wp('2.5%') }}
        />
        <Text style={styles.buttonText}>{props.buttonText}</Text>
      </TouchableOpacity>
    </>
  );
};

export default ActionableInfoButton;

const styles = StyleSheet.create({
  headerText: {
    paddingLeft: wp('5%'),
    paddingBottom: hp('1%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderRadius: 5,
    marginBottom: hp('1%'),
  },
  buttonText: {
    fontSize: wp('5%'),
    color: '#FFF',
    width: wp('80%'),
  },
});
