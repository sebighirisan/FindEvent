import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles/UITheme";

const ForgetPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.subtitle}>Let us to help you!</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>
          <Text style={styles.formLink}>
            Get the code for reseting password
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
