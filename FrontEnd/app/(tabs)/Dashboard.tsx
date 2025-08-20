// app/(tabs)/Dashboard.tsx
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles/UITheme";

const categories = ["Party", "HouseParty", "Clubs", "Tour Guides", "Outdoors"];
const locations = [
  "Cluj-Napoca",
  "Club Midi",
  "Apuseni Mountains",
  "Central Park",
  "Vineyard Hill",
  "Downtown",
  "Art Café",
  "Tech Hub",
];

const featuredEvents = [
  { id: "1", title: "Sunset Beach Party", location: "Cluj-Napoca" },
  { id: "2", title: "Techno Night", location: "Club Midi" },
  { id: "3", title: "Nature Hike", location: "Apuseni Mountains" },
];

const moreEvents = [
  { id: "4", title: "Outdoor Yoga", location: "Central Park", category: "Outdoors" },
  { id: "5", title: "Wine Tasting", location: "Vineyard Hill", category: "Party" },
  { id: "6", title: "Food Truck Fiesta", location: "Downtown", category: "Party" },
  { id: "7", title: "Jazz Night", location: "Art Café", category: "Clubs" },
  { id: "8", title: "Coding Meetup", location: "Tech Hub", category: "Tour Guides" },
  { id: "9", title: "Coding Meetup 2", location: "Tech Hub", category: "Tour Guides" },
  { id: "10", title: "Visit Klausenbrger", location: "Cluj-Napoca", category: "Tour Guides" },
];

const Dashboard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const toggleDropdown = () => {
    setDropdownVisible((v) => !v);
    if (!dropdownVisible) setLocationDropdownVisible(false);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownVisible((v) => !v);
    if (!locationDropdownVisible) setDropdownVisible(false);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const selectLocation = (location: string) => {
    setSelectedLocation(location);
    setLocationDropdownVisible(false);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedLocation(null);
  };

  const filteredMoreEvents = useMemo(() => {
    return moreEvents.filter((event) => {
      const byCat = selectedCategory ? event.category === selectedCategory : true;
      const byLoc = selectedLocation ? event.location === selectedLocation : true;
      return byCat && byLoc;
    });
  }, [selectedCategory, selectedLocation]);

  // Navigate to /EventPage with params
  const goToEvent = (item: { id: string; title: string; location: string }) => {
    router.push({
      pathname: "/EventPage", // since EventPage.tsx is in (tabs)
      params: {
        id: item.id,
        title: item.title,
        location: item.location,
      },
    });
  };

  return (
    <SafeAreaView style={styles.rootDark}>
      {/* Fixed header, consistent on all pages */}
      <View style={styles.fixedHeaderWrap}>
        <View style={styles.headerDark}>
          <Text style={styles.titleDark}>
            Welcome to <Text style={{ color: "#f7f8f8ff" }}>FindEVENT</Text>
          </Text>

          <TextInput
            style={styles.searchBarDark}
            placeholder="Search your event"
            placeholderTextColor="#94a3b8"
          />

          {/* Filters */}
          <View style={styles.filterRow}>
            {/* Category */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={toggleDropdown} style={styles.chipButton}>
                <Text style={styles.chipText}>{selectedCategory || "Category"}</Text>
              </TouchableOpacity>

              {dropdownVisible && (
                <View style={styles.dropdown}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => selectCategory(category)}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Location */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={toggleLocationDropdown} style={styles.chipButton}>
                <Text style={styles.chipText}>{selectedLocation || "Location"}</Text>
              </TouchableOpacity>

              {locationDropdownVisible && (
                <View style={styles.dropdown}>
                  {locations.map((loc) => (
                    <TouchableOpacity
                      key={loc}
                      onPress={() => selectLocation(loc)}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>{loc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Reset */}
            <TouchableOpacity onPress={resetFilters} style={styles.chipButton}>
              <Text style={{ color: "#cce3f0", fontWeight: "600", fontSize: 12 }}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Scrollable content only */}
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {/* Featured */}
        <View style={styles.sectionLabelWrap}>
          <Text style={styles.sectionLabelText}>Featured Events</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredRowContainer}
        >
          {featuredEvents.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.featuredCard}
              onPress={() => goToEvent(item)}
              activeOpacity={0.85}
            >
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>Featured</Text>
              </View>

              <View>
                <Text style={styles.featuredTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.featuredSubtitle} numberOfLines={1}>
                  {item.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* More */}
        <View style={styles.sectionLabelWrap}>
          <Text style={styles.sectionLabelText}>More Events</Text>
        </View>

        <View style={styles.listWrap}>
          {filteredMoreEvents.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.eventCard}
              onPress={() => goToEvent(item)}
              activeOpacity={0.85}
            >
              <Text style={styles.eventTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.eventSubtitle}>{item.location}</Text>
            </TouchableOpacity>
          ))}

          {filteredMoreEvents.length === 0 && (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No events found.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
