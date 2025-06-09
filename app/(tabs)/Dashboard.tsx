 import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homepagestyle from './homepagestyle/homepage.style';
 
 const Dashboard = () => {
   return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#001f3f' }}>
    <View style={homepagestyle.header}>
      <Text style={homepagestyle.title}>
        Welcome to <Text style={{ color: '#2D3436' }}>FindEVENT</Text>
      </Text>
    </View>
   </SafeAreaView>
   )
 }
 
 export default Dashboard
 
 //const styles = StyleSheet.create({})