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
import h1 from '../images/h1.jpg';
import Menuloaimonsection from '../component/Menuloaimonsection';
import {
  actionAddToCart,
  actFetchCategorysRequest,
} from '../redux/actions/index';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');
import Categorysection from '../../src/component/Categorysection';

class Loaimon extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllCategorys();
  }
  render() {
    var {categorys} = this.props;
    console.log(categorys);
    const {navigation, onPress} = this.props;
    return (
      <View style={{flex: 1}}>
        {/* <StatusBar backgroundColor="#F58B03" barStyle="light-content" /> */}
        <View style={styles.listItemContainer}>
          <ScrollView>
            {/* //{this.props.children} */}
            {this.showCategorys(categorys)}
          </ScrollView>
        </View>
      </View>
    );
  }
  showCategorys(categorys) {
    if (categorys.length > 0) {
      return (
        <FlatList
          numColumns={2}
          data={categorys}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Monan', {item: item})
              }>
              <Categorysection key={item.id} category={item} />
            </TouchableOpacity>
          )}
        />
      );
    }
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Loaimon);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#F58B03',
    // backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    // padding:5
  },
  viewtextm: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyle: {
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: width * 0.32,
    fontSize: 20,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Bold',
  },
  imgitem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.47,
    height: width * 0.6,
    borderRadius: 10,
  },
  viewtext: {
    alignItems: 'center',
    marginTop: -width * 0.35,
  },
  textname: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'ArchivoNarrow-MediumItalic',
  },
  listItemContainer: {
    flexDirection: 'row',
    // marginBottom: 40,
    padding: 5,
  },

  itemContainer: {
    width: width * 0.5,
    height: width * 0.6,
    marginBottom: 10,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewitem: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingHorizontal: 20,
  },
  textitem: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
