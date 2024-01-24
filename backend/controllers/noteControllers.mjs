import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.mjs";

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category, isPinned, urgency, backgroundColor } = req.body;
  
  if ((title === "" && content === "<p><br></p>") || (title === "" && content === "")) {
    res.status(204).send();
    return;
  } else {
    try {
      const newNote = new Note({
        title,
        content,
        category,
        isPinned: isPinned || false,
        urgency: urgency || "medium",
        backgroundColor: backgroundColor || "#ffffff",
        user: req.user,
      });

      await newNote.save();
      res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
      res.status(400).json({ err: "Server Error" });
    }
  }
});

const fetchNotes = asyncHandler(async (req, res) => {
  try {
    const filter = { user: req.user };
    const notes = await Note.find(filter);
    res.status(200).json({ notes });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "Server Error" });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned, urgency, backgroundColor } =
      req.body;

    const note = await Note.findById(id);

    note.title = title;
    note.content = content;
    note.category = category;
    note.isPinned = isPinned;
    note.urgency = urgency;
    note.backgroundColor = backgroundColor;

    const isChanged = note.isModified();

    if (!isChanged) {
      res.status(204).send();
      return;
    }

    note.timestamp = new Date();

    await note.save();
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(400).json({ err: "Server Error" });
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findOneAndDelete({ _id: id });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ err: "Server Error" });
  }
});

export default { createNote, fetchNotes, updateNote, deleteNote };
