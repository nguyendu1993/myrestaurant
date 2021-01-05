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
  Modal,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import Vouchersection from '../component/Vouchersection';

const {height, width} = Dimensions.get('window');
import {
  actFetchRequetVoucher,
  actFetchRequetusreVoucher,
} from '../redux/actions/Voucher';
class CartResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery: 1,
      discout: '',
      description: '',
      check_voucher: false,
      vouchers: [],
      voucherIds: '',
      voucherId: '',
    };
  }
  async getData() {
    return await AsyncStorage.getItem('userID');
  }

  componentDidMount = async () => {
    const {voucher, navigation, uservoucher} = this.props;
    var userID = await this.getData();
    this.props.fetRequestVoucher();

    this.getuserVoucher(uservoucher, voucher);
    setTimeout(() => {
      this.props.fetRequestVoucher();
      this.props.fetRequesUstVoucher(userID);
    });
  };
  render() {
    const {vouchers, voucherIds, voucherId} = this.state;

    var {cart, navigation} = this.props;
    var {
      discout,

      check_voucher,
    } = this.state;

    const {voucher, uservoucher} = this.props;
    //console.log(uservoucher, 'aaaaaaa');
    const checkfdiscout = () => {
      if (!check_voucher) {
        this.setState({
          check_voucher: true,
        });
      } else {
        this.setState({
          check_voucher: false,
        });
      }
    };
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => checkfdiscout()}>
          <View style={styles.viewGiamgia}>
            <Text>Sử dụng mã giảm giá: {this.state.description} </Text>
            <View
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="chevron-right" color="gray" size={30} />
            </View>
          </View>
        </TouchableOpacity>
        {check_voucher ? (
          <View style={{paddingLeft: 10, paddingRight: 10}}>
            <FlatList
              data={vouchers}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => this.getItem(item, uservoucher)}>
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
                      <Text style={styles.TextVocher}>{item.discount}</Text>
                    </View>
                    <View style={styles.viewRightVC}>
                      <Text style={{fontSize: 15}}> {item.description}</Text>
                      <Text
                        style={{
                          color: '#F58B03',
                          fontSize: 13,
                          fontFamily: 'ArchivoNarrow-Italic',
                        }}>
                        Mã giảm giá : {item.code}
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
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
        <View style={styles.viewtt}>
          <View style={styles.viewtts}>
            <Text style={styles.textt}>Tạm Tính</Text>
            <Text style={styles.textt}>{this.showTotalAmount(cart)} VNĐ</Text>
          </View>
          <View style={styles.viewtts}>
            <Text style={styles.textt}>Phí vận chuyển</Text>
            <Text style={styles.textt}>0</Text>
          </View>
        </View>
        <View style={styles.viewhr} />
        <View style={styles.viewtts1}>
          <Text style={styles.textt}>Tổng tiền</Text>

          <Text style={styles.texttt}>
            {this.showtotal(cart, discout)} VNĐ{' '}
          </Text>
        </View>
        <View
        >
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Thanhtoan', {
                totalprice: this.showtotal(cart, discout),
                voucherId: voucherId,
                discout: discout,
                voucherIds: voucherIds,
              })
            }>
            <View style={styles.viewdh}>
              <Text style={styles.textdh}>Đặt Hàng</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
  getuserVoucher = async (uservoucher, voucher) => {
    const vouchs = [];
    for (var i = 0; i < uservoucher.length; i++) {
      for (var j = 0; j < voucher.length; j++) {
        if (uservoucher[i].voucherId == voucher[j].voucherId) {
          vouchs.push(voucher[j]);
        }
      }

      this.setState({vouchers: vouchs});

      //console.log(vouchs, 'new');
    }
  };
  getItem = (item, uservoucher) => {
    // this.setState({
    //   check_voucher: false,
    //   description: item.description,
    //   discout: item.discount,
    //   //voucherIds:item.voucherId

    // });
    var itemid = '';
    for (var i = 0; i < uservoucher.length; i++) {
      if (item.voucherId == uservoucher[i].voucherId) {
        itemid = uservoucher[i].idvc;
      }
    }
    // console.log(itemid ,'itemid');

    this.setState({
      check_voucher: false,
      description: item.description,
      discout: item.discount,
      voucherIds: itemid,
      voucherId: item.voucherId,
    });

    // console.log(voucherIds,"sgss");
  };
toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  showVocher(vouchers, navigation) {
    var result = null;
    if (vouchers.length > 0) {
      result = vouchers.map((vouche, index) => {
        return (
          <Vouchersection key={index} vouche={vouche} navigation={navigation} />
        );
      });
    }
    return result;
  }
  showTotalAmount = (cart) => {
    var total = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        total += cart[i].product.price * cart[i].quantity;
      }
    }
    // var result= this.toCommas(total);
    return total;
  };
  showfailkm = (cart, discout) => {
    var result = this.showtotal(cart, discout);
    if (result == false) {
      this.setState({
        check_textInputChange: true,
      });
    } else {
      this.setState({
        check_textInputChange: false,
      });
    }
  };
  showtotal = (cart, discout) => {
    var i = 0;
    var tt = this.showTotalAmount(cart);
    // console.log(tt);

    if (discout) {
      i = tt - (tt / 100) * discout;
      return i;
    } else {
      return tt;
    }
  };
}
const mapStateToProps = (state) => {
  return {
    voucher: state.voucher,
    uservoucher: state.uservoucher,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetRequestVoucher: () => {
      dispatch(actFetchRequetVoucher());
    },
    fetRequesUstVoucher: (userID) => {
      dispatch(actFetchRequetusreVoucher(userID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartResult);

const styles = StyleSheet.create({
  textinput: {
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
  },
  viewtt: {
    marginLeft: 20,
    marginRight: 20,
  },
  viewGiamgia: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  viewtts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewtts1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  textt: {
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
  },
  viewhr: {
    padding: 5,
    marginLeft: 20,
    marginRight: 20,

    alignItems: 'center',
    borderColor: 'black',
    borderTopWidth: 0.5,
    marginTop: 10,
  },
  viewdh: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F58B03',
    marginHorizontal: width * 0.3,
    paddingVertical: width * 0.03,
    borderRadius: 10,
  },
  textdh: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Medium',
  },
  texttt: {
    fontSize: 17,
    color: 'red',
    fontFamily: 'Arc80.5hivoNarrow-Medium',
  },
  textfail: {
    fontSize: 13,
    color: 'red',
    marginLeft: 20,
    fontFamily: 'ArchivoNarrow-Medium',
  },

  centeredView: {
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: width*0.5,
    // // justifyContent: 'center',
    // height: '50%',
    backgroundColor: 'red',
    height: '50%',
  },
  // modalView: {
  //   backgroundColor: '#FFF',
  //   flex: 1,

  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,

  //   elevation: 5,
  // },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTouchable: {
    backgroundColor: '#9bc31c',
    width: '85%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
  },
  titleBtn: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'GothamMedium',
  },
  centeredView1: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },

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
    width: 100,
    height: 30,
    backgroundColor: '#F58B03',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
