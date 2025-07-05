// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { Platform } from "react-native";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "./slices/authSlice";
// import selectedChildReducer from "./slices/selectedChildSlice";
// import studentInfoReducer from "./slices/studentInfoSlice";
// import classReducer from "./slices/teacherClassesSlice";
// import teacherSelectedClassReducer from "./slices/teacherSelectedClassSlice";
// import studentClassReducer from "./slices/studentClassSlice";
// import accessibilitySlice from "./slices/accessibilitySlice";
// import selectedRoleSlice from "./slices/selectedRoleSlice";

// const reducer = combineReducers({
//   studentClass: studentClassReducer,
//   student: studentInfoReducer,
//   selectedChild: selectedChildReducer,
//   teacherClasses: classReducer,
//   teacherSelectedClass: teacherSelectedClassReducer,
//   accessibility: accessibilitySlice,
//   selectedRole: selectedRoleSlice,
// });
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage: Platform.OS === "web" ? storage : AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: { persit: persistedReducer, auth: authReducer },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
