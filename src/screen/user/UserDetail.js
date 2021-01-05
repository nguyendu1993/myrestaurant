
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  Easing, Image, Dimensions, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Button, Platform, ImageBackground
} from 'react-native';
import firebaseApp from '../../firebase/firebase';
import auth from '@react-native-firebase/auth';
import h1 from '../../images/headuser.png'
import avatar from '../../images/avatar.png'
import { Assets } from '@react-navigation/stack';
const { width, height } = Dimensions.get('window');
import update from '../../images/update.png';
import back from '../../images/back1.png'

export default class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      posst: null
    }
  }
  lisstern() {
    firebaseApp
      .database()
      .ref('/User')
      .orderByChild('userID')
      .equalTo(this.props.route.params.uidUpdate) //this.props.uidLogin
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            userID: child.val().userID,
            nameUser: child.val().nameUser,
            mailUser: child.val().mailUser,
            phoneUser: child.val().phoneUser,
            address: child.val().address
          };
          items1.push(item)
        });

        this.setState({
          posst: items1
        });
      });
  }
  componentDidMount() {
    // console.log('uid ben detaiiiiiiiiiiiiiiiiiiiiiiiiii' + this.props.uidUpdate)

    this.lisstern();
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.head}>

          <View
            style={{
              ...StyleSheet.absoluteFill,
            }}>
            <Image
              source={h1}
              style={{ height: "100%", width: "100%" }}
            />
          </View>

          {/* <TouchableOpacity
          style={{position:"absolute",top:0}}
          onPress={()=>{
            navigation.navigate('userinfo',{uidLogin:this.state.posst[0].uid })
            // Actions.userinfo({uidLogin: this.state.posst[0].uid});
          }}
          >
            <Image
              source={require('../Image/back1.png')}
              style={{height:30,width:30,padding:10,marginVertical:20,marginLeft:20}}
            />
             </TouchableOpacity> */}
          {/* <TouchableOpacity style={{ margin: 10 }}
            onPress={() => navigation.goBack()}>
            <Image source={back} style={styles.Image}></Image>
          </TouchableOpacity> */}
          <Image
            source={avatar}
            style={{ height: 90, width: 90, position: 'absolute', top: '30%', left: '5%' }}
          />
          <View style={{
            justifyContent: 'center',
            left: '15%', width: '100%', textAlign: "center",
            height: "20%", top: '38%', fontWeight: 'bold',
            color: 'white', borderRadius: 10
          }}>
            {this.state.posst === null ?
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Không có dữ liệu</Text>
              :
              <View>
                <Text
                >{this.state.posst.map((item, index) => {
                  return (
                    <View key={item.userID}>
                      <Text
                        style={{ fontSize: 25, color: 'white', fontWeight: 'bold', textAlign: 'left' }}
                        key={item.userID}>{item.nameUser}</Text>
                      {console.log("user", index)}
                    </View>
                  )
                })}</Text>
              </View>
            }
          </View>
        </View>
        <View style={styles.foot}>
          {/* <View style={{
            width: '80%', height: '80%', backgroundColor: 'white', marginHorizontal: '10%', marginVertical: '10%', borderRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            justifyContent: 'flex-start',
          }}> */}
          <View style={{
            flexDirection: 'row', marginVertical: 30, borderBottomColor: 'black', height: '10%', width: '100%',
            borderBottomColor: "#C4C4C4", borderBottomWidth: 1, justifyContent:'space-between',paddingLeft:20,paddingRight:20
          }}>
            <Text style={{ margin: 10, }}>Email</Text>
            <View>
              {this.state.posst === null ?
                <Text>Không có dữ liệu</Text>
                :
                <View>
                  <Text style={{ margin: 10 }}
                  >{this.state.posst.map((item, index) => {
                    return (<View key={item.userID}>
                      <Text

                        key={item.userID}>{item.mailUser}</Text>
                      {console.log("user neeeee", item.userID)}
                    </View>
                    )
                  })}</Text>
                </View>

              }
            </View>
          </View>

          <View style={{
            flexDirection: 'row', marginVertical: 30, borderBottomColor: 'black', height: '10%', width: '100%',
            borderBottomColor: "#C4C4C4", borderBottomWidth: 1, justifyContent:'space-between',paddingLeft:20,paddingRight:20
          }}>
            <Text style={{ margin: 10,  }}>Số điện thoại</Text>
            <View>
              {this.state.posst === null ?
                <Text>Không có dữ liệu</Text>
                :
                <View>
                  <Text style={{ margin: 10 }}
                  >{this.state.posst.map((item, index) => {
                    return (<View key={item.userID}>
                      <Text

                        key={item.userID}>{item.phoneUser}</Text>
                      {console.log("user neeeee", item.userID)}
                    </View>
                    )
                  })}</Text>
                </View>

              }
            </View>
          </View>

          <View style={{
            flexDirection: 'row', marginVertical: 30, borderBottomColor: 'black', height: '10%', width: '100%',
            borderBottomColor: "#C4C4C4", borderBottomWidth: 1, justifyContent:'space-between',paddingLeft:20,paddingRight:20
          }}>
            <Text style={{ margin: 10 }}>Địa chỉ</Text>
            <View>
              {this.state.posst === null ?
                <Text>Không có dữ liệu</Text>
                :
                <View>
                  <Text style={{ margin: 10 }}
                  >{this.state.posst.map((item, index) => {
                    return (<View key={item.userID}>
                      <Text

                        key={item.userID}>{item.address}</Text>
                      {console.log("user neeeee", item.userID)}
                    </View>
                    )
                  })}</Text>
                </View>

              }
            </View>
          </View>

          <View style={{
            alignItems: 'center', backgroundColor: '#FFF', borderRadius: 40, justifyContent: 'center', height: 50, width: 50,
            shadowColor: '#000'
          }}
          >
            <TouchableOpacity
              style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                navigation.navigate('updateinfo', { uidUpdateInfo: this.state.posst[0].userID })
                // Actions.updateinfo({uidUpdateInfo: this.state.posst[0].uid})
              }}
            >
              <Image source={update} style={{ resizeMode: 'cover' }}></Image>
            </TouchableOpacity>

          </View>


        </View>

      </View >
      // </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    flexDirection: 'row',
    height: '30%',
    backgroundColor: 'green'
  },
  foot: {
    height: '65%',
    alignItems: 'center',
  },

});