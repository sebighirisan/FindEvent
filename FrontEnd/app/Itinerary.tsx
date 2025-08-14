import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import style from './styles/UITheme'
 
 const Itinerary = () => {
   return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#101820' }}>
        <View style={style.header}>
          <Text style={style.title}>
              Welcome to <Text style={{ color: '#2D3436' }}>Itinerary</Text>
          </Text>
        </View>
      </SafeAreaView>
   )
 }
 
 export default Itinerary