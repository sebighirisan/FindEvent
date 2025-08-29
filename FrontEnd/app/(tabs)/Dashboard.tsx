// app/(tabs)/Dashboard.tsx
import { ErrorResponse } from "@/model/error.model";
import { Event } from "@/model/event.model";
import { useFetchUpcomingEventsQuery } from "@/store/features/events/event-api";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../components/EventCard";
import styles from "../styles/UITheme";

const Dashboard = () => {
  const [eventName, setEventName] = useState<string>();

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const {
    data: upcomingEvents,
    error,
    isLoading,
  } = useFetchUpcomingEventsQuery();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!!eventName) {
      setFilteredEvents(
        upcomingEvents?.filter((event) =>
          event.name.toLowerCase().includes(eventName.toLowerCase())
        ) ?? []
      );
    } else {
      setFilteredEvents(upcomingEvents ?? []);
    }
  }, [eventName, upcomingEvents]);

  useEffect(() => {
    if (error && "data" in error) {
      const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

      setErrorMessage(errorResponse.message);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.rootDark}>
      <View style={styles.fixedHeaderWrap}>
        <View style={styles.headerDark}>
          <Text style={styles.titleDark}>
            Welcome to <Text style={{ color: "#f7f8f8ff" }}>FindEVENT</Text>
          </Text>

          <TextInput
            style={styles.searchBarDark}
            value={eventName}
            onChangeText={(newName) => setEventName(newName)}
            placeholder="Search your event"
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      {/* Scrollable content only */}
      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming */}
        <View style={styles.sectionLabelWrap}>
          <Text style={styles.sectionLabelText}>Upcoming Events</Text>
        </View>

        {isLoading && <ActivityIndicator color="#fff" />}

        {!!errorMessage && (
          <View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )}

        {!isLoading && !!filteredEvents?.length ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginTop: 12
            }}
          >
            No upcoming events found
          </Text>
        )}
      </ScrollView>

      {/* More */}
    </SafeAreaView>
  );
};

export default Dashboard;
