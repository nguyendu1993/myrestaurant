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
} from 'react-native';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

class CartDonHang extends Component {
  constructor(props) {
    super(props);
    this.state = {delivery: 1, discout: ''};
  }
  render() {
    var {cartdetail, navigation} = this.props;
    var {discout} = this.state;
    // console.log(cartdetail,"cart");
    return (
      <View>
        <View style={styles.viewhr} />
        <View style={styles.viewtt}>
          <View style={styles.viewtts}>
            <Text style={styles.textt}>Tổng tiền sản phẩm :</Text>
            <Text style={styles.textt}>
              {this.showTotalAmount(cartdetail)} VNĐ
            </Text>
          </View>
          <View style={styles.viewtts}>
            <Text style={styles.textt}>Khuyến mãi :</Text>
            <Text style={styles.textt}> {this.showkm(cartdetail)} % </Text>
          </View>
          <View style={styles.viewtts}>
            <Text style={styles.textt}>Phí vận chuyển :</Text>
            <Text style={styles.textt}>0 VNĐ</Text>
          </View>
          <View style={styles.viewtts}>
            <Text style={styles.texttspprice}>Tổng Tiền : </Text>
            <Text style={styles.textprice}>
              {this.showtotalprice(cartdetail)} VNĐ
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginRight: 20,
          }}>
          <Text style={styles.texttt}></Text>
        </View>
      </View>
    );
  }
  showTotalAmount = (cartdetail) => {
    var total = 0;
    if (cartdetail.length > 0) {
      for (var i = 0; i < cartdetail.length; i++) {
        total += cartdetail[i].price * cartdetail[i].quantity;
      }
    }
    return total;
  };
  showkm = (cartdetail) => {
    var ipt = 0;
    var tt = this.showTotalAmount(cartdetail);
     console.log(tt);
    if (cartdetail.length > 0) {
      for (var i = 0; i < cartdetail.length; i++) {
        ipt = Math.round((tt - cartdetail[i].totalprice) / (tt / 100));
        //  console.log(cartdetail, 'hnh');
      }
    }
    return ipt;
  };

  showtotalprice = (cartdetail) => {
    var totalprice = 0;
    if (cartdetail.length > 0) {
      for (var i = 0; i < cartdetail.length; i++) {
        totalprice = cartdetail[i].totalprice;
      }
      // console.log(totalprice, 'sss');
    }
    return totalprice;
   

  };
  
}
export default CartDonHang;
const styles = StyleSheet.create({
  viewtt: {
    // marginLeft: 20,
    // marginRight: 20,
  },
  viewtts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textt: {
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
  },
  viewhr: {
    padding: 5,
    //marginLeft: 20,

    alignItems: 'center',
    borderColor: 'black',
    borderTopWidth: 0.5,
    marginTop: 20,
  },

  texttt: {
    fontSize: 17,
    color: 'red',
    fontFamily: 'ArchivoNarrow-Medium',
  },
  textprice: {
    color: 'red',
    fontFamily: 'ArchivoNarrow-Medium',
    fontSize: 17,
  },
  texttspprice: {
    fontFamily: 'ArchivoNarrow-Medium',
    fontSize: 17,
  },
});
//tt spc km/(tt/100)
