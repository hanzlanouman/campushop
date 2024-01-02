// Chat.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, firestore } from '../../config/firebase.config';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { View, Text } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const { currentUser } = useContext(AuthContext);
  const currentUserUid = auth.currentUser.uid;
  const { otherUserId, adTitle } = route.params; // ID of the user who posted the ad

  const getOtherUser = useCallback(async () => {
    const otherUserDoc = await getDoc(doc(firestore, 'users', otherUserId));
    setOtherUser(otherUserDoc.data());
    return otherUserDoc.data();
  }, [otherUserId]);

  useEffect(() => {
    getOtherUser();
    const chatQuery = query(
      collection(firestore, 'chats'),
      where('chatParticipants', 'array-contains', currentUserUid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const messagesData = snapshot.docs
        .filter((doc) => doc.data().chatParticipants.includes(otherUserId))
        .map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }));
      setMessages(messagesData);
    });

    return unsubscribe;
  }, [otherUserId]);

  const onSend = useCallback(
    (messages = []) => {
      const { _id, createdAt, text, user } = messages[0];
      console.log('onSend');
      console.log({
        _id,
        createdAt,
        text,
        user,
        chatParticipants: [currentUserUid, otherUserId],
      });

      addDoc(collection(firestore, 'chats'), {
        _id,
        createdAt,
        text,
        user,
        chatParticipants: [currentUserUid, otherUserId],
      });
    },
    [otherUserId]
  );

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 50,
        }}
      >
        {otherUser.username}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
        }}
      >
        {adTitle}
      </Text>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth.currentUser.uid,
          name: currentUser.username,
          avatar: currentUser.profileImageUrl,
        }}
        inverted={true}
      />
    </View>
  );
};

export default Chat;
