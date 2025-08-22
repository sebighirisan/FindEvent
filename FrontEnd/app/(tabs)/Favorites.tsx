// app/(tabs)/Favorites.tsx
import { router, useFocusEffect } from "expo-router";
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
import { FavoriteEvent, getFavorites, removeFavorite } from ".././utils/favorites";
import styles from "../styles/UITheme";

export default function Favorites() {
  const [items, setItems] = useState<FavoriteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await getFavorites();
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

  const openEvent = (ev: FavoriteEvent) => {
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

  const confirmRemove = (ev: FavoriteEvent) => {
    Alert.alert(
      "Remove favorite",
      `Remove "${ev.title}" from Favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await removeFavorite(ev.id);
            load();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.rootDark}>
      {/* Minimal header with title */}
      <View style={styles.fixedHeaderWrap}>
        <View
          style={[
            styles.headerDark,
            { paddingHorizontal: 16, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text style={styles.titleDark}>Favorites</Text>
          <Text style={{ color: "#9CA3AF", marginTop: 4 }}>
            {loading ? "Loading…" : `${items.length} saved ${items.length === 1 ? "event" : "events"}`}
          </Text>
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
            <Text style={styles.emptyText}>No favorite events yet.</Text>
            <Text style={[styles.eventSubtitle, { marginTop: 6, textAlign: "center" }]}>
              Tap “Add to Favorites” on an event to see it here.
            </Text>
          </View>
        ) : (
          items.map((ev) => {
            const niceDate = ev.startAt ? new Date(ev.startAt).toLocaleString() : undefined;
            return (
              <View key={ev.id} style={styles.eventCard}>
                {/* Tappable header (title/location) */}
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

                {/* Subtle chips row (category/date/price) */}
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
