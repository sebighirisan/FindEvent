import { JwtPayload, Signup } from "@/model/auth.model";
import { ErrorResponse } from "@/model/error.model";
import { useRegisterMutation } from "@/store/features/auth/auth-api";
import { setUser } from "@/store/features/auth/auth-slice";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styles from "./styles/UITheme";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmedpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [signup, { error }] = useRegisterMutation();

  const RouterNavigation = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && "data" in error) {
      const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

      setErrorMessage(errorResponse.message);
    }
  }, [error]);

  const handleSignup = useCallback(async () => {
    const signupCredentials: Signup = {
      username: form.username,
      password: form.password,
      lastName: form.lastname,
      firstName: form.firstname,
      email: form.email,
    };

    try {
      const token = await signup(signupCredentials).unwrap();

      const decodedToken: JwtPayload = {
        ...jwtDecode<JwtPayload>(token),
        token
      };

      dispatch(setUser(decodedToken));

      RouterNavigation.replace("/Dashboard");
    } catch (err) {
      console.log("Signup Failed ", err);
    }
  }, [RouterNavigation, dispatch, form, signup]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <StatusBar backgroundColor="#4F4F4F" barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80} // adjust based on your UI
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>
                <Text style={{ color: "#e1e2e1" }}>Create your account</Text>
              </Text>
              <Text style={styles.subtitle}>
                Don&apos;t miss the chance to explore!
              </Text>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(firstname) => setForm({ ...form, firstname })}
                  placeholder="Alex"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.firstname}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(lastname) => setForm({ ...form, lastname })}
                  placeholder="Pop"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.lastname}
                />
              </View>
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
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(username) => setForm({ ...form, username })}
                  placeholder="User0124"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.username}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(password) => setForm({ ...form, password })}
                  placeholder="****"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(confirmedpassword) =>
                    setForm({ ...form, confirmedpassword })
                  }
                  placeholder="****"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.confirmedpassword}
                />
              </View>
              {!!errorMessage && (
                <View>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              )}
              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleSignup}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign Up</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  RouterNavigation.replace("/Login");
                }}
              >
                <Text style={styles.formLink}>Already registered? Login.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
