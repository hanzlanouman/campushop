// AddProfilePicture.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import useStorage from '../hooks/useStorage';
import useFirestore from '../hooks/useFirestore';
import useAuth from '../hooks/useAuth';

const AddProfilePicture = ({ navigation, route }) => {
  const { data } = route.params;
  const [formData, setFormData] = useState(data);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadIdCardImage, uploadProfilePicture } = useStorage();
  const { signUp } = useAuth();
  const { setUserProfile } = useFirestore();

  const handleProfilePictureUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets) {
      const newPath = FileSystem.documentDirectory + 'profile-image.jpg';
      await FileSystem.copyAsync({
        from: pickerResult.assets[0].uri, // Updated to use assets array
        to: newPath,
      });
      setProfileImage({ uri: newPath });
    }
  };

  const completeRegistration = async () => {
    setIsLoading(true);
    try {
      const profileImageUrl = await uploadProfilePicture(profileImage.uri);
      const idCardImageUrl = await uploadIdCardImage(formData.idCardImage.uri);
      const updatedFormData = {
        ...formData,
        profileImageUrl,
        idCardImageUrl,
      };
      delete updatedFormData.idCardImage;
      await signUp(
        updatedFormData.email,
        updatedFormData.password,
        updatedFormData
      );
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Failed to complete registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display the selected profile image */}
      {profileImage && <Image source={profileImage} style={styles.image} />}

      {/* Profile Picture Upload */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleProfilePictureUpload}
      >
        {!profileImage ? (
          <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
        ) : (
          <Text style={styles.uploadButtonText}>Change Profile Picture</Text>
        )}
      </TouchableOpacity>

      {/* Complete Registration Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={completeRegistration}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size='small' color='white' />
        ) : (
          <Text style={styles.submitButtonText}>Complete Registration</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 40,
  },

  uploadButton: {
    backgroundColor: '#7a29ff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },

  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  submitButton: {
    width: 300,
    backgroundColor: '#7a29ff',
    padding: 15,
    borderRadius: 5,
  },

  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddProfilePicture;
