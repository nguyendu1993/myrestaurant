import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
const HomeStack = createStackNavigator();
import updateinfo from './../user/UpdateInfo';

import Home from './../Home';
import Notification from './../Notification';
import Search from './../Search';
import Menu from './../Loaimon';
import GioHang from './../Cart';
import Monan from './../Monan';
import DonHang from './../DonHang';
import Motamonan from './../Motamonan';
import Thanhtoan from './../Thanhtoan';
import Danhgia from './../Danhgia';
import Voucher from './../Voucher';
import Comment from './../Comment';
import DonHangChitiet from './../DonHangChitiet';
import AllFood from './../AllFood';


export const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },
        headerTitleStyle: {
          // fontWeight: 'bold',
          
        },
      }}>
      <HomeStack.Screen
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
      <HomeStack.Screen
        name="Notification"
        component={Notification}
        options={() => ({
          headerTitleAlign: 'center',
          headerTransparent: true,
          headerTintColor: '#fff',
          title:"Thông báo"
        })}
      />
      <HomeStack.Screen
        name="Search"
        component={Search}
        options={() => ({
          headerShown: false,
          
          headerLeft: null,
        })}
      />
      <HomeStack.Screen
        name="Menu"
        component={Menu}
        options={() => ({
          headerBackTitleVisible: false,
          headerStyle: {backgroundColor: '#F58B03'},
           headerTintColor: '#fff',
          headerTitleAlign: 'center',
          title:'Loại món'
        })}
      />
      <HomeStack.Screen
        name="Monan"
        component={Monan}
        options={() => ({
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
        })}
      />
      <HomeStack.Screen
        name="GioHang"
        component={GioHang}
        options={() => ({
          //headerBackTitleVisible: false,
          headerStyle: {backgroundColor: '#F58B03'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          title:'Giỏ Hàng'
        })}
      />
      <HomeStack.Screen
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

      <HomeStack.Screen
        name="Motamonan"
        component={Motamonan}
        options={() => ({
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
        })}
      />
      <HomeStack.Screen
        name="Thanhtoan"
        component={Thanhtoan}
        options={() => ({
          headerStyle: {backgroundColor: '#F58B03'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          title:'Thanh toán'
        })}
      />
      <HomeStack.Screen
        name="Danhgia"
        component={Danhgia}
        options={() => ({
          //headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#F58B03' ,},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          title:'Đánh giá'
        })}
      />
      <HomeStack.Screen
        name="Comment"
        component={Comment}
        options={() => ({
          headerTitle: false,
          headerTransparent: true,
          title:"Bình luận",
          headerTintColor: '#fff',
        })}
      />

      <HomeStack.Screen
        name="Voucher"
        component={Voucher}
        options={() => ({
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,

          title:'Mã giảm giá',
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: '#F58B03'},
        })}
      />
      <HomeStack.Screen
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
      <HomeStack.Screen
          name="updateinfo"
          component={updateinfo}
          options={() => ({
            headerTitleAlign: 'center',
    
            title:'Cập nhật thông tin',
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: '#F58B03'},
          })}
        />
      <HomeStack.Screen
        name="AllFood"
        component={AllFood}
        options={() => ({
          headerBackTitleVisible: false,
          
          headerTitleAlign: 'center',

          headerTransparent: false,
        })}
      />
    </HomeStack.Navigator>
  );
};
