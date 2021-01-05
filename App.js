/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Oder from './src/screen/Oder';
import CartResult from './src/component/CartResult';
import Welcome from './src/screen/user/WelcomeScreen';
import login from './src/screen/user/Login';
import Notification from './src/screen/Notification';
import register from './src/screen/user/Register';
import resetpassword from './src/screen/user/Resetpassword';
import Favorite from './src/screen/Favorite';
import {Favoritescreen} from './src/screen/router/Favoritescreen';

import {HomeStackScreen} from './src/screen/router/HomeScreen';
import {CartScreen} from './src/screen/router/CartScreen';
import {User} from './src/screen/router/UserScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const UserStack = createStackNavigator();

function Hometab() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      //activeColor="#F58B03"

      labelStyle={{fontSize: 12}}
      tabBarOptions={{
        activeTintColor: '#F58B03',
      }}
      style={{backgroundColor: '#F58B03'}}>
      <Tab.Screen
        name="Feed"
        component={HomeStackScreen}
        options={{
          headerLeft: null,
          tabBarLabel: 'Khám phá',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Giỏ hàng',

          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={Favoritescreen}
        options={{
          headerStyle: {backgroundColor: '#F58B03'},
          //title: 'Mã giảm giá',
          headerTitle: true,
          tabBarLabel: 'Yêu thích',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={User}
        options={{
          headerTitle: true,
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
        //  headerShown: false,
        }}>
        {/* <Stack.Screen name="CommentList" component={CommentList} /> */}

        <Stack.Screen name="Welcome" component={Welcome}
       options={{headerShown:false}}
         />
        <Stack.Screen
          name="Hometab"
          component={Hometab}
          options={{headerShown:false,
            headerLeft: null,
          
          }}
        />
        <Stack.Screen
          name="login"
          component={login}
          options={() => ({
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
          })}
        />
        <Stack.Screen
          name="register"
          component={register}
          options={() => ({
            headerBackTitleVisible: false,
            headerTitle: true,
            headerTransparent: true,
            headerTintColor: '#fff',
          })}
        />

        <Stack.Screen name="resetpassword" component={resetpassword}
         options={() => ({
            headerBackTitleVisible: false,
            headerTitle: true,
            headerTransparent: true,
            headerTintColor: '#fff',
          })}
        
         />
        <Stack.Screen name="Oder" component={Oder} />

        <Stack.Screen name="CartResult" component={CartResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
