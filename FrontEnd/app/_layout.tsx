import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/index";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="SignUp" options={{ title: "SignUp" }} />
        <Stack.Screen name="Homepage" options={{ title: "HomePage" }} />
        <Stack.Screen name="Terms" options={{ title: "Terms & Policies" }} />
        <Stack.Screen name="Settings" options={{ title: "Settings" }} />
        <Stack.Screen name="History" options={{ title: "History" }} />
        <Stack.Screen name="CreateEvent" options={{ title: "CreateEvent" }} />
        <Stack.Screen name="Itinerary" options={{ title: "Itinerary" }} />
        <Stack.Screen
          name="ForgetPassword"
          options={{ title: "ForgetPassword" }}
        />
        <Stack.Screen name="YourEvent" options={{ title: "YourEvent" }} />
        <Stack.Screen name="AdminLogin" options={{ title: "AdminLogin" }} />
        <Stack.Screen
          name="DashboardAdmin"
          options={{ title: "DashboardAdmin" }}
        />
        <Stack.Screen
          name="AdminVerifyEvent"
          options={{ title: "AdminVerifyEvent" }}
        />
      </Stack>
    </Provider>
  );
}
