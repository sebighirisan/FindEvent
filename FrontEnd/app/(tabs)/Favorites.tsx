import { AttendanceStatusEnum } from "@/model/event.model";
import { RootState } from "@/store";
import { useFetchPersonalizedEventsQuery } from "@/store/features/events/event-api";
import {
  setUserGoingEvents,
  setUserInterestedEvents,
} from "@/store/features/events/event-slice";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import ExpansionPanel from "../components/ExpansionPanel";
import styles from "../styles/UITheme";

const Favorites = () => {
  const dispatch = useDispatch();

  const interestedEvents = useSelector(
    (state: RootState) => state.events.userInterestedEvents
  );
  const goingEvents = useSelector(
    (state: RootState) => state.events.userGoingEvents
  );

  /* Interested Events */
  const {
    data: interestedEventsData,
    isLoading: interestedEventsLoading,
    error: interestedEventsError,
  } = useFetchPersonalizedEventsQuery({
    attendanceStatus: AttendanceStatusEnum.INTERESTED,
  });

  useEffect(() => {
    if (interestedEventsData) {
      dispatch(setUserInterestedEvents(interestedEventsData));
    }
  }, [interestedEventsData, dispatch]);

  /* Going Events */
  const {
    data: goingEventsData,
    isLoading: goingEventsLoading,
    error: goingEventsError,
  } = useFetchPersonalizedEventsQuery({
    attendanceStatus: AttendanceStatusEnum.GOING,
  });

  useEffect(() => {
    if (goingEventsData) {
      dispatch(setUserGoingEvents(goingEventsData));
    }
  }, [goingEventsData, dispatch]);

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
              />
            ))
          ) : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No attending events yet.</Text>
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
