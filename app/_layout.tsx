import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "Home"
          }}
        />
        
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
            title: "Movie Details"
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
