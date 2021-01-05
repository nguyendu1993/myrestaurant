import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {shadow} from 'react-native-paper';
import close from '../images/close.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Monansection from '../component/Monansection';
import {actFetchAllPrductsRequest} from '../redux/actions/index';
import {connect} from 'react-redux';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      datas: [],
    };
  }
  componentDidMount() {
    const {navigation, products} = this.props;

    this.props.fetchAllProduct();
    this.setState({
      datas: products,
    });
  }
  render() {
    const {navigation, products} = this.props;
    const {search, datas} = this.state;

    // console.log(products, 'aaaaa');
    return (
      <View style={styles.container}>
        <View style={styles.close}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={close} style={{margin: 20}} />
          </TouchableOpacity>

          <View style={styles.title}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginTop: 10,
                left: '5%',
                color: '#FFF',
              }}>
              Tìm kiếm
            </Text>
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Tìm kiếm..."
            style={styles.input}
            onChangeText={(search) =>
              this.searchFilterFunction(search, products)
            }
            value={search}
          />
        </View>
      
          <ScrollView>{this.showProduct(datas, navigation)}</ScrollView>
      
      </View>
    );
  }
  searchFilterFunction = (text, products) => {
    if (text) {
      const newData = products.filter((item) => {
        const itemData = item.nameFood
          ? item.nameFood.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      this.setState({
        datas: newData,
        search: text,
      });
    } else {
      this.setState({
        search: text,
        datas: products,
      });
    }
  };
  showProduct(datas, navigation) {
    var result = null;
    if (datas.length > 0) {
      result = datas.map((product, index) => {
        return (
          <Monansection key={index} product={product} navigation={navigation} />
        );
      });
    }
    return result;
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProduct: () => {
      dispatch(actFetchAllPrductsRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
  },

  body: {
    flex: 3,
  },
  close: {
    backgroundColor: '#F58B03',
    height: 200,
  },
  title: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    flex: 1,
    margin: 5,
    backgroundColor: '#F1F1F1',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#F1F1F1',
    textAlign: 'justify',
    borderRadius: 10,
    margin: 30,
    shadowColor: '#000',
    shadowOffset: {
      height: 1,
    },
    paddingLeft: 15,
    elevation: 10,
    shadowOpacity: 0.5,
  },
  viewitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
    paddingHorizontal: 20,
  },
  viewitem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
  },
  textitem: {
    fontSize: 17,
    fontFamily: 'ArchivoNarrow-SemiBold',
  },
});
