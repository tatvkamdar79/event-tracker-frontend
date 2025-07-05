import {
  orange300,
  success800,
  purple800,
  warning800,
  primary300,
  neutral40,
  red100,
} from "../constants/colors";

import { Axios } from "axios";
import { NotificationType } from "../constants/types";

export interface scoreCalculatorParams {
  taxonomy: string;
  numberOfCompetencies: number;
  cognitive_level: {
    level: number;
    percentage: number;
  }[];
}

export const normalize = (
  value: number,
  normalizeTo: number,
  maximumMarks: number
) => {
  return (normalizeTo * value) / maximumMarks;
};

export const scoreCalculator = (params: scoreCalculatorParams) => {
  const taxonomy = params.taxonomy;
  let maximumMarks = 0;
  switch (taxonomy) {
    case "Revised Bloom's Taxonomy":
      maximumMarks = 6 * params.numberOfCompetencies;
      break;
    case "SOLO Taxonomy":
      maximumMarks = 5 * params.numberOfCompetencies;
      break;
    case "Marzano's New Taxonomy":
      maximumMarks = 4 * params.numberOfCompetencies;
      break;
    case "Webb's Depth of Knowledge":
      maximumMarks = 6 * params.numberOfCompetencies;
      break;
  }
  let score = 0;

  params.cognitive_level.forEach((item) => {
    score += (item.level * item.percentage) / 100; // Normalize percentage
  });

  // console.log(Number(normalize(score, 25,maximumMarks).toFixed(2)))
  return Number(normalize(score, 25, maximumMarks).toFixed(0));
};

export const renderStarsFromScore = (score: number) => {
  // the give score is in between the 0 to 25
  if (score === 0) {
    return 0;
  }
  if (score <= 10 && score >= 1) {
    return 2;
  } else if (score > 10 && score <= 15) {
    return 3;
  } else {
    return 5;
  }
};

export const renderInsights = (score: number) => {
  // the give score is in between the 0 to 25
  if (score === 0) {
    return "No Insights";
  }
  if (score <= 10 && score >= 1) {
    return "Beginner";
  } else if (score > 10 && score <= 15) {
    return "Medium";
  } else {
    return "Advanced";
  }
};

export const getCurrentBatch = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); //This is Month indexing from 0

  if (month >= 3) {
    // April or later
    return `${year}-${year + 1}`;
  } else {
    // Before April
    return `${year - 1}-${year}`;
  }
};

export const colorFunctions: Record<string, string> = {
  English: orange300,
  Telugu: success800,
  Mathematics: purple800,
  Science: warning800,
  "Social Science": primary300,
  "Computer Science": neutral40,
  Social: primary300,
  Hindi: red100,
  Physics: "#0CB5E8",
  Chemistry: "#E80CC3",
  Biology: "#0CE885",
};

export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export function getNotificationAlias(code: string, value: string) {
  const aliasMapping: any = {
    Notice: {
      EXAM: "Schedule",
      ANNOUNCEMENT: "General",
    },
    Event: {
      Exam: "Schedule",
      Event: "Schedule",
      Academic: "Academic",
      Holiday: "Schedule",
    },
    General: {
      achievement: "General",
      feedback: "General",
    },
    Admin: {
      Exam: "Schedule",
      Event: "Schedule",
      Academic: "Academic",
      Holiday: "Schedule",
      achievement: "General",
      feedback: "General",
      important: "Important",
    },
  };
  if (!aliasMapping[code]) {
    return "General";
  }
  return aliasMapping[code][value] || "General";
}

export async function getUsersByScope(
  classIds: string | string[],
  scope: string[],
  mergeIds: boolean,
  axios: Axios,
  schoolId?: number,
  productId?: string
) {
  const userPayload = JSON.stringify({
    filters: {
      classId: Array.isArray(classIds) ? classIds : [classIds],
      scope: scope,
      mergeIds: mergeIds,
      schoolId: schoolId || undefined,
      productId: productId || undefined,
    },
  });
  return await axios.get(`/users/class/get-users-by-scope/${userPayload}`);
}

export const sendNotification = async (
  data: NotificationType,
  axios: Axios
) => {
  const notificationResponse = await axios.post(
    "/users/notifications/send",
    data
  );
  if (!notificationResponse) {
    console.error("Error sending notifications");
  } else {
    return "Notification sent successfuly";
  }
};
export function roundTo(num: number, precision: number) {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

export async function getSignedUrls(
  urls: string[],
  expiresIn: number | null,
  axios: Axios
) {
  const awsUrls: string[] = [];
  try {
    urls.forEach((url) => {
      if (/amazonaws\.com/gi.test(url)) {
        awsUrls.push(url);
      }
    });

    if (awsUrls.length === 0) {
      return null;
    }

    const response = await axios.post("/reports/files/generate-signed-url", {
      urls: awsUrls,
      ...(expiresIn ? { expiresIn } : {}),
    });

    return response.data.signedUrls || null;
  } catch (error) {
    console.error("Error generating signed URLs:", error);
    return {};
  }
}
export function isObjectComplete(obj: Record<string, any>): boolean {
  if (!obj) {
    return false;
  }
  if (Object.values(obj).length === 0) {
    return false;
  }
  return Object.values(obj).every(
    (value) =>
      value !== undefined && value !== null && value !== "" && value !== 0
  );
}

export function validatePassword(password: string): {
  valid: boolean;
  message: string;
} {
  // Initial basic conditions
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one number.",
    };
  }
  return { valid: true, message: "Password meets the basic requirements." };
}

export function getStageBasedOnGrade(grade: number): string {
  if (grade >= 0 && grade <= 2) return "Foundational Stage";
  if (grade <= 5) return "Preparatory Stage";
  if (grade <= 8) return "Middle Stage";
  if (grade <= 12) return "Secondary Stage";
  return "";
}
export function mergeDateAndTime(
  date: string,
  time: { hours: number; minutes: number; period?: string }
): string {
  const dateObj = new Date(date);
  let hours = Number(time.hours);
  const minutes = Number(time.minutes);
  if (time.period && typeof time.period === "string") {
    if (time.period.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (time.period.toLowerCase() === "am" && hours === 12) hours = 0;
  }
  // Explicitly zero out seconds and milliseconds
  dateObj.setHours(hours, minutes, 0, 0);
  return dateObj.toISOString();
}
export function PTMConflictError(error: unknown, logout: () => void): string {
  // Handle 401 unauthorized errors
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as any;
    if (axiosError.response?.status === 401) {
      if (logout) {
        logout();
      }
    }
  }

  // Extract error message
  const errorMessage =
    (error as any)?.response?.data?.message || "An unknown error occurred";

  // Format date strings in the error message

  return errorMessage;
}
export function toISTString(date: Date | string) {
  return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}
