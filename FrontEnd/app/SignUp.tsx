import { Signup } from "@/model/auth.model";
import { ErrorResponse } from "@/model/error.model";
import { useRegisterMutation } from "@/store/features/auth/auth-api";
// ❌ fără auto-login: nu mai importăm setUser / jwtDecode
import { useRouter } from "expo-router";
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
// import { useDispatch } from "react-redux"; // ❌ nu mai e necesar
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

  // erori per câmp
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  // banner generic de la server (non-field)
  const [errorMessage, setErrorMessage] = useState("");

  const [signup, { error, isLoading }] = useRegisterMutation();
  const RouterNavigation = useRouter();
  // const dispatch = useDispatch(); // ❌ fără auto-login

  // mapare erori backend -> câmpuri/bara generală
  useEffect(() => {
    if (!error) return;

    const anyErr = error as any;
    const status = anyErr?.status;
    let serverMsg = "";

    const data = anyErr?.data;
    if (typeof data === "string") {
      try {
        serverMsg = (JSON.parse(data) as ErrorResponse).message ?? data;
      } catch {
        serverMsg = data;
      }
    } else if (data && typeof data === "object" && "message" in data) {
      serverMsg = (data as ErrorResponse).message ?? "";
    }

    // Resetăm starea veche de erori
    setErrorMessage("");
    setErrors((e) => ({ ...e }));

    // Heuristici tipice pentru duplicate
    if (status === 409 || /already exists|duplicate|taken/i.test(serverMsg)) {
      if (/email/i.test(serverMsg)) {
        setErrors((e) => ({ ...e, email: "Acest email este deja folosit." }));
      } else if (/user(name)?/i.test(serverMsg)) {
        setErrors((e) => ({ ...e, username: "Acest username este deja folosit." }));
      } else {
        setErrorMessage(serverMsg || "Acest cont există deja.");
      }
    } else {
      setErrorMessage(serverMsg || "A apărut o eroare la înregistrare.");
    }
  }, [error]);

  // validare locală
  const validate = (): boolean => {
    const newErr: Partial<Record<keyof typeof form, string>> = {};

    if (!form.firstname.trim()) newErr.firstname = "Prenumele este obligatoriu.";
    if (!form.lastname.trim()) newErr.lastname = "Numele este obligatoriu.";

    if (!form.email.trim()) newErr.email = "Emailul este obligatoriu.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErr.email = "Introdu un email valid.";

    if (!form.username.trim()) newErr.username = "Username-ul este obligatoriu.";
    else if (form.username.trim().length < 3)
      newErr.username = "Username-ul trebuie să aibă minim 3 caractere.";

    if (!form.password.trim()) newErr.password = "Parola este obligatorie.";
    else if (form.password.length < 6)
      newErr.password = "Parola trebuie să aibă minim 6 caractere.";

    if (!form.confirmedpassword.trim())
      newErr.confirmedpassword = "Confirmarea parolei este obligatorie.";
    else if (form.confirmedpassword !== form.password)
      newErr.confirmedpassword = "Parolele nu coincid.";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSignup = useCallback(async () => {
    if (!validate()) return;

    const signupCredentials: Signup = {
      username: form.username.trim(),
      password: form.password,
      lastName: form.lastname.trim(),
      firstName: form.firstname.trim(),
      email: form.email.trim(),
    };

    try {
      await signup(signupCredentials).unwrap();
      // ✅ fără auto-login: mergem la Login după succes
      RouterNavigation.replace("/Login");
    } catch (err) {
      // fallback – în caz că nu prinde useEffect-ul
      if (!errorMessage) setErrorMessage("Înregistrarea a eșuat. Încearcă din nou.");
      console.log("Signup Failed ", err);
    }
  }, [form, signup, RouterNavigation, errorMessage]);

  // helper pentru a curăța eroarea câmpului la scriere
  const onChangeField = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <StatusBar backgroundColor="#4F4F4F" barStyle="dark-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>
                <Text style={{ color: "#e1e2e1" }}>Create your account</Text>
              </Text>
              <Text style={styles.subtitle}>Don&apos;t miss the chance to explore!</Text>
            </View>

            <View style={styles.form}>
              {/* First Name */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={onChangeField("firstname")}
                  placeholder="Alex"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, errors.firstname ? { borderColor: "red", borderWidth: 1 } : null]}
                  value={form.firstname}
                />
                {!!errors.firstname && <Text style={{ color: "red" }}>{errors.firstname}</Text>}
              </View>

              {/* Last Name */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={onChangeField("lastname")}
                  placeholder="Pop"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, errors.lastname ? { borderColor: "red", borderWidth: 1 } : null]}
                  value={form.lastname}
                />
                {!!errors.lastname && <Text style={{ color: "red" }}>{errors.lastname}</Text>}
              </View>

              {/* Email */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={onChangeField("email")}
                  placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, errors.email ? { borderColor: "red", borderWidth: 1 } : null]}
                  value={form.email}
                />
                {!!errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
              </View>

              {/* Username */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={onChangeField("username")}
                  placeholder="User0124"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, errors.username ? { borderColor: "red", borderWidth: 1 } : null]}
                  value={form.username}
                />
                {!!errors.username && <Text style={{ color: "red" }}>{errors.username}</Text>}
              </View>

              {/* Password */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={onChangeField("password")}
                  placeholder="••••••"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, errors.password ? { borderColor: "red", borderWidth: 1 } : null]}
                  secureTextEntry
                  value={form.password}
                />
                {!!errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
              </View>

              {/* Confirm Password */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={onChangeField("confirmedpassword")}
                  placeholder="••••••"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, errors.confirmedpassword ? { borderColor: "red", borderWidth: 1 } : null]}
                  secureTextEntry
                  value={form.confirmedpassword}
                />
                {!!errors.confirmedpassword && <Text style={{ color: "red" }}>{errors.confirmedpassword}</Text>}
              </View>

              {/* Banner de la server (dacă există) */}
              {!!errorMessage && (
                <View>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              )}

              {/* Submit */}
              <View className="formAction" style={styles.formAction}>
                <TouchableOpacity onPress={handleSignup} disabled={isLoading}>
                  <View style={[styles.btn, isLoading ? { opacity: 0.7 } : null]}>
                    <Text style={styles.btnText}>{isLoading ? "Creating..." : "Sign Up"}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => RouterNavigation.replace("/Login")}>
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
