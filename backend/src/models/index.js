const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const modelsDir = path.join(__dirname);
// console.log(__dirname);
const models = {};

fs.readdirSync(modelsDir).forEach((file) => {
  if (file !== "index.js" && file.endsWith(".js")) {
    try {
      const modelName = path.basename(file, ".js");
      const model = require(path.join(modelsDir, file));
      models[modelName] = model;
    } catch (error) {
      console.error(`Error loading model from file ${file}:`, error);
    }
  }
});

module.exports = models;
