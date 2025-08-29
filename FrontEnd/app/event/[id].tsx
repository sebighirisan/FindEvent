import { ErrorResponse } from "@/model/error.model";
import { useFetchEventByIdQuery } from "@/store/features/events/event-api";
import formatDate from "@/utils/date.utils";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.10:8082";

export default function EventDetails() {
  const params = useLocalSearchParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;

  const [err, setErr] = useState("");

  const router = useRouter();

  const {
    data: event,
    error,
    isLoading,
  } = useFetchEventByIdQuery({ id: Number(idParam) });

  useEffect(() => {
    if (!idParam) {
      setErr("Missing event id");
    }
  }, [idParam]);

  useEffect(() => {
    if (error && "data" in error) {
      if (error.status === 401) {
        router.replace("/Login");
      } else {
        const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

        setErr(errorResponse.message);
      }
    }
  }, [error, router]);

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (err) {
    return <Text style={{ color: "white", padding: 16 }}>{err}</Text>;
  }

  if (!event) {
    return (
      <Text style={{ color: "white", padding: 16 }}>
        Event couldn&apos;t be found
      </Text>
    );
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

      {event.hasSplashImage && (
        <Image
          source={{ uri: `${API_BASE}/event/${event.id}/image` }}
          style={{ width: "100%", height: 300 }}
        />
      )}

      <View style={{ padding: 16 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
          {event.name}
        </Text>

        <Text style={{ color: "white", opacity: 0.8 }}>
          {event.location.name}
        </Text>

        <Text style={{ color: "white", marginTop: 6 }}>
          {formatDate(event.startDate)}{" "}
          {event.endDate ? `– ${formatDate(event.endDate)}` : ""}
        </Text>

        <Text style={{ color: "white", marginTop: 12, lineHeight: 20 }}>
          {event.description}
        </Text>
      </View>
    </ScrollView>
  );
}
