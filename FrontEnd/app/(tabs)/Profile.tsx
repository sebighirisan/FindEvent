import { logout } from "@/store/features/auth/auth-slice";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import homepagestyle from "./styles/UITheme";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const username = useSelector((state: RootState) => state.auth.username);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/AdminLogin");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <View style={homepagestyle.header}>
        <Text style={homepagestyle.title}>
          <Text style={{ color: "white" }}>Your Profile</Text>
        </Text>
        <Image
          source={require("./images/user-pen.png")}
          style={{ width: 70, height: 70, marginTop: 20, tintColor: "white" }}
        />
        <Text style={{ marginTop: 10, fontWeight: "bold", color: "white" }}>
          Username: {username}
        </Text>
      </View>
      <View style={homepagestyle.menu}>
        <TouchableOpacity
          style={homepagestyle.menuItem}
          onPress={() => router.push("/Settings")}
        >
          <Image
            source={require("./images/settings-sliders.png")}
            style={[homepagestyle.icon, { tintColor: "white" }]}
          />
          <Text style={homepagestyle.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homepagestyle.menuItem}
          onPress={() => router.push("/History")}
        >
          <Image
            source={require("./images/time-past.png")}
            style={[homepagestyle.icon, { tintColor: "white" }]}
          />
          <Text style={homepagestyle.menuText}>Your History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homepagestyle.menuItem} onPress={handleLogout}>
          <Image
            source={require("./images/user-logout.png")}
            style={[homepagestyle.icon, { tintColor: "white" }]}
          />
          <Text style={homepagestyle.menuText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homepagestyle.menuItem}
          onPress={() => router.push("/Terms")}
        >
          <Image
            source={require("./images/terms-check.png")}
            style={[homepagestyle.icon, { tintColor: "white" }]}
          />
          <Text style={homepagestyle.menuText}>Terms & Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homepagestyle.menuItem}
          onPress={() => router.push("/CreateEvent")}
        >
          <Image
            source={require("./images/add.png")}
            style={[homepagestyle.icon, { tintColor: "white" }]}
          />
          <Text style={homepagestyle.menuText}>Create Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homepagestyle.menuItem}
          onPress={() => router.push("/Itinerary")}
        >
          <Image
            source={require("./images/location.png")}
            style={[homepagestyle.icon, { tintColor: "white" }]}
          />
          <Text style={homepagestyle.menuText}>Itinerary</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
