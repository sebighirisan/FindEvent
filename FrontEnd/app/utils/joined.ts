 import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FIND_EVENT_JOINED_V1";

export type JoinedEvent = {
  id: string;
  title: string;
  location?: string;
  category?: string;
  startAt?: string;     // ISO
  price?: string;
  description?: string;
  joinedAt?: string;    // ISO when user joined
};

export async function getJoinedEvents(): Promise<JoinedEvent[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveJoinedEvents(list: JoinedEvent[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function addJoinedEvent(item: JoinedEvent) {
  const list = await getJoinedEvents();
  const idx = list.findIndex((x) => x.id === item.id);
  const withTimestamp = { ...item, joinedAt: item.joinedAt ?? new Date().toISOString() };
  if (idx === -1) {
    list.push(withTimestamp);
  } else {
    list[idx] = { ...list[idx], ...withTimestamp };
  }
  await saveJoinedEvents(list);
}

export async function removeJoinedEvent(id: string) {
  const list = await getJoinedEvents();
  const next = list.filter((x) => x.id !== id);
  await saveJoinedEvents(next);
}

export async function clearJoinedEvents() {
  await AsyncStorage.removeItem(KEY);
}
