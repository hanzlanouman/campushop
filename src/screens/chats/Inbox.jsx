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
import { COLORS } from '../../Theme/colors';
import useFirestore from '../../hooks/useFirestore';

const Inbox = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const { getUsername } = useFirestore();
  console.log(conversations);

  useEffect(() => {
    const currentUserUid = auth.currentUser.uid;
    const q = query(
      collection(firestore, 'chats'),
      where('chatParticipants', 'array-contains', currentUserUid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const threads = {};
      for (const doc of snapshot.docs) {
        try {
          const messageData = doc.data();
          const otherUserId = messageData.chatParticipants.find(
            (id) => id !== currentUserUid
          );
          if (otherUserId && !threads[otherUserId]) {
            const username = await getUsername(otherUserId); // Fetch username
            threads[otherUserId] = {
              ...messageData,
              uid: otherUserId,
              username, // Add username to the conversation data
            };
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
      setConversations(Object.values(threads));
    });

    return unsubscribe;
  }, []);

  const openChat = (otherUserId) => {
    navigation.navigate('Chat', { otherUserId });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 20,
          color: COLORS.primary,
        }}
      >
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
              <Ionicons name='mail' size={40} color={COLORS.primary} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {item.username || 'Unknown User'}
                </Text>
                <Text>{item.text || 'Start a conversation'}</Text>
              </View>
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
    paddingTop: 50,
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
