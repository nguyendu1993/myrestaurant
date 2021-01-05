import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  actionAddToCart,
  actFetchCategorysRequest,
  actFetcBillDetailRequestAll,
  actFetUserlRequest,
} from '../redux/actions/index';
import AsyncStorage from '@react-native-community/async-storage';

import h1 from '../images/h1.jpg';
import banner from '../images/food-banner1.jpg';
import banner1 from '../images/food-banner2.jpg';

import banner2 from '../images/food-banner3.jpg';
import banner3 from '../images/food-banner4.jpg';
import banner4 from '../images/food-banner5.jpg';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Homsection1 from '../component/Homesection1';
import Menuloaimonsection from '../component/Menuloaimonsection';
import Swiper from 'react-native-swiper';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const {height, width} = Dimensions.get('window');
const Showmenu = ({onPress}) => (
  <View>
    <View style={styles.viewitem1}>
      <View>
        <Text style={styles.textitem}>Menu</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textitem}>Tất cả</Text>

          <View style={{marginLeft: 8}}>
            <FontAwesome name="angle-right" size={24} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const Showbc = ({onPress}) => (
  <View style={{marginBottom: 5}}>
    <View style={styles.viewitem}>
      <View>
        <Text style={styles.textitem}>Món bán chạy</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textitem}>Tất cả</Text>

          <View style={{marginLeft: 8}}>
            <FontAwesome name="angle-right" size={24} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      phone: '',
    };
  }

  async getData() {
    return await AsyncStorage.getItem('userID');
  }
  getuser = async () => {
    var userID = await this.getData();

    var {user} = this.props;
    // console.log(user, 'ffffff');
    var addr = '';
    var ph = '';
    if (user != 0) {
      for (var i in user) {
        if (user[i].userID == userID) {
          if (user[i].address.length == 0) {
            console.log("ssssssfsgsgf");
            this.props.navigation.navigate('updateinfo',{uidUpdateInfo:userID});

          }
        }
      }
    }
  };
 async componentDidMount() {



    
    this.props.fetchAllCategorys();
    this.props.fetchAllCategorysall();
    this.props.fetRequestuser();
    setTimeout(() => {
      this.getuser();
    }, 1000);
  }

 
  render() {
    const {navigation} = this.props;
    const {categorys, cartdetail, user} = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <ScrollView>
          {/* <StatusBar backgroundColor="#F58B03" barStyle="light-content" /> */}
          <View style={styles.headerContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Search')}>
              <View style={styles.inputContainer}>
                <FontAwesome name="search" size={24} color="#969696" />
                <Text style={styles.inputText}>Bạn muốn tìm ?</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
            //  onPress={() => navigation.navigate('Notification')}
              >
              <View style={styles.cartContainer}>
                <FontAwesome name="bell" size={20} color="#F58B03" />
              </View>
            </TouchableOpacity>
          </View>

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
          </View>
          {/* 
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} >
            <View style={styles.cartContainer}>
              <FontAwesome name="bell" size={20} color="#F58B03" />
            </View>
          </TouchableOpacity> */}
          <Showbc />

          {this.showFood(cartdetail, navigation)}

          {/* // <Homsection onPress={() => navigation.navigate('Oder')} /> */}
          <Showmenu onPress={() => navigation.navigate('Menu')} />
          {this.showCategorys(categorys)}
        </ScrollView>
      </View>
    );
  }

  showCategorys(categorys) {
    if (categorys.length > 0) {
      return (
        <FlatList
          data={categorys}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Monan', {item: item})
              }>
              <Menuloaimonsection key={item.id} category={item} />
            </TouchableOpacity>
          )}
        />
      );
    }
  }

  showFood(cartdetail, navigation) {
    if (cartdetail.length > 0) {
      return (
        <FlatList
          data={cartdetail}
          //horizontal={true}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Motamonan', {product: item})}>
              <Homsection1 key={item.id} cartdetail={item} />
            </TouchableOpacity>
          )}
        />
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    categorys: state.categorys,
    cartdetail: state.cartdetail,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategorys: () => {
      dispatch(actFetchCategorysRequest());
    },

    fetchAllCategorysall: () => {
      dispatch(actFetcBillDetailRequestAll());
    },
    fetRequestuser: () => {
      dispatch(actFetUserlRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#F58B03',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    paddingLeft: 10,
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    width: 300,
    elevation: 17,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
    alignSelf: 'center',
  },
  cartContainer: {
    backgroundColor: '#ffff',
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  viewitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  viewitem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  textitem: {
    fontSize: 17,
    fontFamily: 'ArchivoNarrow-SemiBold',
  },
  sliderContainer: {
    height: 200,
    width: '95%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
});
