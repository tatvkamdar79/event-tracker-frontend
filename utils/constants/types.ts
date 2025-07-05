import { ImageSourcePropType } from "react-native";

export enum ROLES {
  admin = "5",
  mentor = "6",
  schooladmin = "3",
  student = "0",
  teacher = "2",
  parent = "1",
  regulator = "4",
  staff = "7",
}

export type NavItem = {
  name: string;
  icon: ImageSourcePropType;
  route: string;
};

export type NavSection = {
  section: string;
  items: NavItem[];
};

export interface SubjectCell {
  subject: string;
  teacher: string;
}

export interface IattendaceData {
  student_id: string;
  class_id: string;
  teacher_id: string;
  status: string;
}

export interface ProfileDetails {
  id: string;
  subject: string[];
  overview: string;
  education: string;
  certifications: string[];
  previous_positions_held: string[];
  specialization: string[];
  years_of_experience: number;
  date_of_joining: Date;
  skills: Award[];
  awards: Award[];
  user: User;
  languages_known: string[];
}

export interface Award {
  name: string;
  description?: string;
  year?: string;
  presented_by?: string;
}

export interface User {
  id: string;
  username: string;
  email: null;
  password: string;
  roles: string[];
  name: string;
  dob: string;
  gender: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  created_at: Date;
  phone_num: string;
  emergency_contact?: string;
  profile_pic: string;
  refresh_token: string;
  school_id: number;
  last_login: Date;
  school: School;
  teacher: TeacherDetails;
  school_admin?: {
    id: string;
    designation: string;
    education: string;
    user_type: string;
    overview: string;
    languages_known: string[];
    date_of_joining: string | null;
    years_of_experience: number | null;
    previous_positions_held: string[];
    skills: { name: string }[]; // Assuming each skill has a `name` field
    awards: { title: string; year: number; presented_by: string }[]; // Adjust based on actual structure
    certifications: { title: string; issued_by: string; date: string }[]; // Adjust as needed
  };
  Regulator: Regulator;
}

export interface Regulator {
  id: string;
  authority_level: string;
  department: string;
  designation: string;
  jurisdiction: string;
  languages_known: string[];
  office_address: string;
  overview: string;
  title: string;
  ID_proof: JSON;
}

export interface School {
  id: number;
  created_at: Date;
  name: string;
  board: string;
  group: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  country: string;
  logo_url: string;
  principal_name: string;
  website_url: null;
}

export interface UserDataType {
  user: {
    name: string;
    role: string;
    description: string;
    profileImage: string;
    languages: string[];
    officeAddress: {
      line1: string;
      city: string;
      state: string;
      pinCode: string;
    };
    dateOfBirth: string;
    email: string;
    contactNumber: string;
    emergencyNumber?: string;
  };
}

export interface FormattedProfessionalDataType {
  education: string[];
  certifications: string[];
  specializations: string[];
  yearsOfExperience: string;
  previousPositions: string[];
  dateOfJoining: string;
}

export interface FormattedSkillsDataType {
  title: string;
  description: string;
}

export interface FormattedAwardsDataType {
  awardName: string;
  Year: string;
  presentedBy: string;
}

export interface TableViewEntry {
  month: string;
  workingDays: number;
  attendedDays: number;
}

export interface AttendanceData {
  tableView: TableViewEntry[];
  chartView: {
    present: string;
    absent: string;
  };
}

export interface Attendance {
  tableView: AttendanceRecord[];
  chartView: AttendanceChartView;
}

export interface AttendanceRecord {
  month: string;
  workingDays: number;
  attendedDays: number;
}

export interface AttendanceChartView {
  present: string;
  absent: string;
}

export interface PersonalDetails {
  name: string;
  class: string;
  section: string;
  emailAddress: string;
  gender: string;
  caste: string;
  placeOfBirth: string;
  emergencyContact: string;
  rollNumber: string;
  religion: string;
  dateOfBirth: string;
  nationality: string;
  aadharNumber: string;
  APARID: string;
  motherTongue: string;
  languagesKnown: string[];
  interests: string[];
  introduction: string;
  profilePic: string;
  username?: string;
}

export interface ParentDetails {
  name: string;
  education: string;
  occupation: string;
  contactNumber: string;
}

export interface FamilyDetails {
  parentGuardianDetails: {
    father: ParentDetails;
    mother: ParentDetails;
  };
  otherInformation: {
    numberOfSiblings: number;
    livingStatus: string;
    siblingAge: number[];
    ruralOrUrban: string;
    address: string;
    pinCode: string;
  };
}

export interface SchoolInformation {
  schoolName: string;
  dateOfJoining: string;
  admissionNumber: string;
  mediumOfInstruction: string[];
  schoolAddress: string;
  UDISECode: string;
  pinCode: string;
}

export interface SchoolDetails {
  schoolInformation: SchoolInformation;
}

