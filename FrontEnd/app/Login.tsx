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
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [buttonChecked, setButtonChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const RouterNavigation = useRouter();
  const [login, { error }] = useLoginMutation();

  // --- Validare locală (câmpuri goale / format email / min lungime parolă)
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!form.email.trim()) newErrors.email = "Emailul este obligatoriu.";
    if (!form.password.trim()) newErrors.password = "Parola este obligatorie.";
    else if (form.password.length < 6) newErrors.password = "Parola trebuie să aibă minim 6 caractere.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Mapare erori backend -> mesaj „Parola e greșită.”
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

    // Dacă e 401/403 sau mesaj tipic de credențiale invalide -> arătăm „Parola e greșită.”
    if (status === 401 || status === 403 || /invalid|bad credentials/i.test(serverMsg)) {
      setErrors((prev) => ({ ...prev, password: "Parola e greșită." }));
      setErrorMessage(""); // nu mai arătăm banner generic
    } else {
      setErrorMessage(serverMsg || "A apărut o eroare la autentificare.");
    }
  }, [error]);

  const toggleButtonChecked = () => setButtonChecked((v) => !v);

  const handleSignIn = useCallback(async () => {
    if (!validate()) return;

    const loginCredentials: LoginCredentials = {
      username: form.email,
      password: form.password,
    };

    try {
      const token = await login(loginCredentials).unwrap();
      const decodedToken: JwtPayload = { ...jwtDecode<JwtPayload>(token), token };
      dispatch(setUser(decodedToken));
      if (buttonChecked) await saveToken(token);
      RouterNavigation.navigate("/Dashboard");
    } catch (err) {
      // Fallback în caz că nu prinde useEffect-ul de mai sus
      setErrors((prev) => ({ ...prev, password: "Parola e greșită." }));
      setErrorMessage("");
      console.log("Login failed: ", err);
    }
  }, [form, login, dispatch, RouterNavigation, buttonChecked]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <StatusBar backgroundColor="#2D3436" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Sign in to <Text style={{ color: "#2D3436" }}>FindEVENT</Text>
          </Text>
          <Text style={styles.subtitle}>Go discover your activities in your area and more</Text>
        </View>

        <View style={styles.form}>
          {/* Email */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address / Username</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(email) => {
                setForm((f) => ({ ...f, email }));
                if (errors.email) setErrors((e) => ({ ...e, email: undefined })); // curăță eroarea la input
              }}
              style={[
                styles.inputControl,
                errors.email ? { borderColor: "red", borderWidth: 1 } : null,
              ]}
            />
            {!!errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
          </View>

          {/* Password */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholder="****"
              placeholderTextColor="#6b7280"
              secureTextEntry
              value={form.password}
              onChangeText={(password) => {
                setForm((f) => ({ ...f, password }));
                if (errors.password) setErrors((e) => ({ ...e, password: undefined })); // curăță eroarea la input
              }}
              style={[
                styles.inputControl,
                errors.password ? { borderColor: "red", borderWidth: 1 } : null,
              ]}
            />
            {!!errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
          </View>

          <View style={styles.formAction}>
            <Pressable onPress={toggleButtonChecked} style={{ flexDirection: "row", paddingBottom: 8 }}>
              <Ionicons name={buttonChecked ? "checkbox-outline" : "square-outline"} size={24} color="white" />
              <Text style={{ ...styles.inputLabel, paddingStart: 4 }}>Keep me signed in</Text>
            </Pressable>

            <TouchableOpacity onPress={handleSignIn}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Banner generic (non-401) */}
          {!!errorMessage && (
            <View>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          )}

          <TouchableOpacity>
            <Text style={styles.formLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => RouterNavigation.navigate("/SignUp")}>
        <Text style={styles.formFooter}>
          Don&apos;t have an account? <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
