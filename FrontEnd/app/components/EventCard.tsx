import { AttendanceStatusEnum, Event } from "@/model/event.model";
import { RootState } from "@/store";
import {
  useDeleteAttendanceStatusMutation,
  useUpdateAttendanceStatusMutation,
} from "@/store/features/events/event-api";
import {
  addGoingEvent,
  addInterestedEvent,
  removeGoingEvent,
  removeInterestedEvent,
} from "@/store/features/events/event-slice";
import {
  DEFAULT_EVENT_TYPE_CONFIG,
  getColorByEventType,
  getIconByEventType,
  IconName,
} from "@/utils/color.util";
import formatDate from "@/utils/date.utils";
import { getMapPreview } from "@/utils/location.util";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"; // 👈 adăugat
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [eventTypeColor, setEventTypeColor] = useState("white");
  const [eventTypeIcon, setEventTypeIcon] = useState<IconName>(
    DEFAULT_EVENT_TYPE_CONFIG.icon
  );

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [isGoing, setIsGoing] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const [attendees, setAttendees] = useState<string[]>([]);
  const [interested, setInterested] = useState<string[]>([]);

  const [deleteAttendanceStatus] = useDeleteAttendanceStatusMutation();
  const [updateAttendanceStatus] = useUpdateAttendanceStatusMutation();

  const username = useSelector((state: RootState) => state.auth.username)!;

  useEffect(() => {
    setLatitude(event.location.latitude);
    setLongitude(event.location.longitude);

    setIsInterested(event.interested.some((user) => user === username));
    setIsGoing(event.going.some((user) => user === username));

    setAttendees(event.going);
    setInterested(event.interested);
  }, [event, username]);

  useEffect(() => {
    setEventTypeColor(getColorByEventType(event.type));
    setEventTypeIcon(getIconByEventType(event.type));
  }, [event]);

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Cannot open this URL: ${url}`);
    }
  };

  const goToDetails = () => {
    router.push({ pathname: "/event/[id]", params: { id: String(event.id) } });
  };

  const dispatch = useDispatch();

  const onAttendingButtonPressed = useCallback(async () => {
    try {
      if (isGoing) {
        await deleteAttendanceStatus({
          id: event.id,
        });

        dispatch(removeGoingEvent({ event, username }));
      } else {
        await updateAttendanceStatus({
          id: event.id,
          attendanceStatus: AttendanceStatusEnum.GOING,
        });

        dispatch(addGoingEvent({ event, username }));
      }
    } catch (err) {
      console.log(err);

      Alert.alert("Error", `Updating the status failed`);
    }
  }, [
    deleteAttendanceStatus,
    updateAttendanceStatus,
    isGoing,
    username,
    dispatch,
    event,
  ]);

  const onInterestedButtonPressed = useCallback(async () => {
    try {
      if (isInterested) {
        await deleteAttendanceStatus({
          id: event.id,
        });

        dispatch(removeInterestedEvent({ event, username }));
      } else {
        await updateAttendanceStatus({
          id: event.id,
          attendanceStatus: AttendanceStatusEnum.INTERESTED,
        });

        dispatch(addInterestedEvent({ event, username }));
      }
    } catch (err) {
      console.log(err);

      Alert.alert("Error", "Updating the status failed");
    }
  }, [
    deleteAttendanceStatus,
    updateAttendanceStatus,
    event,
    isInterested,
    username,
    dispatch
  ]);

  return (
    <View style={styles.card}>
      <Pressable
        onPress={goToDetails}
        style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1, flex: 1 }]}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalIsVisible}
          onRequestClose={() => setModalIsVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <Image
                style={styles.mapPreviewLocation}
                source={{ uri: getMapPreview(latitude, longitude) }}
              />
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{ ...styles.mapButton, backgroundColor: "red" }}
                  onPress={() => setModalIsVisible(false)}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.mapButtonText}>Hide Map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.content}>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={onAttendingButtonPressed}>
              <Ionicons
                name={isGoing ? "checkmark-circle" : "checkmark-circle-outline"}
                size={20}
                color="#50C878"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onInterestedButtonPressed}>
              <Ionicons
                name={isInterested ? "heart" : "heart-outline"}
                size={20}
                color="#EE4B2B"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.publisher}>By {event.publisher.username}</Text>

          <View style={styles.typeContainer}>
            <Ionicons name={eventTypeIcon} size={20} color={eventTypeColor} />
            <Text style={{ ...styles.type, color: eventTypeColor }}>
              {event.type}
            </Text>
          </View>

          <Text numberOfLines={3} style={styles.description}>
            {event.description}
          </Text>

          <View style={styles.datesRow}>
            <Ionicons name="time-outline" size={16} color="#fff" />
            <Text style={styles.dates}>
              {formatDate(event.startDate)}
              {event.endDate ? ` - ${formatDate(event.endDate)}` : ""}
            </Text>
          </View>

          <View style={[styles.stats, { gap: 2 }]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="checkmark-circle" size={16} color="#50C878" />
              <Text
                style={{
                  fontSize: 12,
                  color: "#50C878",
                  fontWeight: "bold",
                  paddingStart: 4,
                }}
              >
                {attendees.length
                  ? `Attending: ${attendees.length} user${
                      attendees.length === 1 ? "" : "s"
                    }`
                  : "No attendees"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="heart" size={16} color="#EE4B2B" />
              <Text
                style={{
                  fontSize: 12,
                  color: "#EE4B2B",
                  fontWeight: "bold",
                  paddingStart: 4,
                }}
              >
                {interested.length
                  ? `Interested: ${interested.length} user${
                      interested.length === 1 ? "" : "s"
                    }`
                  : "No one is interested"}
              </Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => setModalIsVisible(true)}
            >
              <Ionicons name="map-outline" size={16} color="#fff" />
              <Text style={styles.mapButtonText}>Show on Map</Text>
            </TouchableOpacity>

            {event.hyperlink && (
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => openLink(event.hyperlink!)}
              >
                <Ionicons name="link-outline" size={16} color="#fff" />
                <Text style={styles.linkButtonText}>Open Link</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 500,
    maxWidth: "90%",
    backgroundColor: "#182333",
    borderWidth: 1,
    borderColor: "#263241",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: { flex: 1, padding: 16 },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
    paddingRight: 48,
  },
  publisher: { fontSize: 14, color: "#9CA3AF", marginBottom: 4 },
  typeContainer: { flexDirection: "row", alignItems: "center" },
  type: { fontSize: 15, color: "#999", fontStyle: "italic", marginStart: 5 },
  description: { fontSize: 14, color: "#fff", marginVertical: 12 },
  datesRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  stats: {
    marginBottom: 8,
  },
  dates: { fontSize: 12, color: "#fff", marginLeft: 4 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E88E5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  mapButtonText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#43A047",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  linkButtonText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  headerActions: {
    flexDirection: "row",
    gap: 8,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2000,
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 500,
    maxWidth: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  mapPreviewLocation: {
    height: 300,
    width: "100%",
    borderRadius: 4,
    marginBottom: 12,
  },
});

export default EventCard;
