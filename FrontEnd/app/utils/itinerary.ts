 // utils/itinerary.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FIND_EVENT_ITINERARY_V1";

export type ItineraryItem = {
  id: string;
  title: string;
  location?: string;
  category?: string;
  startAt?: string;   // ISO date-time
  price?: string;
  description?: string;
  // you can add fields like notes?: string, status?: "joined" | "interested", etc.
};

export async function getItinerary(): Promise<ItineraryItem[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveItinerary(list: ItineraryItem[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function addToItinerary(item: ItineraryItem) {
  const list = await getItinerary();
  const idx = list.findIndex((x) => x.id === item.id);
  if (idx === -1) {
    list.push(item);
  } else {
    // optional: merge update
    list[idx] = { ...list[idx], ...item };
  }
  await saveItinerary(list);
}

export async function removeFromItinerary(id: string) {
  const list = await getItinerary();
  const next = list.filter((x) => x.id !== id);
  await saveItinerary(next);
}

export async function clearItinerary() {
  await AsyncStorage.removeItem(KEY);
}
