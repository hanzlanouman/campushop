import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import NewAdForm from '../screens/NewAdForm';
import Profile from '../screens/Profile';
import { Ionicons } from '@expo/vector-icons';
import AdNav from './AdNav';
import SettingsNav from './SettingsNav';
import UserAdsNav from './UserAdsNav';
import Inbox from '../screens/chats/Inbox';
import ChatNav from './ChatNav';
import { COLORS } from '../Theme/colors';

const Tab = createBottomTabNavigator();
const UserNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='HomeScreen'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Chat') {
              iconName = focused
                ? 'ios-chatbubbles'
                : 'ios-chatbubbles-outline';
            } else if (route.name === 'Sell') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            } else if (route.name === 'My Ads') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={33} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#444',
          // tabBarActiveBackgroundColor: '#f8f8f8',
          tabBarShowLabel: false,
          // Dont show header
          headerShown: false,

          tabBarStyle: {
            height: 70,
          },
        })}
      >
        <Tab.Screen
          name='HomeScreen'
          component={AdNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Chat'
          component={ChatNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Sell'
          component={NewAdForm}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='My Ads'
          component={UserAdsNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsNav}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserNav;
