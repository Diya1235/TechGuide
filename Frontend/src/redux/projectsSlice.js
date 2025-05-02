import { USER_API_END_POINT } from "@/utils/Constant";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper functions for localStorage
const getSavedProjectsForUser = (userId) => {
  const allSavedProjects = JSON.parse(localStorage.getItem("savedProjects")) || {};
  return allSavedProjects[userId] || [];
};

const saveProjectsForUser = (userId, projects) => {
  const allSavedProjects = JSON.parse(localStorage.getItem("savedProjects")) || {};
  allSavedProjects[userId] = projects;
  localStorage.setItem("savedProjects", JSON.stringify(allSavedProjects));
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [], // List of all available projects
    singleProject: null, // Details of a single selected project
    savedProjects: [], // List of saved projects for the current user
    currentUserId: null, // ID of the logged-in user
    allAdminProjects: [],
    searchProjectsByText: "",
    searchedQuery: "",
  },
  reducers: {
    setAllProjects: (state, action) => {
      state.allProjects = action.payload;
    },
    setSingleProject: (state, action) => {
      state.singleProject = action.payload;
    },
    setAllAdminProjects: (state, action) => {
      state.allAdminProjects = action.payload;
    },
    setSearchProjectsByText: (state, action) => {
      state.searchProjectsByText = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    
    // ✅ Set Saved Projects
    setSavedProjects: (state, action) => {
      state.savedProjects = action.payload;
      if (state.currentUserId) {
        saveProjectsForUser(state.currentUserId, action.payload); // Save in localStorage
      }
    },

    // ✅ Remove a Saved Project
    removeSavedProject: (state, action) => {
      const updatedSavedProjects = state.savedProjects.filter((p) => p._id !== action.payload);
      state.savedProjects = updatedSavedProjects;
      if (state.currentUserId) {
        saveProjectsForUser(state.currentUserId, updatedSavedProjects);
      }
    },

    // ✅ Set the Current User & Fetch Saved Projects from Local Storage
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
      state.savedProjects = getSavedProjectsForUser(action.payload);
    },

    // ✅ Clear Saved Projects on Logout
    clearSavedProjects: (state) => {
      state.savedProjects = [];
    },
    
  },
});

export const {
  setAllProjects,
  setSingleProject,
  setSavedProjects,
  removeSavedProject,
  setCurrentUser,
  clearSavedProjects,
  setAllAdminProjects,
  setSearchProjectsByText,
  setSearchedQuery,
} = projectsSlice.actions;

// ✅ Corrected Thunk to Fetch Saved Projects
export const fetchSavedProjects = () => async (dispatch, getState) => {
  try {
    const { currentUserId } = getState().projects;

    if (!currentUserId) {
      console.error("No user logged in, cannot fetch saved projects.");
      return;
    }

    const response = await axios.get(`${USER_API_END_POINT}/saved-projects`, { withCredentials: true });

    if (response.data.success) {
      const savedProjects = response.data.data;
      console.log(savedProjects) // Adjusted for correct backend response structure
      dispatch(setSavedProjects(savedProjects)); // ✅ Update Redux
      saveProjectsForUser(currentUserId, savedProjects); // ✅ Persist in localStorage
    } else {
      console.warn("Failed to fetch saved projects:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching saved projects:", error.response?.data || error.message);
  }
};

export default projectsSlice.reducer;
