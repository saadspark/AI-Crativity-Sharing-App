import { Link, Redirect, router } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { images } from "../constants";
import { CustomButton } from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../contexts/GlobalProvider";


export default function App() {
  const {isLoading , isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  items-center  min-h-[85vh] mt-10 px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMethod="contain"
          />
          <View className="relative w-full ">
            <Text className="text-white font-bold text-3xl text-center">
              Discover Endless Possibilites with{" "}
              <Text className="text-secondary-200">Aura</Text>
            </Text>
            {/* <Image
            source={images.path}
            className="w-[156px] h-[15px] absolute bottom-16.1 -right-0"
            resizeMode="contain"
          /> */}
            <Text className="text-gray-100 text-center mt-5 text-sm font-pregular">
              Where Creativity meets innovations : embark on the journey of
              limitless exploration with aors{" "}
            </Text>
            <CustomButton
              title="Continue With Email"
              handlePress={() => router.push("/sign-in")}
              ContainerStyle="w-full mt-7"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
