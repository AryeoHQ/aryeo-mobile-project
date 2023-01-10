import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import AppointmentModal from './AppointmentModal';
import { ThemeContext } from '../../ThemeProvider';

const AppointmentItem = (props) => {
  const theme = useContext(ThemeContext);
  const data = props.data;
  const [modalVisble, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisble);
  };

  return (
    <>
      {props.isNewDay ? (
        <Text style={styles.daysHeader}>
          {moment(data.start_at).format('dddd, MMM D')}
        </Text>
      ) : null}
      <TouchableHighlight
        onPress={() => toggleModal()}
        underlayColor='lightgrey'
        style={styles.container}
      >
        <>
          <View style={{ justifyContent: 'space-between', width: wp('65%') }}>
            <Text style={styles.dateText}>
              {moment(data.start_at).format('h:mm A')}
            </Text>
            <Text style={styles.durationText}>{data.duration} minutes</Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: wp('25%'),
            }}
          >
            <Text
              style={[
                styles.statusText,
                data.status === 'SCHEDULED'
                  ? { backgroundColor: theme.brandColor }
                  : data.status === 'CANCELED'
                  ? { backgroundColor: 'red' }
                  : null,
              ]}
            >
              {data.status}
            </Text>
          </View>
          <AppointmentModal
            isVisible={modalVisble}
            hideModal={() => toggleModal()}
            data={{ data }}
          />
        </>
      </TouchableHighlight>
    </>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: wp('100%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  dateText: {
    color: '#000',
    fontSize: hp('2%'),
    paddingBottom: wp('1%'),
  },
  statusText: {
    color: '#000',
    fontSize: hp('1.7%'),
    paddingBottom: wp('1%'),
    paddingHorizontal: wp('1%'),
    paddingVertical: wp('1%'),
    backgroundColor: '#FFF',
  },
  durationText: {
    color: 'grey',
    fontSize: hp('1.6%'),
  },
  daysHeader: {
    paddingLeft: wp('3%'),
    paddingVertical: hp('0.5%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
  },
});
