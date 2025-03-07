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
    currentUserId: null,
    allAdminProjects:[] ,
    searchProjectsByText:"",
    searchedQuery:""
    // ID of the currently logged-in user
  },
  reducers: {
    // Set all projects in the store
    setallProjects: (state, action) => {
      state.allProjects = action.payload;
    },

    // Set details for a single project
    setSingleProject: (state, action) => {
      state.singleProject = action.payload;
    },
  setAllAdminProjects:(state,action)=>{
    state.allAdminProjects = action.payload;
  },
  setsearchProjectsByText:(state,action)=>{
    state.searchProjectsByText = action.payload;
  },
  setsearchedQuery:(state,action)=>{
    state.searchedQuery = action.payload;
  },
    // Save projects for the current user
    setsaveProject: (state, action) => {
      const existingProjects = new Set(state.savedProjects.map((p) => p._id)); // Assuming `_id` is the unique identifier
    
      // Filter payload to include only valid objects with `_id` properties
      const validProjects = action.payload.filter((p) => p && p._id);
    
      state.savedProjects = [
        ...state.savedProjects,
        ...validProjects.filter((p) => !existingProjects.has(p._id)),
      ];
    
      if (state.currentUserId) {
        saveProjectsForUser(state.currentUserId, state.savedProjects);
      }
    },

    // Remove a project from saved projects
    removeSavedProject: (state, action) => {
      const updatedSavedProjects = state.savedProjects.filter((p) => p._id !== action.payload); // Use _id instead of id
      state.savedProjects = updatedSavedProjects;
    
      if (state.currentUserId) {
        saveProjectsForUser(state.currentUserId, updatedSavedProjects); // Persist in localStorage
      }
    },
    

    // Set the current user
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
      state.savedProjects = getSavedProjectsForUser(action.payload);
    },

    // Clear saved projects when the user logs out
    clearSavedProjects: (state) => {
      state.savedProjects = [];
    },
  },
});

export const {
  setallProjects,
  setSingleProject,
  setsaveProject,
  removeSavedProject,
  setCurrentUser,
  clearSavedProjects,
  setAllAdminProjects,
  setsearchProjectsByText,
  setsearchedQuery
} = projectsSlice.actions;

// Thunk to fetch saved projects from the backend
export const fetchSavedProjects = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${USER_API_END_POINT}`, { withCredentials: true });

    if (response.data.success) {
      const savedProjects = response.data.savedProjects;
      dispatch(setsaveProject(savedProjects)); // Update the Redux state
      saveProjectsForUser(userId, savedProjects); // Persist in localStorage
    }
  } catch (error) {
    console.error("Error fetching saved projects:", error.response?.data || error.message);
  }
};

export default projectsSlice.reducer;
