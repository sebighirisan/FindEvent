import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homepagestyle from './homepagestyle/homepage.style';

const categories = ['Party', 'HouseParty', 'Clubs', 'Tour Guides', 'Outdoors'];
const locations = ['Cluj-Napoca', 'Club Midi', 'Apuseni Mountains', 'Central Park', 'Vineyard Hill', 'Downtown', 'Art Café', 'Tech Hub'];

const featuredEvents = [
  { id: '1', title: 'Sunset Beach Party', location: 'Cluj-Napoca' },
  { id: '2', title: 'Techno Night', location: 'Club Midi' },
  { id: '3', title: 'Nature Hike', location: 'Apuseni Mountains' },
];

const moreEvents = [
  { id: '4', title: 'Outdoor Yoga', location: 'Central Park', category: 'Outdoors' },
  { id: '5', title: 'Wine Tasting', location: 'Vineyard Hill', category: 'Party' },
  { id: '6', title: 'Food Truck Fiesta', location: 'Downtown', category: 'Party' },
  { id: '7', title: 'Jazz Night', location: 'Art Café', category: 'Clubs' },
  { id: '8', title: 'Coding Meetup', location: 'Tech Hub', category: 'Tour Guides' },
  { id: '9', title: 'Coding Meetup 2', location: 'Tech Hub', category: 'Tour Guides' },
  { id: '10', title: 'Visit Klausenbrger', location: 'Cluj-Napoca', category: 'Tour Guides' },
];

const Dashboard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    if (!dropdownVisible) setLocationDropdownVisible(false);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownVisible(!locationDropdownVisible);
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

  const filteredMoreEvents = moreEvents.filter((event) => {
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    const matchesLocation = selectedLocation ? event.location === selectedLocation : true;
    return matchesCategory && matchesLocation;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#001f3f' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={homepagestyle.header}>
          <Text style={homepagestyle.title}>
            Welcome to <Text style={{ color: '#f7f8f8ff' }}>FindEVENT</Text>
          </Text>

          <TextInput
            style={homepagestyle.searchBar}
            placeholder="Search your event"
            placeholderTextColor="black"
          />

          {/* Filter Row */}
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            {/* Category Button */}
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={{
                  backgroundColor: '#274472',
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {selectedCategory || 'Category'}
                </Text>
              </TouchableOpacity>

              {dropdownVisible && (
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    paddingVertical: 10,
                    width: 160,
                    elevation: 5,
                    position: 'absolute',
                    top: 50,
                    zIndex: 2,
                  }}
                >
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => selectCategory(category)}
                      style={{ paddingVertical: 10, paddingHorizontal: 15 }}
                    >
                      <Text style={{ fontSize: 16 }}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Location Button */}
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={toggleLocationDropdown}
                style={{
                  backgroundColor: '#274472',
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {selectedLocation || 'Location'}
                </Text>
              </TouchableOpacity>

              {locationDropdownVisible && (
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    paddingVertical: 10,
                    width: 160,
                    elevation: 5,
                    position: 'absolute',
                    top: 50,
                    zIndex: 2,
                  }}
                >
                  {locations.map((loc) => (
                    <TouchableOpacity
                      key={loc}
                      onPress={() => selectLocation(loc)}
                      style={{ paddingVertical: 10, paddingHorizontal: 15 }}
                    >
                      <Text style={{ fontSize: 16 }}>{loc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={resetFilters}
              style={{
                backgroundColor: '#132743',
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 6,
                height: 40,
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#cce3f0', fontWeight: '600', fontSize: 12 }}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Events */}
        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 16, marginTop: 30 }}>
          Featured Events
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 15, paddingLeft: 16 }}
        >
          {featuredEvents.map((event) => (
            <View
              key={event.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 15,
                marginRight: 16,
                width: 160,
                height: 90,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#001f3f' }}>
                  {event.title}
                </Text>
                <Text style={{ color: '#6b7280' }}>{event.location}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* More Events */}
        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 16, marginTop: 30 }}>
          More Events
        </Text>

        <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
          {filteredMoreEvents.map((event) => (
            <View
              key={event.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 12,
                marginBottom: 15,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#001f3f' }}>
                {event.title}
              </Text>
              <Text style={{ color: '#6b7280' }}>{event.location}</Text>
            </View>
          ))}
          {filteredMoreEvents.length === 0 && (
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
              No events found for selected filters.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
