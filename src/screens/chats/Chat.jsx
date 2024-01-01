import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Chat = ({ route }) => {
  console.log(route.params);
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
