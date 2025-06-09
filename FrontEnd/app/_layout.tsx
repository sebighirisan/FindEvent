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
    </Stack>
  );
}