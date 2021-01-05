import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import h1 from '../images/h2.jpg';

import * as Message from '../redux/constants/Message';
import add from '../images/add.png';
import minus from '../images/minus.png';
import AsyncStorage from '@react-native-community/async-storage';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import {
  actionAddToCart,
  actionAddFavorite,
  actDeleteFavorite,
  actFetComment,
} from '../redux/actions/index';
import {addLike, updateLike, getallLike} from '../redux/actions/like';
const {height, width} = Dimensions.get('window');

class Motamonan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      check_favorite: false,
      userID: '',
      foodID: '',
      totalComent: '',
      totalRating: '',
      totalFavorite: '',
      pro: [],
      check_btn: false,
    };
  }
  async getData() {
    return await AsyncStorage.getItem('userID');
  }

  componentDidMount = async () => {
    var userID = await this.getData();
    const {route, navigation, rating, comments, like} = this.props;
    const {product} = route.params;
    await this.props.fetcomment(product);
    await this.props.fetLike(userID);
    console.log(comments, 'cm');
    await setCloror(rating);
    await setTotal(comments);
  //  await setLike();
    setTimeout(() => {}, 1000);
    // await settotalcomment(comments)
    //this.props.fetRequestrating();
  };

  componentDidUpdate = async (prevState) => {
    const {route, navigation, rating, comments} = this.props;
    // // const {product} = route.params;
    if (comments) {
      if (this.state.pro.id !== prevState.comments[0].foodID) {
        setTotal(comments);
      }
    }
  };
  render() {
    const {route, navigation, rating, comments, like} = this.props;
    //const {ids, name, image, price,} = route.params;
    const {product} = route.params;
    //console.log(like, 'rt');
    var {
      quantity,
      check_favorite,
      userID,
      foodID,
      totalComent,
      totalRating,
      check_btn,
    } = this.state;

    setCloror = (rating) => {
      var foodID = product.id;
      // console.log(foodID, 'fid');
      if (rating.length > 0) {
        for (var i = 0; i < rating.length; i++) {
          if (rating[i].id == foodID) {
            this.setState({check_favorite: true,
              totalFavorite:this.state.totalFavorite+1
            });
          }
        }
      }
    };
    setTotal = async (comments) => {
      const {route, navigation, rating} = this.props;
      const {product} = route.params;
      // var totalcoment = 0;
      var foodID = product.id;
      var totalfavorite = 0;
      var totalrating = 0;

      for (var i = 0; i < comments.length; i++) {
        if (comments[i].foodID == foodID) {
          if (comments[i].favorite == true) {
            totalfavorite++;
          }
          (totalrating += Math.round(comments[i].star / comments.length)),
            this.setState({
              totalComent: comments.length,
             totalFavorite: totalfavorite,
              totalRating: totalrating,
              foodID: foodID,
              pro: product,
            });
        }
      }
    };

    const checkfavorite = async (product) => {
      var userID = await this.getData();
      var foodID = product.id;

      if (!check_favorite) {
        this.setState({
          check_favorite: true,
          totalFavorite:this.state.totalFavorite+1
        });

        this.props.onAddFavorite(product);
      } else {
        this.setState({
          check_favorite: false,
          totalFavorite:this.state.totalFavorite - 1
        });
          
        this.props.onDeleteFavorite(product);
      }
    };

    setLike = async () => {
      var totalfavorite = 0;
      const {like, rating} = this.props;
      const {product} = route.params;

      for (var i = 0; i < like.length; i++) {
        if (product.id == like[i].foodID) {
          if (like[i].favorite == true) {
            totalfavorite++;
            console.log(product, 'li');
          }
          this.setState({
            totalFavorite: totalfavorite,
          });
        }
      }
    };
    return (
      <View style={{flex: 1}}>
     
        <View style={styles.viewbgr}>
          <View>
            <Image
              source={{uri: product.imagesFood}}
              style={styles.viewimg}></Image>
          </View>

          <View style={styles.ovelay}></View>
          <View style={styles.viewname}>
            <TouchableWithoutFeedback>
              <Text style={styles.textstyle}>{product.nameFood}</Text>
            </TouchableWithoutFeedback>
            <View style={styles.viewbottom}>
              <Text style={styles.textbt}>Miễn phí vận chuyển</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewstarts}>
          <View style={styles.viewstart}>
            <FontAwesome name="star" size={25} color="#F58B03" />
            <View style={styles.viewsao}>
              <Text style={styles.textst}>{this.state.totalRating}</Text>
              <Text style={styles.textst}>Sao</Text>
            </View>
          </View>
          <View
            style={{
              borderColor: '#DDDDDD',
              borderWidth: 1,
              paddingTop: 40,
            }}></View>
          <TouchableOpacity
            onPress={() => checkfavorite( product)}>
            <View style={styles.viewstart}>
              <FontAwesome
                name="bookmark"
                size={25}
                color={check_favorite ? 'red' : '#F58B03'}
              />
              <View style={styles.viewsao}>
                <Text style={styles.textst}>{this.state.totalFavorite}</Text>
                <Text style={styles.textst}>thích</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              borderColor: '#DDDDDD',
              borderWidth: 1,
              paddingTop: 40,
            }}></View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Comment', {
                product: product,
                check_favorite: check_favorite,
              })
            }>
            <View style={styles.viewstart}>
              <FontAwesome name="comments" size={25} color="#F58B03" />
              <View style={styles.viewsao}>
                <Text style={styles.textst}>{this.state.totalComent}</Text>
                <Text style={styles.textst}>Bình Luận</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
