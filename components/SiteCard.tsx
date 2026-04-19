import { AdultSite } from '@/constants/adultSites';
import { useHubStore } from '@/store/useHubStore';
import { useRouter } from 'expo-router';
import { Heart, ShieldAlert } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

type Props = {
  site: AdultSite;
};

export default function SiteCard({ site }: Props) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useHubStore();
  const isFavorite = favorites.includes(site.id);

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/webview', params: { siteId: site.id } })}
      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
    >
      <View className="flex-row items-start justify-between">
        <View className="mr-3 flex-1">
          <Text className="text-base font-bold text-zinc-100">{site.name}</Text>
          <Text className="mt-1 text-xs text-zinc-400">{site.url}</Text>
        </View>

        <Pressable
          onPress={() => toggleFavorite(site.id)}
          hitSlop={10}
          className="rounded-full border border-zinc-700 p-2"
        >
          <Heart size={18} color={isFavorite ? '#ef4444' : '#a1a1aa'} fill={isFavorite ? '#ef4444' : 'none'} />
        </Pressable>
      </View>

      <Text className="mt-3 text-sm leading-5 text-zinc-300">{site.description}</Text>

      <View className="mt-3 flex-row items-center">
        <ShieldAlert size={14} color="#f59e0b" />
        <Text className="ml-2 text-[11px] uppercase tracking-widest text-amber-400">18+ only</Text>
      </View>
    </Pressable>
  );
}
