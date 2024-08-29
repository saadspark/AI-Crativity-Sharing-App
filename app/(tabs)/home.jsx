import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { images } from "../../constants";
import { SearchInput } from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCart from "../../components/VideoCart";
const Home = () => {
  const { data: posts, isLoading, refetch } = useAppWrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch;
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id} // Fixed the key extraction
        renderItem={({ item }) => (
            <VideoCart video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-center  flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  {" "}
                  Welcome
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Saad Ahmad
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View>
              <SearchInput placeholder="Search your topic..." />
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 font-pregular text-lg mb-3">
                  Latest Videos
                </Text>
                <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            subtitle="No Videos Found"
            title="Be the first one to upload video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
