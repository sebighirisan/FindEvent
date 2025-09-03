import { ErrorResponse } from "@/model/error.model";
import { Event } from "@/model/event.model";
import { useFetchTrendingEventsQuery } from "@/store/features/events/event-api";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import EventCard from "../components/EventCard";
import ShowMoreButton from "../components/ShowMoreButton";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../constants/paging.constants";
import styles from "../styles/UITheme";

const Trending = () => {
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const { data, isLoading, error } = useFetchTrendingEventsQuery({
    page,
    size: DEFAULT_PAGE_SIZE,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  useEffect(() => {
    if (error && "data" in error) {
      const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

      setErrorMessage(errorResponse.message);
    }
  }, [error]);

  useEffect(() => {
    if (data?.items?.length) {
      setEvents((prev) => [...prev, ...data?.items]); // append new results
    }
  }, [data]);

  useEffect(() => {
    setIsFilled(data?.metadata?.totalCount === events.length);
  }, [data, events]);

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
        {!isLoading && !!events?.length ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No trending events yet.</Text>
          </View>
        )}
        {!isFilled && (
          <ShowMoreButton
            onPress={() => setPage((prevPage) => prevPage + 1)}
            isLoading={isLoading}
            disabled={isFilled}
            label="Show more"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trending;
