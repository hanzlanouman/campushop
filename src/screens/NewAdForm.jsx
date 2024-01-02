import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import useFirestore from '../hooks/useFirestore';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../config/firebase.config';

const NewAdForm = () => {
  const { createNewAd } = useFirestore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    images: [],
    condition: '',
    location: '',
    postedBy: auth.currentUser.uid,
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
      console.log(formData);
      createNewAd(formData);
      // Proceed with form submission logic
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Title Input */}
      <Text style={styles.headerText}>Create New Ad</Text>
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
          { label: 'Phones', value: 'phones' },
          { label: 'Laptops', value: 'books' },
          { label: 'Vehicles', value: 'vehicles' },
          { label: 'Books', value: 'books' },
          { label: 'Gadgets', value: 'gadgets' },
          { label: 'Clothes', value: 'clothes' },
          // Add other categories here
        ]}
      />

      {/* Condition Input */}
      <FormPicker
        label='Condition'
        selectedValue={formData.condition}
        error={errors.condition}
        onValueChange={(itemValue) => handleInputChange('condition', itemValue)}
        items={[
          { label: 'Select Condition', value: '' }, // Default option
          { label: 'New', value: 'new' },
          { label: 'Like New', value: 'likeNew' },
          { label: 'Used', value: 'used' },
        ]}
      />

      {/* Location Input */}
      <FormInput
        label='Location'
        value={formData.location}
        error={errors.location}
        onChangeText={(text) => handleInputChange('location', text)}
      />
      <Text style={styles.label}>
        Add product images{' '}
        {errors.images && <Text style={styles.required}>*</Text>}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {formData.images.length} / 5 Selected
      </Text>

      {/* Image Picker */}
      {errors.images && <Text style={styles.errorText}>{errors.images}</Text>}
      <View style={styles.imagePreviewContainer}>
        {formData.images.map((image, index) => (
          <View key={index} style={styles.imagePreviewItem}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <Button
              title='Remove'
              onPress={() =>
                setFormData({
                  ...formData,
                  images: formData.images.filter((img) => img !== image),
                })
              }
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        {formData.images.length === 0 ? (
          <Text style={styles.buttonText}>Select Images</Text>
        ) : formData.images.length < 5 ? (
          <Text style={styles.buttonText}>Add More Images</Text>
        ) : null}
      </TouchableOpacity>

      {/* Submit Button */}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

const FormInput = ({ label, error, ...props }) => (
  <View style={styles.formControl}>
    {error && (
      <Text style={styles.label}>
        {error && <Text style={styles.required}>*</Text>}
      </Text>
    )}
    <TextInput
      style={[styles.input, error && styles.errorInput]}
      {...props}
      label={label}
      mode='outlined'
    />
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
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formControl: {
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    // marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'gray',
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#7a29aa',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagePreviewItem: {
    flexDirection: 'column',
    marginVertical: 20,
    marginHorizontal: 10,
    width: 100,
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
});

export default NewAdForm;
