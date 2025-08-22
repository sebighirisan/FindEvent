import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FAFA33",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#101820" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../images/dashboard-monitor.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../images/heart.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Trending"
        options={{
          title: "Trending",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../images/arrow-trend-up.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../images/user-pen.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
