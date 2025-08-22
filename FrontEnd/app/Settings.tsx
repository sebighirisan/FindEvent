// app/(tabs)/Settings.tsx
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles/UITheme";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  // editable fields
  const [name, setName] = useState("John Appleseed");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("••••••••");

  const onUpdateAccount = () => {
    Alert.alert(
      "Account Updated",
      `Name: ${name}\nEmail: ${email}\nPassword: ${password}`
    );
  };

  const onSignOut = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => Alert.alert("Signed out") },
    ]);
  };

  const onDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "This action is permanent. Do you want to proceed?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => Alert.alert("Account deleted") },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.rootDark}>
      {/* Header */}
      <View style={styles.fixedHeaderWrap}>
        <View style={[styles.headerDark, { paddingHorizontal: 16 }]}>
          <Text style={styles.titleDark}>Settings</Text>
          <Text style={{ color: "#9CA3AF", marginTop: 4 }}>Customize your experience</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account */}
        <View style={[styles.eventPanel, { marginTop: 8 }]}>
          <Text style={styles.eventPanelTitle}>Account</Text>

          <EditableRow label="Name" value={name} onChange={setName} />
          <EditableRow label="Email" value={email} onChange={setEmail} />
          <EditableRow
            label="Password"
            value={password}
            secure
            onChange={setPassword}
            last
          />

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onUpdateAccount}
            style={[styles.eventPrimaryBtn, { marginTop: 16 }]}
          >
            <Text style={styles.eventPrimaryBtnText}>Update Account</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Preferences</Text>
          <RowToggle label="Dark Mode" value={darkMode} onValueChange={setDarkMode} />
          <Row
            label="Language"
            value="English"
            chevron
            onPress={() => Alert.alert("Choose Language")}
            last
          />
        </View>

        {/* Notifications */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Notifications</Text>
          <RowToggle label="Push Notifications" value={pushEnabled} onValueChange={setPushEnabled} />
          <RowToggle
            label="Email Notifications"
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            last
          />
        </View>

        {/* Privacy & Security */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Privacy & Security</Text>
          <Row label="Manage Data" chevron onPress={() => Alert.alert("Manage Data")} />
          <Row
            label="Two-Factor Authentication"
            value="Off"
            chevron
            onPress={() => Alert.alert("Enable 2FA")}
            last
          />
        </View>

        {/* Danger zone */}
        <View style={{ marginTop: 12, gap: 10 }}>
          <TouchableOpacity style={styles.eventPrimaryBtn} onPress={onSignOut} activeOpacity={0.85}>
            <Text style={styles.eventPrimaryBtnText}>Sign Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.eventOutlineFullBtn}
            onPress={onDeleteAccount}
            activeOpacity={0.85}
          >
            <Text style={styles.eventOutlineFullBtnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Components ---------- */
function Row({
  label,
  value,
  chevron,
  onPress,
  last,
}: {
  label: string;
  value?: string;
  chevron?: boolean;
  onPress?: () => void;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      style={{
        paddingVertical: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: "#223044",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "#E5E7EB", fontSize: 15, fontWeight: "600" }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {!!value && (
          <Text style={{ color: "#9CA3AF", fontSize: 14 }} numberOfLines={1}>
            {value}
          </Text>
        )}
        {chevron && <Text style={{ color: "#475569" }}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

function RowToggle({
  label,
  value,
  onValueChange,
  last,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  last?: boolean;
}) {
  return (
    <View
      style={{
        paddingVertical: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: "#223044",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "#E5E7EB", fontSize: 15, fontWeight: "600" }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? "#d1d5db" : "#94a3b8"}
        trackColor={{ false: "#334155", true: "#334155" }}
      />
    </View>
  );
}

function EditableRow({
  label,
  value,
  onChange,
  last,
  secure,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  last?: boolean;
  secure?: boolean;
}) {
  return (
    <View
      style={{
        paddingVertical: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: "#223044",
      }}
    >
      <Text style={{ color: "#E5E7EB", fontSize: 15, fontWeight: "600", marginBottom: 6 }}>
        {label}
      </Text>
      <TextInput
        style={{
          backgroundColor: "#182333",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#263241",
          paddingHorizontal: 12,
          paddingVertical: 10,
          color: "#fff",
          fontSize: 15,
        }}
        value={value}
        secureTextEntry={secure}
        onChangeText={onChange}
      />
    </View>
  );
}
