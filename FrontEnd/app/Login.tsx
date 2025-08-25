import { JwtPayload, LoginCredentials } from "@/model/auth.model";
import { ErrorResponse } from "@/model/error.model";
import { useLoginMutation } from "@/store/features/auth/auth-api";
import { setUser } from "@/store/features/auth/auth-slice";
import { saveToken } from "@/utils/secure-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles/UITheme";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [buttonChecked, setButtonChecked] = useState(false);

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [login, { error }] = useLoginMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

      setErrorMessage(errorResponse.message);
    }
  }, [error]);

  const RouterNavigation = useRouter();

  const toggleButtonChecked = () => {
    setButtonChecked((buttonChecked) => !buttonChecked);
  };

  const handleSignIn = useCallback(async () => {
    const loginCredentials: LoginCredentials = {
      username: form.email,
      password: form.password,
    };

    try {
      const token = await login(loginCredentials).unwrap();

      const decodedToken: JwtPayload = {
        ...jwtDecode<JwtPayload>(token),
        token,
      };

      dispatch(setUser(decodedToken));

      if (buttonChecked) {
        await saveToken(token);
      }

      RouterNavigation.navigate("/Dashboard");
    } catch (err) {
      console.log("Login failed: ", err);
    }
  }, [
    RouterNavigation,
    dispatch,
    form.email,
    form.password,
    login,
    buttonChecked,
  ]);

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
            <Pressable
              onPress={toggleButtonChecked}
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: 8,
              }}
            >
              <Ionicons
                name={buttonChecked ? "checkbox-outline" : "square-outline"}
                size={24}
                color="white"
              />
              <Text
                style={{
                  ...styles.inputLabel,
                  paddingStart: 4,
                }}
              >
                Keep me signed in
              </Text>
            </Pressable>
            <TouchableOpacity onPress={handleSignIn}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
          {!!errorMessage && (
            <View>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          )}
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
};

export default Login;
