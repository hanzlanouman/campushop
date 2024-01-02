// FormInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormInput = ({ label, error, ...props }) => (
  <View style={styles.formControl}>
    <Text style={styles.label}>
      {label} {error && <Text style={styles.required}>*</Text>}
    </Text>
    <TextInput style={[styles.input, error && styles.errorInput]} {...props} />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  formControl: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7a29ff',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
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

export default FormInput;
