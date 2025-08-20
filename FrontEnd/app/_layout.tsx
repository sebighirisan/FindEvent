import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title : "Login",headerShown:false}} />
      <Stack.Screen name="SignUp" options={{ title : "SignUp",headerShown:false}} />
      <Stack.Screen name="Homepage" options={{title: "HomePage",headerShown:false}} />
      <Stack.Screen name="Terms" options={{ title: "Terms & Policies", headerShown:false }} />
      <Stack.Screen name="Settings" options={{ title: "Settings", headerShown:false }} />
      <Stack.Screen name="LogOut" options={{ title: "Log Out" , headerShown:false}} />
      <Stack.Screen name="History" options={{ title: "History", headerShown:false }} />
      <Stack.Screen name="CreateEvent" options={{ title: "CreateEvent", headerShown:false }} />
      <Stack.Screen name="Itinerary" options={{ title: "Itinerary", headerShown:false }} />
      <Stack.Screen name="ForgetPassword" options={{ title: "ForgetPassword", headerShown:false }} />
      <Stack.Screen name="YourEvent" options={{ title: "YourEvent", headerShown:false }} />
      <Stack.Screen name="AdminLogin" options={{ title: "AdminLogin", headerShown:false }} />
      <Stack.Screen name="DashboardAdmin" options={{ title: "DashboardAdmin", headerShown:false }} />
      <Stack.Screen name="AdminVerifyEvent" options={{ title: "AdminVerifyEvent", headerShown:false }} />
      
    </Stack>
  );
}