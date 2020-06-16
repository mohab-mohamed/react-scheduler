const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  username: String,
  picture: String,
  todos: [
    {
      task: String,
      completed: Boolean,
    },
  ],
  access: String,
  timeTables: [
    {
      date: String,
      timeTable: [Number],
      taskTable: [Number],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
