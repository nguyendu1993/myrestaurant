import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import {connect} from 'react-redux';

import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native-gesture-handler';
import h1 from '../../images/h2.jpg';
import Loaimon from '../../screen/Loaimon';
//import product from '../reducers/products';
import Categorysection from '../../component/Categorysection';
import PropTypes from 'prop-types';
const {height, width} = Dimensions.get('window');
import {actionAddToCart, actFetchCategorysRequest} from '../actions/index';
class Categorycontainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllCategorys();
  }
  render() {
    var {categorys} = this.props;
    // console.log(categorys);
    return <Loaimon>{this.showCategorys(categorys)}</Loaimon>;
  }

  showCategorys(categorys) {
    var result = null;
    if (categorys.length > 0) {
      

      return (
        <FlatList
          numColumns={2}
          data={categorys}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Monan',{item:item}) }>
              <Categorysection key={item.id} category={item} />
            </TouchableOpacity>
          )}
        />
      );
    }
  }
}
Categorycontainer.propTypes = {
  categorys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
const mapStateToProps = (state) => {
  return {
    categorys: state.categorys,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllCategorys: () => {
      dispatch(actFetchCategorysRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categorycontainer);
