import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const { signIn, loading } = useAuth();
  const navigation = useNavigation();

  const validateForm = () => {
    let newErrors = {};

    if (formData.username.includes(' ') || formData.username.length < 3) {
      newErrors.username =
        'Username must be at least 3 characters long with no spaces';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      console.log('Form Data:', formData);
      await signIn(formData.username, formData.password);
    }
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <Text style={styles.headerText}>CampuShop</Text>
          <Text style={styles.subHeaderText}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Username'
              onChangeText={(text) =>
                setFormData({ ...formData, username: text })
              }
              value={formData.username}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Password'
              secureTextEntry
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              value={formData.password}
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            {
              // If loading is true, show a spinner, otherwise show Login text
              loading ? (
                <ActivityIndicator size='small' color='white' />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )
            }
          </TouchableOpacity>
          <Text style={styles.orText}>OR</Text>
          <TouchableOpacity style={styles.googleSignInButton}>
            <Text style={styles.googleSignInText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.navigateSignupButton}
          >
            <Text style={styles.navigateSignupText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 44,
    color: '#7a29ff',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 38,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    // Add your input styles here
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: '#7a29ff',
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  googleSignInText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 18,
    fontWeight: '700',
  },
  navigateSignupButton: {
    marginTop: 10,
  },
  navigateSignupText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Login;
