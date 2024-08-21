import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";
const Profile = () => {
	const { user, setUser, setIsLogged } = useGlobalContext();
	const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
	const logout = async() => {
    await signOut()
    setUser(null)
    setIsLogged(false)
    router.replace("/sign-in")
  };
	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="w-full justify-center items-center mt-6 px-4 mb-12">
						<TouchableOpacity
							className="w-full mb-10 items-end"
							onPress={logout}>
							<Image
								source={icons.logout}
								className="w-6 h-6"
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<View className="w-16 h-16 border-secondary border rounded-lg justify-center items-center">
							<Image
								source={{ uri: user?.avatar }}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>
            <InfoBox
								title={user?.username}
								containerStyles="mt-5"
								titleStyles="text-lg"
							/>
						<View className="mt-5 flex-row">
							<InfoBox
								title={posts.length || 0}
                subtitle="Posts"
								containerStyles="mr-10"
								titleStyles="text-xl"
							/>
              <InfoBox
								title="1.2k"
                subtitle="Followers"
								titleStyles="text-xl"
							/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No videos found"
						subtitle="No videos found for this search query"
					/>
				)}
			/>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default Profile;
