import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const RegistrationScreen = ({ navigation }) => {
  const [department, setDepartment] = useState('');
  const [regNo, setRegNo] = useState('');
  const [image, setImage] = useState(null);

  const handlePictureUpload = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
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
          <Text style={styles.headerText}>Registration</Text>

          {/* Department Dropdown */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={department}
              onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label='Select Department' value='' />
              <Picker.Item label='BSE' value='BSE' />
              <Picker.Item label='BCE' value='BCE' />
              <Picker.Item label='BCS' value='BCS' />
              <Picker.Item label='EEE' value='EEE' />
            </Picker>
          </View>

          {/* Registration Number Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Reg No'
              onChangeText={setRegNo}
              value={regNo}
            />
          </View>

          {/* Picture Upload */}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePictureUpload}
          >
            <Text style={styles.uploadButtonText}>Upload Picture</Text>
          </TouchableOpacity>

          {/* Display the selected image */}
          {image && (
            <Image
              source={image}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#7a29ff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50, // Adjust the height as needed
    color: '#7a29ff',
    fontSize: 18,
    // Add any additional styling you prefer
  },
  headerText: {
    fontSize: 44,
    color: '#7a29ff',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50, // Adjust the height as needed
    fontSize: 18,
    // Add any additional styling you prefer
  },
  uploadButton: {
    backgroundColor: '#7a29ff',
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default RegistrationScreen;
