import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import useFirestore from '../hooks/useFirestore';

const NewAdForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    images: [],
    condition: '',
    location: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { createAd } = useFirestore();
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (submitted) {
      validateField(name, value);
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 20],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, images: [...formData.images, result.uri] }); // Storing URI
    }
  };

  const validateField = (name, value) => {
    if (value.trim() === '') {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      let newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (
        typeof value === 'string' &&
        value.trim() === ''
        // ||
        // (key === 'images' && value.length === 0)
      ) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (validateForm()) {
      console.log('Form Data:', formData);
      createAd(formData);
      // Proceed with form submission logic
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title Input */}
      <FormInput
        label='Title'
        value={formData.title}
        error={errors.title}
        onChangeText={(text) => handleInputChange('title', text)}
      />

      {/* Description Input */}
      <FormInput
        label='Description'
        value={formData.description}
        error={errors.description}
        onChangeText={(text) => handleInputChange('description', text)}
        multiline
      />

      {/* Price Input */}
      <FormInput
        label='Price'
        value={formData.price}
        error={errors.price}
        onChangeText={(text) => handleInputChange('price', text)}
        keyboardType='numeric'
      />

      {/* Category Picker */}
      <FormPicker
        label='Category'
        selectedValue={formData.category}
        error={errors.category}
        onValueChange={(itemValue) => handleInputChange('category', itemValue)}
        items={[
          { label: 'Select Category', value: '' }, // Default option
          { label: 'Electronics', value: 'electronics' },
          { label: 'Books', value: 'books' },
          { label: 'Clothing', value: 'clothing' },
          // Add other categories here
        ]}
      />

      {/* Condition Input */}
      <FormInput
        label='Condition'
        value={formData.condition}
        error={errors.condition}
        onChangeText={(text) => handleInputChange('condition', text)}
      />

      {/* Location Input */}
      <FormInput
        label='Location'
        value={formData.location}
        error={errors.location}
        onChangeText={(text) => handleInputChange('location', text)}
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Pick Images</Text>
      </TouchableOpacity>
      {errors.images && <Text style={styles.errorText}>{errors.images}</Text>}
      <View style={styles.imagePreviewContainer}>
        {formData.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.imagePreview}
          />
        ))}
      </View>

      <View style={styles.imagePreviewContainer}>
        {formData.images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }} // Correctly reference the URI
            style={styles.imagePreview}
          />
        ))}
      </View>

      {/* Submit Button */}
      <Button title='Submit Ad' onPress={handleSubmit} />
    </ScrollView>
  );
};

const FormInput = ({ label, error, ...props }) => (
  <View style={styles.formControl}>
    <Text style={styles.label}>
      {label} {error && <Text style={styles.required}>*</Text>}
    </Text>
    <TextInput style={[styles.input, error && styles.errorInput]} {...props} />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const FormPicker = ({ label, error, items, ...props }) => (
  <View style={styles.formControl}>
    <Text style={styles.label}>
      {label} {error && <Text style={styles.required}>*</Text>}
    </Text>
    <Picker style={[styles.picker, error && styles.errorInput]} {...props}>
      {items.map((item, index) => (
        <Picker.Item key={index} label={item.label} value={item.value} />
      ))}
    </Picker>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formControl: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  required: {
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },

  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default NewAdForm;
