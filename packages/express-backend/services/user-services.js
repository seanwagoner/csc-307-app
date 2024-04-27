import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
    let query = {};
    if (name) query.name = name;
    if (job) query.job = job;
    return userModel.find(query);
}

function findUserById(id) {
  return userModel.findById(id);
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

export default {
  addUser,
  getUsers,
  findUserById,
  deleteUserById,
  findUserByName,
  findUserByJob,
};