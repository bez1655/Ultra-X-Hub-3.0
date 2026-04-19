import { Tabs } from 'expo-router';
import { Heart, House } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#090909' },
        headerTintColor: '#fafafa',
        headerTitleStyle: { fontWeight: '700' },
        sceneStyle: { backgroundColor: '#050505' },
        tabBarStyle: {
          backgroundColor: '#0B0B0B',
          borderTopColor: '#1f1f1f',
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#ef4444',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Hub',
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
