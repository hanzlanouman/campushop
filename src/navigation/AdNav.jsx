import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AdDetails from '../screens/AdDetails';
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
      <AdStack.Screen name='AdDetails' component={AdDetails} />
    </AdStack.Navigator>
  );
};

export default AdNav;
