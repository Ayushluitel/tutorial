import express from "express";
import Tour from "../models/Tour.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { budget, time, difficulty } = req.body;

    // Define difficulty mapping
    const difficultyMap = { easy: 1, moderate: 2, difficult: 3, demanding: 4 };
    const userDifficulty = difficultyMap[difficulty];

    // Fetch all treks
    const treks = await Tour.find();

    // Compute similarity scores
    const recommendedTreks = treks.map((trek) => {
      const trekDifficulty = difficultyMap[trek.difficulty];

      // Budget Score: Prefer treks **within budget**, penalize if above
      const budgetDiff = trek.price - budget;
      const budgetScore = budgetDiff <= 0 ? 1 : 1 - (budgetDiff / budget); // If within budget, full score

      // Time Score: Prefer treks **within time**, penalize if longer
      const timeDiff = trek.time - time;
      const timeScore = timeDiff <= 0 ? 1 : 1 - (timeDiff / time); // If within time, full score

      // Difficulty Score: Favor exact matches, penalize bigger differences
      const difficultyDiff = Math.abs(trekDifficulty - userDifficulty);
      const difficultyScore = 1 - difficultyDiff / 3; // Scale between 0-1

      // Weighted Score Calculation
      const score = budgetScore * 0.4 + timeScore * 0.3 + difficultyScore * 0.3;

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
