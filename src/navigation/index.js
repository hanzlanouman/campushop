import AuthNav from './AuthNav';
import UserNav from './UserNav';
import useAuth from '../hooks/useAuth';
import { Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const RootNavigation = () => {
  const { user } = useAuth();
  if (user === null) {
    <ActivityIndicator animating={true} />;
  }
  return user ? <UserNav /> : <AuthNav />;
};

export default RootNavigation;