export interface MedicalHistory {
  knownAllergies: {
    FoodAllergies: string[];
    MedicationAllergies: string[];
    EnvironmentalAllergies: string[];
  };
  chronicConditions: { conditionName: string; notes: string }[];
  medications: { medicationName: string; notes: string }[];
}
type HealthMetricEntry = {
  value: number | string | null;
  batchId: string;
};
export interface PhysicalMetrics {
  height: HealthMetricEntry[];
  weight: HealthMetricEntry[];
  BMI: HealthMetricEntry[];
  bloodGroup: string;
  hearingTest: HealthMetricEntry[];
  visionTest: HealthMetricEntry[];
}

export interface MentalHealthInformation {
  condition: string[];
  history: string;
  notes: string;
}

export interface VaccinationDetails {
  vaccinationHistory: string[];
}

export interface HealthRecords {
  physicalMetrics: PhysicalMetrics;
  mentalHealthInformation: MentalHealthInformation[];
  vaccinationDetails: VaccinationDetails;
}

export interface EmergencyContacts {
  name: string;
  number1: string;
  number2: string;
  preferredHospital: string;
}
export interface DietaryPreferences {
  title: string;
}

export interface EmergencyInfo {
  emergencyContacts: EmergencyContacts;
  dietaryPreferences: DietaryPreferences[];
  permissions: string[];
}

export interface HealthAndWellnessDetails {
  medicalHistory: MedicalHistory;
  healthRecords: HealthRecords;
  emergencyInfo: EmergencyInfo;
}

export interface ProfileData {
  personalDetails?: PersonalDetails;
  familyDetails?: FamilyDetails;
  schoolDetails?: SchoolDetails;
  healthAndWellnessDetails?: HealthAndWellnessDetails;
}

export interface TabItem {
  label: string;
  value: string;
}

export interface MonthlyData {
  present_days: number;
  absent_days: number;
  total_days: number;
}

export interface AttendanceAPIResponse {
  data: {
    monthly_data: Record<string, MonthlyData>;
  };
}
export type ContentData = {
  category: string;
  chapter: string;
  description: string;
  fileSize: number;
  fileType: ("PDF" | "DOCX" | "MP4" | "Image")[];
  fileURL: string[];
  grade: string;
  id: string;
  likes: number;
  schoolId: string;
  subject: string;
  teacherId: string;
  liked: boolean;
  thumbnailURL: string;
  title: string;
  type: ContentType;
  uploadDate: string;
  views: number;
  visibility: string;
  schoolName: string;
  teacherName: string;
};

export type TrendingVideos = {
  mostLikedWithLiked?: ContentData[];
  mostRecentWithLiked?: ContentData[];
  mostViewedWithLiked?: ContentData[];
};

export interface SchoolTimingDetail {
  break_time: string;
  lunch_break: string;
  school_hours: string;
}

export interface SchoolTimings {
  [stage: string]: SchoolTimingDetail;
}

export interface SchoolDetailsType {
  id: number;
  name: string;
  address: string;
  board: string;
  group: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  phone: string;
  principal_name: string;
  lat_Long: string;
  logo_url: string;
  website_url: string;
  school_type: string;
  school_code: string;
  establish_year: string;
  udise: string;
  affiliation_number: string;
  accreditation_status: string;
  accreditation_validity: string;
  accreditation_certificate: string;
  tax_registration_document: string;
  school_registration_certificate: string;
  emergency_contact: string;
  medium_of_instruction: string[];
  school_timings: SchoolTimings;
  teachers_capacity: number;
  non_teaching_staff_capacity: number;
  students_capacity: number;
  classrooms: number;
  library: string;
  labs: string[];
  sports_facility: string[];
  created_at: string;
  school_images: string[];
  principal_contact: string;
  principal_email: string;
  principal_experience: string;
  principal_qualification: string;
  accreditation_number: string;
}

export interface TeacherDetails {
  id: string;
  subject: string[];
  overview: string;
  languages_known: string[];
  education: string[];
  certifications: string[];
  previous_positions_held: string[];
  years_of_experience: number;
  date_of_joining: Date;
  skills: Award[];
  awards: Award[];
  user: User;
}

export interface FormattedTeacherDataType {
  teacher: {
    name: string;
    role: string;
    description: string;
    profileImage: string;
    languages: string[];
    officeAddress: {
      line1: string;
      city: string;
      state: string;
      pinCode: string;
    };
    dateOfBirth: string;
    email: string;
    contactNumber: string;
  };
}
export interface TimeTable {
  id?: string;
  subject: string;
  class_Id: string;
  day: string;
  period: string;
  teacher_Id: string;
}

export interface DaySchedule {
  day: string;
  periods: TimeTable[];
}

