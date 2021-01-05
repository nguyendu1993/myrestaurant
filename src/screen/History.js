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
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width} = Dimensions.get('window');
import DonHangsection from '../../src/component/DonHangsection';

import {actFetcBillRequest,actFetcBillRequestStatus} from '../redux/actions/index';
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID:''
    }
  };
  
  componentDidMount() {
    this.getbill();
  }
  getbill= async()=>{
    var userID= await this.getData();
   // console.log(userID,"sid");
    this.props.fetAllbills(userID);

  }
  async getData() {
    return await AsyncStorage.getItem('userID');
  }
  render() {
    var {bills} = this.props;
   
    // console.log(bills);
    const {navigation, onPress} = this.props;
    return (
      <View style={{flex: 1}}>
       

        <View style={styles.listItemContainer}>
          <ScrollView>
            {/* //{this.props.children} */}
            {this.showbills(bills,navigation)}
          </ScrollView>
        </View>
      </View>
    );
  }

  showbills(bills, navigation) {
  
    if (bills.length > 0) {
      return (
        <FlatList
          data={bills}
           keyExtractor={(item) => item.billid.toString()}
          renderItem={({item}) => (
            <DonHangsection key={item.billid} bill={item} navigation={navigation} />
          )}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bill,
  };
};

const mapDispatchToProps = (dispatch, props,userID) => {

  return {
    fetAllbills:(userID) => {

      dispatch(actFetcBillRequestStatus(userID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#F58B03',
    // backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding:5
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
   
    marginTop: 5,
    paddingLeft: 16,
    paddingRight: 16,
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
  //////////////
});
