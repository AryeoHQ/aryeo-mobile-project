import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ThemeContext } from '../../ThemeProvider';
const Button = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.brandColor }]}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: wp('43%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: wp('5%'),
    color: '#000',
    fontWeight: 'bold',
  },
});
