import express from 'express';
import protect from "../middleware/authMiddleware.mjs";
import notesRoutes from "../controllers/noteControllers.mjs";
const { createNote, fetchNotes, updateNote, deleteNote } = notesRoutes;

const router = express.Router();

// router.route("/").get(fetchNotes);
// router.route("/").post(createNote);
// router.route("/:id").put(updateNote);
// router.route("/:id").delete(deleteNote);
router.route("/").get(protect, fetchNotes);
router.route("/").post(protect, createNote);
router.route("/:id").put(protect, updateNote);
router.route("/:id").delete(protect, deleteNote);

export default router;