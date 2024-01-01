import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import useFirestore from '../hooks/useFirestore';

const EditAd = ({ route, navigation }) => {
  const { ad } = route.params;
  const [formData, setFormData] = useState(ad);
  const { updateAd } = useFirestore(); // Make sure this function exists in your useFirestore hook

  useEffect(() => {
    setFormData(ad);
  }, [ad]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFormData({ ...formData, images: [...formData.images, result.uri] });
    }
  };

  const handleSubmit = async () => {
    try {
      await updateAd(ad.id, formData);
      Alert.alert('Ad Updated', 'Your ad has been successfully updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'There was an error updating the ad.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Edit Ad</Text>

      <FormInput
        label='Title'
        value={formData.title}
        onChangeText={(text) => handleInputChange('title', text)}
      />

      <FormInput
        label='Description'
        value={formData.description}
        onChangeText={(text) => handleInputChange('description', text)}
        multiline
      />

      <FormInput
        label='Price'
        value={formData.price}
        onChangeText={(text) => handleInputChange('price', text)}
        keyboardType='numeric'
      />

      <FormPicker
        label='Category'
        selectedValue={formData.category}
        onValueChange={(itemValue) => handleInputChange('category', itemValue)}
        items={[
          { label: 'Electronics', value: 'electronics' },
          { label: 'Books', value: 'books' },
          { label: 'Clothing', value: 'clothing' },
          // Add other categories as needed
        ]}
      />

      <FormPicker
        label='Condition'
        selectedValue={formData.condition}
        onValueChange={(itemValue) => handleInputChange('condition', itemValue)}
        items={[
          { label: 'New', value: 'new' },
          { label: 'Used', value: 'used' },
          // Add other conditions as needed
        ]}
      />

      <FormInput
        label='Location'
        value={formData.location}
        onChangeText={(text) => handleInputChange('location', text)}
      />

      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={handleImagePick}
      >
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {formData.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>

      <Button title='Update Ad' onPress={handleSubmit} />
    </ScrollView>
  );
};

const FormInput = ({ label, value, onChangeText, multiline, keyboardType }) => (
  <View style={styles.formControl}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
    />
  </View>
);

const FormPicker = ({ label, selectedValue, onValueChange, items }) => (
  <View style={styles.formControl}>
    <Text style={styles.label}>{label}</Text>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      {items.map((item, index) => (
        <Picker.Item key={index} label={item.label} value={item.value} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formControl: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    minHeight: 40,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  imagePickerButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default EditAd;