export interface TeacherClassData {
  teacher_id: string;
  name: string;
  profileImage: string;
  phone_num: string | null;
  is_Class_Teacher: boolean;
  courses: {
    course_id: string;
    course_name: string;
  };
}

// In a shared types file or at the top of your file
export interface Teacher {
  id: string;
  name: string;
  profileImage: string;
  subjects: string[];
  isClassTeacher: boolean;
  feedbackEnabled: boolean;
  email?: string;
  class?: string;
  section?: string;
  description?: string;
}
export interface ChapterData {
  documentId: string;
  courseId: string;
  chapterName: string;
  availableResources: string;
  status: string;
}

export interface GradeData {
  id: string;
  grade: string;
}

export interface SectionData {
  id: string;
  section: string;
  courses: { course_id: string; course_name: string }[];
}
export interface TimetableResponse {
  classTimeTableData: TimeTable[];
  teacherData: { teacherClasses: TeacherClassData[] };
}
export interface ISurveyCard {
  id: string;
  type: "feedback" | "custom" | string;
  status: "active" | "draft" | "submitted" | string;
  endDate: string; // ISO format
  title: string;
  description: string;
  questions: RawQuestion[];
  batch_id: string;
  classes: string[]; // UUIDs of classes
  schoolId: string;
  targetAudience: string;
  createdAt: string; // ISO format
  _count: {
    responses: number;
  };
  teachers?: Teacher[]; // Optional if needed in logic
}
export interface RawQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface SurveyApiResponse {
  surveyData: ISurveyCard[];
}

export interface SchoolDetailsTab {
  id?: number;
  name: string;
  address: string;
  emergency_contact: string;
  school_type: string;
  school_code: string;
  website: string;
  accreditation_status: string;
  accreditation_validity: string;
  accreditation_number?: string;
  affiliation_number: string;
  udise: string;
  establish: string;
  email: string;
  contact: string;
  medium_of_instruction: string[];
  logo: string;
  principal_contact?: string;
  principal_email?: string;
  principal_experience?: string;
  principal_name?: string;
  principal_qualification?: string;
}
export interface TeacherListProps {
  teacherList: TeacherListType[];
}
export interface TeacherListType {
  profilePhoto: string;
  teacherName: string;
  studentRollNo: string;
  subject: string;
  contactNo: string;
}
export interface TeacherCardProps {
  id?: string;
  name: string;
  profileImage: string;
  subjects?: string[];
  isClassTeacher?: boolean;
  email?: string;
  showFeedbackButton?: boolean;
  surveyId?: string;
  setFeedback?: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      topic: string;
      surveyId: string;
      type: string;
    }>
  >;
  page?: string;
}

export interface NotificationType {
  userId: string | string[];
  title: string;
  message?: string;
  href?: string;
  type: string;
  product: string;
  image?: string;
  sendPush?: boolean;
  sendInApp?: boolean;
  scheduledTime?: string;
  id?: string;
  seen?: boolean;
}

export interface Node {
  type: "scholastic" | "coScholastic" | "start";
  title: string;
  isCompleted: boolean;
  id: string;
  subType?: string;
  createdAt: string;
}

export interface SubjectProgress {
  subjectName: string;
  FA1?: number;
  FA2?: number;
  SA1?: number;
  FA3?: number;
  FA4?: number;
  SA2?: number;
  SafalTest?: number;
}
export interface Assessment {
  id: number;
  name: string;
  subjects: Subject[];
}
export type RawStats = {
  completed: number;
  pending: number;
  total: number;
};
// interface FormattedResults {
//   data: ActivityResult[];
//   average: number;
// }
export interface ActivityProgress {
  subject: string;
  completed: number;
  pending: number;
  total: number;
}

export interface Subject {
  name: string;
  score: number;
  color: string;
}

export interface ActivityResult {
  taskId: string;
  teacherMarks: number | null;
  selfAssessmentMarks: number | null;
  peerAssessmentMarks: number | null;
  totalMarks: number;
  badge: any | null;
  taskTitle: string;
}
export type IActivityAssessment = {
  score: number[]; // [marksObtained, totalMarks]
  insights: number; // Custom insight score
};

export type TransformedActivity = {
  name: string; // Activity title or "Total Average Score"
  selfAssessment: IActivityAssessment;
  peerAssessment: IActivityAssessment;
  teacherAssessment: IActivityAssessment;
  subject: string; // e.g., "Maths" or "Total"
};

export interface StudentActivityResponse {
  data: ActivityResult[];
}

// interface FormattedResults {
//   data: ActivityResult[];
//   average: number;
// }

export type TestItem = {
  key: string;
  value: string;
};

export type SubjectTestData = {
  subject: string;
  safalTests: TestItem[];
  selfTests: TestItem[];
};

export enum UploadStatus {
  notStarted = "notStarted",
  completed = "completed",
  uploading = "uploading",
}

