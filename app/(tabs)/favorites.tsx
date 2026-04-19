import SiteCard from '@/components/SiteCard';
import { ADULT_SITES } from '@/constants/adultSites';
import { useHubStore } from '@/store/useHubStore';
import { FlatList, Text, View } from 'react-native';

export default function FavoritesScreen() {
  const { favorites } = useHubStore();

  const favoriteSites = ADULT_SITES.filter((site) => favorites.includes(site.id));

  return (
    <View className="flex-1 bg-[#050505] px-4 pt-4">
      <Text className="mb-3 text-xs uppercase tracking-[2px] text-zinc-500">favorite collection</Text>

      <FlatList
        data={favoriteSites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SiteCard site={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-zinc-400">No favorites yet. Add from the Hub tab.</Text>
          </View>
        }
      />
    </View>
  );
}
