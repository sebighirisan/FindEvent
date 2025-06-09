 import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import homepagestyle from './homepagestyle/homepage.style'
 
 const Trending = () => {
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#001f3f' }}>
         <View style={homepagestyle.header}>
           <Text style={homepagestyle.title}>
             Welcome to <Text style={{ color: '#2D3436' }}>Trending</Text>
           </Text>
         </View>
        </SafeAreaView>
   )
 }
 
 export default Trending
 
 const styles = StyleSheet.create({})