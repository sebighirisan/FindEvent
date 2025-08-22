import { Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../store/index";

function RootLayoutInner() {
  const roles = useSelector((state: RootState) => state.auth.roles);
  const isAdmin = roles.some((role) => role.includes("ADMIN"));
  const exp = useSelector((state: RootState) => state.auth.exp);

  const isLoggedIn = !!exp && exp * 1000 > Date.now();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="index" options={{ title: "Homepage" }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Settings" options={{ title: "Settings" }} />
        <Stack.Screen name="History" options={{ title: "History" }} />
        <Stack.Screen name="CreateEvent" options={{ title: "Create event" }} />
        <Stack.Screen name="Itinerary" options={{ title: "Itinerary" }} />
        <Stack.Screen name="YourEvent" options={{ title: "Your Event" }} />
        <Stack.Screen name="EventPage" options={{ title: "Event Page" }} />

        <Stack.Protected guard={isAdmin}>
          <Stack.Screen
            name="admin/DashboardAdmin"
            options={{ title: "Dashboard Admin" }}
          />
          <Stack.Screen
            name="admin/AdminVerifyEvent"
            options={{ title: "Verify Event" }}
          />
        </Stack.Protected>
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="Login" options={{ title: "Login" }} />
        <Stack.Screen name="SignUp" options={{ title: "SignUp" }} />
        <Stack.Screen name="Terms" options={{ title: "Terms & Policies" }} />
        <Stack.Screen
          name="ForgetPassword"
          options={{ title: "ForgetPassword" }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutInner />
    </Provider>
  );
}
