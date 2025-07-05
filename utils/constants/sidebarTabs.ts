import {
  dashboard,
  myProfile,
  classInfo,
  myTasks,
  academics,
  academicJourney,
  academicCalendar,
  noticeBoard,
  reports,
  contentLibrary,
  settings,
  classManagement,
  qbGeneration,
  sidebarFeedback,
  cpd,
  ptm,
  selfTest,
  bookIcon,
  schoolManagementIcon,
  userManagementIcon,
  attendanceRecordIcon,
  schoolCalendarIcon,
  announcementsIcon,
  accreditationIcon,
  adminProfileIcon,
} from "./images";
import { NavSection } from "./types";

export const studentNavItems: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      {
        name: "Home",
        icon: dashboard,
        route: "/home",
      },
    ],
  },
  {
    section: "EVENT CENTER",
    items: [
      {
        name: "My Profile",
        icon: myProfile,
        route: "/profile",
      },
      {
        name: "Class Info",
        icon: classInfo,
        route: "student/classinfo",
      },
      {
        name: "My Tasks",
        icon: myTasks,
        route: "student/my-tasks",
      },

      {
        name: "Academic Journey",
        icon: academicJourney,
        route: "student/academic-journey",
      },
      {
        name: "School Event Calendar",
        icon: academicCalendar,
        route: "student/academicCalendar",
      },
      {
        name: "Notice Board",
        icon: noticeBoard,
        route: "student/noticeBoard",
      },
      {
        name: "Reports",
        icon: reports,
        route: "student/reports",
      },
      {
        name: "Content Library",
        icon: contentLibrary,
        route: "student/contentLibrary",
      },
      {
        name: "Practice Test",
        icon: selfTest,
        route: "student/Self-Test",
      },
    ],
  },
  {
    section: "SYSTEM PREFERENCE",
    items: [
      {
        name: "Settings",
        icon: settings,
        route: "student/settings",
      },
    ],
  },
];

export const subjectTeacherNavItems: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      {
        name: "Home",
        icon: dashboard,
        route: "teacher/home",
      },
    ],
  },
  {
    section: "EDUCATION CENTER",
    items: [
      {
        name: "Subject Management",
        icon: bookIcon,
        route: "teacher/subjectManagement",
      },
      {
        name: "Academics",
        icon: academics,
        route: "teacher/academics",
      },
      {
        name: "Academic Calendar",
        icon: academicCalendar,
        route: "teacher/academicCalendar",
      },
      {
        name: "SLJ & SLP",
        icon: academicJourney,
        route: "teacher/academicJourney",
      },
      {
        name: "QB Generation",
        icon: qbGeneration,
        route: "teacher/qbGeneration",
      },
      {
        name: "Notice Board",
        icon: noticeBoard,
        route: "teacher/noticeBoard",
      },
      {
        name: "Reports",
        icon: reports,
        route: "teacher/reports",
      },
      {
        name: "Content Library",
        icon: contentLibrary,
        route: "teacher/contentLibrary",
      },
      {
        name: "CPD",
        icon: cpd,
        route: "teacher/cpd",
      },
      {
        name: "Parent Teacher Meeting",
        icon: ptm,
        route: "teacher/ptm",
      },
    ],
  },
  {
    section: "SYSTEM PREFERENCE",
    items: [
      {
        name: "Settings",
        icon: settings,
        route: "teacher/settings",
      },
    ],
  },
];

export const classTeacherNavItems: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      {
        name: "Home",
        icon: dashboard,
        route: "teacher/home",
      },
    ],
  },
  {
    section: "EDUCATION CENTER",
    items: [
      {
        name: "Class Management",
        icon: classManagement,
        route: "teacher/classManagement",
      },
      {
        name: "Academics",
        icon: academics,
        route: "teacher/academics",
      },
      {
        name: "School Event Calendar",
        icon: academicCalendar,
        route: "teacher/academicCalendar",
      },
      {
        name: "SLJ & SLP",
        icon: academicJourney,
        route: "teacher/academicJourney",
      },
      {
        name: "QB Generation",
        icon: qbGeneration,
        route: "teacher/qbGeneration",
      },
      {
        name: "Notice Board",
        icon: noticeBoard,
        route: "teacher/noticeBoard",
      },
      {
        name: "Reports",
        icon: reports,
        route: "teacher/reports",
      },
      {
        name: "Content Library",
        icon: contentLibrary,
        route: "teacher/contentLibrary",
      },
      {
        name: "CPD",
        icon: cpd,
        route: "teacher/cpd",
      },
      {
        name: "Parent Teacher Meeting",
        icon: ptm,
        route: "teacher/ptm",
      },
      {
        name: "Feedback",
        icon: sidebarFeedback,
        route: "teacher/feedback",
      },
    ],
  },
  {
    section: "SYSTEM PREFERENCE",
    items: [
      {
        name: "Settings",
        icon: settings,
        route: "teacher/settings",
      },
    ],
  },
];

