
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
