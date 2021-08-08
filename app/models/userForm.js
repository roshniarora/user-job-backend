const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 64,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
