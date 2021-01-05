import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
  SafeAreaView,
  Image,
  NativeModules,
  NativeEventEmitter,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
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
export default class Oder extends Component {
  state = {
    // total: this.formatNumberToMoney(totalprice, null, ''),
    totalprice: '',
    phone: '',
    address: '',
    processing: false,
    description: '',
  };
  componentDidMount() {
    const {route} = this.props;
    const {cart, address, phone, totalprice, UserID} = route.params;
    // Listen for native events
    // let me = this;
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

    //OPTIONAL
    EventEmitter.addListener(
      'RCTMoMoNoficationCenterRequestTokenState',
      (response) => {
        console.log('<MoMoPay>Listen.RequestTokenState:: ' + response.status);
        // status = 1: Parameters valid & ready to open MoMo app.
        // status = 2: canOpenURL failed for URL MoMo app
        // status = 3: Parameters invalid
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

  onPress = async (address, totalprice) => {
    if (!this.state.totalprice) {
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
      jsonData.orderLabel = 'Ma don hang';
      jsonData.publicKey = publicKey;
      jsonData.appScheme = 'momozgfy20201022'; // iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme
      console.log('data_request_payment ' + JSON.stringify(jsonData));
      console.log('data_request_payment ' + JSON.stringify(jsonData));
      if (Platform.OS === 'android') {
        let dataPayment = await RNMomosdk.requestPayment(jsonData);
        this.momoHandleResponse(dataPayment);

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
          processing: false,
        });

        setTimeout(() => {
          this.props.navigation.navigate('Home');
          ToastAndroid.show(' TT thanfhc công', ToastAndroid.SHORT);
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
    let {textAmount, description} = this.state;
    const {route} = this.props;
    const {cart, address, phone, totalprice, UserID} = route.params;

    var total = this.formatNumberToMoney(totalprice, null, '');

    console.log(totalprice, 'tt');
    onChangeText = (value) => {
      let newValue = value.replace(/\./g, '').trim();
      let totalprice = this.formatNumberToMoney(newValue, null, '');
      this.setState({totalprice: newValue, total: totalprice, description: ''});
    };
    return (
      <SafeAreaView
        style={{flex: 1, marginTop: 50, backgroundColor: 'transparent'}}>
        <View style={styles.container}>
          <View
            style={[
              {
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
              },
            ]}>
            <Image style={{flex: 1, width: 100, height: 100}} />
          </View>
          <Text style={[styles.text, {color: 'red', fontSize: 20}]}>
            {'MOMO DEVELOPMENT'}
          </Text>
          <Text style={[styles.text, {color: 'red', fontSize: 18}]}>
            {'React native version'}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: '#000',
                fontSize: 14,
                marginVertical: 5,
                textAlign: 'left',
                marginTop: 20,
              },
            ]}>
            {'MerchantCode : ' + merchantcode}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: '#000',
                fontSize: 14,
                marginVertical: 5,
                textAlign: 'left',
              },
            ]}>
            {'MerchantName : ' + merchantname}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: '#000',
                fontSize: 14,
                marginVertical: 5,
                textAlign: 'left',
              },
            ]}>
            {'Description : ' + billdescription}
          </Text>
          <View style={styles.formInput}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{flex: 1, fontSize: 18, paddingHorizontal: 10}}>
                {'Total amount'}
              </Text>
              <TextInput
                autoFocus={true}
                maxLength={10}
                placeholderTextColor={'#929292'}
                placeholder={'Enter amount'}
                keyboardType={'numeric'}
                returnKeyType="done"
                value={total == 0 ? '' : total}
                style={[styles.textInput, {flex: 1, paddingRight: 30}]}
                onChangeText={this.onChangeText}
                underlineColorAndroid="transparent"
              />
              <Text style={{position: 'absolute', right: 20, fontSize: 30}}>
                {'đ'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => this.onPress(address, totalprice)}
            style={styles.button}>
            {this.state.processing ? (
              <Text style={styles.textGrey}>
                Waiting response from MoMo App
              </Text>
            ) : (
              <Text style={styles.text}>Confirm Payment</Text>
            )}
          </TouchableOpacity>
          {this.state.processing ? (
            <ActivityIndicator size="small" color="#000" />
          ) : null}
          {/* {description != '' ? (
            <Text style={[styles.text, {color: 'red'}]}>{description}</Text>
          ) : null} */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  textInput: {
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 5,
    height: 40,
    paddingBottom: 2,
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
  },
  formInput: {
    backgroundColor: '#FFF',
    borderBottomColor: '#dadada',
    borderTopColor: '#dadada',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#b0006d',
    borderRadius: 4,
    marginHorizontal: 40,
    marginVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textGrey: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
  },
});
