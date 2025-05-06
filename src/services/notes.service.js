import prisma from "@config/prisma-client";
import fs from "fs";
import path from "path";
import markdownIt from "markdown-it";
import logger from "@utils/logger";

const md = new markdownIt();

export class NoteService {
  static async createNoteFromFile(file) {
    try {
      const filePath = path.join(__dirname, "../uploads", file.filename);
      const markdownContent = fs.readFileSync(filePath, "utf8");

      const note = await prisma.note.create({
        data: {
          title: file.originalname,
          content: markdownContent,
        },
      });

      logger.info(`Note created: ${note.id}`);
      return note;
    } catch (error) {
      logger.error(`Error creating note from file: ${error.message}`);
      throw new Error("Error creating note");
    }
  }

  static async getAllNotes() {
    try {
      const notes = await prisma.note.findMany();
      logger.info(`Retrieved ${notes.length} notes`);
      return notes;
    } catch (error) {
      logger.error(`Error retrieving notes: ${error.message}`);
      throw new Error("Error retrieving notes");
    }
  }

  static async getNoteById(id) {
    try {
      const note = await prisma.note.findUnique({
        where: { id },
      });

      if (!note) {
        logger.warn(`Note with id ${id} not found`);
        throw new Error("Note not found");
      }

      logger.info(`Retrieved note with id ${id}`);
      return note;
    } catch (error) {
      logger.error(`Error retrieving note by id: ${error.message}`);
      throw new Error("Error retrieving note by ID");
    }
  }

  static async renderMarkdownToHTML(content) {
    try {
      const renderedHtml = md.render(content);
      return renderedHtml;
    } catch (error) {
      logger.error(`Error rendering markdown: ${error.message}`);
      throw new Error("Error rendering markdown");
    }
  }
}
