import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryAdList from '../screens/categories/CategoryAdList';
import Chat from '../screens/chats/Chat';
import AdDetails from '../screens/AdDetails';

const CategoryStack = createStackNavigator();
const CategoryNav = () => {
  return (
    <CategoryStack.Navigator
      initialRouteName='CategoryAds'
      screenOptions={{
        headerShown: false,
      }}
    >
      <CategoryStack.Screen name='CategoryAds' component={CategoryAdList} />
      <CategoryStack.Screen name='Chat' component={Chat} />
      <CategoryStack.Screen name='AdDetails' component={AdDetails} />
    </CategoryStack.Navigator>
  );
};

export default CategoryNav;
