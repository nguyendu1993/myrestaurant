import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const Product = ({item, onPress}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: item.image}} style={styles.imgitem}></Image>

    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.65,
        height: width * 0.5,
        marginRight: 10,
        alignSelf: 'stretch',
        position: 'relative',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <Text style={styles.textname}>{item.name}</Text>
      <Text style={styles.texttotal}>{item.amount}</Text>
    </View>
  </View>
);
const {width, height} = Dimensions.get('window');
class Menuloaimonsection extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   this.props.fetchAllCategorys();
  // }
  render() {
    // const {onPress} = this.props;
    // const {categorys} = this.props;
    const {category} = this.props;

    return (
      <View>
        <View style={styles.listItemContainer}>
          <View style={styles.itemContainer}>
            <Image
              source={{uri: category.imagesKindFood}}
              style={styles.imgitem}></Image>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: width * 0.69,
                height: width * 0.5,
                marginRight: 5,
                alignSelf: 'stretch',
                position: 'relative',
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <Text style={styles.textname}>{category.nameKindFood}</Text>
              <Text style={styles.texttotal}>{category.quantity}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// Menuloaimonsection.propTypes = {
//   categorys: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       image: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       amount: PropTypes.number.isRequired,
//     }),
//   ).isRequired,
// };
// const mapStateToProps = (state) => {
//   return {
//     categorys: state.categorys,
//   };
// };
// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     fetchAllCategorys: () => {
//       dispatch(actFetchCategorysRequest());
//     },
//   };
// };
export default Menuloaimonsection;

const styles = StyleSheet.create({
  imgitem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.69,
    height: width * 0.5,
    borderRadius: 20,
  },

  textname: {
    color: '#ffff',
    fontSize: 25,
    fontFamily: 'ArchivoNarrow-Italic',
  },
  texttotal: {
    color: '#ffff',
    fontSize: 15,
    fontFamily: 'ArchivoNarrow-Italic',
  },
  listItemContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  itemContainer: {
    width: width * 0.675,
    height: width * 0.5,
    
    marginTop: 10,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgitems: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  viewitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
  },
  textitem: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
