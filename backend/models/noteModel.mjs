import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    category: {
        type: String,
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    backgroundColor: {
        type: String, 
        default: '#ffffff', 
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Note = mongoose.model("Note", noteSchema);
export default Note;