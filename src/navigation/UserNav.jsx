import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import NewAdForm from '../screens/NewAdForm';
const Tab = createBottomTabNavigator();
const UserNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: '#000',
            shadowOpacity: 0.5,
            elevation: 5,
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: '#123',
          tabBarInactiveTintColor: '#666',
        }}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name='home' type='font-awesome' color={color} size={40} />
            ),
          }}
        />
        <Tab.Screen
          name='Chat'
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                name='wechat'
                type='font-awesome'
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Sell'
          component={NewAdForm}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name='plus' type='font-awesome' color={color} size={45} />
            ),
          }}
        />
        <Tab.Screen
          name='My Ads'
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name='list' type='font-awesome' color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name='user' type='font-awesome' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserNav;
