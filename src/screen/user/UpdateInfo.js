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
import back from '../../images/back1.png';
import AsyncStorage from '@react-native-community/async-storage'
const {width, height} = Dimensions.get('window');

export default class UpdateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      posst: null,
      nameUserUpdate: '',
      phoneUserUpdate: '',
      addressUserUpdate: '',
      idOnesignal:'',
      checkNull: false,
    };
  }
  lisstern() {
    firebaseApp
      .database()
      .ref('/User')
      .orderByChild('userID')
      .equalTo(this.props.route.params.uidUpdateInfo)
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            key: child.key,
            userID: child.val().userID,
            nameUser: child.val().nameUser,
            mailUser: child.val().mailUser,
            phoneUser: child.val().phoneUser,
            address: child.val().address,
            dateCreate: child.val().dateCreate,
            imageUser: child.val().imageUser,

            status: child.val().status,
          };
          items1.push(item);
        });

        this.setState({
          posst: items1,
          nameUserUpdate: items1[0].nameUser,
          addressUserUpdate: items1[0].address,
          phoneUserUpdate: items1[0].phoneUser,
        });
      });
  }
  async componentDidMount() {
    this.lisstern();
    var Id = await AsyncStorage.getItem('idOnesignal');
    if(Id){
    this.setState({
      idOnesignal: Id,
    });
    console.log(this.state.idOnesignal)
    }

  }
  backtoUserDetail() {
    this.props.navigation.navigate('Home');
    // Actions.userdetail({uidUpdate: this.state.posst[0].uid})
  }
     async getIdOneSigNal() {
    return await AsyncStorage.getItem('idOnesignal');
  }
 async updateInfo() {
    if (
      this.state.nameUserUpdate === '' ||
      this.state.phoneUserUpdate === '' ||
      this.state.addressUserUpdate === ''
    ) {
      this.setState({
        checkNull: true,
      });
    } else {
      this.setState({
        checkNull: false,
      });
      const key = this.state.posst[0].key;
      firebaseApp
        .database()
        .ref('User/' + key)
        .set({
          address: this.state.addressUserUpdate,
          dateCreate: this.state.posst[0].dateCreate,
          imageUser: this.state.posst[0].imageUser,
          mailUser: this.state.posst[0].mailUser,
          nameUser: this.state.nameUserUpdate,
          phoneUser: this.state.phoneUserUpdate,
          status: 0,
          idOnesignal: this.state.idOnesignal,
          userID: this.state.posst[0].userID,
        })
        .then(() => {
          ToastAndroid.show('Update thành công', ToastAndroid.SHORT);

          this.backtoUserDetail();
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          Alert.alert(
            'Thông báo',
            'Update Infomation Fail' + ' ' + errorMessage,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('Ok')},
            ],
            {cancelable: false},
          );
        });
    }
  }

  render() {
    const {navigation} = this.props;
    // console.log('updateeeeeeeeeeee', this.state.posst);
    return (
      <View
        style={{
          flex: 1,
        }}>
        {/* <View style={styles.head}>
         
        </View>
        <View style={styles.foot}>
          <View style={{
            width: '90%', height: '80%', backgroundColor: 'white',
            marginHorizontal: '10%', marginVertical: '10%', borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            justifyContent: 'flex-start',
          }}>
            <View style={{
              flexDirection: 'column', justifyContent: 'space-between', marginVertical: 30, marginHorizontal: 25,
              borderBottomColor: 'black', height: '15%',
            }}>
              <Text>User Name</Text>
              <View>
                {this.state.posst === null ?
                  <Text>Không có dữ liệu</Text>
                  :
                  <View style={styles.box}>
                    <Text
                    >{this.state.posst.map((item, index) => {
                      return (<View key={item.userID}>
                        <TextInput
                          style={{ margin: 10 }}
                          placeholder={this.state.posst[0].nameUser}
                          onChangeText={(nameUserUpdate) => { this.setState({ nameUserUpdate }) }}
                          value={this.state.nameUserUpdate}
                          key={item.userID}></TextInput>
                      </View>
                      )
                    })}</Text>
                  </View>

                }
              </View>

            </View>
            <View style={{
              flexDirection: 'column', justifyContent: 'space-between', marginVertical: 5, marginHorizontal: 25,
              borderBottomColor: 'black', height: '15%',
            }}>
              <Text>Phone</Text>
              <View>
                {this.state.posst === null ?
                  <Text>Không có dữ liệu</Text>
                  :
                  <View style={styles.box}>
                    <Text
                    >{this.state.posst.map((item, index) => {
                      return (<View key={item.userID}>
                        <TextInput style={{ margin: 10 }}
                          placeholder={this.state.posst[0].phoneUser}
                          onChangeText={(phoneUserUpdate) => { this.setState({ phoneUserUpdate }) }}
                          value={this.state.phoneUserUpdate}
                          keyboardType='number-pad'
                          key={item.userID}></TextInput>
                        {console.log("user neeeee", item.userID)}
                      </View>
                      )
                    })}</Text>
                  </View>

                }
              </View>

            </View>
            <View style={{
              flexDirection: 'column', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 25,
              borderBottomColor: 'black', height: '15%',
            }}>
              <Text>Address</Text>
              <View>
                {this.state.posst === null ?
                  <Text>Không có dữ liệu</Text>
                  :
                  <View style={styles.box}>
                    <Text
                    >{this.state.posst.map((item, index) => {
                      return (<View key={item.userID}>
                        <TextInput
                          style={{ margin: 10 }}
                         // placeholder={item.address}
                          onChangeText={(addressUserUpdate) => { this.setState({ addressUserUpdate }) }}
                          value={this.state.addressUserUpdate}
                          key={item.userID}></TextInput>
                        {console.log("user neeeee", item.userID)}
                      </View>
                      )
                    })}</Text>
                  </View>
                }
              </View>

            </View>
            <View style={{
              flexDirection: 'column', justifyContent: 'space-between', marginVertical: 30, marginHorizontal: 25,
              borderBottomColor: 'black', height: '15%',
            }}>
              <View>
                <TouchableOpacity
                  style={{ backgroundColor: '#F58B03', height: 50, alignItems: 'center', padding: 10, borderRadius: 20, marginTop: 30 }}
                  onPress={() => {
                    this.updateInfo()
                  }}
                >
                  <Text style={{ fontSize: 25, fontWeight: "bold", color: '#fff' }}>Update</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View> */}

        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            borderRadius: 20,
            justifyContent: 'center',
          }}>
          <View style={styles.viewthanht}>
            <Text style={styles.viewtext}> Tên tài khoản:</Text>
            {this.state.posst === null ? (
              <Text>Không có dữ liệu</Text>
            ) : (
              <View>
                <TextInput
                  style={styles.textinput}
                  autoFocus={true}
                  onChangeText={(nameUserUpdate) => {
                    this.setState({nameUserUpdate});
                  }}
                  value={this.state.nameUserUpdate}></TextInput>
              </View>
            )}
            <Text style={styles.viewtext}>Só điện thoại:</Text>
            {this.state.posst === null ? (
              <Text>Không có dữ liệu</Text>
            ) : (
              <TextInput
                style={styles.textinput}
                onChangeText={(phoneUserUpdate) => {
                  this.setState({phoneUserUpdate});
                }}
                value={this.state.phoneUserUpdate}
                keyboardType="number-pad"></TextInput>
            )}
            <Text style={styles.viewtext}>Địa chỉ:</Text>
            {this.state.posst === null ? (
              <Text>Không có dữ liệu</Text>
            ) : (
              <TextInput
                style={styles.textinput}
                onChangeText={(addressUserUpdate) => {
                  this.setState({addressUserUpdate});
                }}
                value={this.state.addressUserUpdate}></TextInput>
            )}
            {this.state.checkNull ? (
              <Text style={styles.textfail}>
                Vui lòng nhập đầy đủ thông tin để cập nhật thông tin
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                this.updateInfo();
              }}>
              <View style={styles.viewdh}>
                <Text style={styles.textdh}>Cập nhật</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            this.updateInfo();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}>
          <View style={styles.bottomView}>
            <Text style={styles.textdh}>Update</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bottomView: {
    width: '80%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F58B03',

    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 5,
  },
  viewtextm: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyle: {
    //alignItems: 'center',
    //textAlign: 'center',
    marginLeft: width * 0.32,
    fontSize: 20,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Bold',
  },
  viewthanht: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewtext: {
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
    marginLeft: 10,
    paddingBottom: 10,
    marginTop: 20,
  },

  textinput: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    // paddingVertical: 10,
    // paddingHorizontal: width * 0.35,
  },
  textfail: {
    fontSize: 15,
    color: 'red',
    fontFamily: 'ArchivoNarrow-Regular',
    marginLeft: 10,
  },

  textinputbt: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#F8F8FF',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  viewdh: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F58B03',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  textdh: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Regular',
  },
  textfail: {
    fontSize: 15,
    color: 'red',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 10,
  },
});
