import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { ThemeContext } from '../../ThemeProvider';

const BackHeader = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.header,
        {
          borderColor: theme.brandColor,
        },
      ]}
    >
      <TouchableHighlight
        underlayColor={'lightgrey'}
        style={styles.backButton}
        onPress={props.onPressBack}
      >
        <Ionicons name={'arrow-back'} size={wp('10%')} color={'#000'} />
      </TouchableHighlight>
      <Text style={styles.headerText}>{props.text}</Text>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  header: {
    width: wp('100%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    marginTop: Constants.statusBarHeight,
    paddingVertical: hp('1%'),
  },
  headerText: {
    fontSize: wp('5%'),
  },
});
