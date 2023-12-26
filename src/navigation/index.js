import AuthNav from './AuthNav';
import UserNav from './UserNav';
import useAuth from '../hooks/useAuth';

const RootNavigation = () => {
  const { currentUser } = useAuth();

  return currentUser ? <UserNav /> : <AuthNav />;
};

export default RootNavigation;
