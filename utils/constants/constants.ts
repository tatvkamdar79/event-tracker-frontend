import { ImageSourcePropType } from "react-native";
import {
  english,
  environmentalScience,
  hindi,
  mathematics,
  science,
  socialScience,
  telugu,
} from "./gifs";
import {
  parentIcon,
  regulatorIcon,
  schoolAdminIcon,
  studentIcon,
  teacherIcon,
} from "./images";

export const AccreditationCategories = [
  {
    label: "Accreditation Certificate",
    value: "Accreditation Certificate",
  },
  {
    label: "Human Resources",
    value: "Human Resources",
  },
  {
    label: "Inclusive Practices",
    value: "Inclusive Practices",
  },
  {
    label: "Management and Governance",
    value: "Management and Governance",
  },
  {
    label: "Leadership",
    value: "Leadership",
  },
  {
    label: "Beneficiary Satisfaction",
    value: "Beneficiary Satisfaction",
  },
];

export const productId = "0";
export const studentExcelTemplate =
  "https://xvivjtnsgdarwhkrkznh.supabase.co/storage/v1/object/public/CSV-Templates/Student_Parent_Data.xlsx";
export const teacherExcelTemplate =
  "https://xvivjtnsgdarwhkrkznh.supabase.co/storage/v1/object/public/CSV-Templates//Teacher.xlsx";

export const subjectGifMapping: { [key: string]: ImageSourcePropType } = {
  Telugu: telugu,
  Hindi: hindi,
  English: english,
  Mathematics: mathematics,
  Science: science,
  "Social Science": socialScience,
  Physics: science,
  Languages: hindi,
  EVS: environmentalScience,
  Chemistry: science,
  Biology: science,
};

export const ROLE_LABELS = {
  home: {
    label: "Home",
    description: "this is your dashboard.",
    icon: studentIcon,
  },
  "1": {
    label: "Parent",
    description:
      "View your child's academic progress, tasks, and school updates.",
    icon: parentIcon,
  },
  "2": {
    label: "Teacher",
    description:
      "Manage your classes, assignments, student progress, and communication.",
    icon: teacherIcon,
  },
  "3": {
    label: "School Admin",
    description:
      "Oversee school operations, staff, students, and overall administration.",
    icon: schoolAdminIcon,
  },
  "4": {
    label: "Regulator",
    description:
      "Monitor schools, compliance, and overall education standards.",
    icon: regulatorIcon,
  },
};
