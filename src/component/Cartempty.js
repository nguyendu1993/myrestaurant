import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebaseConfig from '../firebase/firebase';
const {height, width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
class Cartempty extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.todos);
    return (
      <View style={{ flex: 1,
        alignItems: 'center',
        justifyContent: 'center',}}>
        <View style={styles.viewcart}>
         
          <FontAwesome name="shopping-cart" size={150} color="#F58B03" />
          <Text style={styles.textstyle}>Trống</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.tasks,
  };
};
export default connect(mapStateToProps, null)(Cartempty);

const styles = StyleSheet.create({
  viewcart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    textAlign:'center',
    marginTop:width/2,
    width:width/2,
    height:width/2,
    borderRadius:width/2,
  
  },
  textstyle:{
    textAlign: 'center',
    fontFamily: 'ArchivoNarrow-Medium',
    fontSize: 17,
  }
});
