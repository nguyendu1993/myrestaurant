import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {

  actFetAllFood,
} from '../redux/actions/index';
import Homsection from '../component/Homsection';

import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

 class AllFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.props.fetchAllCategorysall();
  }
  render() {
    const {navigation} = this.props;
    const {cartdetail} = this.props;
    return (
        <View style={{flex: 1}}>
        {/* <StatusBar backgroundColor="#F58B03" barStyle="light-content" /> */}
        <View style={styles.listItemContainer}>
          <ScrollView>
            {/* //{this.props.children} */}
            {this.showFood(cartdetail,navigation)}
          </ScrollView>
        </View>
      </View>
    );
  }
  showFood(cartdetail, navigation) {
    if (cartdetail.length > 0) {
      return (
        <FlatList
          data={cartdetail}
          //horizontal={true}
         // keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() =>
              navigation.navigate('Motamonan', {product: item})
            }
            >
              <Homsection key={item.id} cartdetail={item} />
            </TouchableOpacity>
          )}
        />
      );
    }
  }
}
const mapStateToProps = (state) => {
    return {
        cartdetail: state.cartdetail,
    };
  };
  const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCategorysall: () => {
        dispatch(actFetAllFood());
      },
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AllFood)
  const styles = StyleSheet.create({
   
    listItemContainer: {
      flexDirection: 'row',
      // marginBottom: 40,
      padding: 5,
      backgroundColor:'white'
    },
  
    itemContainer: {
      width: width * 0.5,
      height: width * 0.6,
      marginBottom: 10,
    }
  });
  