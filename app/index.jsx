import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
export default function Index() {
	const { loading,isLogged } = useGlobalContext();
	if (!loading && isLogged) return <Redirect href="/home" />;
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full justify-center items-center h-full px-4">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[130px] h-[84px]"
					/>
					<Image
						source={images.cards}
						resizeMode="contain"
						className="max-w-[380px] w-full h-[300px]"
					/>
					<View className="relative mt-5">
						<Text className="text-3xl text-white font-bold text-center">
							Discover Endless Possibilities with{" "}
							<Text className="text-secondary-200">Aora</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
							resizeMode="contain"
						/>
					</View>
					<Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
						Where creativity meets innovation: embark on a limitless
						journey with Aora
					</Text>
					<CustomButton
						title="Continue With Email"
						handlePress={() => {
							router.push("/sign-in");
						}}
						containerStyles={"w-full mt-7"}
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}
