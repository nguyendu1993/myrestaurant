import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Homescreen from './Cartempty';
import Oder from '../screen/Oder';
import {FlatList} from 'react-native-gesture-handler';
import h1 from '../images/f1.jpg';

const {width} = Dimensions.get('window');
class DonHangsection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {bill} = this.props;
    var {navigation} = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DonHangChitiet', {bills: bill})}>
        <View style={{paddingBottom: 7}}>
          <View style={styles.viewcontainer}>
            <View>
              <Image source={h1} style={styles.imgitem}></Image>
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.itemname}>MHD {bill.billid}</Text>
              <Text style={styles.itemname}>Ngày: {bill.date}</Text>
              <Text style={styles.itemname}>HTTT: {bill.payment}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  paddingRight: 20,
                }}>
                <Text style={styles.textstart}>{bill.totalprice} VNĐ</Text>
                <View style={styles.viewbottom}>
                  <Text style={styles.textbt}>Chi tiết </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default DonHangsection;
const styles = StyleSheet.create({
  //////////////
  viewcontainer: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: '#FFF',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 10,
    padding: 10,
  },
  imgitem: {
    width: 80,
    height: 80,
    borderRadius: 10,
    // marginLeft: 20,
  },
  viewitemtext: {
    // marginLeft: width * 0.1,
  },
  itemname: {
    fontSize: 15,
    // fontFamily:'DancingScript-Bold'
    fontFamily: 'ArchivoNarrow-Italic',
  },

  viewbottom: {
    backgroundColor: '#1EC424',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  textbt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Italic',
  },
  listItemContainer: {
    padding: 10,
  },
  viewitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  textitem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textstart: {
    color: '#F58B03',
    // fontFamily:'DancingScript-Bold',
    fontFamily: 'ArchivoNarrow-Italic',
    fontSize: 15,
  },
});
