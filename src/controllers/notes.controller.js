import NoteService from "@services/notes.service";

export class NoteController {
  async uploadNote(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const note = await NoteService.createNoteFromFile(req.file);
      res.status(201).json({
        message: "Note uploaded and saved successfully",
        note,
      });
    } catch (error) {
      next(error); // Pass the error to the centralized error handler
    }
  }

  async getAllNotes(req, res, next) {
    try {
      const notes = await NoteService.getAllNotes();
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }

  async getNoteById(req, res, next) {
    const { id } = req.params;

    try {
      const note = await NoteService.getNoteById(Number(id));
      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  }

  async renderNoteAsHTML(req, res, next) {
    const { id } = req.params;

    try {
      const note = await NoteService.getNoteById(Number(id));
      const renderedHtml = await NoteService.renderMarkdownToHTML(note.content);
      res.status(200).send(renderedHtml);
    } catch (error) {
      next(error);
    }
  }
}
