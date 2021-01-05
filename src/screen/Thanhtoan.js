import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  NativeModules,
  NativeEventEmitter,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import getDataFromStorage from '../firebase/getDataFromStorage';
import RNMomosdk from 'react-native-momosdk';

const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);

const merchantname = 'myrestaurant';
const merchantcode = 'MOMOM4P920201210';
const merchantNameLabel = 'Nhà cung cap';
const billdescription = 'Thanh toán Momo';
const enviroment = '0'; //"1": production
const publicKey =
  'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlg+2jwLBqAauFr1e5cTb+Ojgccnpo3RsgNMHcWg6p8tHbiycAsbgeieYEOESCXNmotkvcD+fItEWXi95AcH3oOEKRFLEAJy2LBc/Ugk3HAOQHtOn5hnqC1lo1TrKH/Lm1DaE63/ivtuMTqgtyFjf/KgJdP0TP2kBMTXLpq79jswhUQ1uLiuZvO69NKCyHz+35m8smCyaNSKOz11RDwy+1YktZzqEPP3gGPm3NKEbuxaMMWLpi6fzJQ/LPB29i2p03FCWJJVUaT+W4dDmT0Q5HXb8zgr1/2bL7TGAYKyhseQnN/C4SEJ72yGi1TnXgjuM64STkDCUxX2+AGm6pXMNGw81ReRSe/xH+tyUsKPeMwAyrB4d9lLNoG9q40TBLJpfGt9IyI5tcv3Fuw9ooc93BFZluz5QVqX3eHfqmZCY/tqWvhORA6iynXxLjvBZpWCxcvY5kQKh/jd9MqrN8fke5r4cR4fsIQOseUay1b7uIe7hHU0msbmvYogcJxb6fpzMjVvI6FP1DprCDAtQsDWTmYNeD+jQf8bhYXSitPC8Fvk6aINUXpor1urd1m4fBtXzYhwThtzg7dtGDPBt3SL1wlHLrN2c8yqS1XxWGuPxbAR98l00dEppxJmUdhzTTWBzyZ0SRzPraOwNNEp4vLWtLGlNpfavOYmgvj8HO8QPp/UCAwEAAQ==';
import {
  actionAddBill,
  actaddBillTofirebase,
  actionGetuser,
  actFetUserlRequest,
} from '../redux/actions/index';
import {actFetchUpdateStatus} from '../redux/actions/Voucher';

