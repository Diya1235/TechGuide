import express from 'express';
import { createTemplate, deleteTemplate, getAllTemplates } from '../controllers/coverletterTemp.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCoverLetter, deleteCoverLetter, getAllCoverLettersByUser, getCoverLetterById, updateCoverLetter } from '../controllers/coverletter.controller.js';

const router = express.Router();

router.route("/createTemplate").post(isAuthenticated,createTemplate);
router.route("/getAllTemplates").get(isAuthenticated,getAllTemplates);

router.route("/createcoverletter").post(isAuthenticated,createCoverLetter);
router.route("/update/:id").post(isAuthenticated,updateCoverLetter);
router.route("/getCoverLetterById/:id").get(isAuthenticated,getCoverLetterById);
router.route("/getAllCoverLettersByUser/:id").get(isAuthenticated,getAllCoverLettersByUser);
router.route("/deleteCoverLetter/:id").delete(isAuthenticated,deleteCoverLetter);

router.route("/deleteTemplate/:id").delete(isAuthenticated,deleteTemplate);

export default router;