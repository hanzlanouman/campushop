import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { COLORS } from '../Theme/colors';

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
          <Image
            source={require('../../assets/login-2.png')}
            style={{
              width: 230,
              height: 230,
              alignSelf: 'center',
              // marginTop: 50,
            }}
          />
          <Text style={styles.headerText}>Login</Text>
          {/* <Text style={styles.headerText}>CampuShop</Text> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Email'
              selectionColor={COLORS.primary}
              cursorColor={COLORS.primary}
              outlineColor='#f07011'
              activeOutlineColor='#f07011'
              placeholderTextColor={'#f07011'}
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
              selectionColor='#f07011'
              cursorColor='#f07011'
              outlineColor='#f07011'
              activeOutlineColor='#f07011'
              secureTextEntry
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              value={formData.password}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Pressable
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
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
            <Text style={styles.googleSignInText}>
              Sign in with
              <Text> Google</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.navigateSignupButton}
          >
            <Text style={styles.navigateSignupText}>
              Don't have an account?{' '}
              <Text style={{ color: '#f07011', fontWeight: '900' }}>
                Sign up!
              </Text>
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
    // justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 42,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
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
    backgroundColor: '#f07011',
    padding: 12,
    borderRadius: 50,
    marginBottom: 10,
  },

  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
  orText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
    color: '#374151',
  },
  forgotPassword: { marginTop: 10, alignSelf: 'flex-end' },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 50,
    // backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  googleSignInText: {
    textAlign: 'center',
    // color: COLORS.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  navigateSignupButton: {
    marginTop: 10,
  },
  navigateSignupText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default Login;