export interface UploadProgress {
  total: number;
  current: number;
  errors: string[];
  status: UploadStatus;
}

export interface PTMScheduleData {
  id: string;
  name: string;
  classId: string;
  category: "CLASS" | "Individual";
  startDate: string;
  endDate: string | null;
  startTime: string;
  endTime: string;
  noonStartTime: string;
  noonEndTime: string;
  createdAt: string;
  schoolId: number;
  batchId: string;
  PTMSchedule: PTMSchedule[];
  PTMBooking: PTMBooking[];
  PTMAttedance: PTMAttendance[];
  status: string;
}

export interface PTMSchedule {
  id: string;
  ptmId: string;
  teacherId: string;
  availableDate: string | null;
  availableStartTime: string | null;
  availableEndTime: string | null;
  morningSlotCount: number | null;
  noonSlotCount: number | null;
  createdAt: string;
}

export interface PTMBooking {
  ptmId: string;
  teacherId?: string;
  studentId?: string;
  bookedAt?: string;
}

export interface PTMAttendance {
  id: string;
  ptmId: string;
  session: "MORNING" | "AFTERNOON" | null;
  status: boolean;
}

export interface TeacherSchedule {
  scheduleId: string;
  date: string;
  startTime: string;
  endTime: string;
  morningSlotCount: number | null;
  noonSlotCount: number | null;
}

export interface IndividualTeacher {
  teacherId: string;
  teacherName: string;
  profileImage: string;
  isClassTeacher: boolean;
  subjects: string[];
  schedules: TeacherSchedule[];
}

export interface PtmIndividualEntry {
  ptmId: string;
  classId: string;
  teachers: IndividualTeacher[];
}

export type PtmIndividualByDate = Record<string, PtmIndividualEntry>;

export interface PtmAttendanceData {
  id: string;
  studentName: string;
  studentPic: string;
  studentId: string;
  badgeId: string;
  fatherName: string;
  fatherPic: string;
  fatherContact: string;
  motherName: string;
  motherPic: string;
  motherContact: string;
  session: "Morning" | "Afternoon";
  attendanceStatus: "Attended" | "Not Attended";
  status?: "present" | "absent";
  bookedAt?: Date;
}
export type PTMTableRow = {
  id: string;
  name: string;
  className: string;
  numStudents: number;
  date: string;
  attendedCount: number;
  totalCount: number;
  status: "Scheduled" | "In Progress" | "Completed";
};
export interface AcademicFeedback {
  messageId: string;
  message_time: string; // ISO string, can also use `Date` if parsed
  message_text: string;
  term?: string;
  interium_type?: string;
  senderId: string;
  mappingId: string;
}

export interface UserAcademicFeedbackMapping {
  id: string;
  user1Id: string; // Teacher
  user2Id: string; // Parent
  classId: string | null;
  batchId: string | null;
  user1SeenStatus: boolean;
  user2SeenStatus: boolean;
  studentId: string;
  academicFeedbacks: AcademicFeedback[];
}

export enum ContentType {
  TEACHER_QA = "TEACHER_QA",
  TEACHER_ARTICLES = "TEACHER_ARTICLES",
  STUDENT_QA = "STUDENT_QA",
  STUDENT_ARTICLES = "STUDENT_ARTICLES",
  SCHOLASTIC_ACTIVITY = "SCHOLASTIC_ACTIVITY",
  COSCHOLASTIC_ACTIVITY = "COSCHOLASTIC_ACTIVITY",
}

export const ContentTypeToReadableName: Record<ContentType, string> = {
  [ContentType.TEACHER_QA]: "Teacher",
  [ContentType.TEACHER_ARTICLES]: "Articles",
  [ContentType.STUDENT_QA]: "Student",
  [ContentType.STUDENT_ARTICLES]: "Articles",
  [ContentType.SCHOLASTIC_ACTIVITY]: "Scholastic Activity",
  [ContentType.COSCHOLASTIC_ACTIVITY]: "Co-Scholastic Activity",
};

export type DiffResult = {
  create: TimeTable[];
  update: TimeTable[];
  delete: TimeTable[];
};

// use this for type for data received from socket events. Pass the type of payload as a generic type
export type SocketEventData<T> = {
  payload: T;
};

export type stageType =
  | "Foundational Stage"
  | "Preparatory Stage"
  | "Middle Stage"
  | "Secondary Stage";

export interface ExamCourse {
  course_id: string;
  course_name: string;
}

export interface ExamClass {
  id: string;
  section: string;
  grade: string;
  courses: ExamCourse[];
}

export interface ExamPayload {
  start_time: {
    hours: number;
    minutes: number;
  };
  end_time: {
    hours: number;
    minutes: number;
  };
  exam_title: string;
  class_ids: string;
  start_date: string; // ISO string
  end_date: string; // ISO string
  courses: ExamClass[];
}
