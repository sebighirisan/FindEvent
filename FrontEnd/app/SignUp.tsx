 import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles/auth.styles';

const SignUp = () => {
  const [form,setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    birthDate: '',
    password: ''
  });
  const RouterNavigation=useRouter();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#001f3f' }}>
      <StatusBar backgroundColor="#4F4F4F"  barStyle='dark-content'/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
             <Text style={{color:'#e1e2e1'}} >Create your account</Text>
          </Text>
          <Text style={styles.subtitle}>
            Don't miss the chance to explore!
          </Text>
        </View>
        <View style={styles.form}>
        <View style={styles.input}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      onChangeText={firstname => setForm({ ...form, firstname })}
                      placeholder="Alex"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={form.firstname} />
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      onChangeText={lastname => setForm({ ...form, lastname })}
                      placeholder="Pop"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={form.lastname} />
                  </View>
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
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
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
                          RouterNavigation.navigate("/Homepage")
                          }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Sign Up</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
      </View>
      </View>
      </SafeAreaView>
  )
}

export default SignUp;