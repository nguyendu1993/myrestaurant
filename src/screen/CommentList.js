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
import Swiper from 'react-native-swiper';

import banner from '../images/food-banner1.jpg';
import banner1 from '../images/food-banner2.jpg';

import banner2 from '../images/food-banner3.jpg';
import banner3 from '../images/food-banner4.jpg';
import banner4 from '../images/food-banner5.jpg';
const {height, width} = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';

export default class CommentList extends Component {
  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.viewheader}>
          <Image style={styles.viewLogo}></Image>

          <View style={{flexDirection: 'row', marginRight: 20}}>
            <Feather name="menu" color="gray" size={30} />
            <View style={{marginLeft: 20, marginRight: 30}}>
              <Feather name="edit" color="gray" size={30} />
            </View>
            <View style={{alignItems: 'center'}}>
              <Feather name="user" color="gray" size={25} />
              <Text style={{fontSize: 12}}>Se connecter</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewhr} />
        <View style={styles.viewSearch}>
          <Feather name="align-left" color="gray" size={30} />
          <TextInput style={styles.textInput}></TextInput>

          <View style={styles.viewTextSearch}>
            <Text>Recherche {'\n'} avance</Text>
          </View>
          <View style={styles.viewItemSearch}>
            <Feather name="search" color="white" size={25} />
          </View>
        </View>
        <View style={styles.viewhr} />

        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            // horizontal={false}
            height={200}
            activeDotColor="#F58B03">
            <View style={styles.slide}>
              <Image
                source={banner}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={banner1}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={banner3}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={banner4}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={banner2}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>

          <View style={styles.ovelay}>
            <Text style={styles.viewtext}> Isolation par l'extérieur :</Text>
            <Text style={styles.viewTextheader}>
              {' '}
              Isolation par l'extérieur :
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray',
                height: 50,
                marginHorizontal: width * 0.3,
                borderRadius: 10,
              }}>
              <Text style={styles.viewTextheader}>Se connect</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
          <Image source={banner2} style={styles.viewImages}></Image>

          <View style={{marginLeft: 10, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Feather name="check-circle" color="#F58B03" size={20} />
              <Text numberOfLines={5} style={{marginLeft: 5}}>
                Isolation par l'extérieur : l'Etat n'exclut pas solation par
                l'extérieur : l'Etat n'exclut pas
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 20,
                marginTop: 10,
                flex: 1,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Feather name="eye" color="gray" size={20} />
                <Text style={{marginLeft: 5}}>4</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Feather name="share-2" color="gray" size={20} />
                <View style={{marginLeft:10}}>
                <Feather name="message-circle" color="gray" size={20} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.viewhr} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewheader: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImages: {
    width: 150,
    height: 100,
    backgroundColor: 'red',
  },
  viewhr: {
    padding: 5,
    marginLeft: 10,
    marginRight: 10,

    alignItems: 'center',
    borderColor: 'black',
    borderTopWidth: 0.5,
    marginTop: 10,
  },
  viewLogo: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
  },
  viewSearch: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'gray',
    width: width * 0.5,
    marginLeft: 20,
    backgroundColor: 'white',
    paddingLeft: 10,

    borderWidth: 1,
    height: 50,
  },
  viewTextSearch: {
    backgroundColor: '#EEEEEE',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    width: 80,
  },
  viewItemSearch: {
    backgroundColor: 'gray',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    width: 50,
  },
  sliderContainer: {
    height: 240,
    width: '95%',
    marginTop: 10,
    // justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  ovelay: {
    width: '100%',
    height: 200,

    marginTop: 40,

    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  viewtext: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewTextheader: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 15,
  },

  //////////
});
