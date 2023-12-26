import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';
const SettingStack = createStackNavigator();

const SettingsNav = () => {
  return (
    <SettingStack.Navigator initialRouteName='Settings'>
      <SettingStack.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen name='Profile' component={Profile} />
      <SettingStack.Screen name='ChangePassword' component={ChangePassword} />
      {/* <SettingStack.Screen name='ChangePassword' component={ChangePassword} /> */}
    </SettingStack.Navigator>
  );
};

export default SettingsNav;
