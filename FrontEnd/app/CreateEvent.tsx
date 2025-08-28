import { EventRequest } from "@/model/event.model";
import { useCreateEventMutation } from "@/store/features/events/event-api";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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
import GroupedSelect from "./components/GroupedSelect";
import styles from "./styles/UITheme";

interface Form {
  name: string;
  location: {
    name: string;
    longitude: string;
    latitude: string;
  };
  startDate: string;
  endDate: string;
  hyperlink: string;
  type: string;
  description: string;
  splashImage: File | null;
}

type Errors = {
  name?: string;
  locationName?: string;
  latitude?: string;
  longitude?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
  description?: string;
};

const CreateEvent = () => {
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false); // 👈 afișăm erori doar după Save
  const [form, setForm] = useState<Form>({
    name: "",
    location: { name: "", longitude: "", latitude: "" },
    startDate: "",
    endDate: "",
    hyperlink: "",
    type: "",
    description: "",
    splashImage: null,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [createEvent, { error, isLoading }] = useCreateEventMutation();
  const router = useRouter();

  useEffect(() => {
    if (!error) return;
    const anyErr = error as any;
    const data = anyErr?.data;
    let msg = "";
    if (typeof data === "string") {
      try { msg = JSON.parse(data)?.message ?? data; } catch { msg = data; }
    } else if (data && typeof data === "object" && "message" in data) {
      msg = data.message ?? "";
    }
    setErrorMessage(msg || "A apărut o eroare la creare.");
  }, [error]);

  const pickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0] as File | undefined;
      if (file) {
        setFileName(file.name);
        setForm((prev) => ({ ...prev, splashImage: file }));
      }
    };
    input.click();
  };

  // helpers
  const toISO = (v: string): string | null => {
    if (!v.trim()) return null;
    if (!isNaN(Date.parse(v))) return new Date(v).toISOString(); // deja ISO sau parseable
    const m = v.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})$/);
    if (m) return new Date(`${m[1]}T${m[2]}:${m[3]}:00`).toISOString();
    return null;
  };
  const isLat = (s: string) => {
    const n = Number(s);
    return s.trim() && !isNaN(n) && n >= -90 && n <= 90;
  };
  const isLng = (s: string) => {
    const n = Number(s);
    return s.trim() && !isNaN(n) && n >= -180 && n <= 180;
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Titlul este obligatoriu.";
    if (!form.location.name.trim()) e.locationName = "Locația este obligatorie.";
    if (!isLat(form.location.latitude)) e.latitude = "Latitudine invalidă (−90…90).";
    if (!isLng(form.location.longitude)) e.longitude = "Longitudine invalidă (−180…180).";

    const sISO = toISO(form.startDate);
    if (!sISO) e.startDate = "Data de start este obligatorie (ex. 2025-09-05 19:30).";

    if (form.endDate.trim()) {
      const eISO = toISO(form.endDate);
      if (!eISO) e.endDate = "Format invalid (ex. 2025-09-05 22:00).";
      else if (sISO && new Date(eISO).getTime() <= new Date(sISO).getTime())
        e.endDate = "Trebuie să fie după data de start.";
    }

    if (!form.type.trim()) e.type = "Tipul evenimentului este obligatoriu.";
    if (!form.description.trim()) e.description = "Descrierea este obligatorie.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // curăță eroarea unui câmp după ce userul editează, dar doar dacă deja am dat Save
  const clearIfSubmitted = (k: keyof Errors) => {
    if (submitted && errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSave = useCallback(async () => {
    setSubmitted(true);           // 👈 de acum încolo putem arăta erori
    const ok = validate();        // calculează erorile
    if (!ok) return;              // nu submităm dacă nu e valid

    const startISO = toISO(form.startDate)!;
    const endISO = form.endDate.trim() ? toISO(form.endDate)! : "";

    const eventRequest: EventRequest = {
      name: form.name.trim(),
      location: {
        name: form.location.name.trim(),
        latitude: String(form.location.latitude),
        longitude: String(form.location.longitude),
      },
      startDate: startISO,
      endDate: endISO,
      hyperlink: form.hyperlink.trim(),
      type: form.type.trim(),
      description: form.description.trim(),
      splashImage: (form.splashImage as Blob) ?? (undefined as any),
    };

    try {
      await createEvent(eventRequest).unwrap();
      Alert.alert("Succes", "Evenimentul a fost creat.");
      router.push("..");
    } catch (err) {
      if (!errorMessage) setErrorMessage("Crearea evenimentului a eșuat.");
      console.error("Upload failed:", err);
    }
  }, [form, createEvent, router, errorMessage]);

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
                style={[
                  styles.inputDark,
                  submitted && errors.name ? { borderColor: "red", borderWidth: 1 } : null,
                ]}
                value={form.name}
                onChangeText={(name) => {
                  setForm({ ...form, name });
                  clearIfSubmitted("name");
                }}
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {submitted && errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
            </View>

            {/* Category / Type */}
            <GroupedSelect
              onChangeCategory={(newCategoryType) => {
                setForm({ ...form, type: newCategoryType });
                clearIfSubmitted("type");
              }}
            />
            {submitted && errors.type && (
              <Text style={{ color: "red", marginTop: -6, marginBottom: 8 }}>{errors.type}</Text>
            )}

            {/* Location */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                placeholder="Event location"
                placeholderTextColor="#94a3b8"
                style={[
                  styles.inputDark,
                  submitted && errors.locationName ? { borderColor: "red", borderWidth: 1 } : null,
                ]}
                value={form.location.name}
                onChangeText={(locationName) => {
                  setForm({ ...form, location: { ...form.location, name: locationName } });
                  clearIfSubmitted("locationName");
                }}
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {submitted && errors.locationName && (
                <Text style={{ color: "red" }}>{errors.locationName}</Text>
              )}

              {/* Latitude + Longitude */}
              <View style={styles.coordsRow}>
                <TextInput
                  placeholder="Latitude"
                  placeholderTextColor="#94a3b8"
                  style={[
                    styles.inputDark,
                    styles.coordInput,
                    submitted && errors.latitude ? { borderColor: "red", borderWidth: 1 } : null,
                  ]}
                  value={form.location.latitude}
                  onChangeText={(latitude) => {
                    setForm({ ...form, location: { ...form.location, latitude } });
                    clearIfSubmitted("latitude");
                  }}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Longitude"
                  placeholderTextColor="#94a3b8"
                  style={[
                    styles.inputDark,
                    styles.coordInput,
                    submitted && errors.longitude ? { borderColor: "red", borderWidth: 1 } : null,
                  ]}
                  value={form.location.longitude}
                  onChangeText={(longitude) => {
                    setForm({ ...form, location: { ...form.location, longitude } });
                    clearIfSubmitted("longitude");
                  }}
                  keyboardType="numeric"
                />
              </View>
              {submitted && errors.latitude && <Text style={{ color: "red" }}>{errors.latitude}</Text>}
              {submitted && errors.longitude && <Text style={{ color: "red" }}>{errors.longitude}</Text>}
            </View>

            {/* Start Date */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                placeholder="ex. 2025-09-05 19:30 sau ISO"
                placeholderTextColor="#94a3b8"
                style={[
                  styles.inputDark,
                  submitted && errors.startDate ? { borderColor: "red", borderWidth: 1 } : null,
                ]}
                value={form.startDate}
                onChangeText={(startDate) => {
                  setForm({ ...form, startDate });
                  clearIfSubmitted("startDate");
                }}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {submitted && errors.startDate && (
                <Text style={{ color: "red" }}>{errors.startDate}</Text>
              )}
            </View>

            {/* End Date (Optional) */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>End Date (Optional)</Text>
              <TextInput
                placeholder="ex. 2025-09-05 22:00 sau ISO"
                placeholderTextColor="#94a3b8"
                style={[
                  styles.inputDark,
                  submitted && errors.endDate ? { borderColor: "red", borderWidth: 1 } : null,
                ]}
                value={form.endDate}
                onChangeText={(endDate) => {
                  setForm({ ...form, endDate });
                  clearIfSubmitted("endDate");
                }}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {submitted && errors.endDate && <Text style={{ color: "red" }}>{errors.endDate}</Text>}
            </View>

            {/* Hyperlink (opțional) */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Hyperlink</Text>
              <TextInput
                placeholder="ex. https://example.com/bilete"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.hyperlink}
                onChangeText={(hyperlink) => setForm({ ...form, hyperlink })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Image (opțional) */}
            <View style={styles.input}>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.inputLabel}>Image</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Image"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                editable={false}
                value={fileName}
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
                style={[
                  styles.inputDark,
                  { height: 120, textAlignVertical: "top" },
                  submitted && errors.description ? { borderColor: "red", borderWidth: 1 } : null,
                ]}
                value={form.description}
                onChangeText={(description) => {
                  setForm({ ...form, description });
                  clearIfSubmitted("description");
                }}
                autoCapitalize="sentences"
                autoCorrect
                multiline
                numberOfLines={6}
              />
              {submitted && errors.description && (
                <Text style={{ color: "red" }}>{errors.description}</Text>
              )}
            </View>

            {!!errorMessage && (
              <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            )}

            {/* Actions */}
            <View
              style={[
                styles.formAction,
                { paddingBottom: 16, justifyContent: "center", flexDirection: "row", gap: 12 },
              ]}
            >
              <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: "center" }}>
                <View style={[styles.btnSave, { backgroundColor: "#CC5500" }]}>
                  <Text style={styles.btnSaveText}>Cancel</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={onSave} disabled={isLoading}>
                <View style={[styles.btnSave, isLoading ? { opacity: 0.6 } : null]}>
                  <Text style={styles.btnSaveText}>{isLoading ? "Saving..." : "Save"}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateEvent;
