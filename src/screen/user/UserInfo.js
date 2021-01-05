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
} from 'react-native';
import firebaseApp from '../../firebase/firebase';
import { firebase } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import h1 from '../../images/headuser.png';
import avatar from '../../images/us.png';

const { width, height } = Dimensions.get('window');

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      posst: null,
      userID: '',
    };
  }


  async getData() {
    return await AsyncStorage.getItem('userID');
  }
  async lisstern() {
    var userID = await this.getData();

    console.log(userID, 'uid userinfooooooooooooooooooo');
    firebaseApp
      .database()
      .ref('/User')
      .orderByChild('userID')
      .equalTo(userID) //this.props.uidLogin
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            userID: child.val().userID,
            nameUser: child.val().nameUser,
            mailUser: child.val().mailUser,
            dateCreate: child.val().dateCreate,
            loginType: child.val().loginType,
          };
          items1.push(item);
        });
        console.log(items1, 'it');

        this.setState({
          posst: items1,
        });
      });
  }
  //chua ma con map vao text nua
  componentDidMount() {
    this.lisstern();
  }
  testget() {
    firebaseApp
      .database()
      .ref('/User')
      .orderByChild('userID')
      .equalTo(userID) //this.props.uidLogin
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            userID: child.val().userID,
            nameUser: child.val().nameUser,
            mailUser: child.val().mailUser,
            dateCreate: child.val().dateCreate,
          };
          items1.push(item);
        });

        this.setState({
          posst: items1,
        });
      });
  }
  //    {this.state.userInfo === null ?
  //         <Text>Chưa thêm dữ liệu</Text>
  //         :
  //         <View>
  //            <Text>{this.state.posst.map((item,index) =>
  //         {
  //         return (
  //             <View>
  //             <Text key={index}>{item.dateCreate}</Text>
  //              {console.log("user",index)}
  //             </View>

  //          )
  //         }
  //          )}</Text>
  //         </View>
  //                }
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#F58B03" barStyle="light-content" />
        {/* <View style={styles.headercontainer}>

</View> */}
        {/* <View style={styles.head}>
     <View
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <Image
              source={h1}
              style={{height:"100%",width:"100%"}}
            />
        </View> 
          <Image
              source={avatar}
              style={{height:"55%",width:"30%",position:'absolute',top:'30%',left:'5%'}}
            />
            <View style={{justifyContent:'center',
            left:'38%',width:'100%',textAlign:"left",
            height:"20%",top:'30%',fontWeight:'bold',
            color:'white',borderRadius:10}}>
            {this.state.posst === null ? 
            <Text style={{fontSize:32,color:'white',fontWeight:'bold',textAlign:'left'}}>Không có dữ liệu</Text>
            :
             <View>
           <Text
           >{this.state.posst.map((item,index) => 
             {
         return (<View key={item.uid}>
            <Text 
            style={{fontSize:23,color:'white',fontWeight:'bold',textAlign:'left'}}
            key={item.uid}>{item.nameUser}</Text>
           </View>
            )   
         })}</Text>
      </View>

            } 
      </View>
           
            <TouchableOpacity
            style={{justifyContent:'center',alignItems:'center',
            left:'38%',width:'50%',textAlign:"left",
            height:"15%",top:'35%',fontSize:33,fontWeight:'bold',
            color:'white',backgroundColor:'#F58B03',borderRadius:10}}
             onPress={()=>{
               navigation.navigate('userdetail',{uidUpdate : this.state.posst[0].uid})
                // Actions.userdetail({uidUpdate : this.state.posst[0].uid});
            }}
            >
                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Thông tin chi tiết ></Text>
            </TouchableOpacity>
        </View>
        <View style={styles.foot}>
         <TouchableOpacity
            style={{justifyContent:'center',alignItems:'center',
            width:'20%',textAlign:"left",left:'15%',
            height:"7%",top:'5%',fontSize:33,fontWeight:'bold',
            color:'white',backgroundColor:'#F58B03',borderRadius:10}}
             onPress={()=>{
            firebaseApp.auth().signOut().then(()=>{
              LoginManager.logOut();
              firebase.auth().signOut();
              AsyncStorage.removeItem('UserID');

            //navigation.navigate('Welcome')

            });
   
            }}
            >
                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Log out</Text>
            </TouchableOpacity>
        </View> */}
        <TouchableOpacity onPress={() => {
          navigation.navigate('userdetail', { uidUpdate: this.state.posst[0].userID })
          // Actions.userdetail({uidUpdate : this.state.posst[0].uid});
        }}>
          <View style={styles.viewinfo}>
            <Image source={avatar} style={styles.viewimg}></Image>
            <View>
              {this.state.posst === null ? (
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left' }}>
                  Không có dữ liệu
                </Text>
              ) : (
                  <View>
                    <Text>
                      {this.state.posst.map((item, index) => {
                        return (
                          <View key={item.userID}>
                            <Text style={styles.textinfo}>{item.nameUser}</Text>
                            <Text style={styles.textinfo}>
                              Thành viên từ {item.dateCreate}
                            </Text>
                            <Text style={styles.textinfo}>{item.mailUser}</Text>
                          </View>
                        );
                      })}
                    </Text>
                  </View>
                )}
            </View>
            <View
              style={{ justifyContent: 'center', paddingHorizontal: width * 0.25 }}>
              <Feather name="chevron-right" color="gray" size={20} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.viewmenuinf}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('DonHang')}>
          <View style={styles.viewitem}>
            <Feather name="shopping-cart" color="#F58B03" size={25} />

            <Text style={styles.textitem}>Đơn Hàng</Text>
          </View>
          </TouchableOpacity>

          <View style={styles.viewitem}>
            <Feather name="bell" color="#F58B03" size={25} />

            <Text style={styles.textitem}>Thông Báo</Text>
          </View>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Voucher')}>
          <View style={styles.viewitem}>
            <Feather name="shopping-bag" color="#F58B03" size={25} />

            <Text style={styles.textitem}>Mã Giảm Giá</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('History')}>
          <View style={styles.viewitem}> 
            <Feather name="rotate-ccw" color="#F58B03" size={25} />

            <Text style={styles.textitem}>Lịch sử mua hàng</Text>
          </View>
          </TouchableOpacity>

           {this.state.posst === null ? null : this.state.posst[0].loginType === 'default' ?
               <TouchableOpacity onPress={()=> this.props.navigation.navigate('Change Password')}>
          <View style={styles.viewitem}>
            <Feather name="lock" color="#F58B03" size={25} />

            <Text style={styles.textitem}>Đổi mặt khẩu</Text>
          </View>
          </TouchableOpacity>
            : 
            null }
        

          <TouchableOpacity
            onPress={() => {
              firebaseApp.auth().signOut().then(() => {
                LoginManager.logOut();
                firebase.auth().signOut();
                AsyncStorage.removeItem('userID');
                // AsyncStorage.removeItem('idOnesignal');
                navigation.navigate('Welcome')

              });

            }}
          >
            <View style={styles.viewitem}>
              <Feather name="log-out" color="#F58B03" size={25} />

              <Text style={styles.textitem}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingRight: 5,
  },
  headercontainer: {
    flexDirection: 'row',
    paddingTop: 50,
    backgroundColor: '#F58B03',
  },
  head: {
    height: '25%',
    backgroundColor: 'green',
  },
  foot: {
    height: '75%',
    marginTop: '5%',
  },
  viewinfo: {
    flexDirection: 'row',
    padding: 10,
    //  justifyContent:'space-between',
    backgroundColor: '#FFF',
  },
  viewimg: {
    width: 60,
    height: 60,
  },
  textinfo: {
    fontSize: 13,
    fontFamily: 'ArchivoNarrow-Regular',
    marginLeft: 20,
  },
  viewmenuinf: {
    marginTop: 10,

    backgroundColor: '#FFF',
  },
  viewitem: {
    flexDirection: 'row',
    padding: 15,

  },
  textitem: {
    textAlign: 'center',
    marginLeft: 20,
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
  },
});
