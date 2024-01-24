import { StyleSheet, Text, View } from 'react-native';
import { List, ToggleButton } from 'react-native-paper';
import { auth } from '../config/firebase.config';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Theme/colors';
const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <List.Item
        title='Profile'
        left={() => <List.Icon icon='account' />}
        onPress={() => navigation.navigate('Profile')}
      />

      <List.Item
        title='Change Password'
        left={() => <List.Icon icon='lock' />}
        onPress={() => navigation.navigate('ChangePassword')}
      />

      <List.Item
        title='Dark Mode'
        left={() => <List.Icon icon='theme-light-dark' />}
        right={() => (
          <ToggleButton
            icon='theme-light-dark'
            value='dark'
            onPress={() => console.log('pressed')}
          />
        )}
      />

      <List.Item
        title='Logout'
        left={() => <List.Icon icon='logout' />}
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
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
});
export default Settings;
