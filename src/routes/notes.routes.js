import express from "express";
import multer from "multer";
import { body, param, validationResult } from "express-validator";
import {} from "@controllers/notes.controller";
import { validateNoteUpload } from "@middlewares/validate";
import { handleValidationErrors } from "@middlewares/errorHandler";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "notes/upload",
  [body("file").exists().withMessage("File is required")],
  handleValidationErrors,
  upload.single("file"),
  uploadNote
);

router.get(
  "notes/",
  [param("id").isInt({ min: 1 }).withMessage("ID is required")],
  handleValidationErrors,
  getNotes
);

router.get(
  "notes/:id/render",
  [param("id").isInt({ min: 1 }).withMessage("ID is required")],
  handleValidationErrors,
  renderNoteAsHTML
);
