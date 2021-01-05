import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  Easing,Image,Dimensions,KeyboardAvoidingView,TextInput,TouchableOpacity,Alert, Button,Platform,ImageBackground,ToastAndroid
} from 'react-native';
import firebaseApp from '../../firebase/firebase';
import auth from '@react-native-firebase/auth';
import h1 from '../../images/Food3.png'

const {width,height} = Dimensions.get('window');

export default class Resetpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailUserReset: '',
    }
  }
   Resetpassword(){
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

if(this.state.mailUserReset ==''){
  alert('Enter Email')
}
else
if(expression.test(String(this.state.mailUserReset).toLowerCase()))
    { 
    auth().sendPasswordResetEmail(this.state.mailUserReset)
      .then((user)=> {
        // console.log(user)
       ToastAndroid.show('Vui lòng kiểm tra email để lấy lại mặt khẩu', ToastAndroid.SHORT);
        this.props.navigation.navigate('login')
      }).catch( (e)=> {
  if (e.code === 'auth/user-not-found') {
       ToastAndroid.show('Tài khoản không tồn tại', ToastAndroid.SHORT);
     }    
        //  console.log(e)
      })
    }
    else{
       ToastAndroid.show('Email không đúng định dạng', ToastAndroid.SHORT);
    }

  }
  render() {
    return (   
      <View style={styles.container}>
         <View
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <Image
              source={h1}
              style={{flex:1,height:null,width:null}}
            />
        </View>
      <View style={styles.head}>
         {/* <View>
           <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('welcome')
            // Actions.welcome();
          }}
          >
            <Image
              source={require('../Image/back1.png')}
              style={{height:30,width:30,padding:10,marginVertical:20,marginLeft:10}}
            />
             </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.foot}>
      <View style={{width:'75%',justifyContent:'center'}}>
      <Text style={{textAlign:"center"}}>
           Vui lòng nhập email</Text>
        <TextInput
      style={{backgroundColor:'#F5F5F5',borderRadius:10,marginTop:30}}
        placeholder='Email...'
        onChangeText={(mailUserReset)=>
        {this.setState({mailUserReset})}}
        value={this.state.mailUserReset}
        keyboardType='email-address'
      />

      <TouchableOpacity
      style={{backgroundColor:'#F58B03',padding:12,alignItems:'center'
      ,marginTop:50,borderRadius:10}}
      onPress={()=>{
      this.Resetpassword();
      }}
      >
        <Text style={{fontSize:20, color:'#fff'
}}
        >Đặt lại mật khẩu</Text>
      </TouchableOpacity>
      </View>
      </View>

      </View>
    

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   head: {
     height:'5%',
    // backgroundColor:'green'
  },
   foot: {
     height:'95%',
     marginTop:'25%',
     alignItems:'center'
    //  backgroundColor:'red'
  },

});