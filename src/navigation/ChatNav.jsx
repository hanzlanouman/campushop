import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inbox from '../screens/chats/Inbox';
import Chat from '../screens/chats/Chat';

const ChatStack = createStackNavigator();

const ChatNav = () => {
  return (
    <ChatStack.Navigator
      initialRouteName='Inbox'
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatStack.Screen name='Inbox' component={Inbox} />
      <ChatStack.Screen name='Chat' component={Chat} />
    </ChatStack.Navigator>
  );
};

export default ChatNav;
