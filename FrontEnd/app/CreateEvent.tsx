import { EventRequest } from "@/model/event.model";
import { useCreateEventMutation } from "@/store/features/events/event-api";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
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
import styles from "./styles/UITheme"; // from app/ → ../styles

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

const CreateEvent = () => {
  const [fileName, setFileName] = useState("");

  const [form, setForm] = useState<Form>({
    name: "",
    location: {
      name: "",
      longitude: "",
      latitude: "",
    },
    startDate: "",
    endDate: "",
    hyperlink: "",
    type: "",
    description: "",
    splashImage: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [createEvent, { error }] = useCreateEventMutation();

  const router = useRouter();

  useEffect(() => {
    // if (error && "data" in error) {
    //   const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

    //   setErrorMessage(errorResponse.message);
    // }
  }, [error]);

  const onCancel = () => {
    router.push("..");
  };

  const pickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files[0] as File;
      if (file) {
        setFileName(file.name);
        setForm((prevForm) => ({ ...prevForm, splashImage: file }));
      }
    };
    input.click();
  };

  const onSave = useCallback(async () => {
    const eventRequest: EventRequest = {
      ...form,
      splashImage: form.splashImage as Blob
    };

    try {
      const res = await createEvent(eventRequest).unwrap();
      console.log("Upload success:", res);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }, [createEvent, form]);

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
                value={form.name}
                onChangeText={(name) => setForm({ ...form, name })}
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            <GroupedSelect
              onChangeCategory={(newCategoryType) => {
                setForm({ ...form, type: newCategoryType });
              }}
            />

            {/* Location */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                placeholder="Event location"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.location.name}
                onChangeText={(locationName) =>
                  setForm({
                    ...form,
                    location: { ...form.location, name: locationName },
                  })
                }
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />

              {/* Latitude + Longitude */}
              <View style={styles.coordsRow}>
                <TextInput
                  placeholder="Latitude"
                  placeholderTextColor="#94a3b8"
                  style={[styles.inputDark, styles.coordInput]}
                  value={form.location.latitude}
                  onChangeText={(latitude) =>
                    setForm({
                      ...form,
                      location: { ...form.location, latitude },
                    })
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Longitude"
                  placeholderTextColor="#94a3b8"
                  style={[styles.inputDark, styles.coordInput]}
                  value={form.location.longitude}
                  onChangeText={(longitude) =>
                    setForm({
                      ...form,
                      location: { ...form.location, longitude },
                    })
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Start Date */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                placeholder="e.g. 2025-09-05 19:30"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.startDate}
                onChangeText={(startDate) => setForm({ ...form, startDate })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* End Date */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>End Date (Optional)</Text>
              <TextInput
                placeholder="e.g. 2025-09-05 19:30"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.endDate}
                onChangeText={(endDate) => setForm({ ...form, endDate })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Hyperlink */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Hyperlink</Text>
              <TextInput
                placeholder="e.g. 50 RON or Free"
                placeholderTextColor="#94a3b8"
                style={styles.inputDark}
                value={form.hyperlink}
                onChangeText={(hyperlink) => setForm({ ...form, hyperlink })}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Image */}
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
                ]}
                value={form.description}
                onChangeText={(description) =>
                  setForm({ ...form, description })
                }
                autoCapitalize="sentences"
                autoCorrect
                multiline
                numberOfLines={6}
              />
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
                {
                  paddingBottom: 16,
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 12,
                },
              ]}
            >
              <TouchableOpacity
                onPress={onCancel}
                style={{ alignSelf: "center" }}
              >
                <View style={[styles.btnSave, { backgroundColor: "#CC5500" }]}>
                  <Text style={styles.btnSaveText}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSave}>
                <View style={styles.btnSave}>
                  <Text style={styles.btnSaveText}>Save</Text>
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
