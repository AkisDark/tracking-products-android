import { Stack } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import statement
import { useRouter } from 'expo-router';


export default function Layout() {
  const router = useRouter();
  useEffect(() => {
    const getStoredUrl = async () => {
      try {
        const storedUrl = await AsyncStorage.getItem('userUrl');


        if (!storedUrl) {
          router.replace('/')
        }
      } catch (error) {
        console.error('Error retrieving URL from local storage:', error);
      }
    };
    getStoredUrl();
  }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="adddetails" />
      <Stack.Screen name="[user]" />
      <Stack.Screen name="WholeSelle" />
    </Stack>
  );
}
