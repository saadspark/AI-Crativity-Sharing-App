import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View } from "react-native";
import { images } from "../../constants";
import { SearchInput } from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()} // Fixed the key extraction
        renderItem={({ item }) => (
          <>
            <Text className="text-white">{item.id}</Text>
          </>
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
              <SearchInput placeholder='Search your topic...' />
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 font-pregular text-lg mb-3">
                  Latest Videos
                </Text>
                <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}  />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
