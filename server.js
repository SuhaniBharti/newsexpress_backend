import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

/*
Frontend sends:
country
category
page
pageSize
*/

app.get("/api/news", async (req, res) => {
  try {
    const {
      country = "us",
      category = "general",
      page = 1,
      pageSize = 10
    } = req.query;

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});
