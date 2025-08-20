// app/(tabs)/EventPage.tsx
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles/UITheme";

// storage helpers
import { addFavorite } from ".././utils/favorites";
import { addToItinerary } from ".././utils/itinerary";
import { addJoinedEvent } from ".././utils/joined";

export default function EventPage() {
  const { id, title, location, category, startAt, price, description } =
    useLocalSearchParams<{
      id?: string;
      title?: string;
      location?: string;
      category?: string;
      startAt?: string; // ISO string
      price?: string;
      description?: string;
    }>();

  const niceDate = startAt ? new Date(startAt).toLocaleString() : undefined;

  

  const onFavorite = async () => {
    try {
      await addFavorite({
        id: String(id ?? Date.now()),
        title: String(title ?? "Event"),
        location: location ? String(location) : undefined,
        category: category ? String(category) : undefined,
        startAt: startAt ? String(startAt) : undefined,
        price: price ? String(price) : undefined,
        description: description ? String(description) : undefined,
      });
      Alert.alert("Saved", "Added to Favorites.");
    } catch {
      Alert.alert("Error", "Could not save to favorites.");
    }
  };

  const onAddItinerary = async () => {
    try {
      await addToItinerary({
        id: String(id ?? Date.now()),
        title: String(title ?? "Event"),
        location: location ? String(location) : undefined,
        category: category ? String(category) : undefined,
        startAt: startAt ? String(startAt) : undefined,
        price: price ? String(price) : undefined,
        description: description ? String(description) : undefined,
      });
      Alert.alert("Itinerary", "Added to your itinerary.");
    } catch {
      Alert.alert("Error", "Could not add to itinerary.");
    }
  };

  const onJoin = async () => {
  try {
    await addJoinedEvent({
      id: String(id ?? Date.now()),
      title: String(title ?? "Event"),
      location: location ? String(location) : undefined,
      category: category ? String(category) : undefined,
      startAt: startAt ? String(startAt) : undefined,
      price: price ? String(price) : undefined,
      description: description ? String(description) : undefined,
    });
    Alert.alert("Joined", `You're in for: ${title ?? "this event"} 🎉`);
  } catch {
    Alert.alert("Error", "Could not join the event.");
  }
};

  return (
    <SafeAreaView style={styles.rootDark}>
      {/* Hide the default route header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title / location */}
        <Text style={styles.titleDark} numberOfLines={2}>
          {title ?? "Event"}
        </Text>
        {!!location && (
          <Text style={[styles.eventSubtitle, { marginTop: 6 }]}>{location}</Text>
        )}

        {/* Chips */}
        <View style={styles.eventChipsRow}>
          {!!category && (
            <View style={styles.eventChip}>
              <Text style={styles.eventChipText}>{category}</Text>
            </View>
          )}
          {!!niceDate && (
            <View style={styles.eventChip}>
              <Text style={styles.eventChipText}>{niceDate}</Text>
            </View>
          )}
          {!!price && (
            <View style={styles.eventChip}>
              <Text style={styles.eventChipText}>{price}</Text>
            </View>
          )}
          {!!id && (
            <View style={styles.eventChipMuted}>
              <Text style={styles.eventChipMutedText}>ID {id}</Text>
            </View>
          )}
        </View>

        {/* About card */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>About this event</Text>
          <Text style={[styles.paragraph, { marginTop: 8 }]}>
            {description ??
              "No description provided yet. This is a clean, distraction-free event screen. Add a description to tell guests what to expect, what to bring, and why it’ll be great."}
          </Text>
        </View>

        {/* Details card */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Details</Text>

          <View style={styles.eventDetailRow}>
            <Text style={styles.eventDetailLabel}>Location</Text>
            <Text style={styles.eventDetailValue}>{location ?? "—"}</Text>
          </View>

          <View style={styles.eventDetailRow}>
            <Text style={styles.eventDetailLabel}>Date & Time</Text>
            <Text style={styles.eventDetailValue}>{niceDate ?? "—"}</Text>
          </View>

          <View style={styles.eventDetailRow}>
            <Text style={styles.eventDetailLabel}>Category</Text>
            <Text style={styles.eventDetailValue}>{category ?? "—"}</Text>
          </View>

          <View style={styles.eventDetailRowLast}>
            <Text style={styles.eventDetailLabel}>Price</Text>
            <Text style={styles.eventDetailValue}>{price ?? "—"}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.eventActionsRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.eventPrimaryBtn} onPress={onJoin}>
            <Text style={styles.eventPrimaryBtnText}>Join Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.eventSecondaryBtn}
            onPress={onFavorite}
          >
            <Text style={styles.eventSecondaryBtnText}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.eventOutlineFullBtn}
          onPress={onAddItinerary}
        >
          <Text style={styles.eventOutlineFullBtnText}>Add to Itinerary</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
