import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AdminVerifyEvent = () => {
  const event = {
    title: "Sunset Beach Party",
    location: "Cluj-Napoca",
    date: "Friday, 5 Sep 2025 · 7:30 PM",
    description:
      "Join us for an unforgettable evening by the beach with live DJs, cocktails, and dancing under the stars.",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Event Details */}
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>{event.location}</Text>
        <Text style={styles.meta}>{event.date}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.reject]} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.accept]} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminVerifyEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101820",
    padding: 16,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#182333",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2C3748",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  meta: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 2,
  },
  description: {
    color: "#D1D5DB",
    fontSize: 15,
    marginTop: 12,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  accept: {
    borderColor: "#6EE7B7", // soft mint
  },
  reject: {
    borderColor: "#FCA5A5", // soft red
  },
  buttonText: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
