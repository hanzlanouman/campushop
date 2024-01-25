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
            icon={() => (
              <Ionicons name='ios-person' size={32} color={COLORS.primary} />
            )}
          />
        )}
        onPress={() => navigation.navigate('Profile')}
        titleStyle={{ fontSize: 18 }}
      />

      <List.Item
        title='Change Password'
        left={() => (
          <List.Icon
            icon={() => (
              <Ionicons name='ios-key' size={32} color={COLORS.primary} />
            )}
          />
        )}
        onPress={() => navigation.navigate('ChangePassword')}
        titleStyle={{ fontSize: 18 }}
      />

      <List.Item
        title='Dark Mode'
        left={() => (
          <List.Icon
            icon={() => (
              <Ionicons name='ios-moon' size={32} color={COLORS.primary} />
            )}
          />
        )}
        titleStyle={{ fontSize: 18 }}
      />

      <List.Item
        title='Logout'
        left={() => (
          <List.Icon
            icon={() => (
              <Ionicons name='ios-log-out' size={32} color={COLORS.primary} />
            )}
          />
        )}
        onPress={() => auth.signOut()}
        // set fontsize to 22
        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
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
