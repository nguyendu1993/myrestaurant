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
import h1 from '../images/h2.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Homescreen from './Cartempty';
import Oder from '../screen/Oder';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  actaddratingTofirebase,
  
 
} from '../redux/actions/index';
import rating from '../redux/reducers/rating';
const {width} = Dimensions.get('window');

class Favoritesection extends Component {
    constructor(props) {
      super(props);
      this.state = {
        check_favorite: false,
  
        userID: '',
        foodID: '',
        
      };
    }
    async getData() {
      return await AsyncStorage.getItem('userID');
    }
    componentDidMount = async () => {
      const {rating} = this.props;
      //console.log(rating,"rating");
  
      this.props.fetRequestrating();
     
  
      // setTimeout(() => {
      //   this.showrating(rating);
      // },1000);
    };
  
    
    render() {
      const {product, rating,item} = this.props;
      console.log(item,"item");
      var {navigation} = this.props;
      var {check_favorite, userID, foodID} = this.state;
    
      return (
        <View>
          <View style={styles.itemcontainer}>
          <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Motamonan', {product: item})
                }>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
             
                <Image source={{uri: item.imagesFood}} style={styles.imgitem}></Image>
            
              <View style={styles.viewitemtext}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.itemname}>{item.nameFood}</Text>
                  {/* <TouchableOpacity
                    onPress={() => checkfavorite(UserID, product.id)}> */}
                    <FontAwesome
                      name="bookmark"
                      size={20}
                     color={ check_favorite ? 'red' : '#F58B03'}
                      //color={ rating.favorite == 'true' ? 'red':check_favorite ? 'red' : '#F58B03' }
                      style={{marginTop: 5}}
                    />
                  {/* </TouchableOpacity> */}
                </View>
  
                <Text style={styles.itemprice}>{item.price} .VNĐ</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <FontAwesome name="star" size={15} color="#F58B03" />
                  <Text style={styles.textstart}>4.8</Text>
                  <View style={styles.viewbottom}>
                    <Text style={styles.textbt}>Miễn Phí</Text>
                  </View>
                </View>
              </View>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  
  
  //   showrating = (product)=>{
  //     if(product.length>0){
  //       for(var i= 0; i<product.length; i++){
  //         if(product[i].favorite === 'true'){
  //           this.setState({
  //             check_favorite:true,
  //           });
            
  //         }else{
  //           this.setState({
  //             check_favorite:false,
  //           });
  //         }
  //       }
  //     }
  //   };
   }
  

  export default Favoritesection;
  
  const styles = StyleSheet.create({
    itemcontainer: {
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
      // fontFamily:'DancingScript-Bold'
      fontFamily: 'ArchivoNarrow-Italic',
    },
    viewbottom: {
      marginLeft: width * 0.3,
      backgroundColor: '#F58B03',
      paddingHorizontal: 20,
      borderRadius: 10,
      justifyContent: 'center',
    },
    textbt: {
      textAlign: 'center',
      color: 'white',
      fontSize: 12,
      fontFamily: 'ArchivoNarrow-Italic',
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
    textstart: {
      color: '#F58B03',
      // fontFamily:'DancingScript-Bold',
      fontFamily: 'ArchivoNarrow-Italic',
      marginLeft: 5,
      fontSize: 12,
    },
  });