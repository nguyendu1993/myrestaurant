import React, { Component } from 'react';
import {  View, Text ,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {connect} from 'react-redux';

 class Vouchersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {vouche,navigation}= this.props
    return (
    
        <View style={{backgroundColor: 'white', flex: 1}}>
                      <TouchableOpacity    onPress={() => this.onAddItem({item:vouche})} >

        <View
          style={{
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
          }}>
          <View style={styles.viewVocher}>
            <Text style={styles.TextVocher}>{vouche.discount}%</Text>
          </View>
          <View style={styles.viewRightVC}>
        <Text style={{fontSize: 15}}> {vouche.description}</Text>
            <Text
              style={{
                color: '#F58B03',
                fontSize: 13,
                fontFamily: 'ArchivoNarrow-Italic',
              }}>
              Mã giảm giá : {vouche.code}
            </Text>
              <View style={styles.viewbtn}>
                <Text
                  style={{
                    color: 'white',
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'ArchivoNarrow-Italic',
                  }}>
                  Sử dụng
                </Text>
              </View>
            
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
  }

  onAddItem = (item) => {
   // console.log(item,'its');
   // this.props.onAddToItem(item);
   
    this.props.navigation.navigate('GioHang')
    // this.props.onChangeMessage(Message.MSG_ADD_TO_CART_SUCCESS);
  };
}


export default (Vouchersection);

const styles = StyleSheet.create({
    viewVocher: {
      backgroundColor: '#1EC424',
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 10,
    },
    TextVocher: {
      color: 'white',
      fontSize: 20,
    },
    viewRightVC: {
      marginLeft: 20,
      marginTop: 10,
    },
    viewbtn: {
      marginTop: 10,
      width:100,
      height:30,
      backgroundColor: '#F58B03',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  