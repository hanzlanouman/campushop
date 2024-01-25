import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import useFirestore from '../hooks/useFirestore';
import { auth } from '../config/firebase.config';
import { COLORS } from '../Theme/colors';
import * as ImagePicker from 'expo-image-picker';

import { Modal } from 'react-native';
import useStorage from '../hooks/useStorage';
const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { uploadProfilePicture } = useStorage();
  const { updateUserProfile, updateProfileImage } = useFirestore();

  const [username, setUsername] = useState(currentUser?.username || '');
  const [phoneNo, setPhoneNo] = useState(currentUser?.phoneNo || '');
  const [name, setName] = useState(currentUser?.name || '');
  const [password, setPassword] = useState(''); // Password should not be fetched from Firestore

  const [hasChanged, setHasChanged] = useState({
    name: false,
    username: false,
    phoneNo: false,
  });

  useEffect(() => {
    if (name !== currentUser?.name)
      setHasChanged((prev) => ({ ...prev, name: true }));
    if (username !== currentUser?.username)
      setHasChanged((prev) => ({ ...prev, username: true }));
    if (phoneNo !== currentUser?.phoneNo)
      setHasChanged((prev) => ({ ...prev, phoneNo: true }));
  }, [name, username, phoneNo]);

  const handleUpdate = async (field) => {
    let updatedData = {};
    switch (field) {
      case 'name':
        updatedData = { name };
        break;
      case 'username':
        updatedData = { username };
        break;
      case 'phoneNo':
        updatedData = { phoneNo };
        break;
      default:
        return;
    }

    await updateUserProfile(currentUser.uid, updatedData);
    setCurrentUser({ ...currentUser, ...updatedData });
    setHasChanged((prev) => ({ ...prev, [field]: false }));
    console.log(`Updated ${field}:`, updatedData[field]);
  };

  const handleCancel = (field) => {
    switch (field) {
      case 'name':
        setName(currentUser?.name || '');
        break;
      case 'username':
        setUsername(currentUser?.username || '');
        break;
      case 'phoneNo':
        setPhoneNo(currentUser?.phoneNo || '');
        break;
      default:
        return;
    }
    setHasChanged((prev) => ({ ...prev, [field]: false }));
  };

  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const handleImagePress = () => {
    setImageModalVisible(true);
  };

  const handleProfileImageUpdate = async () => {
    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Selected Image URI: ', result.uri);
      // Upload the selected image
      const downloadUrl = await uploadProfilePicture(result.assets[0].uri);
      if (downloadUrl) {
        console.log('Download URL: ', downloadUrl);
        // Update user's profile picture URL in Firestore
        await updateProfileImage(currentUser.uid, downloadUrl);
        setCurrentUser({ ...currentUser, profileImageUrl: downloadUrl });
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={handleImagePress}>
        <Image
          source={{ uri: currentUser?.profileImageUrl }}
          style={styles.image}
        />
      </Pressable>

      {/* Image View Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={() => {
          setImageModalVisible(!isImageModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              Profile Image
            </Text>
            <Image
              source={{ uri: currentUser?.profileImageUrl }}
              style={styles.modalImage}
            />
            <Pressable
              style={[styles.button, styles.buttonUpdate]}
              onPress={handleProfileImageUpdate}
            >
              <Text style={styles.textStyle}>Update Image</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setImageModalVisible(!isImageModalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ProfileInput
        label='Name'
        value={name}
        onChangeText={setName}
        hasChanged={hasChanged.name}
        onUpdate={() => handleUpdate('name')}
        onCancel={() => handleCancel('name')}
      />
      <ProfileInput
        label='Username'
        value={username}
        onChangeText={setUsername}
        hasChanged={hasChanged.username}
        onUpdate={() => handleUpdate('username')}
        onCancel={() => handleCancel('username')}
      />
      <ProfileInput
        label='Phone Number'
        value={phoneNo}
        onChangeText={setPhoneNo}
        keyboardType='phone-pad'
        hasChanged={hasChanged.phoneNo}
        onUpdate={() => handleUpdate('phoneNo')}
        onCancel={() => handleCancel('phoneNo')}
      />
      <Pressable onPress={() => auth.signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

const ProfileInput = ({
  label,
  value,
  onChangeText,
  keyboardType,
  hasChanged,
  onUpdate,
  onCancel,
}) => (
  <View>
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || 'default'}
      mode='outlined'
      style={styles.input}
      selectionColor={COLORS.primary}
      cursorColor={COLORS.primary}
      outlineColor={COLORS.primary}
      activeOutlineColor={COLORS.primary}
    />
    {hasChanged && (
      <View style={styles.changeButtonsContainer}>
        <Pressable onPress={onCancel} style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={onUpdate} style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Update</Text>
        </Pressable>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  changeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    marginBottom: 10,
  },
  changeButton: {
    backgroundColor: COLORS.random[3],
    padding: 8,
    borderRadius: 50,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  changeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  //   marginTop: 15,
  // },
  buttonClose: {
    backgroundColor: COLORS.secondary,

    paddingHorizontal: 50,
  },
  buttonUpdate: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
    paddingHorizontal: 25,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;
