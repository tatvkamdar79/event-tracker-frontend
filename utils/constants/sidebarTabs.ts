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
      {
        name: "My Profile",
        icon: myProfile,
        route: "/profile",
      },
      {
        name: "Bookings",
        icon: myTasks,
        route: "/bookings",
      },
      {
        name: "Reports",
        icon: classInfo,
        route: "/reports",
      },
      {
        name: "Vendors",
        icon: classInfo,
        route: "/vendors",
      },
      {
        name: "Policies",
        icon: classInfo,
        route: "/policies",
      },
      {
        name: "Policies",
        icon: classInfo,
        route: "/policies",
      },
      {
        name: "Logs & Activity",
        icon: classInfo,
        route: "/logs",
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