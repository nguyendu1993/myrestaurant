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
import bgr from '../../images/Food3.png'
const {width, height} = Dimensions.get('window');

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref('User');
    this.state = {
      currentPass: '',
      newPass: '',
      confirmnewPass: '',
    };
  }
  reauthenticate = (currentPassword) => {
             const user = firebaseApp.auth().currentUser;
            //  console.log("user email",user.email)
    var cred = firebaseApp.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changePassword() {
    if(this.state.currentPass === "" || this.state.newPass === "" || this.state.confirmnewPass === ""){
 ToastAndroid.show(
                'Vui lòng nhập đầy đủ thông tin',
                ToastAndroid.SHORT,
              );    
            }
            else{
              if(this.state.newPass === this.state.confirmnewPass){
                 this.reauthenticate(this.state.currentPass).then(()=>{
                          const user = firebaseApp.auth().currentUser;
                          user.updatePassword(this.state.newPass).then(function(){
                              ToastAndroid.show(
                        'Đổi mặt khẩu thành công',
                        ToastAndroid.SHORT,
                      ); 
                          });
                     setTimeout(() => {this.props.navigation.navigate('Profile')}, 300)

                  }).catch((error)=>{
                      ToastAndroid.show(
                        'Mặt khẩu cũ không đúng',
                        ToastAndroid.SHORT,
                      ); 
                  // console.log(error)
                  });
              }
                else{
                 
 ToastAndroid.show(
                'Nhập lại mặt khẩu không chính xác',
                ToastAndroid.SHORT,
              ); 
              


                }
            }
    
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <Image
            source={bgr}
            style={{flex: 1, height: null, width: null}}
          />
        </View>
        <View style={styles.head}>
         
        </View>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.foot}>
            <View style={{width: '75%', justifyContent: 'center'}}>
              <TextInput
               style={styles.textinput}
                placeholder="Mặt khẩu cũ"
                secureTextEntry={true}
                onChangeText={(currentPass) => {
                  this.setState({currentPass});
                }}
                value={this.state.currentPass}
              />

              <TextInput style={styles.textinput}
                secureTextEntry={true}
                placeholder="Mặt khẩu mới"
                onChangeText={(newPass) => {
                  this.setState({newPass});
                }}
                value={this.state.newPass}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Nhập lại mặt khẩu"
                secureTextEntry={true}
                onChangeText={(confirmnewPass) => {
                  this.setState({confirmnewPass});
                }}
                value={this.state.confirmnewPass}
              />
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
                  this.changePassword();
                }}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
                Đổi mặt khẩu
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
    textAlign:'center',
    marginTop: 10,
  },
  textinput:{
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginTop: 30,
    paddingLeft:20
  }
});