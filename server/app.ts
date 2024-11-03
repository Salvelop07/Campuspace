import express, { Request, Response } from "express";
import errorHandler from "./src/middlewares/error.middleware";
import { UserInterface } from "./src/models/user.model";
import path from "path";

const app = express();

declare module "express" {
  interface Request {
    user?: UserInterface;
  }
}

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static("public"));

import userRouter from "./src/routes/user.route";
import timtableRouter from "./src/routes/timetable.route";
import teachersAbsentRouter from "./src/routes/teachersabsent.route";
import roomRouter from "./src/routes/room.route";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/timetable", timtableRouter);
app.use("/api/v1/teachersabsent", teachersAbsentRouter);
app.use("/api/v1/room", roomRouter);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "client", "dist")));
  app.get("*", (_: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (_: Request, res: Response) => {
    res.send("App is under development!");
  });
}

app.use(errorHandler);

export default app;