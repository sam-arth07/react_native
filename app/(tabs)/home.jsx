import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
const Home = () => {
	const { data: posts, refetch } = useAppwrite(getAllPosts);
	const { data: latestPosts } = useAppwrite(getLatestPosts);
	const { user } = useGlobalContext();

	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = async () => {
		setRefreshing(true);
		// re-call videos to see if any new videos appear
		await refetch();
		setRefreshing(false);
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			{/* flatlist is used to render a list of elements */}
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between flex-row items-start mb-6">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">
									Welcome back
								</Text>
								<Text className="text-white text-2xl font-psemibold">
									{user?.username}
								</Text>
							</View>
							<View className="mt-2">
								<Image
									source={images.logoSmall}
									resizeMode="contain"
									className="h-10 w-10"
								/>
							</View>
						</View>
						<SearchInput />
						<View className="pt-3 flex-1 w-full pb-5">
							<Text className="text-gray-100 text-lg font-pregular mb-3">
								Latest Videos
							</Text>
							<Trending posts={latestPosts ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No videos found"
						subtitle="Be the first one to upload a video"
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default Home;
