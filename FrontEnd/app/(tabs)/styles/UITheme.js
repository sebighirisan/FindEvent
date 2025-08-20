// /styles/UITheme.js
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const appStyles = StyleSheet.create({
  /** Global containers */
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
    backgroundColor: "#101820",
  },
  container2: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#101820",
  },

  /** Headings */
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#e1e2e1",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
    color: "white",
  },
  subheading: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 6,
    color: "white",
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "white",
  },

  /** Header */
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },

  /** Form */
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e1e2e1",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#e1e2e1",
    textAlign: "center",
    letterSpacing: 0.15,
  },

  /** Inputs (light) */
  input: { marginBottom: 16 },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#E5EFFF",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#e1e2e1",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    borderWidth: 1,
    borderColor: "#e1e2e1",
    borderStyle: "solid",
  },

  /** Inputs (dark, matching event list cards) */
  inputDark: {
    backgroundColor: "#182333",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#263241",
  },

  /** Buttons */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#e1e2e1",
    borderColor: "#222",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    
  },
  btnSave: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  paddingVertical: 14,
  paddingHorizontal: 24,
  backgroundColor: "#182333",
  borderWidth: 1,
  borderColor: "#263241",
  color: "#f8f9f9ff",
  },

  btnSaveText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#FFFFFF", // White text for Save button
},

  /** Dashboard (dark) */
  rootDark: { flex: 1, backgroundColor: "#101820" },
  fixedHeaderWrap: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#263241",
    backgroundColor: "#101820",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
    zIndex: 10,
  },
  headerDark: { paddingTop: 8, paddingBottom: 8 },
  titleDark: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f7f8f8ff",
    textAlign: "center",
  },
  searchBarDark: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#e5e7eb",
    borderWidth: 1,
    borderColor: "#263241",
    marginHorizontal: 16,
    marginTop: 16,
    height: 48,
  },
  filterRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 8,
  },
  chipButton: {
    backgroundColor: "#101820",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#263241",
  },
  chipText: { color: "#fff", fontWeight: "bold" },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    width: 160,
    elevation: 5,
    position: "absolute",
    top: 50,
    zIndex: 2,
  },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 15 },
  dropdownItemText: { fontSize: 16, color: "#111827" },

  /** Search bar (light) */
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "black",
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 20,
    marginTop: 20,
    height: 48,
    justifyContent: "center",
    width: "90%",
  },

  /** Menu */
  menu: { marginTop: 10 },
  menuItem: {
    backgroundColor: "#101820",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  menuText: { fontSize: 16, fontWeight: "500", color: "#fff" },
  icon: { width: 20, height: 20, marginRight: 10 },

  /** Event Cards (generic) */
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  cardSubtitle: { color: "#CBD5E1", fontSize: 14, marginTop: 4 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#64748B",
    backgroundColor: "rgba(100,116,139,0.18)",
    marginBottom: 8,
  },
  badgeText: {
    color: "#E5E7EB",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  /** Scrollable body */
  scrollBody: { paddingBottom: 40 },

  /** Section labels (small, tidy) */
  sectionLabelWrap: { paddingHorizontal: 16, marginTop: 14, marginBottom: 6 },
  sectionLabelText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    opacity: 0.85,
  },

  /** Featured row + cards */
  featuredRowContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  featuredCard: {
    width: Math.round(width * 0.82),
    minHeight: 118,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    justifyContent: "space-between",
  },
  featuredBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#64748B",
    backgroundColor: "rgba(100,116,139,0.18)",
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: "#E5E7EB",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  featuredSubtitle: { color: "#CBD5E1", fontSize: 14, marginTop: 4 },

  /** More events list */
  listWrap: { paddingHorizontal: 16, paddingTop: 12 },
  eventCard: {
    backgroundColor: "#182333",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#263241",
    marginBottom: 10,
  },
  // --- Add below your existing appStyles keys ---

  /** EventPage – chips */
  eventChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
    marginBottom: 18,
  },
  eventChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#1F2A3A",
    borderWidth: 1,
    borderColor: "#334155",
  },
  eventChipText: {
    color: "#E5E7EB",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  eventChipMuted: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#101820",
    borderWidth: 1,
    borderColor: "#2A3749",
  },
  eventChipMutedText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
  },

  /** EventPage – content cards (reuse generic card/cardTitle if you like) */
  eventPanel: {
    backgroundColor: "#182333",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#263241",
    marginTop: 12,
  },
  eventPanelTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  /** EventPage – details rows */
  eventDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#223044",
    marginTop: 6,
  },
  eventDetailRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginTop: 6,
  },
  eventDetailLabel: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  eventDetailValue: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },

  /** EventPage – actions */
  eventActionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 12,
  },
  eventPrimaryBtn: {
    flex: 1,
    backgroundColor: "#182333",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#263241",
  },
  eventPrimaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  eventSecondaryBtn: {
    flex: 1,
    backgroundColor: "#101820",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#263241",
  },
  eventSecondaryBtnText: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "700",
  },
  eventOutlineFullBtn: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  eventOutlineFullBtnText: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "700",
  },

  
  eventTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 4 },
  eventSubtitle: { color: "#9CA3AF" },
  emptyWrap: { padding: 24, alignItems: "center" },
  emptyText: { color: "#9CA3AF" },
});

export default appStyles;        // default import
export const styles = appStyles; // named import (compat)
