import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles/UITheme"; // from app/ → ../styles

const CreateEvent = () => {
  const [form, setForm] = useState({
    Name: "",
    Location: "",
    Hours: "",
    Price: "",
    Thematic: "",
    Description: "",
    Date: "",
    Images: "",
  });

  const onSave = () => {
    const required = ["Name", "Location", "Date"];
    const missing = required.filter((k) => !(form as any)[k]?.trim?.());
    if (missing.length) {
      Alert.alert("Incomplete", `Please fill: ${missing.join(", ")}.`, [{ text: "OK" }]);
      return;
    }
    // TODO: send to backend
    router.push("/YourEvent");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={styles.container2}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              <Text style={{ color: "#e1e2e1" }}>Create your Event</Text>
            </Text>
            <Text style={styles.subtitle}>Add your event details!</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Event Name */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Event Name</Text>
              <TextInput
                placeholder="Your event name"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.Name}
                onChangeText={(Name) => setForm({ ...form, Name })}
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Location */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                placeholder="Event location"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.Location}
                onChangeText={(Location) => setForm({ ...form, Location })}
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Date */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Date</Text>
              <TextInput
                placeholder="e.g. 2025-09-05 19:30"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.Date}
                onChangeText={(Date) => setForm({ ...form, Date })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Hours / Duration */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Hours / Duration</Text>
              <TextInput
                placeholder="e.g. 3h or 19:00–22:00"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.Hours}
                onChangeText={(Hours) => setForm({ ...form, Hours })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Price */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                placeholder="e.g. 50 RON or Free"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.Price}
                onChangeText={(Price) => setForm({ ...form, Price })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Thematic */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Thematic</Text>
              <TextInput
                placeholder="e.g. Techno, Outdoor, Food"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.Thematic}
                onChangeText={(Thematic) => setForm({ ...form, Thematic })}
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Images */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Images</Text>
              <TextInput
                placeholder="Paste image URL(s) or write 'add later'"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.Images}
                onChangeText={(Images) => setForm({ ...form, Images })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Description */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="Write a short description of your event"
                placeholderTextColor="#94a3b8"
                style={[styles.inputDark, { height: 120, textAlignVertical: "top" }]}
                value={form.Description}
                onChangeText={(Description) => setForm({ ...form, Description })}
                autoCapitalize="sentences"
                autoCorrect
                multiline
                numberOfLines={6}
              />
            </View>
          </View>

          {/* Actions */}
          <View style={[styles.formAction, { marginTop: 16 }]}>
            <TouchableOpacity onPress={onSave}>
              <View style={styles.btnSave}>
                <Text style={styles.btnSaveText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateEvent;
