import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  clearItinerary,
  getItinerary,
  ItineraryItem,
  removeFromItinerary,
} from ".././utils/itinerary";
import styles from "./styles/UITheme";

export default function Itinerary() {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await getItinerary();
    // Optional: sort by start date if present
    list.sort((a, b) => {
      const ta = a.startAt ? new Date(a.startAt).getTime() : 0;
      const tb = b.startAt ? new Date(b.startAt).getTime() : 0;
      return ta - tb;
    });
    setItems(list);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const openEvent = (ev: ItineraryItem) => {
    router.push({
      pathname: "/EventPage",
      params: {
        id: ev.id,
        title: ev.title,
        location: ev.location,
        category: ev.category,
        startAt: ev.startAt,
        price: ev.price,
        description: ev.description,
      },
    });
  };

  const confirmRemove = (ev: ItineraryItem) => {
    Alert.alert(
      "Remove from itinerary",
      `Remove "${ev.title}" from your plan?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await removeFromItinerary(ev.id);
            load();
          },
        },
      ]
    );
  };

  const confirmClearAll = () => {
    if (items.length === 0) return;
    Alert.alert(
      "Clear itinerary",
      "Remove all events from your itinerary?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearItinerary();
            load();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.rootDark}>
       {/* Hide the default route header */}
      <Stack.Screen options={{ headerShown: false }} />
      {/* Minimal header */}
      <View style={styles.fixedHeaderWrap}>
        <View
          style={[
            styles.headerDark,
            { paddingHorizontal: 16, alignItems: "center", justifyContent: "space-between" },
          ]}
        >
          <Text style={styles.titleDark}>Itinerary</Text>
          <Text style={{ color: "#9CA3AF", marginTop: 4 }}>
            {loading ? "Loading…" : `${items.length} planned ${items.length === 1 ? "event" : "events"}`}
          </Text>

          {/* Optional: show a small clear action under title (comment out if you don't want it) */}
          {/* <TouchableOpacity onPress={confirmClearAll} activeOpacity={0.85} style={[styles.eventSecondaryBtn, { marginTop: 8 }]}>
            <Text style={styles.eventSecondaryBtnText}>Clear</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.listWrap, { paddingTop: 16, paddingBottom: 32 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        {loading ? (
          <Text style={{ color: "#9CA3AF", textAlign: "center", marginTop: 16 }}>
            Loading…
          </Text>
        ) : items.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Your itinerary is empty.</Text>
            <Text style={[styles.eventSubtitle, { marginTop: 6, textAlign: "center" }]}>
              Tap “Add to Itinerary” on an event to plan your schedule.
            </Text>
          </View>
        ) : (
          items.map((ev) => {
            const niceDate = ev.startAt ? new Date(ev.startAt).toLocaleString() : undefined;
            return (
              <View key={ev.id} style={styles.eventCard}>
                <TouchableOpacity activeOpacity={0.85} onPress={() => openEvent(ev)}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {ev.title}
                  </Text>
                  {!!ev.location && (
                    <Text style={styles.eventSubtitle} numberOfLines={1}>
                      {ev.location}
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Chips for quick glance */}
                <View style={[styles.eventChipsRow, { marginTop: 10, marginBottom: 0 }]}>
                  {!!ev.category && (
                    <View style={styles.eventChip}>
                      <Text style={styles.eventChipText}>{ev.category}</Text>
                    </View>
                  )}
                  {!!niceDate && (
                    <View style={styles.eventChip}>
                      <Text style={styles.eventChipText}>{niceDate}</Text>
                    </View>
                  )}
                  {!!ev.price && (
                    <View style={styles.eventChip}>
                      <Text style={styles.eventChipText}>{ev.price}</Text>
                    </View>
                  )}
                </View>

                {/* Actions */}
                <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.eventPrimaryBtn}
                    onPress={() => openEvent(ev)}
                  >
                    <Text style={styles.eventPrimaryBtnText}>Open</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.eventSecondaryBtn}
                    onPress={() => confirmRemove(ev)}
                  >
                    <Text style={styles.eventSecondaryBtnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
