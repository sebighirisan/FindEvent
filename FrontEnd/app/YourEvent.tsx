// app/YourEvent.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles/UITheme";

type EventDraft = {
  Name?: string;
  Location?: string;
  Hours?: string;
  Price?: string;
  Thematic?: string;
  Description?: string;
  Date?: string;
  Images?: string;
};

const STORAGE_KEY = "LATEST_CREATED_EVENT";

export default function YourEvent() {
  const routeParams = useLocalSearchParams<EventDraft>();
  const [event, setEvent] = useState<EventDraft>({});
  const [stats] = useState({ joined: 42, interested: 120 }); // ✅ static values

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const fromRoute: EventDraft = {
        Name: routeParams.Name,
        Location: routeParams.Location,
        Hours: routeParams.Hours,
        Price: routeParams.Price,
        Thematic: routeParams.Thematic,
        Description: routeParams.Description,
        Date: routeParams.Date,
        Images: routeParams.Images,
      };

      if (
        !fromRoute.Name &&
        !fromRoute.Location &&
        !fromRoute.Date &&
        !fromRoute.Description
      ) {
        try {
          const raw = await AsyncStorage.getItem(STORAGE_KEY);
          if (mounted && raw) {
            const parsed = JSON.parse(raw) as EventDraft;
            setEvent(parsed ?? {});
          }
        } catch {}
      } else {
        if (mounted) setEvent(fromRoute);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [routeParams]);

  const goBack = () => router.back();

  return (
    <SafeAreaView style={styles.rootDark}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.titleDark} numberOfLines={2}>
          {event.Name || "Your Event"}
        </Text>
        {!!event.Location && (
          <Text style={[styles.eventSubtitle, { marginTop: 6 }]}>
            {event.Location}
          </Text>
        )}

        {/* Quick chips */}
        <View style={styles.eventChipsRow}>
          {!!event.Date && (
            <View style={styles.eventChip}>
              <Text style={styles.eventChipText}>{event.Date}</Text>
            </View>
          )}
          {!!event.Hours && (
            <View style={styles.eventChip}>
              <Text style={styles.eventChipText}>{event.Hours}</Text>
            </View>
          )}
          {!!event.Price && (
            <View style={styles.eventChip}>
              <Text style={styles.eventChipText}>{event.Price}</Text>
            </View>
          )}
          {!!event.Thematic && (
            <View style={styles.eventChip}>
              <Text style={styles.eventChipText}>{event.Thematic}</Text>
            </View>
          )}
        </View>

        {/* Summary card */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Summary</Text>
          <Row label="Name" value={event.Name} />
          <Row label="Location" value={event.Location} />
          <Row label="Date" value={event.Date} />
          <Row label="Hours / Duration" value={event.Hours} />
          <Row label="Price" value={event.Price} />
          <Row label="Thematic" value={event.Thematic} last />
        </View>

        {/* Statistics card */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Statistics</Text>
          <StatRow label="People Joined" value={stats.joined.toString()} />
          <StatRow label="Interested" value={stats.interested.toString()} last />
        </View>

        {/* Description card */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Description</Text>
          <Text style={[styles.paragraph, { marginTop: 8 }]}>
            {event.Description ||
              "No description added yet. You can include details like schedule, what to bring, and special notes."}
          </Text>
        </View>

        {/* Images info */}
        <View style={styles.eventPanel}>
          <Text style={styles.eventPanelTitle}>Images</Text>
          <Text style={[styles.paragraph, { marginTop: 8 }]}>
            {event.Images || "No images provided."}
          </Text>
        </View>

        {/* Actions */}
        <View style={{ marginTop: 16, gap: 10 }}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.eventPrimaryBtn}
            onPress={goBack}
          >
            <Text style={styles.eventPrimaryBtnText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.eventOutlineFullBtn}
            onPress={() => router.replace("/CreateEvent")}
          >
            <Text style={styles.eventOutlineFullBtnText}>Create Another</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Helper row for details */
function Row({ label, value, last }: { label: string; value?: string; last?: boolean }) {
  return (
    <View
      style={{
        paddingVertical: 12,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: "#223044",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <Text style={{ color: "#9CA3AF", fontSize: 14 }}>{label}</Text>
      <Text
        style={{
          color: "#E5E7EB",
          fontSize: 14,
          fontWeight: "600",
          maxWidth: "60%",
          textAlign: "right",
        }}
        numberOfLines={2}
      >
        {value || "—"}
      </Text>
    </View>
  );
}

/* Helper row for statistics */
function StatRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View
      style={{
        paddingVertical: 12,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: "#223044",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "#9CA3AF", fontSize: 15 }}>{label}</Text>
      <Text style={{ color: "#4ade80", fontSize: 15, fontWeight: "700" }}>{value}</Text>
    </View>
  );
}
