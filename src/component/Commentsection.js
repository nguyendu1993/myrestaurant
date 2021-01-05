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
import avatar from '../images/us.png';
import moment from "moment";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import cancel from '../images/cancel.png';
import * as Message from './../redux/constants/Message';
import {FlatList} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';
import OptionsMenu from "react-native-option-menu";
import h1 from '../../src/images/menu.png';

import StarRating from './StarRating'
class Commentsection extends Component {
  render() {
    var {comment} = this.props;
   
    return (
        <View style={{backgroundColor:'white',flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', marginTop:10,paddingLeft:10}}>
        
        <Image source={avatar} style={styles.viewimg}></Image>
        <Text style={styles.textName}> {comment.nameUser} </Text>
      </View>
      <View style={styles.viewitem}>
      {/* <OptionsMenu
button={h1}
buttonStyle={{ width: 25, height: 25, margin: 10, resizeMode: "contain" }}
destructiveIndex={2}
options={["Edit", "Delete", ]}

/> */}

        </View>
        </View>
    
        <View style={{flexDirection:'row',marginTop:10,paddingLeft:10}}>
        <StarRating ratings={comment.star}  />
        <Text> {moment(comment.date).fromNow()}</Text>
        </View>

        <Text style={styles.textComment}>{comment.comments}</Text>
        <View style={styles.viewhr} />
      </View>
    );
  }
}

export default Commentsection;
const styles = StyleSheet.create({
    viewimg: {
        width: 40,
        height: 40,
      },
      textName:{
        fontSize: 17,
        fontFamily: 'ArchivoNarrow-Regular',
        marginLeft: 10,
      },
      textComment:{
        fontSize: 15,
        marginLeft: 10,
        marginTop: 5,

      },
      viewhr: {
        padding: 5,
        marginLeft: 10,
        marginRight: 20,
        alignItems: 'center',
        borderColor: 'black',
        borderTopWidth: 0.5,
        marginTop: 10,
      },
});