const {height, width} = Dimensions.get('window');
class Thanhtoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check_textInputChange: false,
      check_textInputChangephone: false,
      check_momo: false,
      check_payment: false,
      address: '',
      phone: '',
      titile: '',
      check_address: false,
      check_phone: false,
      userID: '',
      check_httt: false,
      processing:false
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
          addr = user[i].address;
          ph = user[i].phoneUser;
        }
      }
      this.setState({
        check_textInputChange: false,

        address: addr,
        phone: ph,
      });
    }
  };
  componentDidMount() {
    this.props.fetRequestuser();
    setTimeout(() => {
      this.getuser();
    }, 1000);
    EventEmitter.addListener(
      'RCTMoMoNoficationCenterRequestTokenReceived',
      (response) => {
        console.log('<MoMoPay>Listen.Event::' + JSON.stringify(response));
        try {
          if (response && response.status == 0) {
            let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
            this.setState({
              description: JSON.stringify(response),
              processing: false,
            });
            let publicKey = publicKey;
            let momoToken = response.data;
            let phonenumber = response.phonenumber;
            let message = response.message;
            let orderId = response.refOrderId; //your orderId
            let requestId = response.refRequestId; //your requestId
            console.log('<MoMoPay>Listen.RequestTokenState:: ' + requestId);
            //continue to submit momoToken,phonenumber to server
          } else {
            this.setState({
              description: 'message: Get token fail',
              processing: false,
            });
          }
        } catch (ex) {}
      },
    );
  }

  formatNumberToMoney(number, defaultNum, predicate) {
    predicate = !predicate ? '' : '' + predicate;
    if (
      number == 0 ||
      number == '' ||
      number == null ||
      number == 'undefined' ||
      isNaN(number) === true ||
      number == '0' ||
      number == '00' ||
      number == '000'
    )
      return '0' + predicate;

    var array = [];
    var result = '';
    var count = 0;
    0;
    if (!number) {
      return defaultNum ? defaultNum : '' + predicate;
    }

    let flag1 = false;
    if (number < 0) {
      number = -number;
      flag1 = true;
    }

    var numberString = number.toString();
    if (numberString.length < 3) {
      return numberString + predicate;
    }

    for (let i = numberString.length - 1; i >= 0; i--) {
      count += 1;
      if (numberString[i] == '.' || numberString[i] == ',') {
        array.push(',');
        count = 0;
      } else {
        array.push(numberString[i]);
      }
      if (count == 3 && i >= 1) {
        array.push('.');
        count = 0;
      }
    }

    for (let i = array.length - 1; i >= 0; i--) {
      result += array[i];
    }

    if (flag1) result = '-' + result;

    return result + predicate;
  }

  //  Action to Request Payment MoMo App

  onPress = async (
    cart,
    address,
    phone,
    totalprice,
    userID,
    discout,
    titile,
  ) => {
    console.log(totalprice, 'tttt');
    let totalprices = this.formatNumberToMoney(totalprice, null, '');
    this.setState({totalprice: totalprices, description: ''});
    if (totalprice) {
      let jsonData = {};
      jsonData.enviroment = enviroment; //"0": SANBOX , "1": PRODUCTION
      jsonData.action = 'gettoken';
      jsonData.isDev = true; //SANBOX only , remove this key on PRODUCTION
      jsonData.merchantname = merchantname;
      jsonData.merchantcode = merchantcode;
      jsonData.merchantnamelabel = merchantNameLabel;
      jsonData.description = billdescription;
      jsonData.amount = totalprice;
      jsonData.orderId = 'MM154045647257';
      jsonData.requestId = 'MM154045647257';
      jsonData.orderLabel = 'MHD' + new Date().getDate();
      jsonData.publicKey = publicKey;
      jsonData.appScheme = 'momom4p920201210'; // iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme
      console.log('data_request_payment ' + JSON.stringify(jsonData));
      console.log('data_request_payment ' + JSON.stringify(jsonData));
      //let newValue = totalprice.replace(/\./g, '').trim();

      if (Platform.OS === 'android') {
        let dataPayment = await RNMomosdk.requestPayment(jsonData);
        this.momoHandleResponse(dataPayment);
        this.props.onAddBill(
          cart,
          address,
          phone,
          totalprice,
          userID,
          discout,
          titile,
        );

        console.log('data_request_payment ' + dataPayment.status);
      } else {
        RNMomosdk.requestPayment(JSON.stringify(jsonData));
      }
      //  this.setState({processing: true, description:'' });
    } else {
      this.setState({description: '.....', processing: false});
    }
  };

  async momoHandleResponse(response) {
    try {
      if (response && response.status == 0) {
        let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
        this.setState({
          description: JSON.stringify(response),
          processing: true,
        });

        setTimeout(() => {
          this.props.navigation.navigate('DonHang');
          ToastAndroid.show(' Thanh toán thành công', ToastAndroid.SHORT);
        }, 1000);
        let momoToken = response.data;
        let phonenumber = response.phonenumber;
        let message = response.message;

        console.log('data_request_paymentkkkkk ' + JSON.stringify(response));

        //continue to submit momoToken,phonenumber to server
      } else {
        this.setState({
          description: 'message: Get token fail',
          processing: false,
        });
      }
    } catch (ex) {}
  }
  render() {
    var {route, navigation} = this.props;
    var {totalprice, voucherId, discout, voucherIds} = route.params;
    var {phone, userID, titile, address} = this.state;
    var {cart} = this.props;
    // console.log(voucherIds,'vcid');
    var {
      check_textInputChange,
      check_textInputChangephone,
      check_momo,
      check_payment,
      check_httt,
    } = this.state;
    const showAlert = () => {
      this.props.navigation.navigate('DonHang');
      ToastAndroid.show(' Đặt hàng thành công', ToastAndroid.SHORT);
      // Alert.alert(
      //   'Alert ',
      //   'đặt hàng thành công',
      //   [{onPress: () => this.props.navigation.navigate('DonHang')}],
      //   {cancelable: true},
      // );
    };
    const textInputChangephone = (phone) => {
      if (phone.length < 6) {
        this.setState({
          check_textInputChangephone: true,
          phone,
        });
      } else {
        this.setState({
          check_textInputChangephone: false,
          phone,
        });
      }
    };
    const textInputChange = (address) => {
      if (address.length < 6) {
        this.setState({
          check_textInputChange: true,

          address,
        });
      } else {
        this.setState({
          check_textInputChange: false,

          address,
        });
      }
    };
    const checkmomo = () => {
      this.setState({
        check_momo: false,
        check_payment: true,
        titile: 'Cash on Delivery',
        check_httt: false,
      });
    };
    const checkpayment = () => {
      this.setState({
        check_momo: true,
        check_payment: false,
        titile: 'Payment-Momo',
        check_httt: false,
      });
    };

    const paymentCashonDel = async (
      cart,
      address,
      phone,
      totalprice,
      userID,
      voucherIds,
      discout,
      voucherId,
      titile,
    ) => {
      var userID = await this.getData();
      if (address == 0) {
        this.setState({
          check_httt: false,
          check_textInputChange: true,
          check_textInputChangephone: false,
        });
      }
      if (phone == 0) {
        this.setState({
          check_textInputChange: false,
          check_textInputChangephone: true,
          check_httt: false,
        });
      }

      if (
        address != 0 &&
        phone != 0 &&
        titile == 'Cash on Delivery' &&
        voucherIds != 0
      ) {
        this.props.onAddBill(
          cart,
          address,
          phone,
          totalprice,
          userID,
          discout,
          titile,
        );

        this.props.updateStatus(voucherIds, userID, voucherId);
        //console.log(cart,'Car');
        showAlert();
        this.props.navigation.navigate('DonHang');
      } else if (address != 0 && phone != 0 && titile == 'Payment-Momo') {
        this.setState({
          check_httt: false,
          check_textInputChange: false,

          check_textInputChangephone: false,
          phone,
        });

        this.onPress(cart, address, phone, totalprice, userID, discout, titile);

      } 
      
      else if (address != 0 && phone != 0 && titile == 'Payment-Momo'&&  voucherIds != 0) {
        this.setState({
          check_httt: false,
          check_textInputChange: false,

          check_textInputChangephone: false,
          phone,
        });

        this.onPress(cart, address, phone, totalprice, userID, discout, titile);
        this.props.updateStatus(voucherIds, userID, voucherId);

      } else if (address != 0 && phone != 0 && titile == 'Cash on Delivery') {
        this.props.onAddBill(
          cart,
          address,
          phone,
          totalprice,
          userID,
          discout,
          titile,
        );
        this.setState({ processing: true});
        //console.log(cart,'Car');
        showAlert();
      } else {
        this.setState({
          //check_textInputChange: true,
          check_httt: true,

          // check_textInputChangephone: true,
          phone,
        });
      }
    };
    return (
      <View>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            borderRadius: 20,
          }}>
          <View style={styles.viewthanht}>
            <Text style={styles.viewtext}>Địa chỉ giao hàng:</Text>
            <View>
              <TextInput
                style={styles.textinput}
                value={address}
                onChangeText={(address) =>
                  textInputChange(address)
                }></TextInput>
              {check_textInputChange ? (
                <Text style={styles.textfail}>Địa chỉ không bỏ trống</Text>
              ) : null}
            </View>
            <Text style={styles.viewtext}>Số điện thoại:</Text>

            <TextInput
              style={styles.textinput}
              // placeholder="Nhập Số điện thoại"
              value={phone}
              keyboardType={'number-pad'}
              onChangeText={(phone) => textInputChangephone(phone)}></TextInput>
            {check_textInputChangephone ? (
              <Text style={styles.textfail}>Số điện thoại không bỏ trống</Text>
            ) : null}
            <Text style={styles.viewtext}>Hình thức thanh toán:</Text>
            <TouchableWithoutFeedback onPress={() => checkmomo()}>
              <View style={styles.textinputbt}>
                <Text>Thanh toán khi nhận hàng</Text>
                {check_payment ? (
                  <View style={{justifyContent: 'center'}}>
                    <Feather name="check-circle" color="#F58B03" size={20} />
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
            {check_httt ? (
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.textfail}>Chọn hình thức thanh toán</Text>
              </View>
            ) : null}
            <TouchableWithoutFeedback onPress={() => checkpayment()}>
              <View style={styles.textinputbt}>
                <Text>Ví momo</Text>
                {check_momo ? (
                  <View style={{justifyContent: 'center'}}>
                    <Feather name="check-circle" color="#F58B03" size={20} />
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity
              onPress={() =>
                paymentCashonDel(
                  cart,
                  address,
                  phone,
                  totalprice,
                  userID,
                  voucherIds,
                  discout,
                  voucherId,
                  titile,
                )
              }>
              <View style={styles.viewdh}>
                <Text style={styles.textdh}>Thanh Toán</Text>
              </View>
            </TouchableOpacity>
          </View>
          {this.state.processing ? (
            <ActivityIndicator size="large" color="#000" />
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    uservoucher: state.uservoucher,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddBill: (cart, address, phone, totalprice, userID, discout, titile) => {
      dispatch(
        actaddBillTofirebase(
          cart,
          address,
          phone,
          totalprice,
          userID,
          discout,
          titile,
        ),
      );
    },
    fetRequestuser: () => {
      dispatch(actFetUserlRequest());
    },
    updateStatus: (voucherIds, userID, voucherId) => {
      dispatch(actFetchUpdateStatus(voucherIds, userID, voucherId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Thanhtoan);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#F58B03',

    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 5,
  },
  viewtextm: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyle: {
    //alignItems: 'center',
    //textAlign: 'center',
    marginLeft: width * 0.32,
    fontSize: 20,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Bold',
  },
  viewthanht: {
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: '#FFF',
    // borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  viewtext: {
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
    marginLeft: 10,
    paddingBottom: 10,
    marginTop: 20,
  },

  textinput: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    // paddingVertical: 10,
    // paddingHorizontal: width * 0.35,
  },
  textfail: {
    fontSize: 15,
    color: 'red',
    fontFamily: 'ArchivoNarrow-Regular',
    marginLeft: 10,
  },

  textinputbt: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#F8F8FF',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  viewdh: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F58B03',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  textdh: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Regular',
  },
});
