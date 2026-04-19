import SiteCard from '@/components/SiteCard';
import { ADULT_SITES } from '@/constants/adultSites';
import { useHubStore } from '@/store/useHubStore';
import { Search } from 'lucide-react-native';
import { useMemo } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const { searchQuery, setSearchQuery } = useHubStore();

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ADULT_SITES;

    return ADULT_SITES.filter((site) => {
      return (
        site.name.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.url.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-[#050505] px-4 pt-4">
      <View className="mb-4 flex-row items-center rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3">
        <Search color="#9ca3af" size={18} />
        <TextInput
          placeholder="Search sites..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="ml-3 flex-1 text-base text-zinc-100"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SiteCard site={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={
          <Text className="mb-3 text-xs uppercase tracking-[2px] text-zinc-500">
            84 curated websites
          </Text>
        }
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="text-zinc-400">No matches found.</Text>
          </View>
        }
      />
    </View>
  );
}
