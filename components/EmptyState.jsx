import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
	return (
		<View className="justify-center items-center px-4">
			<Image
				source={images.empty}
				resizeMode="contain"
				className="w-[280px] h-[220px]"
			/>
			<Text className="text-white text-center text-xl font-psemibold ">
				{title}
			</Text>
			<Text className="font-pmedium text-sm text-gray-100 mt-2">
				{subtitle}
			</Text>
			<CustomButton
				title="Create Videos"
				handlePress={() => router.push("/create")}
				containerStyles="w-full my-5"
			/>
		</View>
	);
};

export default EmptyState;
