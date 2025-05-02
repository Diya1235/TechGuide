import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    loading: false,
    resumeTemplates: [],
    cLTemplates: [],
    savedResumes: [],
    savedLetters: [],
    templateId: null,
    cltemplateId: null,
    currentCoverletter: [],
    currentResume: [],
    dispResume: [],
    displetter: []
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setresumeTemplates: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.resumeTemplates = action.payload;
      } else {
        console.error("Invalid data format: Expected an array", action.payload);
      }
    },
    setsavedResumes: (state, action) => {
      state.savedResumes = action.payload;
    },
    setresumetemplateId: (state, action) => {
      state.templateId = action.payload;
    },
    resetResumeTemplateId: (state) => {
      state.templateId = null;  // ✅ Reset to null
    },
    setCurrentResume: {
      reducer: (state, action) => {
        state.currentResume = action.payload;
      },
      prepare: (resume) => ({
        payload: serializeDates(resume),
      }),
    },
    setResume: {
      reducer: (state, action) => {
        state.dispResume = action.payload;
      },
      prepare: (resume) => ({
        payload: serializeDates(resume),
      }),
    },
    setcoverltemplateId: (state, action) => {
      state.cltemplateId = action.payload;
    },
    setCurrentCL: (state, action) => {
      state.currentCoverletter = action.payload;
    },
    setCoverletter: (state, action) => {
      state.displetter = action.payload;
    },
    setsavedLetters: (state, action) => {
      state.savedLetters = action.payload;
    },
    setcLTemplates: (state, action) => {
      state.cLTemplates = action.payload;
    }
  }
});

// Utility function to convert Date objects into strings
const serializeDates = (data) => {
  if (Array.isArray(data)) {
    return data.map(serializeDates);
  } else if (typeof data === "object" && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key] instanceof Date ? data[key].toISOString() : serializeDates(data[key]);
      return acc;
    }, {});
  }
  return data;
};

export const {
  setresumeTemplates,
  setcLTemplates,
  setsavedResumes,
  setresumetemplateId,
  setCurrentResume,
  setResume,
  setcoverltemplateId,
  setCoverletter,
  setCurrentCL,
  setsavedLetters,
  resetResumeTemplateId
} = templateSlice.actions;

export default templateSlice.reducer;
