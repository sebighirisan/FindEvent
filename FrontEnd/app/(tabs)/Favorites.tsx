// app/(tabs)/Favorites.tsx
import { AttendanceStatusEnum, Event } from "@/model/event.model";
import { useFetchPersonalizedEventsQuery } from "@/store/features/events/event-api";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import EventCard from "../components/EventCard";
import ExpansionPanel from "../components/ExpansionPanel";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../constants/paging.constants";
import styles from "../styles/UITheme";

const Favorites = () => {
  /* Interested Events */
  const [interestedEventsPage, setInterestedEventsPage] =
    useState(DEFAULT_PAGE_NUMBER);
  const {
    data: interestedEventsData,
    isLoading: interestedEventsLoading,
    error: interestedEventsError,
  } = useFetchPersonalizedEventsQuery({
    page: interestedEventsPage,
    size: DEFAULT_PAGE_SIZE,
    attendanceStatus: AttendanceStatusEnum.INTERESTED,
  });

  const [interestedEvents, setInterestedEvents] = useState<Event[]>([]);
  const [interestedEventsFilled, setInterestedEventsFilled] =
    useState<boolean>(false);

  useEffect(() => {
    if (interestedEventsData?.items?.length) {
      setInterestedEvents((prev) => [...prev, ...interestedEventsData?.items]); // append new results
    }
  }, [interestedEventsData]);

  useEffect(() => {
    setInterestedEventsFilled(
      interestedEventsData?.metadata?.totalCount === interestedEvents.length
    );
  }, [interestedEventsData, interestedEvents]);

  /* Going Events */
  const [goingEventsPage, setGoingEventsPage] = useState(DEFAULT_PAGE_NUMBER);
  const {
    data: goingEventsData,
    isLoading: goingEventsLoading,
    error: goingEventsError,
  } = useFetchPersonalizedEventsQuery({
    page: goingEventsPage,
    size: DEFAULT_PAGE_SIZE,
    attendanceStatus: AttendanceStatusEnum.GOING,
  });

  const [goingEvents, setGoingEvents] = useState<Event[]>([]);
  const [goingEventsFilled, setGoingEventsFilled] = useState<boolean>(false);

  useEffect(() => {
    if (goingEventsData?.items?.length) {
      setGoingEvents((prev) => [...prev, ...goingEventsData?.items]); // append new results
    }
  }, [goingEventsData]);

  useEffect(() => {
    setGoingEventsFilled(
      goingEventsData?.metadata?.totalCount === goingEvents.length
    );
  }, [goingEventsData, goingEvents]);

  const toggleGoingEventStatusHandler = (id: number) => {
    setGoingEvents((prevGoingEvents) =>
      prevGoingEvents.filter((event) => event.id !== id)
    );
  };

  const toggleInterestedEventStatusHandler = (id: number) => {
    setInterestedEvents((prevGoingEvents) =>
      prevGoingEvents.filter((event) => event.id !== id)
    );
  };

  return (
    <SafeAreaView style={styles.rootDark}>
      {/* Minimal header with title */}
      <View style={styles.fixedHeaderWrap}>
        <View
          style={[
            styles.headerDark,
            {
              paddingHorizontal: 16,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text style={styles.titleDark}>Favorites</Text>
        </View>
      </View>

      {/* Favorites */}
      <ScrollView
        contentContainerStyle={[
          styles.listWrap,
          { paddingTop: 16, paddingBottom: 32 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {}}
            tintColor="#fff"
          />
        }
      >
        <ExpansionPanel title="Going">
          {goingEventsLoading && <ActivityIndicator color="#fff" />}

          {goingEvents && goingEvents.length > 0 ? (
            goingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRemovingGoing={(id) => toggleGoingEventStatusHandler(id)}
              />
            ))
          ) : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No favorite events yet.</Text>
              <Text
                style={[
                  styles.eventSubtitle,
                  { marginTop: 6, textAlign: "center" },
                ]}
              >
                Tap “Add to Favorites” on an event to see it here.
              </Text>
            </View>
          )}
        </ExpansionPanel>

        <ExpansionPanel title="Interested">
          {interestedEventsLoading && <ActivityIndicator color="#fff" />}

          {interestedEvents && interestedEvents.length > 0 ? (
            interestedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRemovingInterested={(id) =>
                  toggleInterestedEventStatusHandler(id)
                }
              />
            ))
          ) : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No favorite events yet.</Text>
              <Text
                style={[
                  styles.eventSubtitle,
                  { marginTop: 6, textAlign: "center" },
                ]}
              >
                Tap “Add to Favorites” on an event to see it here.
              </Text>
            </View>
          )}
        </ExpansionPanel>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;
