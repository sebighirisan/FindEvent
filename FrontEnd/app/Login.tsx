import { JwtPayload, LoginCredentials } from "@/model/auth.model";
import { useLoginMutation } from "@/store/features/auth/auth-api";
import { setUser } from "@/store/features/auth/auth-slice";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles/UITheme";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  // TODO: Use error
  const [login, { error }] = useLoginMutation();

  const handleSignIn = async () => {
    console.log(error);

    const loginCredentials: LoginCredentials = {
      username: form.email,
      password: form.password,
    };

    try {
      const token = await login(loginCredentials).unwrap();

      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);

      dispatch(setUser(decodedToken));
    
      // await saveToken(token);

      RouterNavigation.replace("/Dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const RouterNavigation = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <StatusBar backgroundColor="#2D3436" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Sign in to <Text style={{ color: "#2D3436  " }}>FindEVENT</Text>
          </Text>
          <Text style={styles.subtitle}>
            Go discover your activities in your area and more
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address / Username</Text>
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
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignIn}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              // RouterNavigation.navigate('/Homepage')
            }}
          >
            <Text style={styles.formLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          RouterNavigation.navigate("/SignUp");
        }}
      >
        <Text style={styles.formFooter}>
          Don&apos;t have an account?&nbsp;
          <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Login;