import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  Easing,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import firebaseApp from '../../firebase/firebase';
import auth from '@react-native-firebase/auth';
import bgr from '../../images/Food3.png';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref('User');
    this.state = {
      nameUser: '',
      mailUser: '',
      passwordUser: '',
      confirmpasswordUser: '',
      phoneUser: '',
      imageUser: '',
      status: '',
      address: '',
      userID: '',
      idOnesignal:'',
      check_textInputChange: false,
      check_textInputChangeemail: false,
      check_password: false,
      check_passwordfail: false,
      check_infor: false,
    };
  }
  async componentDidMount(){
       var Id = await AsyncStorage.getItem('idOnesignal');
       if(Id){
this.setState({
      idOnesignal: Id,
    });
    console.log(this.state.idOnesignal)
       }
    
  }

  dangKyUser() {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var getdate = date + '/' + month + '/' + year;
    // + ' ' + hours + ':' + min + ':' + sec;

    if (
      this.state.nameUser == '' ||
      this.state.phoneUser == '' ||
      this.state.mailUser == '' ||
      this.state.passwordUser == '' ||
      this.state.confirmpasswordUser == ''
    ) {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
      this.setState({
        check_infor: true,
        check_textInputChange: false,
        check_textInputChangeemail: false,
        check_textInputChange: false,
      });
    } else if (expression.test(String(this.state.mailUser).toLowerCase())) {
      if (this.state.passwordUser === this.state.confirmpasswordUser) {
        auth()
          .createUserWithEmailAndPassword(
            this.state.mailUser,
            this.state.passwordUser,
          )
          .then(() => {
            const user = auth().currentUser;
            //  console.log(user.emailVerified)
            if (!user.emailVerified) {
              user.sendEmailVerification();
              this.itemRef
                .push({
                  nameUser: this.state.nameUser,
                  mailUser: this.state.mailUser,
                  phoneUser: this.state.phoneUser,
                  imageUser: this.state.imageUser,
                  status: 0,
                  userID: user.uid,
                  dateCreate: getdate,
                  idOnesignal: this.state.idOnesignal,
                  address: this.state.address,
                  loginType: 'default',
                })
                .then((data) => {
                  this.props.navigation.navigate('login');
                });
              ToastAndroid.show(
                'Đăng ký thành công mã xác thực đã gửi đến email của bạn',
                ToastAndroid.SHORT,
              );
            }
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              // ToastAndroid.show('Email đã tồn tại', ToastAndroid.SHORT);
              this.setState({
                check_textInputChange: true,
                check_textInputChangeemail: false,
                check_passwordfail: false,
                check_password: false,
                check_infor: false,
              });
            }

            if (error.code === 'auth/invalid-email') {
            }
            if (error.code === 'auth/weak-password') {
              // ToastAndroid.show(
              //   'Password phải từ 6 ký tự trở lên',
              //   ToastAndroid.SHORT,
              // );

              this.setState({
                check_password: true,
                check_passwordfail: false,
                check_textInputChange: false,
                check_textInputChangeemail: false,
                check_infor: false,
              });
            }

            // console.error(error);
          });
      } else {
        // alert('Nhập lại mặt khẩu không đúng');
        this.setState({
          check_passwordfail: true,
          check_textInputChange: false,
          check_textInputChangeemail: false,
          check_password: false,
          check_infor: false,
        });
      }
    } else {
      // alert('Email không đúng định dạng');
      this.setState({
        check_textInputChangeemail: true,
        check_textInputChange: false,
        check_password: false,
        check_passwordfail: false,
        check_infor: false,
      });
    }
  }
  validate(userName, type) {
    // console.log(type);
  }
  render() {
    const {navigation} = this.props;
    var {
      check_textInputChange,
      check_textInputChangeemail,
      check_password,
      check_passwordfail,
      check_infor,
    } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <Image source={bgr} style={{flex: 1, height: null, width: null}} />
        </View>
        <View style={styles.head}></View>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.foot}>
            <View style={{width: '75%', justifyContent: 'center'}}>
              <TextInput
                style={styles.textinput}
                placeholder=" Tên tài khoản"
                onChangeText={(nameUser) => {
                  this.setState({nameUser});
                }}
                value={this.state.nameUser}
              />

              <TextInput
                style={styles.textinput}
                placeholder="Email"
                onChangeText={(mailUser) => {
                  this.setState({mailUser});
                }}
                value={this.state.mailUser}
                keyboardType="email-address"
              />
              {check_textInputChange ? (
                <Text style={styles.textfail}>Email đã tồn tại</Text>
              ) : null}
              {check_textInputChangeemail ? (
                <Text style={styles.textfail}>Email không đúng định dạng</Text>
              ) : null}
              <TextInput
                style={styles.textinput}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={(passwordUser) => {
                  this.setState({passwordUser});
                }}
                value={this.state.passwordUser}
              />
              {check_password ? (
                <Text style={styles.textfail}>
                  Mật khẩu phải từ 6 ký tự trở lên
                </Text>
              ) : null}
              <TextInput
                style={styles.textinput}
                placeholder="Xác nhận mật khẩu"
                onChangeText={(confirmpasswordUser) => {
                  this.setState({confirmpasswordUser});
                }}
                value={this.state.confirmpasswordUser}
                secureTextEntry={true}
              />
              {check_passwordfail ? (
                <Text style={styles.textfail}>
                  Nhập lại mặt khẩu không đúng
                </Text>
              ) : null}
              <TextInput
                style={styles.textinput}
                placeholder="Số điện thoại"
                onChangeText={(phoneUser) => {
                  this.setState({phoneUser});
                }}
                value={this.state.phoneUser}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.textinput}
                placeholder="Địa chỉ"
                onChangeText={(address) => {
                  this.setState({address});
                }}
                value={this.state.address}
              />
              {check_infor ? (
                <Text style={styles.textfail}>
                  Vui lòng điền đầy đủ thông tin
                </Text>
              ) : null}
              <TouchableOpacity
                style={{
                  backgroundColor: '#F58B03',
                  height: 60,
                  padding: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50,
                  borderRadius: 20,
                }}
                onPress={() => {
                  this.dangKyUser();
                }}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    height: '5%',
    // backgroundColor:'green'
  },
  foot: {
    height: '95%',
    marginTop: '25%',
    alignItems: 'center',
    //  backgroundColor:'red'
  },
  textfail: {
    fontSize: 15,
    color: 'red',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  textinput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginTop: 30,
    paddingLeft: 20,
  },
});
