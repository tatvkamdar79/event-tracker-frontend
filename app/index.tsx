import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import { neutral00 } from "@/utils/constants/colors";
import LoginPage from "@/components/auth/LoginPage";
import { router, useRootNavigationState } from "expo-router";

export default function HomeScreen() {
  // const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  //   const accessToken = useSelector((state: RootState) => state.auth.token); // Get token from Redux
  //   const selectedRole = useAppSelector(
  //     (state) => state.persit.selectedRole.selectedRole
  //   );
  //   const logout = useLogout();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !rootNavigationState?.key) return;
    router.replace("/(screens)/(private)/home");
  }, [isMounted, useRootNavigationState]);
  //   useEffect(() => {
  //     if (!isMounted || !accessToken || !rootNavigationState?.key) return;

  //     const validateAuth = async () => {
  //       try {
  //         setLoading(true);

  //         switch (selectedRole) {
  //           case ROLES.student:
  //             router.replace("/student/home");
  //             break;
  //           case ROLES.teacher:
  //             router.replace("/teacher/home");
  //             break;

  //           case ROLES.schooladmin:
  //             router.replace("/schoolAdmin/home");
  //             break;
  //           case ROLES.parent:
  //             router.replace("/parent/home");
  //             break;

  //           case ROLES.regulator:
  //             router.replace("/regulator/home");
  //             break;
  //           default:
  //             logout();
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         Toast.show({
  //           type: "Error",
  //           text1: "Error",
  //           text2: "Something went wrong",
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     validateAuth();
  //   }, [accessToken, rootNavigationState, isMounted]);

  //   if (loading) {
  //     return <Loader isOpen={loading}></Loader>;
  //   }
  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: neutral00 }}>
      <LoginPage />
    </SafeAreaView>
  );
}
