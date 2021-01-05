import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
const FavoriteStack = createStackNavigator();
import Favorite from '../Favorite';

export function Favoritescreen() {
    return (
      <FavoriteStack.Navigator
        // headerMode="none"
        screenOptions={{
          headerStyle: {
            elevation: 0, // Android
          },
         
        }}>
        <FavoriteStack.Screen
          name="Favorite"
          component={Favorite}
          options={() => ({
            headerTitleAlign: 'center',
            // title: route.params.title,
            // headerBackTitleVisible: false,
            // headerTitle: true,
            // headerTransparent: true,
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#F58B03'},
            headerLeft: null,
            title:'Món ăn yêu thích'
          })}
        />
   {/* <FavoriteStack.Screen
        name="Thanhtoan"
        component={Thanhtoan}
        options={() => ({
          headerStyle: {backgroundColor: '#F58B03'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
         // headerTitle: false,
          title:'Thanh toán'
          //headerLeft:null
        })}
      /> */}
        {/* <FavoriteStack.Screen name="Cartitem" component={Cartitem} />
        <CartStack.Screen name="DonHang" component={DonHang} />
        <CartStack.Screen
          name="Menuloaimonsection"
          component={Menuloaimonsection}
        />
  
        <CartStack.Screen name="Menu" component={Menu} />
        <CartStack.Screen name="Monansection" component={Monansection} /> */}
        {/* <CartStack.Screen name="Motamonan" component={Motamonan} /> */}
      </FavoriteStack.Navigator>
    );
  }