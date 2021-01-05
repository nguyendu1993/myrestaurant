import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  actFetchRequetVoucher,
  actFetchRequetusreVoucher,
} from '../redux/actions/Voucher';
import Vouchersection from '../component/Vouchersection';
import AsyncStorage from '@react-native-community/async-storage';

class Voucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vouchers: [],
    };
    this.getuserVoucher();
  }
  async getData() {
    return await AsyncStorage.getItem('userID');
  }
  getuserVoucher = async (uservoucher, voucher) => {
    // var newdat = await uservoucher.filter((item) => item.status == 0);
    // console.log(newdat,'sn')
    const vouchs = [];
    for (var i = 0; i < uservoucher.length; i++) {
      for (var j = 0; j < voucher.length; j++) {
        if (uservoucher[i].voucherId == voucher[j].voucherId) {
          vouchs.push(voucher[j]);
        }
      }
    
      this.setState({vouchers: vouchs});

      console.log(uservoucher, 'news');
    }
  };
  componentDidMount = async () => {
    const {voucher, navigation, uservoucher} = this.props;
    var userID = await this.getData();
    this.props.fetRequestVoucher();
    this.props.fetRequesUstVoucher(userID);
    setTimeout(() => {
      this.getuserVoucher(uservoucher, voucher);
    });
  };
  render() {
    const {vouchers} = this.state;

    const {voucher, navigation, uservoucher} = this.props;
    console.log(uservoucher.length, 's');
    return (
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <ScrollView>{this.showVocher(vouchers, navigation)}</ScrollView>
      </View>
    );
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
}

// getuserVoucher = async (vocher, uservoucher) => {
//   var userID = await this.getData();
//   var usid = [];
//   for (var i = 0; i < uservoucher.length; i++) {
//     for (var j = 0; j < vocher.length; j++) {
//       if (uservoucher[i].voucherId == vocher[j].vocherId) {
//         vocher.push(...uservoucher);
//         console.log(vocher, 'aaaaaaaaaaaaaaaaaaaaaaaaaa');
//       }
//     }
//   }
// };
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
export default connect(mapStateToProps, mapDispatchToProps)(Voucher);
