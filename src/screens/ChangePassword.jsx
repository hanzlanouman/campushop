import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <TextInput label='Old Password' mode='outlined' style={styles.input} />
      <TextInput label='New Password' mode='outlined' style={styles.input} />
      <TextInput
        label='Confirm New Password'
        mode='outlined'
        style={styles.input}
      />
      <Pressable style={styles.button}>
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
    backgroundColor: '#7a29ff',
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
