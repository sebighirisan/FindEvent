// app/(tabs)/Dashboard.tsx
import { ErrorResponse } from "@/model/error.model";
import { RootState } from "@/store";
import { useFetchUpcomingEventsQuery } from "@/store/features/events/event-api";
import { setUpcomingEvents } from "@/store/features/events/event-slice";
import {
  Accuracy,
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import styles from "../styles/UITheme";

const Dashboard = () => {
  const [eventName, setEventName] = useState<string>();

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>();

  const events = useSelector((state: RootState) => state.events.upcomingEvents);

  const {
    data: upcomingEvents,
    error,
    isLoading,
  } = useFetchUpcomingEventsQuery();

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const [proximity, setProximity] = useState<number>();

  useEffect(() => {
    if (upcomingEvents) {
      dispatch(setUpcomingEvents(upcomingEvents));
    }
  }, [upcomingEvents, dispatch]);

  useEffect(() => {
    if (error && "data" in error) {
      const errorResponse = JSON.parse(error.data as string) as ErrorResponse;

      setErrorMessage(errorResponse.message);
    }
  }, [error]);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = useCallback(async () => {
    if (
      locationPermissionInformation &&
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (
      locationPermissionInformation &&
      locationPermissionInformation.status === PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }, [locationPermissionInformation, requestPermission]);

  const getUserLocation = useCallback(async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: Accuracy.Highest,
    });

    setUserLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }, [verifyPermissions]);

  useEffect(() => {
    if (!!locationPermissionInformation) {
      getUserLocation();
    }
  }, [getUserLocation, locationPermissionInformation]);

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

          {userLocation?.lat && userLocation.lng && (
            <TextInput
              style={styles.searchBarDark}
              keyboardType="numeric"
              onChangeText={(newProximity) => {
                setProximity(Number(newProximity));
              }}
              placeholder="Proximity"
              placeholderTextColor="#94a3b8"
            ></TextInput>
          )}
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

        {!!events?.length ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginTop: 12,
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
