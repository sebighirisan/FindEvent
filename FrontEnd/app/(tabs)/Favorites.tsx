 import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import homepagestyle from './homepagestyle/homepage.style'
 
 export default function Favorites() {
   return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#001f3f' }}>
        <View style={homepagestyle.header}>
            <Text style={homepagestyle.title}>
                Welcome to <Text style={{ color: '#2D3436' }}>Favorites</Text>
            </Text>
        </View>
     </SafeAreaView>
   )
 }