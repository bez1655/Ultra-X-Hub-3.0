import { ADULT_SITES } from '@/constants/adultSites';
import { useLocalSearchParams } from 'expo-router';
import { AlertTriangle } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function getAiDescription(siteName: string) {
  return `Grok AI style note: ${siteName} is presented as a high-intensity, adults-only destination with bold branding, fast updates, and a heavy focus on trending clips. Open responsibly, respect local laws, and keep your privacy settings enabled.`;
}

export default function WebviewScreen() {
  const params = useLocalSearchParams<{ siteId?: string }>();
  const site = ADULT_SITES.find((item) => item.id === params.siteId);

  if (!site) {
    return (
      <View className="flex-1 items-center justify-center bg-[#050505] px-6">
        <AlertTriangle color="#ef4444" size={32} />
        <Text className="mt-3 text-lg font-semibold text-zinc-200">Site not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <View className="border-b border-zinc-800 bg-zinc-950 px-4 py-3">
        <Text className="text-sm font-bold uppercase tracking-widest text-rose-500">AI Description</Text>
        <Text className="mt-1 text-xs leading-5 text-zinc-300">{getAiDescription(site.name)}</Text>
      </View>

      <WebView
        source={{ uri: site.url }}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
      />
    </View>
  );
}
