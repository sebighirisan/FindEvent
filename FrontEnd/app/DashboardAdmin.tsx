import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles/UITheme";

type EventItem = {
  id: string;
  title: string;
  location: string;
  date: string;
};

const events: EventItem[] = [
  { id: "1", title: "Techno Night", location: "Club Midi", date: "2025-08-29T22:00:00Z" },
  { id: "2", title: "Sunset Beach Party", location: "Cluj-Napoca", date: "2025-09-05T19:30:00Z" },
  { id: "3", title: "Nature Hike", location: "Apuseni Mountains", date: "2025-09-14T07:00:00Z" },
  { id: "4", title: "Indie Live Session", location: "Downtown", date: "2025-08-16T20:00:00Z" },
];

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const isUpcoming = (iso: string) => new Date(iso).getTime() >= Date.now();

const DashboardAdmin = () => {
  const router = useRouter();

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => isUpcoming(e.date))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome to <Text style={{ color: "#2D3436" }}>Admin</Text>
        </Text>
        <Text style={{ color: "#fff", fontSize: 20, marginLeft: 16, marginTop: 30 }}>
          Upcoming Events
        </Text>
        <Text style={{ color: "#9CA3AF", marginLeft: 16, marginTop: 4 }}>
          {upcoming.length} total
        </Text>
      </View>

      <FlatList
        data={upcoming}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, paddingTop: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/AdminVerifyEvent")}
            style={{
              backgroundColor: "#182333",
              borderRadius: 12,
              padding: 14,
              borderWidth: 1,
              borderColor: "#263241",
            }}
          >
            <Text
              style={{ color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 4 }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text style={{ color: "#9CA3AF" }}>{item.location}</Text>
            <Text style={{ color: "#9CA3AF", marginTop: 2 }}>{fmt(item.date)}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: "center" }}>
            <Text style={{ color: "#9CA3AF" }}>No upcoming events.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default DashboardAdmin;
