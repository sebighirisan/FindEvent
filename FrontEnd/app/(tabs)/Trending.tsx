import { ErrorResponse } from "@/model/error.model";
import { RootState } from "@/store";
import { useFetchTrendingEventsQuery } from "@/store/features/events/event-api";
import { setTrendingEvents } from "@/store/features/events/event-slice";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import styles from "../styles/UITheme";

const Trending = () => {
  const { data, isLoading, error } = useFetchTrendingEventsQuery();

  const trendingEvents = useSelector((state: RootState) => state.events.trendingEvents);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error && "data" in error) {
      const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

      setErrorMessage(errorResponse.message);
    }
  }, [error]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setTrendingEvents(data));
    }
  }, [data, dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#101820" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Trending Events</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          ...styles.scrollBody,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {!!errorMessage && (
          <View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )}
        {isLoading && <ActivityIndicator color="#fff" />}
        {!!trendingEvents?.length ? (
          trendingEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No trending events yet.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trending;
