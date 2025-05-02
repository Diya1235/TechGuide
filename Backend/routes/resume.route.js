import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createTemplate, deleteTemplate, getAllTemplates } from '../controllers/resumetemp.controller.js';
import { createResume, deleteResumeById, getResumeById, getUserResumes, updateResumeById } from '../controllers/resume.controller.js';

const router = express.Router();

router.route("/createTemplate").post(isAuthenticated,createTemplate);
router.route("/getAllTemplates").get(isAuthenticated,getAllTemplates);

router.route("/getUserResume/:id").get(isAuthenticated,getUserResumes);
router.route("/getResumeById/:id").get(isAuthenticated,getResumeById);


router.route("/createResume").post(isAuthenticated,createResume);
router.route("/deleteResume/:id").delete(isAuthenticated,deleteResumeById);
router.route("/updateResume/:id").post(isAuthenticated,updateResumeById);

router.route("/deleteTemplate/:id").delete(isAuthenticated,deleteTemplate);
export default router;