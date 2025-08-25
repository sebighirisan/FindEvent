import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export type EventTypeConfig = {
  color: string;
  icon: IconName;
};

// Centralized mapping of event types → color + icon
const EVENT_TYPE_MAP: Record<string, EventTypeConfig> = {
  // Music-related
  "Outdoor Concert": { color: "#A8E6CF", icon: "musical-notes-outline" },
  "Local Concert": { color: "#A8E6CF", icon: "musical-notes-outline" },
  "Music Festival": { color: "#A8E6CF", icon: "musical-notes-outline" },
  "Orchestra Performance": { color: "#A8E6CF", icon: "musical-notes-outline" },

  // Sport & Fitness
  Marathon: { color: "#FFF3B0", icon: "barbell-outline" },
  Race: { color: "#FFF3B0", icon: "barbell-outline" },
  Tournament: { color: "#FFF3B0", icon: "barbell-outline" },

  // Arts
  "Theater Performance": { color: "#C9CBEF", icon: "color-palette-outline" },
  "Song Contest": { color: "#C9CBEF", icon: "color-palette-outline" },
  "Street Performance": { color: "#C9CBEF", icon: "color-palette-outline" },
  "Film Screening": { color: "#C9CBEF", icon: "color-palette-outline" },
  "Art Expo": { color: "#C9CBEF", icon: "color-palette-outline" },

  // Food & Drink
  "Food Truck Festival": { color: "#E1E8F0", icon: "wine-outline" },
  "Cooking Competition": { color: "#E1E8F0", icon: "wine-outline" },
  "Gala Dinner": { color: "#E1E8F0", icon: "wine-outline" },

  // Education
  Conference: { color: "#B5E2FA", icon: "school-outline" },
  "Networking Event": { color: "#B5E2FA", icon: "school-outline" },
  Workshop: { color: "#B5E2FA", icon: "school-outline" },
  Hackathon: { color: "#B5E2FA", icon: "school-outline" },
  "Training Seminar": { color: "#B5E2FA", icon: "school-outline" },

  // Charity
  Fundraiser: { color: "#F7C6D9", icon: "heart-outline" },
  Auction: { color: "#F7C6D9", icon: "heart-outline" },
  Volunteering: { color: "#F7C6D9", icon: "heart-outline" },

  // Activism
  Protest: { color: "#D6F5E3", icon: "megaphone-outline" },
  "Awareness Movement": { color: "#D6F5E3", icon: "megaphone-outline" },
  "Public Gathering": { color: "#D6F5E3", icon: "megaphone-outline" },
};

export const DEFAULT_EVENT_TYPE_CONFIG: EventTypeConfig = {
  color: "#FFD6A5",
  icon: "sparkles-outline",
};

// Utility functions
export const getColorByEventType = (eventType: string): string =>
  EVENT_TYPE_MAP[eventType]?.color ?? DEFAULT_EVENT_TYPE_CONFIG.color;

export const getIconByEventType = (eventType: string): IconName =>
  EVENT_TYPE_MAP[eventType]?.icon ?? DEFAULT_EVENT_TYPE_CONFIG.icon;
