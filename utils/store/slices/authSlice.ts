// import { createSlice } from "@reduxjs/toolkit";

// interface AuthState {
//   token: string | null;
//   id: string;
//   username: string;
//   roles: string[];
//   schoolId: number | null;
//   profilePic?: string;
//   sessionId?: string;
// }

// const initialState: AuthState = {
//   token: null,
//   id: "",
//   username: "",
//   roles: [""],
//   schoolId: null,
//   profilePic: undefined,
//   sessionId: undefined,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload.accessToken;
//       state.id = action.payload.id;
//       state.username = action.payload.username;
//       state.roles = action.payload.roles;
//       state.schoolId = action.payload.schoolId;
//       state.profilePic = action.payload.profilePic;
//       state.sessionId = action.payload.sessionId;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.id = "";
//       state.username = "";
//       state.roles = [""];
//       state.schoolId = null;
//       state.profilePic = undefined;
//       state.sessionId = undefined;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
