const Solution = require("../models/solution.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const getAllSolution = async (req, res, next) => {
  let solutions;
  try {
    solutions = await Solution.find().populate("user");
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  if (!solutions) {
    return res.status(404).json({ message: "No Solutions Found" });
  }
  return res.status(200).json({ solutions });
};

const addSolution = async (req, res, next) => {
  const {
    user,
    code,
    title,
    language,
    webURL,
    youtubeURL,
    topic,
    timeC,
    spaceC,
    hint,
  } = req.body;
  console.log(req.body);
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable TO Find User By This ID" });
  }
  const solution = new Solution({
    user,
    code,
    title,
    language,
    webURL,
    youtubeURL,
    topic,
    timeC,
    spaceC,
    hint,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await solution.save({ session });
    existingUser.solutions.push(solution);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }

  return res.status(200).json({ solution });
};

const updateSolution = async (req, res, next) => {
  const {
    code,
    title,
    language,
    webURL,
    youtubeURL,
    topic,
    timeC,
    spaceC,
    hint,
  } = req.body;
  const solutionId = req.params.id;
  let solution;
  try {
    solution = await Solution.findByIdAndUpdate(solutionId, {
      code,
      title,
      language,
      webURL,
      youtubeURL,
      topic,
      timeC,
      spaceC,
      hint,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  if (!solution) {
    return res.status(500).json({ message: "Unable To Update The Solution" });
  }
  return res.status(200).json({ solution });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let solution;
  try {
    solution = await Solution.findById(id);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  if (!solution) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ solution });
};

const deleteSolution = async (req, res, next) => {
  const id = req.params.id;

  let solution;
  try {
    solution = await Solution.findByIdAndRemove(id).populate("user");
    await solution.user.solutions.pull(solution);
    await solution.user.save();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
  if (!solution) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userSolutions;
  try {
    userSolutions = await User.findById(userId).populate("solutions");
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  if (!userSolutions) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userSolutions });
};

module.exports = {
  getAllSolution,
  addSolution,
  updateSolution,
  getById,
  deleteSolution,
  getByUserId,
};
