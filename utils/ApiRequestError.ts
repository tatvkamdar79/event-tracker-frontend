import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
export function handleAxiosError(error: unknown, logout: () => void): void {
  if (error instanceof AxiosError) {
    if (!error?.response) {
      Toast.show({
        type: "Error",
        text1: "Something went Wrong.",
        text2: "No response from the server",
        visibilityTime: 3000,
      });
    } else if (error.response.status === 401) {
      // alert("Unauthorized access. Please log in again.");
      if (logout) {
        logout();
      }
    } else {
      Toast.show({
        type: "Error",
        text1: "Something went Wrong.",
        text2: error.response.data.message,
        visibilityTime: 3000,
      });
    }
  } else {
    Toast.show({
      type: "Error",
      text1: "Something went Wrong.",
      text2: "Please try again",
      visibilityTime: 3000,
    });
  }
}
