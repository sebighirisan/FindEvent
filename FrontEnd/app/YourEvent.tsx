import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import styles from './styles/UITheme'
 
 export default function YourEvent() {
   return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101820' }}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Welcome to <Text style={{ color: '#2D3436' }}>Your Event</Text>
          </Text>
        </View>
       </SafeAreaView>
   )
 }
