import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AdDetails from '../screens/AdDetails';
import Profile from '../screens/Profile';
import CategoryNav from './CategoryNav';
import Chat from '../screens/chats/Chat';
const AdStack = createStackNavigator();
const AdNav = () => {
  return (
    <AdStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <AdStack.Screen name='Home' component={Home} />
      <AdStack.Screen
        name='AdDetails'
        component={AdDetails}
        options={{
          headerShown: true,
          title: 'Back',
        }}
      />
      <AdStack.Screen name='Profile' component={Profile} />
      <AdStack.Screen name='CategorizedAds' component={CategoryNav} />
      <AdStack.Screen name='Chat' component={Chat} />
    </AdStack.Navigator>
  );
};

export default AdNav;
