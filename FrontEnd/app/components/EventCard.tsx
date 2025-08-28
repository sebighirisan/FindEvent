import { Event } from "@/model/event.model";
import { Location } from "@/model/location.model";
import {
  DEFAULT_EVENT_TYPE_CONFIG,
  getColorByEventType,
  getIconByEventType,
  IconName,
} from "@/utils/color.util";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"; // 👈 adăugat
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootState } from "@/store";
import formatDate from "@/utils/date.utils";
import { getMapPreview } from "@/utils/location.util";
import { useSelector } from "react-redux";

interface EventCardProps {
  event: Event;
  onPressMap?: (location: Location) => void;
}

const EventCard = ({ event, onPressMap }: EventCardProps) => {
  const [eventTypeColor, setEventTypeColor] = useState("white");
  const [eventTypeIcon, setEventTypeIcon] = useState<IconName>(
    DEFAULT_EVENT_TYPE_CONFIG.icon
  );

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [isGoing, setIsGoing] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const username = useSelector((state: RootState) => state.auth.username);

  useEffect(() => {
    setLatitude(event.location.latitude);
    setLongitude(event.location.longitude);

    setIsInterested(event.interested.some((user) => user === username));
    setIsGoing(event.going.some((user) => user === username));
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

  // 👇 navigare către ecranul de detalii
  const goToDetails = () => {
    router.push({ pathname: "/event/[id]", params: { id: String(event.id) } });
  };

  return (
    <Pressable
      onPress={goToDetails}
      style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }]}
    >
      <View style={styles.card}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalIsVisible}
          onRequestClose={() => setModalIsVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              {Platform.OS === "web" ? (
                <Image
                  style={styles.mapPreviewLocation}
                  source={{ uri: getMapPreview(latitude, longitude) }}
                />
              ) : (
                <></>
                // <Map lat={latitude} lng={longitude} locationName={event.name} />
              )}
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
            <TouchableOpacity>
              <Ionicons
                name={isGoing ? "checkmark-circle" : "checkmark-circle-outline"}
                size={20}
                color="#50C878"
              />
            </TouchableOpacity>
            <TouchableOpacity>
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

          <View style={styles.actionsRow}>
            {/* Butoanele rămân funcționale; apăsarea lor NU va declanșa navigarea cardului */}
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
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 500,
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
    paddingRight: 16,
  },
  publisher: { fontSize: 14, color: "#9CA3AF", marginBottom: 4 },
  typeContainer: { flexDirection: "row", alignItems: "center" },
  type: { fontSize: 15, color: "#999", fontStyle: "italic", marginStart: 5 },
  description: { fontSize: 14, color: "#fff", marginVertical: 12 },
  datesRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  dates: { fontSize: 12, color: "#fff", marginLeft: 4 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
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
