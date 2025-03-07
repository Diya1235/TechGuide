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
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action to set user and persist to localStorage
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        // Remove user from localStorage (for logout)
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;

export default authSlice.reducer;
