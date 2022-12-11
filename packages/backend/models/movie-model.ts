import { Schema, model } from "mongoose";
import { MovieDetails } from "../interfaces";

const movieSchema = new Schema<MovieDetails>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ageLimit: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const MovieModel = model("Movie", movieSchema);
