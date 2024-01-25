import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  Alert,
} from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { COLORS } from '../Theme/colors';

const RegistrationScreen = ({ navigation, route }) => {
  const { formData } = route.params;
  const [department, setDepartment] = useState('');
  const [regNo, setRegNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [name, setName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [idCardImage, setIdCardImage] = useState(null);
  const departments = ['BSE', 'BCE', 'BCS', 'EEE'];
  const [errors, setErrors] = useState(null);

  const navigateToAddProfilePicture = () => {
    const data = {
      ...formData,
      department,
      regNo,
      idCardImage,
      phoneNo,
      name,
    };

    if (!(idCardImage === null || department === '' || regNo === '')) {
      navigation.navigate('AddProfilePicture', { data });
    } else {
      Alert.alert('Please Fill in all the fields');
    }
  };

  const handlePictureUpload = async () => {
    try {
      // Ask for permission
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

      if (!pickerResult.canceled) {
        const newPath = FileSystem.documentDirectory + 'temp-image.jpg';
        await FileSystem.copyAsync({
          from: pickerResult.assets[0].uri,
          to: newPath,
        });

        setIdCardImage({ uri: newPath });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <Text style={styles.headerText}>Student Details</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Reg No'
              onChangeText={setRegNo}
              value={regNo}
              placeholder='AB12-ABC-000'
              placeholderTextColor='#aaa'
              selectionColor={COLORS.primary}
              cursorColor={COLORS.primary}
              outlineColor={COLORS.primary}
              activeOutlineColor={COLORS.primary}
            />
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Name'
              onChangeText={setName}
              value={name}
              placeholderTextColor='#aaa'
              placeholder='John Doe'
              selectionColor={COLORS.primary}
              cursorColor={COLORS.primary}
              outlineColor={COLORS.primary}
              activeOutlineColor={COLORS.primary}
            />
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Phone Number'
              onChangeText={setPhoneNo}
              value={phoneNo}
              keyboardType='numeric'
              placeholder='0312-1234567'
              placeholderTextColor='#aaa'
              selectionColor={COLORS.primary}
              cursorColor={COLORS.primary}
              outlineColor={COLORS.primary}
              activeOutlineColor={COLORS.primary}
            />
          </View>

          {/* Department Modal */}
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.pickerButtonText}>
              {department || 'Select Department'}
            </Text>
          </TouchableOpacity>
          <Modal
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
            transparent={true}
            animationType='slide'
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choose Department</Text>
              {departments.map((dept, index) => (
                <View key={index} style={styles.radioContainer}>
                  <RadioButton
                    value={dept}
                    status={department === dept ? 'checked' : 'unchecked'}
                    onPress={() => setDepartment(dept)}
                    color='#f07011'
                  />
                  <Text style={styles.radioText}>{dept}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Text
            style={{
              fontSize: 18,

              fontWeight: 'bold',
              marginTop: 20,
            }}
          >
            Please upload a scan of your university issued ID card
          </Text>

          {/* Picture Upload */}
          {idCardImage && (
            <Image
              source={idCardImage}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                alignSelf: 'center',
              }}
            />
          )}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePictureUpload}
          >
            {idCardImage === null ? (
              <Text style={styles.uploadButtonText}>Upload ID Card</Text>
            ) : (
              <Text style={styles.uploadButtonText}>Change ID Card</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={navigateToAddProfilePicture}
          >
            <Text style={styles.submitButtonText}>Next</Text>
          </TouchableOpacity>
          {/* Remaining UI elements (TextInput, Image Upload, Submit Button) */}
          {/* ... */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioText: {
    fontSize: 23,
    marginLeft: 10,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 14,
    elevation: 1,
    marginTop: 30,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerButtonText: {
    color: COLORS.primary,
    fontSize: 18,
  },
  scrollView: {
    flexGrow: 1,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  picker: {
    height: 50, // Adjust the height as needed
    color: COLORS.primary,
    fontSize: 18,
    // Add any additional styling you prefer
  },
  headerText: {
    fontSize: 36,
    color: COLORS.primary,
    fontWeight: 'bold',
    paddingBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    paddingBottom: 20,
  },
  input: {
    height: 50, // Adjust the height as needed
    fontSize: 18,
    marginBottom: 10,
    // Add any additional styling you prefer
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    marginTop: 30,
    borderRadius: 50,
  },
  uploadButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },

  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    marginTop: 40,
    textAlign: 'center',
    color: 'white',
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default RegistrationScreen;
