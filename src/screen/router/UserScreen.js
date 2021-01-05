import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
const UserStack = createStackNavigator();
import userinfo from './../user/UserInfo';
import changepassword from './../user/ChangePassword';
import userdetail from './../user/UserDetail';
import DonHang from './../DonHang';

import register from './../user/Register';
import login from './../user/Login';
import DonHangChitiet from './../DonHangChitiet';
import Home from './../Home';

import updateinfo from './../user/UpdateInfo';
import Voucher from './../Voucher';
import History from './../History';

export function User() {
    return (
      <UserStack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0, // Android
          },
          headerTitleStyle: {
            // fontWeight: 'bold',
          },
        }}>
        <UserStack.Screen
          name="Profile"
          component={userinfo}
          options={() => ({
            headerTitleAlign: 'center',
            title:'Thông tin người dùng',
            
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#F58B03'},
            headerLeft: null,
        
          })}
        />
          <UserStack.Screen
          name="Change Password"
          component={changepassword}
          options={() => ({
            headerTitleAlign: 'center',
           
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#F58B03'},
            headerLeft: null,
            
          })}
        />
        <UserStack.Screen
          name="userdetail"
          component={userdetail}
          options={() => ({
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            //headerLeft: null
           
          })}
        />
        <UserStack.Screen
          name="register"
          component={register}
          options={({route}) => ({
            // headerBackTitleVisible: true,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            //headerLeft: null
          })}
        />
        <UserStack.Screen
          name="login"
          component={login}
          options={({route}) => ({
            // headerBackTitleVisible: true,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            //headerLeft: null
          })}
        />
        <UserStack.Screen
          name="updateinfo"
          component={updateinfo}
          options={() => ({
            headerTitleAlign: 'center',
    
            title:'Cập nhật thông tin',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#F58B03'},
          })}
        />
        <UserStack.Screen
          name="Voucher"
          component={Voucher}
          options={() => ({
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            // headerTitle: true,
            // headerTransparent: true,
            headerTintColor: '#fff',
            title:'Mã giảm giá',
            headerStyle: {backgroundColor: '#F58B03'},
          })}
        />
      
         <UserStack.Screen
        name="DonHangChitiet"
        component={DonHangChitiet}
        options={({}) => ({
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,

          headerTintColor: '#fff',
          headerStyle: {backgroundColor: '#F58B03'},
          title:'Đơn hàng chi tiết'
        })}
      />
       <UserStack.Screen
        name="DonHang"
        component={DonHang}
        options={() => ({
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#F58B03' ,},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        //   headerTitle: false,
        title:'Đơn hàng'
        })}
      />
        <UserStack.Screen
          name="History"
          component={History}
          options={() => ({
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            title:'Lịch sử mua hàng',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#F58B03'},
          })}
        />
              <UserStack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: null,
          headerShown:false
        })}
      />
      
      </UserStack.Navigator>
    );
  }