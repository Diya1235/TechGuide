import express from 'express';
import { getStats, login, logout, register, resetpassword, totalUsers, trackTime, trackVisit, updateprofile } from '../controllers/user.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addProject } from '../controllers/project.controller.js';

import { uploadFields } from "../middlewares/multer.js";


const router = express.Router();

router.route("/register").post(uploadFields,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,uploadFields, updateprofile);

router.route("/addProject").post(addProject);
router.route("/getTotalUsers").get(totalUsers);
router.route("/reset-password").post(resetpassword);

router.route("/trackvisit").post(trackVisit);

router.route("/tracktime").post(trackTime);

router.route("/getstats").get(getStats);
export default router;