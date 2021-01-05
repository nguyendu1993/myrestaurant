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
} from 'react-native';

const {height, width} = Dimensions.get('window');

class Categorysection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {category} = this.props;

    return (
      <View>
        <View style={styles.itemContainer}>
          <Image source={{uri:category.imagesKindFood}} style={styles.imgitem}></Image>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: width * 0.47,
              height: width * 0.6,
              alignSelf: 'stretch',
              position: 'relative',
              borderRadius: 10,

              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <Text style={styles.textname}>{category.nameKindFood}</Text>
            <Text style={styles.textname}>{category.quantity}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Categorysection;

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      backgroundColor: '#F58B03',
      // backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      // padding:5
    },
    viewtextm: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textstyle: {
      alignItems: 'center',
      textAlign: 'center',
      marginLeft: width * 0.32,
      fontSize: 20,
      color: 'white',
      fontFamily: 'ArchivoNarrow-Bold',
    },
    imgitem: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.47,
      height: width * 0.6,
      borderRadius: 10,
    },
    viewtext: {
      alignItems: 'center',
      marginTop: -width * 0.35,
    },
    textname: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'ArchivoNarrow-MediumItalic',
    },
    listItemContainer: {
      flexDirection: 'row',
      marginBottom: 40,
      padding: 5,
    },
  
    itemContainer: {
      width: width * 0.5,
      height: width * 0.6,
      marginBottom: 10,
  
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewitem: {
      flexDirection: 'row',
      justifyContent: 'space-around',
  
      paddingHorizontal: 20,
    },
    textitem: {
      fontSize: 17,
      fontWeight: 'bold',
    },
  });
  