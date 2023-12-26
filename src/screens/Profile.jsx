import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import useFirestore from '../hooks/useFirestore';
import { auth } from '../config/firebase.config';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { updateUserProfile } = useFirestore();
  const { updateUserPassword, updateUserEmail } = useAuth();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState(''); // Password should not be fetched from Firestore

  const handleUpdate = async () => {
    // Update user profile in Firestore
    const updatedData = { username, email }; // Include other fields as necessary
    await updateUserProfile(currentUser.uid, updatedData);

    // Update currentUser in context
    setCurrentUser({ ...currentUser, ...updatedData });

    if (password !== '') {
      await updateUserPassword(password);
    }
    if (email != currentUser.email) {
      await updateUserEmail(email, password);
    }
  };
  console.log(currentUser.profilePictureUrl);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: currentUser?.profileImageUrl }}
        style={styles.image}
      />
      <TextInput
        label='Username'
        value={username}
        onChangeText={setUsername}
        mode='outlined'
        style={styles.input}
      />
      <TextInput
        label='Email'
        value={email}
        onChangeText={setEmail}
        mode='outlined'
        style={styles.input}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={setPassword}
        mode='outlined'
        secureTextEntry={true}
        style={styles.input}
      />
      <Button title='Update Profile' onPress={handleUpdate} />
      <Button title='Logout' onPress={() => auth.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Profile;
