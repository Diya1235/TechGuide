import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if it exists
const storedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: storedUser || null, // Initialize user from localStorage
  },
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set user and persist to localStorage
    setUser: (state, action) => {
      if (action.payload) {
        state.user = {
          ...action.payload,
          role: action.payload.role || state.user?.role || "user", // Ensure role is stored
        };
        localStorage.setItem("user", JSON.stringify(state.user));
      } else {
        state.user = null;
        localStorage.removeItem("user"); // Remove user if null (logout)
      }
    },

    // Update user profile, ensuring role is not lost
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          profile: {
            ...state.user.profile,
            ...action.payload, // Merge updated profile fields
          },
        };
        localStorage.setItem("user", JSON.stringify(state.user)); // Persist to localStorage
      }
    },
  },
});

export const { setLoading, setUser, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
