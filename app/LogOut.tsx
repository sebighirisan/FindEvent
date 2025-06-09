 import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import styles from './styles/auth.styles'
 
 export default function LogOut() {
   return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#001f3f' }}>
        <View style={styles.header}>
            <Text style={styles.title}>
                Welcome to <Text style={{ color: '#2D3436' }}>LogOut</Text>
            </Text>
        </View>
    </SafeAreaView>
   )
 }