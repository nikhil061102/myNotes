import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.mjs";

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category, isPinned, urgency, backgroundColor } = req.body;

  if(title === undefined && content === undefined){
    res.status(204).send();
    return ;
  }

  try{
  const newNote = new Note({
    title,
    content,
    category,
    isPinned: isPinned || false,
    urgency: urgency || 'medium',
    backgroundColor: backgroundColor || '#ffffff',
  });

  await newNote.save();
  res.status(201).json({ message: 'Note created successfully' });
} catch (error) {
  throw new Error('Server Error');
}
});

const fetchNotes = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: 'i' } }, 
            { content: { $regex: query, $options: 'i' } }, 
          ],
        }
      : {};

    const notes = await Note.find(filter);

    res.status(200).json({ notes });
  } catch (error) {
    throw new Error('Server Error');
  }
});

const updateNote = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned, urgency, backgroundColor } = req.body;

    const note = await Note.findById(id);

    note.title = title || note.title;
    note.content = content || note.content;
    note.category = category || note.category;
    note.isPinned = isPinned || note.isPinned;
    note.urgency = urgency || note.urgency;
    note.backgroundColor = backgroundColor || note.backgroundColor;

    const isChanged = note.isModified();
    if (!isChanged) {
      res.status(204).send();
      return;
    }

    note.timestamp = Date.now();
    await note.save();

    res.json({ message: 'Note updated successfully' });
  } catch (error) {
    throw new Error('Server Error');
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findOneAndDelete({_id:id});

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    throw new Error('Server Error');
  }
});

export default { createNote, fetchNotes, updateNote, deleteNote };