import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addProject, deleteProject, getAdminProjects, getAllProjects, getProjectById, getSavedProjects, removeSavedProject, saveProject } from '../controllers/project.controller.js';
const router = express.Router();

router.route("/addProject").post(isAuthenticated,addProject);
router.route("/getAllProjects").get(isAuthenticated,getAllProjects);
router.route("/getadminprojects").get(isAuthenticated,getAdminProjects);
router.route("/get/:id").get(isAuthenticated,getProjectById);

router.route("/saveproject/:id").post(isAuthenticated,saveProject);
router.route("/removeSavedProject/:id").delete(isAuthenticated,removeSavedProject);

router.route("/getSavedProjects").get(isAuthenticated,getSavedProjects);
router.route("/deleteProject/:id").delete(isAuthenticated,deleteProject);
export default router;