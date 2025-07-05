import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  background,
  error800,
  neutral00,
  neutral24,
  neutral64,
  primary400,
  primary50,
} from "@/utils/constants/colors";

// import * as SecureStore from "expo-secure-store";
// importing components
// import useAppDispatch from "@/hooks/useAppDispatch";
// import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useScreenSize from "@/hooks/useScreenSize";
// import { ROLES } from "@/utils/constants/types";
// import { login } from "@/utils/store/slices/authSlice";
// import { router } from "expo-router";
// import PrimaryButton from "../buttons/PrimaryButton";
import InputBox from "../input/InputBox";
import AppText from "../text/appText";
// import { setExpoToken } from "@/api/notifications";
// import { BACKEND_URL } from "@/utils/constants/urls";
// import Toast from "react-native-toast-message";

export default function LoginPage() {
  const [username, setusername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const dispatch = useAppDispatch();
  const isPortrait = useScreenSize();
  // const axios = useAxiosPrivate();
  const [, setIsLoginPage] = useState(true);
  // const [showRoleModal, setShowRoleModal] = useState(false);
  // const [userData, setUserData] = useState({} as userData);
  // const [availableRoles, setAvailableRoles] = useState([]);
  // const [userSelectedRole, setUserSelectedRole] = useState<string | null>(null);
  // const roles: Role[] = [
  //   {
  //     title: "Student",
  //     description: "Learn and track progress.",
  //   },
  //   {
  //     title: "Teacher",
  //     description: "Manage classes & monitor students.",
  //   },
  //   {
  //     title: "School Admin",
  //     description: "Oversee operations & manage users.",
  //   },
  //   {
  //     title: "Regulator",
  //     description: "Oversee institutions & performance.",
  //   },
  //   {
  //     title: "Parent",
  //     description: "Keep track of your child's progress.",
  //   },
  // ];

  const handleLogin = async () => {
    // try {
    //   const response = await fetch(`${BACKEND_URL}/auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //     body: JSON.stringify({
    //       username,
    //       password,
    //       product: "0",
    //       platform: Platform.OS === "web" ? "web" : "mobile",
    //     }),
    //   });
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     const customError: APIError = {
    //       message: errorData.message || "An error occurred",
    //       code: errorData.code,
    //       status: response.status,
    //     };
    //     throw customError;
    //   }
    //   const data = await response.json();
    //   setUserData(data);
    //   if (data.roles.length > 1) {
    //     setAvailableRoles(data.roles);
    //     setShowRoleModal(true);
    //   } else {
    //     setUserSelectedRole(data.roles[0][1]);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   const err = error as APIError;
    //   Toast.show({
    //     type: "Error",
    //     text1: "Login failed",
    //     text2: `${err.message}`,
    //     visibilityTime: 3000,
    //   });
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: neutral00 }}>
      {isPortrait ? (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            marginTop: "20%",
            padding: 10,
          }}
        >
          <View style={{ flex: 1, padding: 20 }}>
            <View style={{ marginBottom: 20, zIndex: 1000 }}></View>

            <AppText
              style={{ fontSize: 24, fontWeight: "600", marginBottom: 20 }}
            >
              Welcome Back
            </AppText>

            {/* username Input */}
            <InputBox
              type="text"
              value={username}
              placeholder="Enter username"
              label="username"
              onChange={(text: string) => setusername(text)} // Added type for onChange
            />

            {/* Password Input */}
            <InputBox
              type="password"
              value={password}
              placeholder="Enter password"
              label="password"
              onChange={(text: string) => setPassword(text)} // Added type for onChange
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <AppText style={{ color: error800, fontSize: 14 }}>
                Forgot Password?
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: primary400,
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                handleLogin();
              }}
            >
              <AppText style={{ color: neutral00, fontWeight: 500 }}>
                Login
              </AppText>
            </TouchableOpacity>

            {/* Or Divider */}
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: background }}
              />
              <AppText style={{ marginHorizontal: 10, color: neutral64 }}>
                Or
              </AppText>
              <View
                style={{ flex: 1, height: 1, backgroundColor: background }}
              />
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText style={{ color: neutral64 }}>
                Don't you have an account?{" "}
              </AppText>
              <TouchableOpacity onPress={() => setIsLoginPage(false)}>
                <AppText style={{ color: primary400 }}>Sign up</AppText>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* Left Panel */}

          <View
            style={{
              width: "35%",
              backgroundColor: neutral00,
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 40,
              paddingHorizontal: 20,
              borderRightColor: neutral24,
              borderRightWidth: 1,
            }}
          >
            {/* Logo centered */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* <Image
                source={""}
                style={{
                  width: 200,
                  height: 60,
                  resizeMode: "contain",
                }}
              /> */}
            </View>

            {/* Quote Section at the bottom */}
            <View
              style={{
                alignSelf: "flex-end",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: "10%",
              }}
            >
              <AppText
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: neutral64,
                  marginBottom: 10,
                }}
              >
                "Education is the passport to the future, for tomorrow belongs
                to those who prepare for it today."
              </AppText>
              <AppText
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: neutral64,
                }}
              >
                – Malcolm X
              </AppText>
            </View>
          </View>

          {/* Right Panel */}
          <View
            style={{
              width: "65%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: primary50,
              padding: 20,
            }}
          >
            <View
              style={{
                width: "80%",
                maxWidth: 400,
              }}
            >
              <View style={{ flex: 1, padding: 20 }}>
                {/* Role Selector */}
                <View style={{ marginBottom: 20, zIndex: 1000 }}></View>

                {/* Welcome AppText */}
                <AppText
                  style={{ fontSize: 24, fontWeight: "600", marginBottom: 20 }}
                >
                  Welcome Back
                </AppText>

                {/* username Input */}
                <InputBox
                  type="text"
                  value={username}
                  placeholder="Enter username"
                  label="username"
                  onChange={(text: string) => setusername(text)}
                />

                {/* Password Input */}
                <InputBox
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  label="password"
                  onChange={(text: string) => setPassword(text)}
                />

                {/* Forgot Password Link */}
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                >
                  <AppText style={{ color: error800, fontSize: 14 }}>
                    Forgot Password?
                  </AppText>
                </TouchableOpacity>

                {/* Login Button */}
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      handleLogin();
                    }}
                  >
                    <AppText>Login</AppText>
                  </TouchableOpacity>
                </View>

                {/* Or Divider */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: background }}
                  />
                  <AppText style={{ marginHorizontal: 10, color: neutral64 }}>
                    Or
                  </AppText>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: background }}
                  />
                </View>

                {/* Sign Up Link */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppText style={{ color: neutral64 }}>
                    Don't you have an account?{" "}
                  </AppText>
                  <TouchableOpacity onPress={() => setIsLoginPage(false)}>
                    <AppText style={{ color: primary400 }}>Sign up</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
