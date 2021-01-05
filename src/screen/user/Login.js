
import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  Image,Dimensions, Button,TouchableOpacity,TextInput,Alert, Keyboard,ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import h1 from '../../images/f.jpg'

import firebaseApp from '../../firebase/firebase';
import auth from '@react-native-firebase/auth';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const {width,height} = Dimensions.get('window');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser:'',
      passwordUser:'',
    }
  }
 async  logInUser(){
    firebaseApp.auth().signInWithEmailAndPassword(this.state.emailUser, this.state.passwordUser)
    .then(
      ()=>{
  firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    if(!user.emailVerified){
         ToastAndroid.show('Email chưa được xác thực', ToastAndroid.SHORT)
    }
    else {
       ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT)
      //  console.log(user.uid,'dvfffffffffffffffff');
       AsyncStorage.setItem('userID', user.uid);
       this.props.navigation.navigate('Hometab',{uidLogin : user.uid})
  //  Actions.userinfo({uidLogin : user.uid})
   this.setState({
    emailUser:'',     
    passwordUser:'',
    })
    }
  
  }
});
      }
    )
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log("errorrr",errorMessage)
  if(errorMessage === 'The email address is badly formatted.'){
       ToastAndroid.show('Email không đúng định dạng', ToastAndroid.SHORT);
  }else if(errorMessage === 'There is no user record corresponding to this identifier. The user may have been deleted.')
      {
          ToastAndroid.show('Tài khoản không tồn tại', ToastAndroid.SHORT);
      }
  else if(errorMessage === 'The password is invalid or the user does not have a password.'){
             ToastAndroid.show('Sai tên tài khoản hoặc mặt khẩu', ToastAndroid.SHORT);
  }    
});

  }

  render() {
    const { navigation } = this.props; 
    return (    
      <View style={styles.container}>
     
   <View
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <Image
            //
              source={h1}
              style={{height:290,width:null}}
            />
        </View>
     

        
        <View style={{backgroundColor:'white',height:height/1.5,borderTopRightRadius:20,borderTopLeftRadius:20,alignItems:'center'}}>

        <View style={styles.textwelcome}>
        <Text style={{fontWeight:'bold',fontSize:40}}>XIN CHÀO</Text>
        <Text>Đăng nhập tài khoản</Text>
        </View>

        <View style={styles.login}>
        <TextInput
        style={{backgroundColor:"#F5F5F5",marginVertical:10,borderRadius:10,marginTop:60,paddingLeft:10}}
        placeholder="Email..."
         onChangeText={(emailUser)=>this.setState({emailUser})}
        value={this.state.emailUser}
        keyboardType='email-address'
        >
        </TextInput>
          <TextInput
        style={{backgroundColor:"#F5F5F5",marginVertical:10,borderRadius:10,paddingLeft:10}}
        placeholder="Mật khẩu"
        secureTextEntry={true}
         onChangeText={(passwordUser)=>this.setState({passwordUser})}
        value={this.state.passwordUser}
        >
        </TextInput>

      <TouchableOpacity
      style={{backgroundColor:'#F58B03',alignItems:'center',padding:5,borderRadius:10,marginTop:30,textAlign:'center',justifyContent:'center'}}
      onPress={()=>{
        this.logInUser()
        Keyboard.dismiss()
      }}
      >
        <Text style={{fontSize:25,fontWeight:"normal",color:'#fff'}}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={{marginTop:40,textAlign:"center"}}
      onPress={()=>{
        navigation.navigate('resetpassword')
        // Actions.resetpassword()
      }}
      >Quên mật khẩu ?</Text>

      <Text style={{justifyContent:'flex-end',marginTop:60,textAlign:"center",fontWeight:'bold'}}
      onPress={()=>{
                navigation.navigate('register')
        // Actions.register()
      }}
      >
     Bạn chưa có tài khoản ? Đăng ký</Text>
        </View>

        </View>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-end',
    // backgroundColor:'red'
  },
  textwelcome:{
  alignItems:'center'
  },
  login:{
    width:300,
    height:300
  }
});