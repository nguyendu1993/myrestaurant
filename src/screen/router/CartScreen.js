import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
const CartStack = createStackNavigator();
import GioHang from './../Cart';
import Thanhtoan from './../Thanhtoan';



export function CartScreen() {
    return (
      <CartStack.Navigator
        // headerMode="none"
        screenOptions={{
          headerStyle: {
            elevation: 0, // Android
          },
         
        }}>
        <CartStack.Screen
          name="Cart"
          component={GioHang}
          options={({route}) => ({
            headerTitleAlign: 'center',
            // title: route.params.title,
            // headerBackTitleVisible: false,
            // headerTitle: true,
            // headerTransparent: true,
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#F58B03'},
            headerLeft: null,
            title:'Giỏ hàng'
          })}
        />
   {/* <CartStack.Screen
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
        {/* <CartStack.Screen name="Cartitem" component={Cartitem} />
        <CartStack.Screen name="DonHang" component={DonHang} />
        <CartStack.Screen
          name="Menuloaimonsection"
          component={Menuloaimonsection}
        />
  
        <CartStack.Screen name="Menu" component={Menu} />
        <CartStack.Screen name="Monansection" component={Monansection} /> */}
        {/* <CartStack.Screen name="Motamonan" component={Motamonan} /> */}
      </CartStack.Navigator>
    );
  }