<ScrollView>
        <View style={{backgroundColor: '#fff', height: height}}>
          <Text style={styles.textview}>Mô tả</Text>
          <Text style={styles.textmota}>{product.informationFood}</Text>
          <Text style={styles.textview}>Giá</Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={styles.textprice}>{product.price}</Text>
            <Text style={styles.textprice}>VNĐ</Text>
          </View>
          <Text style={styles.textview}>Số lượng</Text>

          <View
            style={{
              flexDirection: 'row',

              marginLeft: width * 0.15,
              marginRight: width * 0.15,
              justifyContent: 'space-between',
            }}>
            <View style={styles.viewbtt}>
              <TouchableOpacity
                onPress={() => this.onupdatequantitys(quantity)}>
                <View style={styles.viewtru}>
                  <Image source={minus} style={{width: 30, height: 30}}></Image>
                  {/* <FontAwesome name="minus-circle" size={30} color="gray" /> */}
                  <View
                    style={{
                      borderColor: '#DDDDDD',
                      borderWidth: 0.5,
                      paddingTop: 15,
                      marginLeft: 5,
                    }}></View>
                </View>
              </TouchableOpacity>

              <View style={styles.viewpr}>
                <Text style={styles.textsl}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => this.onupdatequantity()}>
                <View style={styles.viewtru}>
                  <View
                    style={{
                      borderColor: '#DDDDDD',
                      borderWidth: 0.5,
                      paddingTop: 15,
                      marginRight: 5,
                    }}></View>
                  <Image source={add} style={{width: 30, height: 30}}></Image>
                  {/* <FontAwesome name="plus-circle" size={30} color="gray" /> */}
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.viewbtngia}>
              <Text style={styles.textthem}>
                {quantity * product.price} VNĐ
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={() => this.onAddToCarts(product, quantity)}>
            <View style={styles.viewbtnthem}>
              <Text style={styles.textthem}>Thêm vào giỏ</Text>
            </View>
          </TouchableOpacity>
          
        </View>
        </ScrollView>
        {check_btn ? (
          <View
            style={{
              width: '100%',

              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableOpacity
              onPress={() => this.onshowcart()}
              style={styles.bottomView}>
              <View>
                <Text style={styles.textStyle}>Xem giỏ hàng</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      
      </View>
    );
  }

  onshowcart = () => {
    this.props.navigation.navigate('GioHang');
    this.setState({check_btn: false});
  };
  onAddToCarts = (product, quantity) => {
    this.props.onAddToCart(product, quantity);

    this.setState({check_btn: true}); //this.props.navigation.navigate('CartContainer')
  };
  onupdatequantity = () => {
    this.setState({
      quantity: this.state.quantity + 1,
    });
  };
  onupdatequantitys = (quantity) => {
    if (quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  };
}
// onAddFavorites = (product,check_favorite) => {
//   this.props.onAddFavorite(product,check_favorite);
// };
const mapStateToProps = (state) => {
  return {
    products: state.products,
    rating: state.rating,
    comments: state.comments,
    like: state.like,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddToCart: (product, quantity) => {
      dispatch(actionAddToCart(product, quantity));
    },
    // onAddFavorite: (product, check_favorite, userID) => {
    //   dispatch(addLike(product, check_favorite, userID));
    // },
    onAddFavorite: (product) => {
      dispatch(actionAddFavorite(product));
    },
    onUpdateLikes: (like, product, check_favorite, userID) => {
      dispatch(updateLike(like, product, check_favorite, userID));
    },
    fetcomment: (product) => {
      dispatch(actFetComment(product));
    },
    fetLike: (userID) => {
      dispatch(getallLike(userID));
    },
    // udateRating: (foodID, UserID) => {
    //   dispatch(actUpdateRating(foodID, UserID));
    // },
    onDeleteFavorite: (product) => {
      dispatch(actDeleteFavorite(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Motamonan);
const styles = StyleSheet.create({
  viewbgr: {
    flexDirection: 'row',
  },
  viewimg: {
    width: width,
    height: height * 0.3,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  ovelay: {
    width: width,
    height: height * 0.4,
    position: 'absolute',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textstyle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Bold',
  },
  viewname: {
    marginLeft: 20,
    position: 'absolute',

    marginTop: height * 0.18,
  },
  viewbottom: {
    backgroundColor: '#F58B03',
    marginTop: 10,
     borderRadius: 5,
     width:120
    //justifyContent: 'center',
  },
  textbt: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'ArchivoNarrow-Italic',
    fontSize: 12,
  },
  viewstarts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    padding: 10,
  },
  viewstart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewsao: {
    marginLeft: 10,
  },
  textst: {
    fontFamily: 'ArchivoNarrow-Bold',
    fontSize: 12,
  },
  textview: {
    fontSize: 17,
    marginLeft: 20,
    marginTop: 10,
    fontFamily: 'ArchivoNarrow-Medium',
  },
  textmota: {
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    fontFamily: 'ArchivoNarrow-Regular',
  },
  textprice: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'ArchivoNarrow-Bold',
    color: '#F58B03',
  },
  viewbtt: {
    flexDirection: 'row',

    backgroundColor: 'white',

    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
    marginRight: 20,
  },
  viewpr: {
    justifyContent: 'center',
  },
  textsl: {
    fontSize: 15,

    marginHorizontal: width * 0.1,
    fontFamily: 'ArchivoNarrow-Medium',
    color: '#F58B03',
  },
  viewtru: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  viewbtnthem: {
    marginTop: height * 0.05,
    alignItems: 'center',
    backgroundColor: '#F58B03',
    marginHorizontal: width * 0.15,
    padding: 7,
    borderRadius: 10,
  },
  textthem: {
    fontSize: 15,

    fontFamily: 'ArchivoNarrow-Regular',
    color: 'white',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  viewbtngia: {
    backgroundColor: '#F58B03',

    paddingVertical: 3,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 20,
    height: 35,
    fontFamily: 'ArchivoNarrow-Regular',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#F58B03',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  bottomView: {
    width: width * 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#F58B03',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
});
