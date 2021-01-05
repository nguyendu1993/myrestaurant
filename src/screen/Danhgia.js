import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  ActivityIndicator,ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Feather from 'react-native-vector-icons/Feather';
import rating from '../redux/reducers/rating';
import StarRating from 'react-native-star-rating';
import {
  actaddCommentTofirebase,
  actFetUserlRequest,
} from '../redux/actions/index';
const {height, width} = Dimensions.get('window');

class Danhgia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      comment: '',
      userID: '',
      nameUser: '',
      processing: false,
      check_btns:false

    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  handlecomment = (comment) => {
    this.setState({comment: comment});
  };
  async getData() {
    return await AsyncStorage.getItem('userID');
  }
  getuserName = async () => {
    var userID = await this.getData();

    var {user} = this.props;
    // console.log(user, 'ffffff');
    var name = '';

    if (user != 0) {
      for (var i in user) {
        if (user[i].userID == userID) {
          name = user[i].nameUser;
        }
      }
      this.setState({
        nameUser: name,
      });
    }
  };

  componentDidMount() {
    this.props.fetRequestuser();
    setTimeout(() => {
      this.getuserName();
    }, 1000);
  }
  render() {
    const {route, navigation} = this.props;
    const {product, check_favorite} = route.params;
    const {userID, starCount, comment, nameUser,check_btns} = this.state;

    const onAddComments = async (
      product,
      check_favorite,
      starCount,
      comment,
      userID,
    ) => {
      var userID = await this.getData();
      if (starCount == 0) {
        ToastAndroid.show(' bạn hãy đánh gía', ToastAndroid.SHORT);
      }else{
        this.props.onAddComment(
          product,
          check_favorite,
          starCount,
          comment,
          userID,
          nameUser,
        );
        this.setState({processing: true});
        this.props.navigation.navigate('Comment', {product: product,check_btns:"false"});
      }
     
    };
    return (
      <View style={styles.container}>
        <View style={styles.viewthanht}>
          <Text style={styles.textSao}>Sao</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.viewStar}>
              <StarRating
                disabled={false}
                maxStars={5}
                fullStarColor={'#F58B03'}
                starSize={40}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
            <View style={styles.viewthanht}></View>
          </View>
          <Text style={styles.textSao}>Bình luận</Text>
          <View style={styles.viewComt1}>
            <TextInput
              autoFocus={true}
              style={styles.viewComt}
              value={this.state.comment}
              onChangeText={this.handlecomment}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() =>
              onAddComments(
                product,
                check_favorite,
                starCount,
                comment,
                userID,
                nameUser,
              )
            }>
            <View style={styles.bottomView}>
              <Text style={styles.textbtn}>Gửi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddComment: (
      product,
      check_favorite,
      starCount,
      comment,
      userID,
      nameUser,
    ) => {
      dispatch(
        actaddCommentTofirebase(
          product,
          check_favorite,
          starCount,
          comment,
          userID,
          nameUser,
        ),
      );
    },

    fetRequestuser: () => {
      dispatch(actFetUserlRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Danhgia);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  viewthanht: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
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
  viewStar: {
    flexDirection: 'row',
    backgroundColor: '#F8F8FF',
    // paddingHorizontal:width*0.15,
    width: '95%',
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSao: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'ArchivoNarrow-Regular',
  },
  viewComt: {
    backgroundColor: '#F8F8FF',

    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    borderRadius: 10,

    marginRight: 10,
  },
  viewComt1: {
    backgroundColor: '#F8F8FF',

    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,

    height: height * 0.3,
    marginRight: 10,
  },
  textbtn: {
    fontSize: 30,
    fontFamily: 'ArchivoNarrow-Regular',
    color: 'white',
  },
  bottomView: {
    height: 50,
    backgroundColor: '#F58B03',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,

    borderRadius: 10,
    marginBottom: 20,
  },

  bottomViewss: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
