import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.10:8082"; 
// 🔥 schimbă pe portul real unde rulează Spring (8080 sau 8082)

// tipul evenimentului
type EventDTO = {
  id: number;
  name: string;
  description?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
};

export default function EventDetails() {
  const params = useLocalSearchParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

  const [event, setEvent] = useState<EventDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!idParam) {
      setErr("Missing event id");
      setLoading(false);
      return;
    }

    const url = `${API_BASE}/event/${idParam}`;

    fetch(url, {
      // ✅ dacă backend-ul cere JWT
      // headers: { Authorization: `Bearer ${token}` },

      // ✅ dacă backend-ul folosește cookie de sesiune
      // credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
        return r.json();
      })
      .then(setEvent)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [idParam]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (err) {
    return <Text style={{ color: "white", padding: 16 }}>Eroare: {err}</Text>;
  }

  if (!event) {
    return <Text style={{ color: "white", padding: 16 }}>Eveniment negăsit</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0b0f14" }}>
      <Stack.Screen
        options={{
          title: event.name,
          headerStyle: { backgroundColor: "#0b0f14" },
          headerTintColor: "white",
        }}
      />

      {event.imageUrl ? (
        <Image
          source={{ uri: event.imageUrl }}
          style={{ width: "100%", height: 220 }}
        />
      ) : (
        <Image
          source={{ uri: `${API_BASE}/event/${event.id}/image` }}
          style={{ width: "100%", height: 220 }}
        />
      )}

      <View style={{ padding: 16 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
          {event.name}
        </Text>

        {event.address ? (
          <Text style={{ color: "white", opacity: 0.8 }}>{event.address}</Text>
        ) : null}

        {event.startDate ? (
          <Text style={{ color: "white", marginTop: 6 }}>
            {formatDate(event.startDate)}{" "}
            {event.endDate ? `– ${formatDate(event.endDate)}` : ""}
          </Text>
        ) : null}

        {event.description ? (
          <Text style={{ color: "white", marginTop: 12, lineHeight: 20 }}>
            {event.description}
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

// 🔧 helper pentru date
function formatDate(date: string) {
  try {
    return new Date(date).toLocaleString();
  } catch {
    return date;
  }
}
