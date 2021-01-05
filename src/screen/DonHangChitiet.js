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
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';

const {height, width} = Dimensions.get('window');
import CartDetail from '../../src/component/CartDetail';
import h1 from '../images/h2.jpg';

import CartDonHang from '../../src/component/CartDonHang';
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};
const labels = [
  'Đặt hàng',
  'Chờ xử lý',
  'Vận chuyển',
  'Giao hàng',
  'Hoàn thành',
];

import {
  actFetcBillDetailRequest,
  actFetchUpdateStatusbill,actFetcBillRequest
} from '../redux/actions/index';
class DonHangChitiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      chek_status: false,
    };
  }
  getbill= async()=>{
    var userID= await this.getData();
  //  console.log(userID,"sid");
    this.props.fetAllbills(userID);

  }
  async getData() {
    return await AsyncStorage.getItem('userID');
  }
  componentDidMount() {
    var {route} = this.props;
    var {bills} = route.params;
    //console.log(bills,'id')
    this.props.fetAllbilldetails(bills.billid);
    this.getbill();

    this.setState({currentPosition: bills.status});
    if (bills.status == 3) {
      this.setState({chek_status: true});
    
    }
  }
  componentDidUpdate(prevProps) {
     var {bill} = this.props;
    // var {bills} = route.params;
    // var prevProps={bills}
    // console.log(this.state.currentPosition,"f")
    // if(bills.status!== prevProps.bills.status){
    //   this.setState({currentPosition: bills.status});
    //   console.log("ddd");

    // }


    // if (bill) {
    //   if (this.state.pro.id !== prevState.comments[0].foodID) {
    //     setTotal(comments);
    //   }
    // }
  }

  render() {
    //console.log(bill.cart);
    var {route} = this.props;
    var {bills} = route.params;
    const {cartdetail, navigation, onPress,bill} = this.props;
   console.log(bill,"cảefff");
    const {chek_status} = this.state;
    return (
      <View style={{flex: 1}}>
        {/* <StatusBar hidden={true} /> */}
        <View style={{marginTop: 10}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={labels}
          />
        </View>

        <View style={styles.listItemContainer}>
          <ScrollView>
            {/* //{this.props.children} */}

            {this.showbills(cartdetail)}
            {this.showTotalAmountcart(cartdetail)}
          </ScrollView>
        </View>
        {chek_status ? (
          <View
            style={{
              width: '100%',

              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableOpacity
              onPress={() => this.onClose(bills, navigation)}
              style={styles.bottomView}>
              <View>
                <Text style={styles.textStyle}>Xác Nhận</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
  onClose = (bills, nagivation) => {
    this.props.updateStatusbill(bills);
    nagivation.navigate('DonHang');
  };
  // onPageChange(position) {
  //   this.setState({currentPosition: position});
  // }
  showbills(cartdetail, navigation) {
    if (cartdetail.length > 0) {
      return (
        <FlatList
          data={cartdetail}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <CartDetail
              key={item.id}
              cartdetail={item}
              navigation={navigation}
            />
          )}
        />
      );
    }
  }
  showTotalAmountcart = (cartdetail, navigation) => {
    var result = null;
    if (cartdetail.length > 0) {
      result = <CartDonHang cartdetail={cartdetail} navigation={navigation} />;
    }
    return result;
  };
}

const mapStateToProps = (state) => {
  return {
    cartdetail: state.cartdetail,
    bill: state.bill,

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetAllbilldetails: (id) => {
      dispatch(actFetcBillDetailRequest(id));
    },
    updateStatusbill: (bills) => {
      dispatch(actFetchUpdateStatusbill(bills));
    },
    fetAllbills:(userID) => {

      dispatch(actFetcBillRequest(userID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DonHangChitiet);

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
    // flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    /// backgroundColor: '#FFF',
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
  bottomView: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#F58B03',
    borderRadius: 10,
    // elevation: 2,
  },
  textStyle: {
    color: '#fff',
    fontSize: 22,
  },
  //////////////
});
