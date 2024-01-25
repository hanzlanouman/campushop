import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import useFirestore from '../hooks/useFirestore';
import { Image } from 'react-native';
import { COLORS } from '../Theme/colors';

const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { signUp } = useAuth();
  const { emailExists, userExsists, loading } = useFirestore();

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    //email validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (formData.password.length < 1) {
      newErrors.password = 'Please enter a password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateForm()) {
      if (await userExsists(formData.username)) {
        setErrors({ username: 'Username already taken' });
      } else if (await emailExists(formData.email)) {
        setErrors({ email: 'Email already taken' });
      } else {
        navigation.navigate('RegCreds', { formData });
      }
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      // keyboardShouldPersistTaps='handled'
    >
      <View style={styles.container}>
        {/* <Text style={styles.headerText}>CampuShop</Text> */}
        <Image
          source={require('../../assets/login-1.png')}
          style={styles.logoImage}
        />
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode='outlined'
            label='Username'
            selectionColor={COLORS.primary}
            cursorColor={COLORS.primary}
            outlineColor={COLORS.primary}
            activeOutlineColor={COLORS.primary}
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
            label='Email'
            selectionColor={COLORS.primary}
            cursorColor={COLORS.primary}
            outlineColor={COLORS.primary}
            activeOutlineColor={COLORS.primary}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            value={formData.email}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode='outlined'
            label='Password'
            selectionColor={COLORS.primary}
            cursorColor={COLORS.primary}
            outlineColor={COLORS.primary}
            activeOutlineColor={COLORS.primary}
            secureTextEntry
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            value={formData.password}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => handleNext()}
        >
          {loading ? (
            <ActivityIndicator style={styles.signupButtonText} color='white' />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.googleSignInButton}>
          <Text style={styles.googleSignInText}>Sign up with Google</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 18 }}>
          Already have an account?{' '}
          <Text
            style={{ color: COLORS.primary, fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signupButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
  },
  signupButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
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
    fontSize: 42,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },

  errorText: {
    color: 'red',
    marginTop: 5,
  },

  logoImage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
    color: '#374151',
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  googleSignInText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Signup;
