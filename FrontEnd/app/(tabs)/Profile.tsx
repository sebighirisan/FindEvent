import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import homepagestyle from './styles/UITheme';

 
 const Profile = () => {
  const router = useRouter();
   return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101820' }}>
        <View style={homepagestyle.header}>
          <Text style={homepagestyle.title}>
             <Text style={{ color: '#2D3436' }}>Your Profile</Text>
          </Text>
          <Image
            source={require('./images/user-pen.png')}
             style={{ width: 70, height: 70, marginTop: 20 }}
          />
          <Text style={{marginTop:10,fontWeight:'bold'}}>Username:SebiGh12</Text>
        </View>
        <View style={homepagestyle.menu}>
        <TouchableOpacity style={homepagestyle.menuItem}
        onPress={() => router.push('/Settings')}>
          <Image
            source={require('../(tabs)/images/settings-sliders.png')}
            style={homepagestyle.icon}
          />
          <Text style={homepagestyle.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homepagestyle.menuItem}
        onPress={() => router.push('/History')}>
          <Image
            source={require('../(tabs)/images/time-past.png')}
            style={homepagestyle.icon}
          />
          <Text style={homepagestyle.menuText}>Your History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={homepagestyle.menuItem}
          onPress={() => router.push('/Terms')}>
          <Image
            source={require('../(tabs)/images/terms-check.png')}
            style={homepagestyle.icon}
          />
          <Text style={homepagestyle.menuText}>Terms&Policies</Text>
        </TouchableOpacity >
         <TouchableOpacity style={homepagestyle.menuItem}
          onPress={() => router.push('/CreateEvent')}>
          <Image
            source={require('../(tabs)/images/add.png')}
            style={homepagestyle.icon}
          />
          <Text style={homepagestyle.menuText}>Create Event</Text>
        </TouchableOpacity >
        <TouchableOpacity style={homepagestyle.menuItem}
          onPress={() => router.push('/Itinerary')}>
          <Image
            source={require('../(tabs)/images/location.png')}
            style={homepagestyle.icon}
          />
          <Text style={homepagestyle.menuText}>Itinerary</Text>
        </TouchableOpacity >
      </View>
       </SafeAreaView>
   )
 }
 
 export default Profile
 
 const styles = StyleSheet.create({})