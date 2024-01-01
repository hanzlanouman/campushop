import { StyleSheet, Text, View } from 'react-native';
import { List, ToggleButton } from 'react-native-paper';
import { auth } from '../config/firebase.config';
import { useNavigation } from '@react-navigation/native';
const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Make a Seperated List like view for each of the settings item like profile, change password, and logout  */}
      <Text style={styles.header}>Settings</Text>
      <List.Item
        title='Profile'
        left={(props) => <List.Icon {...props} icon='account' />}
        onPress={() => navigation.navigate('Profile')}
      />
      <List.Item
        title='Change Password'
        left={(props) => <List.Icon {...props} icon='lock' />}
        onPress={() => navigation.navigate('ChangePassword')}
      />
      <List.Item
        title='Dark Mode'
        left={(props) => <List.Icon {...props} icon='theme-light-dark' />}
        right={(props) => (
          // Make a toggle button like the iphone toggle button actual button
          <ToggleButton
            {...props}
            icon='theme-light-dark'
            value='dark'
            onPress={() => console.log('pressed')}
          />
        )}
      />
      <List.Item
        title='Logout'
        left={(props) => <List.Icon {...props} icon='logout' />}
        onPress={() => auth.signOut()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
});
export default Settings;
