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
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import h1 from '../images/h2.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import cancel from '../images/cancel.png';
import * as Message from './../redux/constants/Message';
import {FlatList} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

class CartDetail extends Component {
  render() {
    var {cartdetail} = this.props;
    // console.log('abv' +cartdetail);
    return (
      <View style={styles.itemcontainer}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            flex: 1,
          }}>
          <Image
            source={{uri: cartdetail.imagesFood}}
            style={styles.imgitem}></Image>
          <View style={{ flex: 1,}}>
          <Text style={styles.itemname}>{cartdetail.nameFood} </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              flex: 1,
              justifyContent: 'space-between',
              
              alignItems: 'center',
              marginLeft:20
            }}>
            <Text style={styles.textamuont}>
              Số Lượng : {cartdetail.quantity}{' '}
            </Text>

            <Text style={styles.itemprice}>{cartdetail.price} VNĐ</Text>
          </View>
          </View>
          

        </View>
      </View>
    );
  }
}

export default CartDetail;
const styles = StyleSheet.create({
  itemcontainer: {
    flexDirection: 'row',
    flex: 1,

  },
  imgitem: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  viewitemtext: {
    // marginLeft: width * 0.05,
  },
  itemname: {
    fontSize: 17,
    marginLeft:20
,    // fontFamily:'DancingScript-Bold'
    fontFamily: 'ArchivoNarrow-Italic',
  },
  itemprice: {
    fontSize: 15,
    color: 'red',
   
    fontFamily: 'ArchivoNarrow-Italic',
  },
  viewbottom: {
    // marginLeft: width * 0.25,
    backgroundColor: '#F58B03',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  textbt: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'ArchivoNarrow-Italic',
    fontSize: 12,
  },
  listItemContainer: {
    padding: 10,
  },
  viewitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  textitem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textamuont: {
    color: '#F58B03',
    // fontFamily:'DancingScript-Bold',
    fontFamily: 'ArchivoNarrow-Italic',
    marginLeft: 5,
    fontSize: 15,
  },
});
