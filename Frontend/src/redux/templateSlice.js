import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    loading: false,
    resumeTemplates: [], // List of all available projects
    cLTemplates: [], // Details of a single selected project
    savedResumes: [],
    savedLetters:[],
    templateId:null ,
    cltemplateId:null,
    currentCoverletter:[],
    currentResume:[],
    dispResume:[],
    displetter:[]// Initialize user from localStorage
  },
  reducers: {
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setresumeTemplates: (state, action) => {
        state.resumeTemplates = action.payload;
      },
      
      setsavedResumes:(state,action)=>{
        state.savedResumes = action.payload;
      },
      setresumetemplateId:(state,action)=>{
        state.templateId = action.payload;
      },
      setCurrentResume:(state,action)=>{
        state.currentResume = action.payload;
      },
      setResume:(state,action)=>{
        state.dispResume = action.payload;
      },
      setcoverltemplateId:(state,action)=>{
        state.cltemplateId = action.payload;
      },
      setCurrentCL:(state,action)=>{
        state.currentCoverletter = action.payload;
      },
      setCoverletter:(state,action)=>{
        state.displetter = action.payload;
      },
      setsavedLetters:(state,action)=>{
        state.savedLetters = action.payload;
      },
      setcLTemplates: (state, action) => {
        state.cLTemplates = action.payload;
      }
      
}
});

export const{setresumeTemplates,setcLTemplates,setsavedResumes,setresumetemplateId,setCurrentResume,setResume,setcoverltemplateId,setCoverletter,setCurrentCL,setsavedLetters} = templateSlice.actions;
export default templateSlice.reducer;