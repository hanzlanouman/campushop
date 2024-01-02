// Inbox.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { auth, firestore } from '../../config/firebase.config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const Inbox = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const currentUserUid = auth.currentUser.uid;
    const q = query(
      collection(firestore, 'chats'),
      where('chatParticipants', 'array-contains', currentUserUid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const threads = {};
      snapshot.docs.forEach((doc) => {
        const messageData = doc.data();
        const otherUserId = messageData.chatParticipants.find(
          (id) => id !== currentUserUid
        );
        if (otherUserId && !threads[otherUserId]) {
          threads[otherUserId] = { ...messageData, uid: otherUserId };
        }
      });
      setConversations(Object.values(threads));
    });

    return unsubscribe;
  }, []);

  const openChat = (otherUserId) => {
    navigation.navigate('Chat', { otherUserId });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
        Inbox
      </Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => openChat(item.uid)}
              style={styles.itemContainer}
            >
              <Ionicons name='mail' size={50} color='#7a29ff' />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}
              >
                {item.text || 'Start a conversation'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#ccc' }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 50,
  },
  item: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Inbox;
