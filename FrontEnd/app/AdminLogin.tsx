import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './(tabs)/styles/UITheme';

const AdminLogin = () => {
  const [form, setForm] = useState({
    emailAdmin: '',
    passwordAdmin: '',
  });
  const RouterNavigation = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101820' }}>
      <StatusBar backgroundColor="#2D3436" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Sign in to <Text style={{ color: '#2D3436' }}>FindEVENT as Admin</Text>
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
              onChangeText={emailAdmin => setForm({ ...form, emailAdmin })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.emailAdmin}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={passwordAdmin => setForm({ ...form, passwordAdmin })}
              placeholder="****"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.passwordAdmin}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                RouterNavigation.navigate('/DashboardAdmin');
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminLogin;
