import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Divider, Avatar, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Inbox = () => {
  const navigation = useNavigation();
  const messages = [
    {
      id: '1',
      from: 'User1',
      message: 'This is the first message',
    },
    {
      id: '2',
      from: 'User 2',
      message: 'This is the second message',
    },
    {
      id: '3',
      from: 'User 3',
      message: 'This is the third message',
    },
  ];

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 10,
          marginBottom: 20,
        }}
      >
        Inbox
      </Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Chat', { item })}>
            <List.Item
              title={item.from}
              description={item.message}
              left={() => <Avatar.Icon size={40} icon='email' />}
              right={() => <MaterialIcons name='navigate-next' size={24} />}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  messageText: {
    marginLeft: 10,
  },
});

export default Inbox;
