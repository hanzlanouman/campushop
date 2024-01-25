import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../Theme/colors';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useAuth from '../hooks/useAuth';
import { Alert } from 'react-native';

const ChangePassword = () => {
  const { currentUser } = useContext(AuthContext);
  const { reauthenticateUser, updatePassword } = useAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    try {
      // Reauthenticate the user with the old password
      await reauthenticateUser(currentUser.email, oldPassword);

      // Update the password
      await updatePassword(newPassword);
      Alert.alert('Success', 'Password changed successfully.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label='Old Password'
        mode='outlined'
        secureTextEntry
        value={oldPassword}
        selectionColor={COLORS.primary}
        cursorColor={COLORS.primary}
        outlineColor={COLORS.primary}
        activeOutlineColor={COLORS.primary}
        onChangeText={setOldPassword}
        style={styles.input}
      />
      <TextInput
        label='New Password'
        mode='outlined'
        secureTextEntry
        value={newPassword}
        selectionColor={COLORS.primary}
        cursorColor={COLORS.primary}
        outlineColor={COLORS.primary}
        activeOutlineColor={COLORS.primary}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        label='Confirm New Password'
        mode='outlined'
        secureTextEntry
        value={confirmNewPassword}
        selectionColor={COLORS.primary}
        cursorColor={COLORS.primary}
        outlineColor={COLORS.primary}
        activeOutlineColor={COLORS.primary}
        onChangeText={setConfirmNewPassword}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ChangePassword;
