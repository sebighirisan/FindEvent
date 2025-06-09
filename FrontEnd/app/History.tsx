import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import style from './styles/auth.styles'


 const History = () => {
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#001f3f' }}>
         <View style={style.header}>
           <Text style={style.title}>
             Welcome to <Text style={{ color: '#2D3436' }}>History</Text>
           </Text>
         </View>
        </SafeAreaView>
   )
 }
 
 export default History
 
 const styles = StyleSheet.create({})