export const schoolAdminNavItems: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      {
        name: "Home",
        icon: dashboard,
        route: "schoolAdmin/home",
      },
    ],
  },
  {
    section: "EDUCATION CENTER",
    items: [
      {
        name: "School Management",
        icon: schoolManagementIcon,
        route: "schoolAdmin/schoolManagement",
      },
      {
        name: "User Management",
        icon: userManagementIcon,
        route: "schoolAdmin/userManagement",
      },
      {
        name: "Class Management",
        icon: classManagement,
        route: "schoolAdmin/classManagement",
      },
      {
        name: "Task Management",
        icon: academics,
        route: "schoolAdmin/taskManagement",
      },
      {
        name: "Attendance Record",
        icon: attendanceRecordIcon,
        route: "schoolAdmin/attendanceRecord",
      },
      {
        name: "Reports",
        icon: reports,
        route: "schoolAdmin/reports",
      },
      {
        name: "School Event Calendar",
        icon: schoolCalendarIcon,
        route: "schoolAdmin/schoolCalendar",
      },
      {
        name: "Notice Board",
        icon: announcementsIcon,
        route: "schoolAdmin/noticeBoard",
      },
      {
        name: "Content Library",
        icon: contentLibrary,
        route: "schoolAdmin/contentLibrary",
      },
      {
        name: "CPD",
        icon: cpd,
        route: "schoolAdmin/cpd/cpd-records",
      },
      {
        name: "Accreditation",
        icon: accreditationIcon,
        route: "schoolAdmin/accreditation",
      },
      {
        name: "Admin Profile",
        icon: adminProfileIcon,
        route: "schoolAdmin/adminProfile",
      },
    ],
  },
  {
    section: "SYSTEM PREFERENCE",
    items: [
      {
        name: "Settings",
        icon: settings,
        route: "schoolAdmin/settings",
      },
    ],
  },
];

export const parentNavItems: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      {
        name: "Home",
        icon: dashboard,
        route: "parent/home",
      },
    ],
  },
  {
    section: "EDUCATION CENTER",
    items: [
      {
        name: "My Profile",
        icon: myProfile,
        route: "parent/myProfile",
      },
      {
        name: "Class Info",
        icon: classInfo,
        route: "parent/classinfo",
      },
      {
        name: "My Child's Tasks",
        icon: myTasks,
        route: "parent/childTasks",
      },

      {
        name: "SLJ & SLP",
        icon: academicJourney,
        route: "parent/studentJourney",
      },
      {
        name: "School Event Calendar",
        icon: academicCalendar,
        route: "parent/academicCalendar",
      },
      {
        name: "Notice Board",
        icon: noticeBoard,
        route: "parent/noticeBoard",
      },
      {
        name: "Reports",
        icon: reports,
        route: "parent/reports",
      },
      {
        name: "Content Library",
        icon: contentLibrary,
        route: "parent/contentLibrary",
      },
      {
        name: "Student Practice",
        icon: selfTest,
        route: "parent/studentPractice",
      },
      {
        name: "Parent Teacher Meeting",
        icon: ptm,
        route: "parent/ptm",
      },
      {
        name: "Feedback",
        icon: sidebarFeedback,
        route: "parent/feedback",
      },
    ],
  },
  {
    section: "SYSTEM PREFERENCE",
    items: [
      {
        name: "Settings",
        icon: settings,
        route: "parent/settings",
      },
    ],
  },
];

export const regulatorNavItems: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      {
        name: "Dashboard",
        icon: dashboard,
        route: "regulator/home",
      },
    ],
  },
  {
    section: "EDUCATION CENTER",
    items: [
      {
        name: "School Management",
        icon: schoolManagementIcon,
        route: "regulator/schoolManagement",
      },
      {
        name: "School-Wise Calendar",
        icon: academicCalendar,
        route: "regulator/schoolWiseCalendar",
      },
      {
        name: "Admin Profile",
        icon: adminProfileIcon,
        route: "regulator/adminProfile",
      },
      {
        name: "Analytics",
        icon: reports,
        route: "regulator/analytics",
      },
    ],
  },
  {
    section: "SYSTEM PREFERENCE",
    items: [
      {
        name: "Settings",
        icon: settings,
        route: "regulator/settings",
      },
    ],
  },
];
