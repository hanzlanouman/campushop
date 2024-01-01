import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAds from '../screens/MyAds';
import UserAdDetails from '../screens/UserAdDetails';
import EditAd from '../screens/EditAd';
const UserAdStack = createStackNavigator();
const UserAdsNav = () => {
  return (
    <UserAdStack.Navigator
      initialRouteName='My Ads'
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserAdStack.Screen name='My Ads' component={MyAds} />
      <UserAdStack.Screen name='UserAdDetails' component={UserAdDetails} />
      <UserAdStack.Screen name='EditAd' component={EditAd} />
    </UserAdStack.Navigator>
  );
};

export default UserAdsNav;
