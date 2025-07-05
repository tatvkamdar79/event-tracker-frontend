import {
  neutral40,
  orange300,
  primary300,
  purple800,
  success800,
  warning800,
} from "@/utils/constants/colors";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
export const sampleData: ChartData = {
  labels: [
    "English",
    "Telugu",
    "Maths",
    "Science",
    "Social Science",
    "Computer Science",
  ],
  datasets: [
    {
      data: [16, 12, 12, 13, 17, 12],
      colors: [
        () => orange300,
        () => success800,
        () => purple800,
        () => warning800,
        () => primary300,
        () => neutral40,
      ],
    },
  ],
};
