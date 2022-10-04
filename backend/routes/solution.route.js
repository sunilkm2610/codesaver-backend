const solutionRouter = require("express").Router();
const {
  getAllSolution,
  addSolution,
  updateSolution,
  getById,
  deleteSolution,
  getByUserId,
} = require("../controllers/solution");

solutionRouter.get("/", getAllSolution);
solutionRouter.post("/add", addSolution);
solutionRouter.put("/update/:id", updateSolution);
solutionRouter.get("/:id", getById);
solutionRouter.delete("/:id", deleteSolution);
solutionRouter.get("/user/:id", getByUserId);

module.exports = solutionRouter;
