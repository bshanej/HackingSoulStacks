import fs from "fs";
import csv from "csv-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

function loadCSV(path) {
  return new Promise((resolve) => {
    const rows = [];
    if (!fs.existsSync(path)) return resolve([]);
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows));
  });
}

app.get("/api/core", async (_, res) => {
  res.json(await loadCSV("data/core_archetypes.csv"));
});

app.get("/api/archetypes", async (_, res) => {
  res.json(await loadCSV("data/archetypes_32.csv"));
});

app.get("/api/archetypes/:id", async (req, res) => {
  const data = await loadCSV("data/archetypes_32.csv");
  const found = data.find(a => a.id === req.params.id);
  if (found) res.json(found);
  else res.status(404).json({ error: "Not found" });
});

const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => console.log(`🔥 SoulHacking API live on port ${PORT}`));
