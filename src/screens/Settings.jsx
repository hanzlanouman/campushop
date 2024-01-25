import { StyleSheet, Text, View } from 'react-native';
import { List, ToggleButton } from 'react-native-paper';
import { auth } from '../config/firebase.config';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Theme/colors';
import { Ionicons } from '@expo/vector-icons';
const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <List.Item
        title='Profile'
        left={() => (
          <List.Icon
            icon={() => <Ionicons name='ios-person' size={24} color='black' />}
          />
        )}
        onPress={() => navigation.navigate('Profile')}
      />

      <List.Item
        title='Change Password'
        left={() => (
          <List.Icon
            icon={() => <Ionicons name='ios-key' size={24} color='black' />}
          />
        )}
        onPress={() => navigation.navigate('ChangePassword')}
      />

      <List.Item
        title='Dark Mode'
        left={() => (
          <List.Icon
            icon={() => <Ionicons name='ios-moon' size={24} color='black' />}
          />
        )}
      />

      <List.Item
        title='Logout'
        left={() => (
          <List.Icon
            icon={() => <Ionicons name='ios-log-out' size={24} color='black' />}
          />
        )}
        onPress={() => auth.signOut()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
});
export default Settings;
