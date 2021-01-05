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
import h1 from '../images/h1.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Homescreen from './Cartempty';
import Oder from '../screen/Oder';
import {FlatList} from 'react-native-gesture-handler';
import banner1 from '../images/food-banner2.jpg';

import banner2 from '../images/food-banner3.jpg';
import banner3 from '../images/h2.jpg';
import banner4 from '../images/food-banner5.jpg';
const {width} = Dimensions.get('window');
const Product = ({item, navigation}) => (
  <View style={styles.itemcontainer}>
    <View style={{marginTop: 10, flexDirection: 'row'}}>
      <TouchableOpacity>
        <Image source={item.image} style={styles.imgitem}></Image>
      </TouchableOpacity>
      <View style={styles.viewitemtext}>
        <Text style={styles.itemname}>{item.name}</Text>
        <Text style={styles.itemprice}>{item.price}</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <FontAwesome name="star" size={15} color="#F58B03" />
          <Text style={styles.textstart}>4.8</Text>
          <View style={styles.viewbottom}>
            <Text style={styles.textbt}>Miễn Phí</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

class Homsection1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation, cartdetail} = this.props;
    const {onPress} = this.props;

    return (
      <View style={styles.listItemContainer}>
        <TouchableOpacity >
        <View style={styles.itemcontainer}>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <TouchableOpacity>
              <Image
                source={{uri: cartdetail.imagesFood}}
                style={styles.imgitem}></Image>
            </TouchableOpacity>
            <View style={styles.viewitemtext}>
              <Text style={styles.itemname}>{cartdetail.nameFood}</Text>
              <Text style={styles.itemprice}>{cartdetail.price} VNĐ</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <FontAwesome name="star" size={15} color="#F58B03" />
                <Text style={styles.textstart}>4.8</Text>
                <View style={styles.viewbottom}>
                  <Text style={styles.textbt}>Miễn phí</Text>
                </View>
              </View>
            </View>
          </View>
          
        </View>
        </TouchableOpacity>

        {/* <FlatList
            data={[
              {
                id: 1,
                image: h1,
                name: 'Salad rau củ',
                price: '50.000đ',
              },
              {
                id: 2,
                image: banner3,
                name: 'Salad rau củ',
                price: '20.000đ',
              },
              {
                id: 3,
                image: banner4,
                name: 'Salad rau củ',
                price: '20.000đ',
              },
              {
                id: 4,
                image: banner2,
                name: 'Salad rau củ',
                price: '20.000đ',
              },
              
              
            ]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={onPress}>
                <Product item={item} />
              </TouchableOpacity>
            )}
          /> */}
      </View>
    );
  }
}
export default Homsection1;
const styles = StyleSheet.create({
  itemcontainer: {
    flexDirection: 'row',
    flexDirection: 'row',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
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
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  viewitemtext: {
    marginLeft: width * 0.05,
  },
  itemname: {
    fontSize: 17,
    // fontFamily:'DancingScript-Bold'
    fontFamily: 'ArchivoNarrow-Italic',
  },
  itemprice: {
    fontSize: 12,
    color: 'red',
    marginTop: 10,
    fontFamily: 'ArchivoNarrow-Italic',
  },
  viewbottom: {
    marginLeft: width * 0.25,
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
    paddingLeft: 10,
    paddingRight: 10,
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
  textstart: {
    color: '#F58B03',
    // fontFamily:'DancingScript-Bold',
    fontFamily: 'ArchivoNarrow-Italic',
    marginLeft: 5,
    fontSize: 12,
  },
});

// <View style={styles.listItemContainer}>
// {[
//   {image1: h1, image1: h1,image1: h1, image1: h1},
//   {image1: h1, image1: h1},

// ].map((e, index) => (
//   <View key={index.toString()}>
//  <TouchableOpacity onPress={onPress}>
//     <Product navigation={navigation} name="Salad rau củ" image={e.image1} price="70.000đ"  />
//     </TouchableOpacity>
//    {/* // <Product name="Salad rau củ" image={e.image1} price="70.000đ" /> */}

//   </View>
// ))}
// </View>
