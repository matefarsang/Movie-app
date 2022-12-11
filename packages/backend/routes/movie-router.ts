import { Request, Response } from "express";
import { MovieDetails } from "../interfaces";
import express from "express";
import { MovieModel } from "../models/movie-model";
import logger from "../middlewares/logger/logger";

const router = express.Router();

router.get("/movies", async (req: Request, res: Response) => {
  const movies = await MovieModel.find();
  if (movies) {
    logger.info(`${req.method} - ${req.originalUrl} - ${200}`);
    res.json(movies);
  }
  logger.error(`400 - Unfortunately, we could not find the requested data : (`);
});

router.get("/movie/:id", async (req: Request, res: Response) => {
  const query = { id: req.params.id };
  const movie = await MovieModel.findOne(query);
  if (movie) {
    logger.info(`${req.method} - ${req.originalUrl} - ${200}`);
    res.json(movie);
  }
  logger.error(`400 - Unfortunately, we could not find the requested data : (`);
});

router.post("/movie", async (req: Request, res: Response) => {
  const movie: MovieDetails = req.body;
  const newMovie: MovieDetails = {
    ...movie,
  };
  const recordedMovie = new MovieModel(newMovie);
  await recordedMovie.save();
  if (recordedMovie) {
    logger.info(`${req.method} - ${req.originalUrl} - ${201}`);
    res.json(recordedMovie);
  }
  logger.error(`400 - Unfortunately, we cannot perform the operation : (`);
});

router.put("/movie/:id", async (req: Request, res: Response) => {
  const query = { id: req.params.id };
  const newValues = { $set: req.body };
  const updatedMovie = await MovieModel.findOneAndUpdate(query, newValues, {
    new: true,
  });
  if (updatedMovie) {
    logger.info(`${req.method} - ${req.originalUrl} - ${201}`);
    res.json(updatedMovie);
  }
  logger.error(`400 - Unfortunately, we could not find the requested data : (`);
});

router.delete("/movie/:id", async (req: Request, res: Response) => {
  const query = { id: req.params.id };
  const deletedMovie = await MovieModel.findOneAndDelete(query);
  if (deletedMovie) {
    logger.info(`${req.method} - ${req.originalUrl} - ${200}`);
    res.json(`This movie is deleted: ${deletedMovie.title}`);
  }
  logger.error(`400 - Unfortunately, we could not find the requested data : (`);
});

export default router;
