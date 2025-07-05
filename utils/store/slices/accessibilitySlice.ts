// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type TextSize = "small" | "medium" | "large";

// interface AccessibilityState {
//   textSize: TextSize;
// }

// const initialState: AccessibilityState = {
//   textSize: "medium",
// };

// const accessibilitySlice = createSlice({
//   name: "accessibility",
//   initialState,
//   reducers: {
//     changeAccessibilitySetting: (
//       state,
//       action: PayloadAction<Partial<AccessibilityState>>
//     ) => {
//       const { textSize } = action.payload;
//       if (textSize && ["small", "medium", "large"].includes(textSize)) {
//         state.textSize = textSize;
//       }
//     },
//     deleteAccessibility: () => initialState,
//   },
// });

// export const { changeAccessibilitySetting, deleteAccessibility } =
//   accessibilitySlice.actions;

// export default accessibilitySlice.reducer;
