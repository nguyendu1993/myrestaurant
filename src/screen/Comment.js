import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,ScrollView,FlatList
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import rating from '../redux/reducers/rating';
import StarRating from 'react-native-star-rating';
const {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {actFetComment} from '../redux/actions/index';
import Commentsection from './../component/Commentsection'
 class Comment extends Component {
  constructor(props) {
    super(props);
    this.state ={
      check_btn:true
    }
  }
  async getData() {
    return await AsyncStorage.getItem('userID');
  }

  async componentDidMount() {
    var userID = await this.getData();
    const {route, navigation,comments} = this.props;
    const {product,check_favorite,check_btns} = route.params;

    this.props.fetcomment(product);
    if(userID == comments[0].userID){
      this.setState({check_btn:false})

    }
   if(check_btns){
    this.setState({check_btn:false})
   }

  }
  componentDidUpdate = async (prevState) => {
    const {route} = this.props;
    const {check_btns} = route.params;

   // console.log(check_btns,"khgf")
    // // const {product} = route.params;
    if (check_btns) {
      this.setState({check_btn:false})
    }
  };

  render() {
    const {route, navigation,comments} = this.props;
    const {product,check_favorite} = route.params;
    const {check_btn}= this.state;
   // console.log(check_btns,"sssssss");
    return (
      <View style={styles.container}>
        <View>
          <Image source={{uri: product.imagesFood}} style={styles.viewimg}></Image>
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
        <ScrollView>
        {check_btn ? (
        <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('Danhgia',{product:product,check_favorite:check_favorite})}>
        <View style={styles.viewComment}>
          <View style={styles.viewitem}>
            <Feather name="message-square" color="gray" size={25} />
          </View>
          <View style={{justifyContent:'center', }}>
          <Text style={styles.viewtextCommet}>
              Bình luận và  đánh giá
          </Text>
          </View>
         
        </View>
        </TouchableWithoutFeedback>
        ) : null}
        <View style={styles.listItemContainer}>
         
            {/* //{this.props.children} */}
            {this.showcomment(comments,navigation)}
          
        </View>
        
        </ScrollView>

      </View>
    );
  }

  showcomment(comments, navigation) {
  
    if (comments.length > 0) {
      return (
        <FlatList
          data={comments}
           keyExtractor={(item) => item.date.toString()}
          renderItem={({item}) => (
            <Commentsection key={item.id} comment={item} navigation={navigation} />
          )}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch,) => {

  return {
    fetcomment:(product) => {
      dispatch(actFetComment(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comment);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
  viewimg: {
    width: width,
    height: height * 0.3,
   alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  viewname: {
    marginLeft: 20,
    position: 'absolute',

    marginTop: height * 0.18,
  },
  textstyle: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Bold',
  },
  ovelay: {
    width: width,
    height: height * 0.3,
    position: 'absolute',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  viewbottom: {
    backgroundColor: '#F58B03',
    marginTop: 10,
    width: 120,
    borderRadius: 5,
    justifyContent: 'center',
  },
  textbt: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'ArchivoNarrow-Italic',
    fontSize: 12,
  },
  viewComment: {
   
    flexDirection:'row',
    marginTop: 10,
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewitem: {
      justifyContent:'center',
      marginLeft:10
  },
  viewtextCommet:{
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Regular',
    justifyContent:'center',
    alignItems:'center', marginLeft:10,
    color: 'gray',
  },
  listItemContainer:{
    marginTop:20
  }
});
