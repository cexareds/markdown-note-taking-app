import express from "express";
import cors from "cors";
import compression from "compression";
import notesRoutes from "@routes/notes";
import { errorHandler } from "@middlewares/errorHandler";
import { envs } from "@config/envs";

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());

app.use(errorHandler);

app.use("/api", notesRoutes);

const port = envs.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
