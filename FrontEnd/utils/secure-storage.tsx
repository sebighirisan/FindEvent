import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = "accessToken";

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export const getToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}