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

class Cartitem extends Component {
  render() {
    var {item} = this.props;
    //console.log("abv"+item);
    return (
      <View style={{paddingLeft: 10, paddingBottom: 7, paddingRight: 10}}>
        <View style={styles.viewcontainer}>
          <View>
            <Image
              source={{uri: item.product.imagesFood}}
              style={styles.imgitem}></Image>
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                paddingRight: 20,
              }}>
              <Text style={styles.textname}>{item.product.nameFood}</Text>
         
              <TouchableOpacity onPress={() => this.onDelete(item.product)}>
                <View>
                  <Image
                    source={cancel}
                    style={{width: 25, height: 25}}></Image>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.viewitem}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.textamuont}>Amount :</Text>
                <Text style={styles.texttotal}>{item.quantity}</Text>
              </View>

              <View style={styles.viewbottom}>
                <Text style={styles.textbt}>Miễn phí</Text>
              </View>
              <View style={styles.viewgia}>
                <Text style={styles.textgia}>Price</Text>
                <Text style={styles.textgia}>{item.product.price}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  onDelete(product) {
    var {onDeleteProductInCart} = this.props;
    onDeleteProductInCart(product);
    console.log(product);
  }
}

export default Cartitem;
const styles = StyleSheet.create({
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
  },
  imgitem: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
  },
  viewitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  textname: {
    fontSize: 17,
    fontFamily: 'ArchivoNarrow-Medium',
  },
  textamuont: {
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
  },
  texttotal: {
    marginLeft: width * 0.01,
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
  },
  viewbottom: {
    marginLeft: 10,
    backgroundColor: '#F58B03',
    paddingHorizontal: 20,
    height: height * 0.03,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  textbt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Italic',
  },
  viewgia: {
    marginTop: -10,
  },
  textgia: {
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Medium',
    color: '#F58B03',
  },
});
