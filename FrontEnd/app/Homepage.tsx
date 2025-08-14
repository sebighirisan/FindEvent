import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Dashboard from './(tabs)/Dashboard';
import Favorites from './(tabs)/Favorites';
import Profile from './(tabs)/Profile';
import Trending from './(tabs)/Trending';

const Tab = createBottomTabNavigator();

export default function Homepage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'white',
        tabBarStyle: { backgroundColor:'#101820'},
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown:false,
          tabBarIcon: () => (
            <Image source={require('./(tabs)/images/dashboard-monitor.png')} style={{ width: 24, height: 24 }} />
          ),
        }}/>
      <Tab.Screen name="Favorites" component={Favorites} options={{headerShown:false,
          tabBarIcon: () => (
            <Image source={require('./(tabs)/images/heart.png')} style={{ width: 24, height: 24 }} />
          ),
        }}/>
      <Tab.Screen name="Trending" component={Trending}options={{headerShown:false,
          tabBarIcon: () => (
            <Image source={require('./(tabs)/images/arrow-trend-up.png')} style={{ width: 24, height: 24 }} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={Profile} options={{headerShown:false,
          tabBarIcon: () => (
            <Image source={require('./(tabs)/images/user-pen.png')} style={{ width: 24, height: 24 }} />
          ),
        }}/>
    </Tab.Navigator>
  );
}



