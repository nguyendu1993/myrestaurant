import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/app';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';    
import firebaseApp from '../../firebase/firebase';
import {GoogleSignin} from '@react-native-community/google-signin';
import messaging from '@react-native-firebase/messaging';
const {width, height} = Dimensions.get('window');
import h1 from '../../images/hg.jpg';
import LinearGradient from 'react-native-linear-gradient';
import OneSignal from 'react-native-onesignal'; // Import package from node modules


export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref('User');
    this.state = {
      userInfo: [],
      pushInfoFB: null,
      pushInfoGG: null,
      userID: '',
    };

  }
    componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

 async onIds(device) {
    console.log('Device info: ', device);
    // console.log("id",device.userId)
   await  AsyncStorage.setItem('idOnesignal', device.userId);
  }
  //   import firebase from '../../firebase/firebase';

  async listen() {
    var userID = await this.getData();
    const user = auth().currentUser;
    // console.log(userID, 'ustk');
    if (userID) {
      this.props.navigation.navigate('Hometab', {uidLogin: userID});
    }
    // if (user) {
    //   this.props.navigation.navigate('Hometab', {uidLogin: user.userID});
    //   // console.log(user, 'co acc log in');
    // } else {
    //   // console.log('dx');
    // }
    GoogleSignin.configure({
      webClientId:
        '646002843115-rrgaa5r9f7it1h1qf59en5lrg00cj777.apps.googleusercontent.com',
    });
  }
  async getData() {
    return await AsyncStorage.getItem('userID');
  }
  async componentDidMount() {
    
    OneSignal.setLogLevel(6, 0);
  
  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init("4ea7262f-90b7-4995-94c7-a4a360e30637", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  
   OneSignal.addEventListener('received', this.onReceived);
   OneSignal.addEventListener('opened', this.onOpened);
   OneSignal.addEventListener('ids', this.onIds);
    this.listen();

//      fetch('https://onesignal.com/api/v1/notifications', {
//   method: 'POST',
//   headers: {
//     "Content-Type": 'application/json',
//     'Authorization': 'Basic ZDgwNzFiNmYtNjlkYi00YWFmLTkzZTEtN2E4MWVjNmNkNDVl'
//   },
//   body: JSON.stringify({
//   app_id: "4ea7262f-90b7-4995-94c7-a4a360e30637",
//   included_segments: ["All"],
//   contents:{"en":"Ăn uống thả ga với voucher giả giá"},
//   headings:{"en":"Tặng bạn mã giảm giá 20%,50% đặt ngay để được giá tốt "},
//   data: {"customdata": "some_value"},
//   contents: {"en": "Ăn uống thả ga với voucher giảm giá"}
//   })
// }).then((response) => response.json())
//     .then((json) => {
//       console.log("json",json);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
}

  async checkPermission() {
    console.log('check permisson');
    const enabled = await messaging().hasPermission();
    console.log('check permisson call enable', enabled);
    if (enabled) {
      this.getToken();
    } else {
      // this.requestPermissison();
    }
  }
  async getToken() {
    console.log('Get token call');
    // let fcmToken = await AsyncStorage.read('fcmToken');
    // if(!fcmToken){
    const fcmToken = await messaging().getToken();
    console.log('check token fcm ', fcmToken);

      // if(fcmToken){
        // await AsyncStorage.save('fcmToken',fcmToken);
    //   }
    // }
  }

  async onGoogleButtonPress() {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var getdate = date + '/' + month + '/' + year;
    // + ' ' + hours + ':' + min + ':' + sec;
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then((result) => {
        firebaseApp
          .database()
          .ref('/User')
          .orderByChild('userID')
          .equalTo(result.user.uid) //this.props.uidLogin
          .on('value', (snapshot) => {
            var items1 = [];
            snapshot.forEach((child) => {
              let item = {
                userID: child.val().userID,
                nameUser: child.val().nameUser,
              };
              items1.push(item);
            });

            this.setState({
              pushInfoGG: items1,
            });
            if (this.state.pushInfoGG.length === 1) {
              ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
              this.props.navigation.navigate('Hometab', {
                uidLogin: result.user.uid,
              });
              AsyncStorage.setItem('userID', result.user.uid);
            } else {
              this.itemRef
                .push({
                  nameUser: result.user.displayName,
                  mailUser: result.user.email,
                  phoneUser: '',
                  imageUser: result.user.photoURL,
                  status: 0,
                  userID: result.user.uid,
                  dateCreate: getdate,
                  address: '',
                  idOnesignal: '',
                })
                .then((data) => {
                  // console.log('push fb success' + data);
                });
            }
          });
      });
  }
  onFacebookButtonPress() {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var getdate = date + '/' + month + '/' + year;
    // + ' ' + hours + ':' + min + ':' + sec;

    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        // console.log(result);
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then((currenUser) => {
        // console.log(`FB login user : ${JSON.stringify(currenUser)}`);
        // console.log('user email fb',currenUser.user.displayName)
        const user = auth().currentUser;
        firebaseApp
          .database()
          .ref('/User')
          .orderByChild('userID')
          .equalTo(currenUser.user.uid) //this.props.uidLogin
          .on('value', (snapshot) => {
            var items1 = [];
            snapshot.forEach((child) => {
              let item = {
                userID: child.val().userID,
                nameUser: child.val().nameUser,
              };
              items1.push(item);
            });

            this.setState({
              pushInfoFB: items1,
            });
            if (this.state.pushInfoFB.length === 1) {
              this.props.navigation.navigate('Hometab', {
                uidLogin: currenUser.user.uid,
              });
              AsyncStorage.setItem('userID', currenUser.user.uid);

              // Actions.userinfo({uidLogin : currenUser.user.uid})
            } else {
              this.itemRef
                .push({
                  nameUser: currenUser.user.displayName,
                  mailUser: currenUser.user.email,
                  phoneUser: '',
                  imageUser: currenUser.user.photoURL,
                  status: 0,
                  userID: currenUser.user.uid,
                  dateCreate: getdate,
                  address: '',
                 idOnesignal: '',

                })
                .then((data) => {
                  console.log('push fb success' + data);
                });
            }
          });

        //   this.itemRef.push({
        //   nameUser: currenUser.user.displayName,
        //   mailUser: currenUser.user.email,
        //   phoneUser: 'Chưa được thêm',
        //   imageUser: currenUser.user.photoURL,
        //   status: '',
        //   uid:currenUser.user.uid,
        //   dateCreate: getdate,
        //   address: 'Chưa được thêm'
        //   }).then(data =>{
        //     console.log("push fb success" + data)
        // })
      })
      .catch((error) => {
        console.log(error);
        if (
          error ==
          `Error: Query.equalTo failed: First argument contains undefined in property 'User'`
        ) {
          alert(error);
          //      this.itemRef.push({
          //   nameUser: 'aaaaaaaaaaaa',
          //   mailUser: 'aaaaaaaaaaaa',
          //   phoneUser: 'Chưa được thêm',
          //   imageUser: 'aaaaaaaaaaaa',
          //   status: '',
          //   uid:'WJvD4Vcy04hVjAAanrw64oJSYxs1',
          //   dateCreate: getdate,
          //   address: 'Chưa được thêm'
          //   }).then(data =>{
          //     console.log("push fb success" + data)
          // })
        } else {
          alert('Email đã được sử dụng');
        }
        // console.log(`FB login error : ${error}`);
      });
  }

  logOut() {
    LoginManager.logOut();
    firebase.auth().signOut();
  }
  componentDidUpdate() {
    // console.log('propssssss',this.props.route.params.logOut)
    // if(this.props.route.params.logOut == 1){
    //  this.logOut()
    //  console.log('log out r')
    //    navigation.navigate('login')
    // }else{
    //   console.log('ko co log out')
    // }
  }
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.background}>
          <Image
            source={h1}
            style={{
              flex: 1,
              resizeMode: 'stretch',
              position: 'absolute',
              height: '95%',
            }}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}
            style={{flex: 1}}>
            <View style={{height: 450, justifyContent: 'flex-end'}}>
              <Text
                style={{
                  textAlign: 'right',
                  height: null,
                  width: null,
                  fontSize: 55,
                  color: 'white',
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  this.logOut();
                }}>
                {`LET'S  
          START !!!`}
              </Text>
            </View>

            <View style={styles.viewbutton}>
              <View
                style={{
                  ...styles.buttonstyle,
                  opacity: this.buttonOpacity,
                }}>
                <Text
                  style={styles.itembutton}
                  onPress={() => {
                     navigation.navigate('login');
                  }}>
                  Đăng Nhập
                </Text>
              </View>

              <View
                style={{
                  ...styles.buttonstyle,
                  backgroundColor: '#4285F4',
                  opacity: this.buttonOpacity,
                }}>
                <Text
                  style={{...styles.itembutton}}
                  onPress={() => {
                    this.onFacebookButtonPress();
                  }}>
                  Đăng nhập bằng Facebook
                </Text>
              </View>
              <View
                style={{
                  ...styles.buttonstyle,
                  backgroundColor: '#798189',
                  opacity: this.buttonOpacity,
                }}>
                <Text
                  style={{...styles.itembutton}}
                  onPress={() => {
                    this.onGoogleButtonPress();
                  }}>
                  Đăng nhập bằng Google
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  imagestyle: {
    flex: 1,
    height: null,
    width: null,
  },
  viewbutton: {
    height: height / 3,
  },
  buttonstyle: {
    backgroundColor: 'orange',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  itembutton: {
    fontSize: 20,
    fontFamily: 'ArchivoNarrow-SemiBold',
    color: '#fff',
  },
  buttonsignin: {
    backgroundColor: 'orange',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  textInput: {
    backgroundColor: 'white',
    height: 55,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
});
