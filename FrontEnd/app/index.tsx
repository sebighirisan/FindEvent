import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./(tabs)/styles/UITheme";

export default function Index() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const RouterNavigation=useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#101820'}}>
      <StatusBar backgroundColor="#2D3436"  barStyle="dark-content"/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Sign in to <Text style={{ color: '#2D3436  ' }}>FindEVENT</Text>
          </Text>
          <Text style={styles.subtitle}>
            Go discover your activities in your area and more
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={email => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email} />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="****"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password} />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                RouterNavigation.navigate('/Homepage')
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              RouterNavigation.navigate('/ForgetPassword')
            }}>
            <Text style={styles.formLink}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
  onPress={() => {
    RouterNavigation.navigate('/AdminLogin');
  }}
  style={{
    marginTop: 16,
    backgroundColor: '#2D3436',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  }}
>
  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Admin Login</Text>
</TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          RouterNavigation.navigate('/SignUp')

        }}>
        <Text style={styles.formFooter}>
          Don't have an account?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
        </Text>
        
      </TouchableOpacity>
     
    </SafeAreaView>
    
  );
}
