import express from "express";
import Tour from "../models/Tour.js"; // Import the Tour model

const router = express.Router();

// AI-based trek recommendation system
router.post("/", async (req, res) => {
  try {
    const { budget, time, difficulty } = req.body;

    // Normalize inputs
    const minPrice = await Tour.find().sort({ price: 1 }).limit(1);
    const maxPrice = await Tour.find().sort({ price: -1 }).limit(1);
    const minTime = await Tour.find().sort({ time: 1 }).limit(1);
    const maxTime = await Tour.find().sort({ time: -1 }).limit(1);

    const normalizedBudget = (budget - minPrice[0].price) / (maxPrice[0].price - minPrice[0].price);
    const normalizedTime = (time - minTime[0].time) / (maxTime[0].time - minTime[0].time);

    // Convert difficulty to numeric values for better calculations
    const difficultyMap = { easy: 1, moderate: 2, difficult: 3, demanding: 4 };
    const normalizedDifficulty = difficultyMap[difficulty] / 4; // Scale between 0-1

    // Fetch all treks
    const treks = await Tour.find();

    // Compute similarity scores
    const recommendedTreks = treks.map((trek) => {
      const trekDifficulty = difficultyMap[trek.difficulty] / 4; // Normalize difficulty

      const score =
        (1 - Math.abs(trek.price - normalizedBudget)) * 0.4 +
        (1 - Math.abs(trek.time - normalizedTime)) * 0.3 +
        (1 - Math.abs(trekDifficulty - normalizedDifficulty)) * 0.3;

      return { ...trek._doc, score };
    });

    // Sort treks by score and return top 5 recommendations
    const sortedTreks = recommendedTreks.sort((a, b) => b.score - a.score).slice(0, 5);

    res.status(200).json(sortedTreks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
