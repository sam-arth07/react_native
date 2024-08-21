import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { usePathname, router } from "expo-router";
const SearchInput = ({ initialQuery }) => {
	const pathName = usePathname();
	const [query, setQuery] = useState(initialQuery || "");
	return (
		<View className="border-2 border-black-200 w-full h-16 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4 px-4">
			<TextInput
				className="mt-0.5 flex-1 text-white font-pregular text-base"
				value={query}
				placeholder="Search for a video topic"
				placeholderTextColor="#CDCDE0"
				onChangeText={(e) => setQuery(e)}
			/>
			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert(
							"Missing query",
							"Please input something to search across the database"
						);
					}
					if (pathName.startsWith("/search")) {
						router.setParams({ query });
					} else {
						router.push(`/search/${query}`);
					}
				}}>
				<Image
					source={icons.search}
					className="w-7 h-7"
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
