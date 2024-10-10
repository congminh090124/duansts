import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function VerificationCodeScreen() {

	const { t, i18n } = useTranslation();


	// Tạo các tham chiếu cho mỗi TextInput
	const input1Ref = useRef(null);
	const input2Ref = useRef(null);
	const input3Ref = useRef(null);
	const input4Ref = useRef(null);
//
// lấy email
const retrieveEmail = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      if (savedEmail !== null) {
        setStoredEmail(savedEmail);
      }
    } catch (error) {
      console.error('Failed to retrieve email', error);
    }
  };
	// Hàm xử lý khi nhập hoặc xóa text
	const handleInputChange = (text, currentInputRef, nextInputRef, previousInputRef) => {
		if (text.length === 1) {
			// Nếu người dùng nhập 1 ký tự
			if (/^\d$/.test(text) && nextInputRef) {
				nextInputRef.current.focus(); // Focus vào ô tiếp theo
			}
		} else if (text.length === 0 && previousInputRef) {
			// Nếu người dùng xóa ký tự và có ô trước đó
			previousInputRef.current.focus(); // Focus về ô trước đó
		}
	};

	return (

		<View>
			<View style={styles.textxm}>
			<Text style={styles.textxm}>
						{t("forgotPassword")}
					</Text>
			</View>
			<View style={styles.column}>
				
					
				
				<Text style={styles.textnm}>
					{t("enter_verification_code")}
				</Text>
				<View style={styles.row}>
					{/* TextInput đầu tiên */}
					<View style={styles.view}>
						<TextInput
							ref={input1Ref}
							style={styles.text}
							keyboardType="numeric"
							maxLength={1}
							onChangeText={(text) => handleInputChange(text, input1Ref, input2Ref, null)}
						/>
					</View>

					{/* TextInput thứ hai */}
					<View style={styles.view}>
						<TextInput
							ref={input2Ref}
							style={styles.text}
							keyboardType="numeric"
							maxLength={1}
							onChangeText={(text) => handleInputChange(text, input2Ref, input3Ref, input1Ref)}
						/>
					</View>

					{/* TextInput thứ ba */}
					<View style={styles.view}>
						<TextInput
							ref={input3Ref}
							style={styles.text}
							keyboardType="numeric"
							maxLength={1}
							onChangeText={(text) => handleInputChange(text, input3Ref, input4Ref, input2Ref)}
						/>
					</View>

					{/* TextInput thứ tư */}
					<View style={styles.view}>
						<TextInput
							ref={input4Ref}
							style={styles.text}
							keyboardType="numeric"
							maxLength={1}
							onChangeText={(text) => handleInputChange(text, input4Ref, null, input3Ref)}
						/>
					</View>
				</View>
				<Text style={styles.textnb}>
				{t("resend_code_instruction")}
				</Text>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.text}>
					{t("submit")}
					</Text>
				</TouchableOpacity>
				<Text style={styles.textdc}>
				{t("already_have_account")}
				</Text>
				<TouchableOpacity style={styles.buttondk}>
					<Text style={styles.textdk}>
					{t("register")}
					</Text>
				</TouchableOpacity>

			</View>
			<Text style={styles.textlink}>
				{"https://www.riatec-th.co.jp"}
			</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	column: {
		// backgroundColor: 'red',
		marginTop: '50%',
		// flex: 1
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
		marginHorizontal: 73,
	},
	text: {
		color: "#8F8F8F",
		fontSize: 13,
		fontWeight: "bold",
	},
	textxm: {
		color: "#444444",
		fontSize: 16,
		fontWeight: "bold",
		marginTop: '10%',
		alignSelf: "center",
	// marginTop: 40,a
	},
	textnm: {
		color: "#444444",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 20,
		alignSelf: "center",

	},
	textnb: {
		color: "#ABABAB",
		fontSize: 9,
		fontWeight: "bold",
		marginBottom: 41,
		marginLeft: 114,
	},
	textdc: {
		color: "#ABABAB",
		fontSize: 9,
		fontWeight: "bold",
		marginBottom: 41,
		marginLeft: 154,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#182EF3",
		borderRadius: 20,
		paddingVertical: 17,
		marginBottom: 24,
		marginHorizontal: 43,
	},
	buttondk: {
		borderColor: "#444444",
		borderRadius: 20,
		borderWidth: 1,
		paddingVertical: 16,
		paddingHorizontal: 85,
		// marginBottom: 187,
		marginHorizontal: 52,
	},
	textdk: {
		marginLeft: 25,
		color: "#8F8F8F",
		fontSize: 13,
		fontWeight: "bold",
	},
	view: {
		width: 50,
		alignItems: "center",
		borderColor: "#444444",
		borderRadius: 33,
		borderWidth: 1,
		paddingVertical: 19,
	},
	textlink: {
		color: "#262626",
		fontSize: 14,
		fontWeight: "bold",
		marginLeft: 100,
		marginTop: '20%',
        
	},
});