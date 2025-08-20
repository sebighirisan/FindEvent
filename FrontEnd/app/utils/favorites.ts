 // utils/favorites.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FIND_EVENT_FAVORITES_V1";

export type FavoriteEvent = {
  id: string;
  title: string;
  location?: string;
  category?: string;
  startAt?: string;   // ISO date-time if you have it
  price?: string;
  description?: string;
};

export async function getFavorites(): Promise<FavoriteEvent[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveFavorites(list: FavoriteEvent[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function addFavorite(ev: FavoriteEvent) {
  const list = await getFavorites();
  const idx = list.findIndex((x) => x.id === ev.id);
  if (idx === -1) {
    list.push(ev);
    await saveFavorites(list);
  } else {
    // optional: update existing
    list[idx] = { ...list[idx], ...ev };
    await saveFavorites(list);
  }
}

export async function removeFavorite(id: string) {
  const list = await getFavorites();
  const next = list.filter((x) => x.id !== id);
  await saveFavorites(next);
}

export async function clearFavorites() {
  await AsyncStorage.removeItem(KEY);
}
