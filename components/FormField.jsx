import { View, Text, TextInput, Image } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium">
				{title}
			</Text>
			<View className="border-2 border-black-200 w-full h-16 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row px-4">
				<TextInput
					className={`flex-1 text-white font-psemibold text-base ${props.titleStyles}`}
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7b7b8b"
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
				/>
				{title === "Password" && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eyeHide : icons.eye}
							className="w-7 h-7"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;
